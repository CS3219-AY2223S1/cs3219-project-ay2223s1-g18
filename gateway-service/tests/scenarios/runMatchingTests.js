import { createServer } from "http";
import { io as Client } from "socket.io-client";
import { Server } from "socket.io";
import { assert } from "chai";

const GATEWAY_LINK = "http://localhost:80/";

export function runMatchingTests() {
  describe("Matching Checks /", () => {
    let io, serverSocket, clientSocket;

    //TODO: Change client to api gateway
    before((done) => {
      const httpServer = createServer();
      io = new Server(httpServer);
      httpServer.listen(() => {
        const port = httpServer.address().port;
        clientSocket = new Client(`http://localhost:${port}`);
        io.on("connection", (socket) => {
          serverSocket = socket;
        });
        clientSocket.on("connect", done);
      });
    });

    after(() => {
      io.close();
      clientSocket.close();
    });

    it("should work", (done) => {
      clientSocket.on("hello", (arg) => {
        assert.equal(arg, "world");
        done();
      });
      serverSocket.emit("hello", "world");
    });

    it("should work (with ack)", (done) => {
      serverSocket.on("hi", (cb) => {
        cb("hola");
      });
      clientSocket.emit("hi", (arg) => {
        assert.equal(arg, "hola");
        done();
      });
    });
  });
}
