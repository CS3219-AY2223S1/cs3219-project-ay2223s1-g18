import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

import connectDatabase from "./connect.js";
import MatchingRouter from "./matching.route.js";
import { createPendingMatch } from "./matching.controller.js";
import MatchingService from "./matching.service.js";

import { ExpressPeerServer } from "peer";
import { PeerServer } from "peer";




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

// start of Video chat
const peerApp = express();
const peerServer = createServer(peerApp);
var peerPort = 9000;

const expresspeerServer = ExpressPeerServer(peerServer, {
  debug: true,
});
peerApp.use("/peerjs", expresspeerServer);
peerServer.listen(peerPort);
// End of video chat

app.get("/", (req, res) => {
  res.sendFile("/temp_matching_service_file.html", { root: "." });
});





// References cache
var latestDifficulty;
var lastRoomId;

io.on("connection", (socket) => {

  console.log("a user connected with socket id: ", socket.id);

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

  socket.on("match request", (name, difficulty, socketId, peerId) => {
    latestDifficulty = difficulty;
    // Receive this event, check DB for a match
    const pendingMatch = MatchingService.getPendingMatches(difficulty).catch(
      (err) => {
        console.log(err);
      }
    );

    pendingMatch.then((data) => {
      console.log(data);
      if (data.length === 0) {
        // No match found, user will create a room as he initiates a match
        console.log("Match requested", name, difficulty, socketId);

        const meetingRoomId = "Room: " + socketId; // Create a room with user's Id
        socket.join(meetingRoomId); // User waits in room while waiting for a match
        lastRoomId = meetingRoomId;
        io.to(socketId).emit("initiate match"); // Acknowledgement message to the user
        console.log(socket.rooms);
        //console.log(socket.in(meetingRoomId));
        io.to(meetingRoomId).emit('create room', meetingRoomId);    // Test: if user has join the room - to be Deleted

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

        const meetingRoomId = "Room: " + data[1]; // New user joins the waiting user in his room
        socket.join(meetingRoomId);
        lastRoomId = meetingRoomId;

        io.to(meetingRoomId).emit("successfulMatch", difficulty, socketId);
        io.to(meetingRoomId).emit("sendAnnouncement", {
          msg: `${name} has joined the room.`,
          type: 1, // 0 – normal msg, 1 – system announcement
        });

        // call him at his userID number.
        socket.to(meetingRoomId).emit("video-call-me", peerId);
        console.log(peerId);

        // Delete the pending request once both users are in the room
        MatchingService.deletePendingMatch(nameOfPendingMatch).catch((err) => {
          console.log(err);
        });
      } else {
        console.log("User", socketId, "is finding match again");
        io.to(socketId).emit("matching");
      }
    });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected"); // user leaves all rooms he is in on disconnection
    //console.log(socket.rooms);

    // Delete any pending room that the user may have when disconnected
    deleteUserPendingRequest(latestDifficulty, socket.id, lastRoomId);
  });

  // checks the DB for user's created pending request and delete it if it exists
  // user will leave the room as well
  function deleteUserPendingRequest(difficulty, socketId, meetingRoomId) {
    const userPendingMatch = MatchingService.getPendingMatches(
      difficulty
    ).catch((err) => {
      console.log(err);
    });

    // Checks if there exist a pending match request created by the user
    let pendingMatchDeleted = false;
    pendingMatchDeleted = userPendingMatch.then((data) => {
      if (data.length > 0) {
        const requestorID = data[1];
        if (requestorID == socketId) {
          const requestorName = data[0];

          // Delete the user's pending request from the DB
          MatchingService.deletePendingMatch(requestorName).catch((err) => {
            console.log(err);
          });

          // User leaves the room
          console.log(socket.rooms);
          socket.leave(meetingRoomId);
          console.log(socket.rooms);
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
