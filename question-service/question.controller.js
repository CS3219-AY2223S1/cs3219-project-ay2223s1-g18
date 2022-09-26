const Question = require("./question.model");
const Helper = require("./helper");

exports.getQuestion = async function(req, res) {
    var difficulty = req.query.difficulty

    const filteredQuestions = await Helper.list(Question, {difficulty})
    var random = Math.floor(Math.random() * filteredQuestions.length)

    res.json({
        status: 'success',
        question: filteredQuestions[random]

    }) 
}
