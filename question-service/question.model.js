let mongoose = require('mongoose');
const { Schema } = mongoose;

const questionSchema = new Schema({
    question_id: {
        type: Number,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    difficulty_index: {
        type: Number,
        required: true,
    },
    difficulty: {
        type: String,
        required: true,
    },
    topics: {
        type: String,
    },
    content: {
        type: String,
    },
});

// export default mongoose.model("Questions", questionSchema, "questions");

var Question = (module.exports = mongoose.model("Questions", questionSchema, "questions"));
module.exports.get= function(callback, limit) {
    Question.find(callback).limit(limit)
}