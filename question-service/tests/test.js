// Import the dependencies for testing
let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require("../index");

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Question service Tests", () => {
  describe("Test GET Questions of different difficulties", () => {
    it("It should get an easy question", (done) => {
      chai
        .request(app)
        .get("/")
        .query({ difficulty: "easy" })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.status.should.equal("success");
          res.body.question.difficulty_index.should.equal(1);
          done();
        });
    });

    it("It should get a medium question", (done) => {
      chai
        .request(app)
        .get("/")
        .query({ difficulty: "medium" })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.status.should.equal("success");
          res.body.question.difficulty_index.should.equal(2);
          done();
        });
    });

    it("It should get a hard question", (done) => {
      chai
        .request(app)
        .get("/")
        .query({ difficulty: "hard" })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.status.should.equal("success");
          res.body.question.difficulty_index.should.equal(3);
          done();
        });
    });
  });
});
