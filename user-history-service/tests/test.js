// Import the dependencies for testing
let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require("../index");

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("User History service Tests", () => {
  describe("Test POST Request to add a user history", () => {
    it("It should add a new user history for Tester123", (done) => {
      chai
        .request(app)
        .post("/")
        .type("form")
        .send({
          username: "Tester123",
          partner_username: "Tester321",
          question_id: 5,
          question_difficulty_index: 2,
          question_title: "test qn",
          answer_provided: "sample answer",
          rating_received: 3,
          comments_received: "decent",
          datetime: null,
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.status.should.equal("Success!");
          res.body.data.username.should.equal("Tester123");
          res.body.data.partnerUsername.should.equal("Tester321");
          done();
        });
    });

    it("It should not add a new user history when there's no partner", (done) => {
      chai
        .request(app)
        .post("/")
        .type("form")
        .send({
          username: "Tester123",
          question_id: 5,
          question_difficulty_index: 2,
          question_title: "test qn",
          answer_provided: "sample answer",
          rating_received: 3,
          comments_received: "decent",
          datetime: null,
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.message.should.equal("Failed to add user!");
          done();
        });
    });

    it("It should not add a new user history when there's no question", (done) => {
      chai
        .request(app)
        .post("/")
        .type("form")
        .send({
          username: "Tester123",
          partner_username: "Tester321",
          question_difficulty_index: 2,
          question_title: "test qn",
          answer_provided: "sample answer",
          rating_received: 3,
          comments_received: "decent",
          datetime: null,
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.message.should.equal("Failed to add user!");
          done();
        });
    });

    describe("Test GET Request to get user history we just created", () => {
      it("It should get a user history", (done) => {
        const username = "Tester123";
        chai
          .request(app)
          .get("/" + username)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.status.should.equal("Success!");
            done();
          });
      });
    });
  });
});
