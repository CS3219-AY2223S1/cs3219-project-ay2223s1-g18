import chai from 'chai';
import dotenv from 'dotenv';
dotenv.config()

const GATEWAY_LINK = process.env.GATEWAY_LINK
const ACCESS_TOKEN = process.env.ACCESS_TOKEN
const VERIFICATION_TOKEN = process.env.VERIFICATION_TOKEN

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

        it("should not be perform verification request without a valid verification token", (done) => {
            chai.request(GATEWAY_LINK)
                .patch(`/api/user/password-reset-verify`)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("should authenticate a user", (done) => {
            chai.request(GATEWAY_LINK)
                .post(`/api/user/auth`)
                .type('form')
                .send({username: 'hong', password: 'test'})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

    });
}
