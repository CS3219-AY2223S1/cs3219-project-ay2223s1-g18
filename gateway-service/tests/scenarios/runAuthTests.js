import chai from 'chai';
import dotenv from 'dotenv';
dotenv.config()

const GATEWAY_LINK = 'http://localhost:80';
const REFRESH_TOKEN = process.env.REFRESH_TOKEN

export function runAuthTests() {
    describe("Auth Tests /", () => {

        it("should logout", (done) => {
            chai.request(GATEWAY_LINK)
                .post(`/api/auth/logout`)
                .set({ "Authorization": `Bearer ${REFRESH_TOKEN}` })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
        
        it("should not logout again", (done) => {
            chai.request(GATEWAY_LINK)
                .post(`/api/auth/logout`)
                .set({ "Authorization": `Bearer ${REFRESH_TOKEN}` })
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
}
