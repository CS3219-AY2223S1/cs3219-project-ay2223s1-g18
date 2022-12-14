import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

import connectDatabase from "./connect.js";
import MatchingRouter from "./matching.route.js";
import MatchingService from "./matching.service.js";

const port = process.env.SERVICE_PORT || 8001;

const app = express();

app.use(cors()); // config cors so that front-end can use
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.options("*", cors());

app.use("/matching", MatchingRouter);

const httpServer = createServer(app);
const io = new Server(httpServer);

// References cache
var latestDifficulty;
var lastRoomId;

io.on("connection", (socket) => {
  socket.on("host peer id", ({ guestSocketId, hostPeerId }) => {
    io.to(guestSocketId).emit("host peer id", { hostPeerId: hostPeerId });
  });

  socket.on("end session", () => {
    const meetingRoomId = Array.from(socket.rooms.values())[1];
    io.to(meetingRoomId).emit("end session for all");

    io.in(meetingRoomId)
      .fetchSockets()
      .then((socks) => {
        if (socks.length === 2) {
          var sock1 = socks[0].id;
          var sock2 = socks[1].id;

          io.to(sock2).emit("partner socketId", sock1);
          io.to(sock1).emit("partner socketId", sock2);
        }
      });
  });

  socket.on("check room existence", () => {
    const ownSocketId = Array.from(socket.rooms.values())[0];

    if (socket.rooms.size > 1) {
      io.to(ownSocketId).emit("does room exist", true);
    } else {
      io.to(ownSocketId).emit("does room exist", false);
    }
  });

  socket.on(
    "partner rating",
    (rating, comments, receiverSocket, senderName) => {
      socket
        .to(receiverSocket)
        .emit("rating received", rating, comments, senderName);
    }
  );

  // socket.on("new question", (question) => {
  //   if (socket.rooms.size > 1) {
  //     const meetingRoomId = Array.from(socket.rooms.values())[1];
  //     io.to(meetingRoomId).emit("new question", question);
  //   }
  // });

  //socket.broadcast.emit('new user');          // In future, can add in name of user

  socket.on("chat message", (messageObject) => {
    if (socket.rooms.size > 1) {
      const meetingRoomId = Array.from(socket.rooms.values())[1];

      io.to(meetingRoomId).emit("chat message", {
        msg: messageObject,
        sender: messageObject.sender,
        time: messageObject.time,
        type: 0,
      });
    } else {
      io.emit("chat message", "This is a global message - to be removed");
    }
  });

  socket.on("code editor", (code) => {
    if (socket.rooms.size > 1) {
      const meetingRoomId = Array.from(socket.rooms.values())[1];
      io.to(meetingRoomId).emit("code editor", {
        code: code.code,
      });
    }
  });

  socket.on("match request", (name, difficulty, questionId, socketId) => {
    latestDifficulty = difficulty;

    const pendingMatch = MatchingService.getPendingMatches(difficulty).catch(
      (err) => {
        console.log(err);
      }
    );

    pendingMatch.then((data) => {
      if (data.length === 0) {
        // No match found, user will create a room as he initiates a match
        console.log("Match requested", name, difficulty, socketId);

        const meetingRoomId = "Room: " + socketId; // Create a room with user's Id
        socket.join(meetingRoomId); // User waits in room while waiting for a match
        lastRoomId = meetingRoomId;
        io.to(socketId).emit("initiate match", socketId);
        console.log(socket.rooms);
        //console.log(socket.in(meetingRoomId));
        io.to(meetingRoomId).emit("create room", meetingRoomId); // Test: if user has join the room - to be Deleted
        io.to(meetingRoomId).emit("sendAnnouncement", {
          msg: `${name} has joined the room.`,
          type: 1, // 0 ??? normal msg, 1 ??? system announcement
        });

        // Create a match request in the DB
        MatchingService.createPendingMatch(name, difficulty, socketId).catch(
          (err) => {
            console.log(err);
          }
        );

        // After 30 seconds timeout, checks the DB for user's created pending request
        // if it exist, delete it from the DB and the user leaves the room.
        setTimeout(() => {
          deleteUserPendingRequest(difficulty, socketId, meetingRoomId);
        }, 30000);
      } else if (data[1] != socketId) {
        // check if another user has requested for a match
        // A match is found
        const nameOfPendingMatch = data[0];
        console.log("Match Found with ", nameOfPendingMatch);

        io.to(socketId).emit("match found", socketId);

        const meetingRoomId = "Room: " + data[1]; // New user joins the waiting user in his room
        socket.join(meetingRoomId);
        lastRoomId = meetingRoomId;

        io.to(meetingRoomId).emit(
          "successfulMatch",
          difficulty,
          questionId,
          socketId
        );

        io.to(meetingRoomId).emit("sendAnnouncement", {
          msg: `${name} and ${nameOfPendingMatch} have joined the room.`,
          type: 1, // 0 ??? normal msg, 1 ??? system announcement
        });

        socket.to(meetingRoomId);
        // Delete the pending request once both users are in the room
        MatchingService.deletePendingMatch(nameOfPendingMatch).catch((err) => {
          console.log(err);
        });
      } else {
        io.to(socketId).emit("matching");
      }
    });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");

    io.to(lastRoomId).emit("sendAnnouncement", {
      msg: `Your partner has left the room. You are now alone.`,
      type: 1, // 0 ??? normal msg, 1 ??? system announcement
    });
    io.to(lastRoomId).emit("user disconnected");
    deleteUserPendingRequest(latestDifficulty, socket.id, lastRoomId);
  });

  // checks the DB for user's created pending request and delete it if it exists. user will leave the room as well
  function deleteUserPendingRequest(difficulty, socketId, meetingRoomId) {
    const userPendingMatch = MatchingService.getPendingMatches(
      difficulty
    ).catch((err) => {
      console.log(err);
    });

    // Checks if there exist a pending match request created by the user
    userPendingMatch.then((data) => {
      if (data.length > 0) {
        const requestorID = data[1];
        if (requestorID == socketId) {
          const requestorName = data[0];

          // Delete the user's pending request from the DB
          MatchingService.deletePendingMatch(requestorName).catch((err) => {
            console.log(err);
          });

          // User leaves the room
          socket.leave(meetingRoomId);
          console.log(
            "Timeout case: deleted pending request and left the room"
          );
          io.to(socketId).emit("match fail"); // Match fail message to the user
        }
        console.log("Pending room not user's case: Other user's pending rooms");
      }
      console.log("Match started case: No pending rooms");
    });
  }
});

try {
  connectDatabase();
} catch (e) {
  console.error(e);
}

httpServer.listen(port, () => {
  console.log("Matching-Service listening on Port:", port);
});
