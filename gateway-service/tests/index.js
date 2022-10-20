import chai, { should } from "chai";
import chaiHttp from "chai-http";
import { runHealthTests } from "./scenarios/runHealthTests.js";
import { runMatchingTests } from "./scenarios/runMatchingTests.js";
import { runUserHistoryTests } from "./scenarios/runUserHistoryTests.js";


chai.use(chaiHttp);
chai.should();
const expect = chai.expect;

describe("Gateway Tests", () => {
  runHealthTests();
  runMatchingTests();
  runUserHistoryTests();
});
