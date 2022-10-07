let mongoose = require('mongoose');
const { Schema } = mongoose;

const userHistorySchema = new Schema({
    username: {
        type: String,
        required: true
    },
    partnerUsername: {
        type: String,
        required: true
    },
    questionId: {
        type: Number,
        required: true,
    },
    questionDifficultyIndex: {
        type: Number,
        required: true,
    },
    questionTitle: {
        type: String,
        required: true,
    },
    answerProvided: {
        type: String,
    },
    ratingReceived: {
        type: Number,
    },
    commentsReceived: {
        type: String,
    },
    datetime: {
        type: Date,
    },
});

var UserHistory = (module.exports = mongoose.model("UserHistory", userHistorySchema, "userhistories"));
module.exports.get= function(callback, limit) {
    UserHistory.find(callback).limit(limit)
}