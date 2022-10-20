import chai, { should } from "chai";
import chaiHttp from "chai-http";
import { runHealthChecks } from "./scenarios/runHealthChecks.js";

// Configure chai
chai.use(chaiHttp);
chai.should();
const expect = chai.expect;

describe("Gateway Tests", () => {
  runHealthChecks();
});
