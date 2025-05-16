import { ApiError } from "../../utils/apiError.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import 'dotenv/config';
import { CookieOption } from "../../utils/cookieOptions.js";
import jsonwebtoken from "jsonwebtoken";

export const logoutAdmin = async (req, res) => {
    try {
        const { _id } = req.user || {};
        const production = process.env.PRODUCTION == "true";
        const CookieOptions = CookieOption(production, true);
        const TokenName = process.env.AdminTokenName || 'AdminToken';
        const cookie = req?.cookies[TokenName];

        // Check if the cookie exists
        if (!cookie) {
            return res.status(400).json(
                new ApiError('Token not provided',null, false, 400)
            );
        }

        if (!_id) {
            return res.status(400).json(
                new ApiError('Session not found', null, false, 400)
            );
        }

        const user = jsonwebtoken.verify(cookie, process.env.JWT_SECRET_KEY);
        if (user._id != _id) {
            return res.status(400).json(
                new ApiError('User session ID not matched!', null, false, 400)
            );
        }

        return res
            .status(200)
            .clearCookie(TokenName, CookieOptions)
            .json(
                new ApiResponse('Admin logout', null, true, 200)
            );

    } catch (error) {
        console.error(error);

        if (error.name === "JsonWebTokenError") {
            return res.status(401).json(
                new ApiError('Invalid token', error.message, false, 401)
            );
        }

        return res.status(500).json(
            new ApiError('Server Error', error.message, false, 500)
        );
    }
};