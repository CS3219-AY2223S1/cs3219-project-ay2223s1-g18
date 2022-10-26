import chai from "chai";
import dotenv from "dotenv";
dotenv.config();
const expect = chai.expect

const USERS = [
  {
    email: "test@test.com",
    username: "shawn",
    password: "123456",
  },
  {
    email: "test@test1.com",
    username: "john123",
    password: "211322",
  },
];

export function runCrudTests(app) {
  describe("User /", () => {
    it("should create a user", (done) => {
      chai
        .request(app)
        .post(`/signup-verify`)
        .type('form')
        .set("token", JSON.stringify(USERS[0]))
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          done();
        });
    });

    it("should create another user", (done) => {
      chai
        .request(app)
        .post(`/signup-verify`)
        .set("token", JSON.stringify(USERS[1]))
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          done();
        });
    });

    it("should verify the no. of users in the database", (done) => {
      chai
        .request(app)
        .get(`/accounts`)

        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          expect(res.body.response.length).to.equal(2);
          done();
        });
    });

    it("should verify a particular user created", (done) => {
      chai
        .request(app)
        .get(`/accounts/${USERS[0].username}`)

        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });

    it("be able to authenticate a user", (done) => {
      chai
        .request(app)
        .post(`/auth`)
        .type('form')
        .send({username: USERS[0].username, password: USERS[0].password})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });

    it("should update a user's password", (done) => {
      chai.request(app)
        .patch(`/accounts/${USERS[0].username}`)
        .type('form')
        .send({password: 'abce'})
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          done()
        })
    })

    it("be able to authenticate a user with updated credentials", (done) => {
      chai
        .request(app)
        .post(`/auth`)
        .type('form')
        .send({username: USERS[0].username, password: 'abce'})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });

    it("should delete a user", (done) => {
      chai.request(app)
        .delete(`/accounts/${USERS[0].username}`)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          done()
        })
    })

    it("should delete another user", (done) => {
      chai.request(app)
        .delete(`/accounts/${USERS[1].username}`)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          done()
        })
    })

    it("not be able to get a non existent user", (done) => {
      chai
        .request(app)
        .get(`/accounts/${USERS[0].username}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a("object");
          done();
        });
    });

    it("not be able to update a non existent user", (done) => {
      chai
        .request(app)
        .patch(`/accounts/${USERS[0].username}`)
        .type('form')
        .send({password: 'abaa'})
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a("object");
          done();
        });
    });

    it("should delete a non existent user", (done) => {
      chai.request(app)
        .delete(`/accounts/${USERS[0].username}`)
        .end((err, res) => {
          res.should.have.status(404)
          res.body.should.be.a('object')
          done()
        })
    })

  });
}
