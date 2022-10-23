import chai from 'chai'
import dotenv from 'dotenv'
dotenv.config()


export function runAuthTests(app) {
  describe("Auth /", () => {

    it("should be able to access list of accounts", (done) => {
      chai.request(app)
        .get(`/initialize-tokens`)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          done()
        })
    })

    // it("should not be perform verification request without a valid verification token", (done) => {
    //   chai.request(USER_SERVICE_LINK)
    //     .patch(`/api/user/password-reset-verify`)
    //     .end((err, res) => {
    //       res.should.have.status(401)
    //       res.body.should.be.a('object')
    //       done()
    //     })
    // })

    // it("should authenticate a user", (done) => {
    //   chai.request(USER_SERVICE_LINK)
    //     .post(`/api/user/auth`)
    //     .type('form')
    //     .send({username: 'hong', password: 'test'})
    //     .end((err, res) => {
    //       res.should.have.status(200)
    //       res.body.should.be.a('object')
    //       done()
    //     })
    // })

  })
}
