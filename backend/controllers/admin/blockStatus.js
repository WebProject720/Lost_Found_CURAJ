import { ApiError } from "../../utils/apiError.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { Users } from "../../Models/users.model.js";

export const changeActiveStatus = async (req, res) => {
    try {
        const { id } = req.body;

        // Validate the ID
        if (!id) {
            return res.status(400).json(new ApiError("User ID is required", null, false, 400));
        }

        // Find the user by ID
        const user = await Users.findById(id);
        if (!user) {
            return res.status(404).json(new ApiError("User not found", null, false, 404));
        }

        // Toggle the isBlocked status
        user.isBlocked = !user.isBlocked;

        // Save the updated user
        await user.save();

        return res.status(200).json(
            new ApiResponse(
                `User ${user.isBlocked ? "blocked" : "unblocked"} successfully`,
                { id: user._id, isBlocked: user.isBlocked },
                true,
                200
            )
        );
    } catch (error) {
        console.error("Error changing user active status:", error);
        return res.status(500).json(new ApiError("An error occurred while changing user status", error.message, false, 500));
    }
};