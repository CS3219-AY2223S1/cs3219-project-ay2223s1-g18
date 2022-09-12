import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

import connectDatabase from "./connect.js";
import MatchingRouter from "./matching.route.js";
import { createPendingMatch } from "./matching.controller.js";
import MatchingService from "./matching.service.js";

const app = express();
app.use(cors()); // config cors so that front-end can use
const PORT = 8001;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.options("*", cors());

app.use("/matching", MatchingRouter);

app.get("/", (req, res) => {
  res.sendFile;
  "C:\\Users\\Hong Ming\\Desktop\\GitHub\\CS3219 Project\\matching-service/temp_matching_service_file.html"();
});

const httpServer = createServer(app);
const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("a user connected with socket id: ", socket.id);
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

io.on("connection", (socket) => {
  socket.on("match request", (name, difficulty, socketId) => {
    // Receive this event, check DB for a match
    const pendingMatch = MatchingService.getPendingMatches(difficulty).catch(
      (err) => {
        console.log(err);
      }
    );

    pendingMatch.then((data) => {
      console.log(data);
      if (data.length === 0) {
        // No match found, empty array
        console.log("Match requested", name, difficulty, socketId);
        // Create a match request
        MatchingService.createPendingMatch(name, difficulty, socketId).catch(
          (err) => {
            console.log(err);
          }
        );
      } else {
        // a match is found
        const nameOfPendingMatch = data[0];
        console.log("Match Found with ", nameOfPendingMatch);
        const meetingRoomId = "Room: " + socketId;

        socket.join(meetingRoomId);

        socket.to(data[1]).emit("Match Found", meetingRoomId);

        MatchingService.deletePendingMatch(nameOfPendingMatch).catch((err) => {
          console.log(err);
        });
      }
    });
  });
});

io.on("connection", (socket) => {
  socket.on("chat message", (messageObject) => {
    io.emit("chat message", {
      msg: messageObject.msg,
      sender: messageObject.sender,
      time: messageObject.time,
    });
  });
});

io.on("connection", function (socket) {
  socket.on("join meeting room", (meetingRoomId) => {
    socket.join(meetingRoomId);
    io.to(meetingRoomId).emit("Welcome message to meeting room");
    console.log("meeting room emit message");
  });
});

try {
  connectDatabase();
} catch (e) {
  console.error(e);
}

httpServer.listen(PORT);
