const UserHistory = require("./user-history.model");
const Helper = require("./helper");

// Get all user histories for all users
exports.getAllUserHistory = async function (req, res) {
  try{
    const userHistories = await Helper.list(UserHistory, {});
    if (userHistories) {
      res.json({
        status: "Success!",
        data: userHistories
      });
    }
  } catch (error) {
    res.status(404);
    res.json({
      message: "Cant retrieve user histories",
      data: [],
    });
  }
};

// Get all user histories for a single users
exports.getUserHistoryByName = async function (req, res) {
  var username = req.params.username;
  try{
    const userHistory = await Helper.list(UserHistory, { username: username });
    if (userHistory) {
      res.json({
        status: "Success!",
        data: userHistory
      });
    }
  } catch (error) {
    res.status(404);
    res.json({
      message: "Invalid username!",
      data: [],
    });
  }
};


// Add a user history 
exports.addUserHistory = async function (req, res) {
  try{
    const newUserHistory = await Helper.save(UserHistory, { 
      username: req.body.username,
      partnerUsername: req.body.partner_username,
      questionId: req.body.question_id,
      questionDifficultyIndex: req.body.question_difficulty_index,
      questionTitle: req.body.question_title,
      answerProvided: req.body.answer_provided,
      ratingReceived: req.body.rating_received,
      commentsReceived: req.body.comments_received,
      datetime: req.body.datetime
    });
    if (newUserHistory) {
      res.json({
        status: "Success!",
        data: newUserHistory
      });
    }
  } catch (error) {
    res.status(404);
    res.json({
      message: "Invalid username!",
      data: [],
    });
  }
};


// Update using the id generated from MongoDB. 
exports.updateUserHistoryById = async function (req, res) {
  var historyId = req.params.id;
  try {
    const updateResult = await Helper.updateOne(UserHistory, { _id: historyId }, {
      username: req.body.username,
      partnerUsername: req.body.partner_username,
      questionId: req.body.question_id,
      questionDifficultyIndex: req.body.question_difficulty_index,
      questionTitle: req.body.question_title,
      answerProvided: req.body.answer_provided,
      ratingReceived: req.body.rating_received,
      commentsReceived: req.body.comments_received,
      datetime: req.body.datetime
    });
    if (updateResult) {
      res.json({
        status: "Success!",
        data: updateResult
      });
    }
  } catch (error) {
    res.status(404);
    res.json({
      message: "Invalid username!",
      data: [],
    })
  }
}

exports.deleteUserHistoryById = async function (req, res) {
  var historyId = req.params.id;
  try{
    const deleteResult = await Helper.deleteOne(UserHistory, { _id: historyId });
    if (deleteResult) {
      res.json({
        status: "Success!",
        data: deleteResult
      });
    }
  } catch (error) {
    res.status(404);
    res.json({
      message: "Invalid username!",
      data: [],
    });
  }
};

// Todo: find out what should be the query params for deletion, since a user can have multiple history for the same question
/*
exports.deleteUserHistoryByNameAndQuestionId = async function (req, res) {
  var username = req.params.username;
  try{
    const deleteResult = await Helper.deleteOne(UserHistory, { username: username, questionId: req.body.question_id });
    if (deleteResult) {
      res.json({
        status: "Success!",
        data: deleteResult
      });
    }
  } catch (error) {
    res.status(404);
    res.json({
      message: "Invalid username!",
      data: [],
    });
  }
};
*/