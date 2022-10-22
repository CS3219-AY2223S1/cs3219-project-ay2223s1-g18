import chai, { should } from "chai";
import chaiHttp from "chai-http";
import { runHealthTests } from "./scenarios/runHealthTests.js";
import { runAuthTests } from "./scenarios/runAuthTests.js";
import { runUserTests } from "./scenarios/runUserTests.js";
import { runMatchingTests } from "./scenarios/runMatchingTests.js";
import { runQuestionTests } from "./scenarios/runQuestionTests.js";
import { runUserHistoryTests } from "./scenarios/runUserHistoryTests.js";

chai.use(chaiHttp);
chai.should();
const expect = chai.expect;

describe("Gateway Tests", () => {
  runHealthTests();
  runAuthTests();
  runUserTests();
  runMatchingTests();
  runQuestionTests();
  runUserHistoryTests();
});
