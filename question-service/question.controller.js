Question = require("./question.model");
Helper = require("./helper");

exports.getQuestion = async function(req, res) {
    var difficulty = req.query.difficulty

    const filteredQuestions = await Helper.list(Question, {difficulty})
    var random = Math.floor(Math.random() * filteredQuestions.length)

    res.json({
        status: 'success',
        question: filteredQuestions[random]

    }) 
}

// function x(questions) {
//     Question.count().exec(function (err, count) {
        
      
//         questions.findOne().skip(random).exec(
//           function (err, result) {
//             if (err) {
//                 res.status(404);
//                 res.json({
//                     status: "failed",
//                     message: err
//                 })
//             } 
//             else {
//                 res.json({
//                     status: 'success',
//                     question: result
//                 }) 
//             }
//         })
//     })
// }