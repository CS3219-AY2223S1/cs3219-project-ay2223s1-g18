import chai from 'chai';
import dotenv from 'dotenv';
dotenv.config()

const GATEWAY_LINK = 'http://localhost:80';
const ACCESS_TOKEN = process.env.ACCESS_TOKEN

export function runQuestionTests() {
    describe("Question Tests /", () => {
        it("should not be able to access service without a valid access token", (done) => {
            chai.request(GATEWAY_LINK)
                .get(`/api/questions/`)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("should be able to access service with a valid access token", (done) => {
            chai.request(GATEWAY_LINK)
                .get(`/api/questions/`)
                .set({ "Authorization": `Bearer ${ACCESS_TOKEN}` })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

    });
}
