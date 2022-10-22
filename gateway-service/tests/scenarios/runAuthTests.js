import chai from 'chai';
import dotenv from 'dotenv';
dotenv.config()

const GATEWAY_LINK = process.env.GATEWAY_LINK
const ACCESS_TOKEN = process.env.ACCESS_TOKEN
const REFRESH_TOKEN = process.env.REFRESH_TOKEN
const VERIFICATION_TOKEN = process.env.VERIFICATION_TOKEN

/*
* Add tests for other routes
* ensure token obtained is to last forever
*/

export function runAuthTests() {
    describe("Auth Tests /", () => {
        it("should not be able to get new access token without a valid refresh token", (done) => {
            chai.request(GATEWAY_LINK)
                .get(`/api/auth/get-access`)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("should be able to get new access token with a valid refresh token", (done) => {
            chai.request(GATEWAY_LINK)
                .get(`/api/auth/get-access`)
                .set({ "Authorization": `Bearer ${REFRESH_TOKEN}` })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

    });
}
