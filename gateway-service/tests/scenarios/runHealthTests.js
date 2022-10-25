import chai from 'chai';
import dotenv from 'dotenv';
dotenv.config()

const GATEWAY_LINK = 'http://localhost:80';
const ACCESS_TOKEN = process.env.ACCESS_TOKEN

export function runHealthTests() {
    describe("Health Tests /", () => {
        it("should verify status of user service", (done) => {
            chai.request(GATEWAY_LINK)
                .get(`/api/user/health`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("should verify status of question service", (done) => {
            chai.request(GATEWAY_LINK)
                .get(`/api/questions/health`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("should verify status of user history service", (done) => {
            chai.request(GATEWAY_LINK)
                .get(`/api/user-history/health`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("should verify status of auth middleware", (done) => {
            chai.request(GATEWAY_LINK)
                .get(`/api/auth/health`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
}
