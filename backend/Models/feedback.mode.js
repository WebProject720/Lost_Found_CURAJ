import mongoose, { Schema } from "mongoose";


export const FeedbackSchema = new Schema(
    {

        email: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);



export const Feedback = new mongoose.model('Feedbacks', FeedbackSchema, 'Feedbacks')