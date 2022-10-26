import chai from "chai";
import dotenv from "dotenv";
dotenv.config();

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const VERIFICATION_TOKEN = process.env.VERIFICATION_TOKEN;

export function runAuthTests(app) {
  describe("Auth /", () => {
    it("should logout", (done) => {
      chai
        .request(app)
        .post(`/api/auth/logout`)
        .set({ Authorization: `Bearer ${REFRESH_TOKEN}` })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });

    it("should not logout again", (done) => {
      chai
        .request(app)
        .post(`/api/auth/logout`)
        .set({ Authorization: `Bearer ${REFRESH_TOKEN}` })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a("object");
          done();
        });
    });

    it("should verify access tokens", (done) => {
      chai
        .request(app)
        .post(`/api/auth/access`)
        .set({ Authorization: `Bearer ${ACCESS_TOKEN}` })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });

  });
}
