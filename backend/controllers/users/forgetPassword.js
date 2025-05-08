import { ApiError } from "../../utils/apiError.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { Users } from '../../Models/users.model.js';
import bcrypt from "bcrypt";
import { otp } from "../../Models/model.js";
import { sendMail as sendVerificationMail } from "../../utils/email.js";

export const forgetPassword = async (req, res) => {
    try {
        const data = req.body;

        if (data.identifier && !String(data.identifier).includes(process.env.EMAIL_SIGN))
            data.identifier = String(data.identifier) + process.env.EMAIL_SIGN;

        // Step 1: Check if user exists and send OTP
        if (data.checkUser) {

            console.log(data);
            const response = await Users.findOne({ email: data.identifier }); // Check if user exists
            console.log(response);

            if (response) {
                // Send OTP via email
                await sendVerificationMail(response?.email);
                // Send success response
                return res.status(200).json(new ApiResponse("OTP sent successfully", null, true, 200));
            } else {
                // Send response: user not found
                return res.status(404).json(new ApiError("User not found", null, false, 404));
            }
        } else {
            // Step 2: Verify OTP and reset password
            const { OTP, password, identifier } = data;

            // Check if OTP and password are provided
            if (!OTP || !password || !identifier) {
                return res.status(400).json(new ApiError("OTP, identifier, and password are required", null, false, 400));
            }

            // Find the OTP in the database
            const otpRecord = await otp.findOne({ email: identifier, OTP });
            if (!otpRecord) {
                return res.status(400).json(new ApiError("Invalid OTP", null, false, 400));
            }

            // Hash the new password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Update the user's password
            await Users.updateOne({ email: identifier }, { password: hashedPassword });

            // Delete the OTP record
            await otp.deleteOne({ identifier, otp: OTP });

            // Send success response
            return res.status(200).json(new ApiResponse("Password reset successfully", null, true, 200));
        }
    } catch (error) {
        console.error("Error in forgetPassword API:", error);
        return res.status(500).json(new ApiError("Internal server error", error.message, false, 500));
    }
};