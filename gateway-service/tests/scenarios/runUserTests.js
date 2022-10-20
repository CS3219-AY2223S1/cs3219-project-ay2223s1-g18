import chai from 'chai';
import dotenv from 'dotenv';
dotenv.config()

const GATEWAY_LINK = process.env.GATEWAY_LINK
const ACCESS_TOKEN = process.env.ACCESS_TOKEN

export function runUserTests() {
    describe("User Tests /", () => {
        it("should not be able to access protected service without a valid access token", (done) => {
            chai.request(GATEWAY_LINK)
                .get(`/api/users/accounts`)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("should be able to access protected service with a valid access token", (done) => {
            chai.request(GATEWAY_LINK)
                .get(`/api/users/accounts`)
                .set({ "Authorization": `Bearer ${ACCESS_TOKEN}` })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

    });
}
