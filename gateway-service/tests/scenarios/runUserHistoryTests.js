import chai from 'chai';
const GATEWAY_LINK = 'http://localhost:80'
const TEST_ACCESS_TOKEN = 'xxx'

export function runUserHistoryTests() {
    describe("User History Tests /", () => {
        it("should not be able to access service without a valid access token", (done) => {
            chai.request(GATEWAY_LINK)
                .get(`/api/user-history/`)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("shouldbe able to access service with a valid access token", (done) => {
            chai.request(GATEWAY_LINK)
                .get(`/api/user-history/`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

    });
}
