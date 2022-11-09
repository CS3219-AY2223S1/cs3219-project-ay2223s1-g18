let router = require("express").Router();
const QuestionController = require("./question.controller");

router.get("/", QuestionController.getQuestion);
router.get("/health", QuestionController.getHealthStatus);

router.get("/:question_id", QuestionController.getQuestionById);

module.exports = router;
