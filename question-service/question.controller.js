const Question = require("./question.model");
const Helper = require("./helper");

exports.getQuestion = async function (req, res) {
  var difficulty = req.query.difficulty;

  const filteredQuestions = await Helper.list(Question, { difficulty });
  var random = Math.floor(Math.random() * filteredQuestions.length);

  res.json({
    status: "success",
    question: filteredQuestions[random],
  });
};

exports.getQuestionById = async function (req, res) {
  var question_id = req.params.question_id;
  try {
    const question = await Helper.listOne(Question, { question_id });
    if (question) {
      res.json({
        message: "Success!",
        data: question,
      });
    }
  } catch (error) {
    res.status(404);
    res.json({
      message: "Invalid question id!",
      data: [],
    });
  }
};
