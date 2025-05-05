import { Feedback } from "../../Models/feedback.mode.js";

export const getFeedbacks = async (req, res) => {
    try {
        // Fetch feedbacks from the database with a limit of 50
        const feedbacks = await Feedback.find().sort({ createdAt: -1 }).limit(50);

        return res.status(200).json({
            success: true,
            data: feedbacks,
        });
    } catch (error) {
        console.error("Error fetching feedbacks:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching feedbacks.",
        });
    }
};