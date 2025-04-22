import { ApiError } from "../../utils/apiError.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import 'dotenv/config';
import { CookieOption } from "../../utils/cookieOptions.js";
import jsonwebtoken from "jsonwebtoken";

export const logout = async (req, res) => {
    try {
        const { _id } = req.body || {};
        const production = process.env.PRODUCTION == "true";
        const CookieOptions = CookieOption(production, true);
        const TokenName = process.env.TokenName || 'Token';
        const cookie = req?.cookies[TokenName];

        // Check if _id or cookie is missing
        if (!_id || !cookie) {
            return res.status(400).json(
                new ApiError('Session not found or token not provided', null, false, 400)
            );
        }

        // Verify the token
        let user;
        try {
            user = jsonwebtoken.verify(cookie, process.env.JWT_SECRET_KEY);
        } catch (err) {
            return res.status(401).json(
                new ApiError('Invalid or expired token', err.message, false, 401)
            );
        }

        // Check if the user ID matches
        if (user._id != _id) {
            return res.status(400).json(
                new ApiError('User session ID not matched!', null, false, 400)
            );
        }

        // Clear the cookie and return success response
        return res
            .status(200)
            .clearCookie(TokenName, CookieOptions)
            .json(
                new ApiResponse('User logout successful', null, true, 200)
            );

    } catch (error) {
        console.error(error);

        return res.status(500).json(
            new ApiError('Server Error', error.message, false, 500)
        );
    }
};