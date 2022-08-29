import mongoose from 'mongoose';
import {v4} from 'uuid';

const { Schema } = mongoose;

const userSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
        default: v4,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

export default mongoose.model("User", userSchema);