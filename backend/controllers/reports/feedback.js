import { Feedback } from "../../Models/feedback.mode.js";

export const feedback = async (req, res) => {
    try {
        const { name, email, description } = req.body;

        // Validate required fields
        if (!name || !email || !description) {
            return res.status(400).json({
                success: false,
                message: "Name, email, and description are required.",
            });
        }

        // Save feedback to the database
        const newFeedback = new Feedback({
            name,
            email,
            description,
        });

        await newFeedback.save();

        return res.status(201).json({
            success: true,
            message: "Feedback submitted successfully.",
        });
    } catch (error) {
        console.error("Error saving feedback:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while submitting feedback.",
        });
    }
};