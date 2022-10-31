import chai from 'chai'
import chaiHttp from 'chai-http'
import { app } from '../index.js';
import { runAuthTests } from './scenarios/runAuthTests.js'

chai.use(chaiHttp)
chai.should()

describe('Auth Tests', () => {
  runAuthTests(app)
})
