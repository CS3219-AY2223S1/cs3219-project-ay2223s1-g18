import chai from "chai";
import dotenv from "dotenv";
dotenv.config();

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const VERIFICATION_TOKEN = process.env.VERIFICATION_TOKEN;

export function runAuthTests(app) {
  describe("Auth /", () => {

    it("should flag empty access tokens", (done) => {
      chai
        .request(app)
        .get(`/access`)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a("object");
          done();
        });
    });

    it("should verify access tokens", (done) => {
      chai
        .request(app)
        .get(`/access`)
        .set({ Authorization: `Bearer ${ACCESS_TOKEN}` })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });

    it("should flag invalid refresh tokens", (done) => {
      chai
        .request(app)
        .get(`/access`)
        .set({ Authorization: `Bearer xxx` })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a("object");
          done();
        });
    });

    it("should verify refresh tokens", (done) => {
      chai
        .request(app)
        .get(`/access`)
        .set({ Authorization: `Bearer ${ACCESS_TOKEN}` })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });

    it("should flag invalid refresh tokens", (done) => {
      chai
        .request(app)
        .get(`/refresh`)
        .set({ Authorization: `Bearer ${REFRESH_TOKEN + 'aa'}` })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a("object");
          done();
        });
    });

    it("should verify refresh tokens", (done) => {
      chai
        .request(app)
        .get(`/refresh`)
        .set({ Authorization: `Bearer ${REFRESH_TOKEN}` })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });

    it("should flag invalid verification tokens", (done) => {
      chai
        .request(app)
        .get(`/verification`)
        .set({ Authorization: `Bearer ${REFRESH_TOKEN}` })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a("object");
          done();
        });
    });

    it("should verify verification tokens", (done) => {
      chai
        .request(app)
        .get(`/verification`)
        .set({ Authorization: `Bearer ${VERIFICATION_TOKEN}` })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });

  });
}
