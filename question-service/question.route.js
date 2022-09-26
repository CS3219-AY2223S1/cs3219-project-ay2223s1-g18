let router = require('express').Router();
const QuestionController = require("./question.controller")

router.get("/", QuestionController.getQuestion)

module.exports = router