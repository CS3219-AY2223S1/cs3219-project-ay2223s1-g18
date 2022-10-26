import chai from 'chai';
import dotenv from 'dotenv';
dotenv.config()

const GATEWAY_LINK = 'http://localhost:80';
const ACCESS_TOKEN = process.env.ACCESS_TOKEN
const REFRESH_TOKEN = process.env.REFRESH_TOKEN
const VERIFICATION_TOKEN = process.env.VERIFICATION_TOKEN
const USER =  {
    email: "test@test.com",
    username: "shawn",
    password: "123456",
  }

  export function runUserTests() {
    describe("User Tests /", () => {
        it("should not be able to access protected service without a valid access token", (done) => {
            chai.request(GATEWAY_LINK)
                .get(`/api/user/accounts`)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("should be able to access protected service with a valid access token", (done) => {
            chai.request(GATEWAY_LINK)
                .get(`/api/user/accounts`)
                .set({ "Authorization": `Bearer ${ACCESS_TOKEN}` })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("should be able to obtain a valid access token with a valid refresh token", (done) => {
            chai.request(GATEWAY_LINK)
                .get(`/api/user/get-access`)
                .set({ "Authorization": `Bearer ${REFRESH_TOKEN}` })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("should create a user", (done) => {
            chai
              .request(GATEWAY_LINK)
              .post(`/api/user/signup-verify`)
              .set({ "Authorization": `Bearer ${VERIFICATION_TOKEN}` })
              .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a("object");
                done();
              });
          });

        it("should authenticate a user", (done) => {
            chai.request(GATEWAY_LINK)
                .post(`/api/user/auth`)
                .type('form')
                .send({username: USER.username, password: USER.password})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("should not perform verification request without a valid verification token", (done) => {
            chai.request(GATEWAY_LINK)
                .patch(`/api/user/password-reset-verify`)
                .type('form')
                .send({password: 'abce'})
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("should perform verification request with a valid verification token", (done) => {
            chai.request(GATEWAY_LINK)
                .patch(`/api/user/password-reset-verify`)
                .set({ "Authorization": `Bearer ${VERIFICATION_TOKEN}` })
                .set({token: JSON.stringify(USER)})
                .type('form')
                .send({password: 'abce'})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("should update a user", (done) => {
            chai.request(GATEWAY_LINK)
                .patch(`/api/user/accounts/${USER.username}`)
                .set({ "Authorization": `Bearer ${ACCESS_TOKEN}` })
                .type('form')
                .send({password: 'abce'})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });


        it("should delete a user", (done) => {
            chai.request(GATEWAY_LINK)
              .delete(`/api/user/accounts/${USER.username}`)
              .set({ "Authorization": `Bearer ${ACCESS_TOKEN}` })
              .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                done()
              })
          })

    });
}
