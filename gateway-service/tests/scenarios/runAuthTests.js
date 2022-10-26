import chai from 'chai';
import dotenv from 'dotenv';
dotenv.config()

const GATEWAY_LINK = 'http://localhost:80';
const ACCESS_TOKEN = process.env.ACCESS_TOKEN
const REFRESH_TOKEN = process.env.REFRESH_TOKEN
const VERIFICATION_TOKEN = process.env.VERIFICATION_TOKEN

/*
* Add tests for other routes
* ensure token obtained is to last forever
*/

export function runAuthTests() {
    describe("Auth Tests /", () => {

    });
}
