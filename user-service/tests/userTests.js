import chai from 'chai'
import chaiHttp from 'chai-http'
import { app } from '../index.js';
import { runCrudTests } from './scenarios/runCrudTests.js'

chai.use(chaiHttp)
chai.should()

describe('User Tests', () => {
  runCrudTests(app)
})
