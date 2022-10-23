import chai from 'chai'
import chaiHttp from 'chai-http'
import { app } from '../index.js';
import { runUserTests } from './scenarios/runUserTests.js'

chai.use(chaiHttp)
chai.should()

describe('User Tests', () => {
  runUserTests(app)
})
