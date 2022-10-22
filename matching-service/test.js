import { io as Client } from "socket.io-client";
import { assert } from "chai";



/*global describe, it*/

var socketURL = 'http://localhost:8001';

describe("matching-service", () => {
    // Include testing code here
    var client1 = new Client(socketURL)
    var client2 = new Client(socketURL)
    var client3 = new Client(socketURL)

    it("Render sockets", (done) => {
        client1.emit("render", "hello");
        client2.emit("render", "hello");
        client3.emit("render", "hello");
        setTimeout(() => { done() }, 1000)
    })

    it("Client should not have a room", (done) => {
        client1.emit("check room existence");
        client1.on("does room exist", (isTrue) => {
            if (!isTrue) {
                done()
            }
        })
    })

    it("Initiate match", (done) => {
        console.log(client1.id)
        client1.emit("match request", "client1", "hard", 123, client1.id)
        client1.on('initiate match', () => {
            done()
        })
    })

    it("Match found", (done) => {

        setTimeout(() => { client2.emit("match request", "client2", "hard", 123, client2.id) }, 1000);

        client1.on("successfulMatch", () => {
            done()
        })
    })


    it("Client should have a room", (done) => {
        client1.emit("check room existence");
        client1.on("does room exist", (isTrue) => {
            if (isTrue) {
                done()
            }
        })
    })

    it("Chat message", (done) => {
        let message = "Bonjour"
        client1.emit("chat message", message);
        client2.once("chat message", (messageObject) => {
            assert.equal(messageObject.msg, message)
            done();
        })
    })

    it("Private message should not be received by other clients", (done) => {
        let message = "Bonjour"
        client1.emit("chat message", message);
        client3.on("chat message", () => {
            assert.fail()
        })
        client2.on("chat message", (messageObject) => {
            assert.equal(messageObject.msg, message)
            done()
        })
    })

    it("Collab code writing", (done) => {
        client2.emit("code editor", { code: "written code" })
        client1.on("code editor", (messageObject) => {
            assert.equal(messageObject.code, "written code")
            done()
        })
    })

    it("Partner rating", (done) => {
        let rating = "Decent"
        let comments = "comments"
        let senderName = "client1"
        client1.emit("partner rating", rating, comments, client2.id, senderName)
        client2.on("rating received", (r, c, s) => {
            assert.equal(r, rating)
            assert.equal(c, comments)
            assert.equal(s, senderName)
            done()
        })
    })

    it("End session", (done) => {
        client1.emit("end session")
        client2.on("end session for all", () => {
            done()
        })
    })

});