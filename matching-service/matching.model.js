// The Model file contains the schema of the DB and the connection to the DB collection

import mongoose from 'mongoose';

const { Schema } = mongoose;

const matchingSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    difficulty: {
        type: String,
        required: true,
    },
    socketId: {
        type: String,
        required: true,
        unique: true,
    },
});

// Choose collection to connect to in mongoDB
export default mongoose.model("Matching", matchingSchema, "matchingservice");