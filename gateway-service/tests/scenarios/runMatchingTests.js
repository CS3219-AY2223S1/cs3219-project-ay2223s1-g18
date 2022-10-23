import { io as Client } from "socket.io-client";
import dotenv from "dotenv";
dotenv.config();

//const GATEWAY_LINK = process.env.GATEWAY_LINK;
const GATEWAY_LINK = 'http://localhost:8001'
//const ACCESS_TOKEN = process.env.ACCESS_TOKEN

export function runMatchingTests() {
  describe("Matching Tests /", () => {
    let io, serverSocket, clientSocket;
    let client1 = new Client(GATEWAY_LINK);
    let client2 = new Client(GATEWAY_LINK);
    let client3 = new Client(GATEWAY_LINK);

    it("should render sockets for clients", (done) => {
      client1.emit("render", "hello");
      client2.emit("render", "hello");
      client3.emit("render", "hello");
      setTimeout(() => {
        done();
      }, 1000);
    });

    it("should not have a room for a client", (done) => {
      client1.emit("check room existence");
      client1.on("does room exist", (isTrue) => {
        if (!isTrue) {
          done();
        }
      });
    });

    it("should initiate match for a client", (done) => {
      client1.emit("match request", "client1", "hard", 123, client1.id);
      client1.on("initiate match", () => {
        done();
      });
    });

    it("should find a match for a client", (done) => {
      setTimeout(() => {
        client2.emit("match request", "client2", "hard", 123, client2.id);
      }, 1000);

      client1.on("successfulMatch", () => {
        done();
      });
    });

    it("should have a room for a client", (done) => {
      client1.emit("check room existence");
      client1.on("does room exist", (isTrue) => {
        if (isTrue) {
          done();
        }
      });
    });
  });
}
