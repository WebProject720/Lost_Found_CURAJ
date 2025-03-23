
import { ApiError } from "../../utils/apiError.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { Users } from '../../Models/users.model.js'
import bcrypt from 'bcrypt'
import 'dotenv/config'
import { CookieOption } from "../../utils/cookieOptions.js";
import jsonwebtoken from 'jsonwebtoken'

export const login = async (req, res) => {
    const production = process.env.PRODUCTION == "true";
    const CookieOptions = CookieOption(production, true);

    try {
        let { identifier, password } = req.body;
        identifier = identifier?.trim();
        password = password?.trim();
        const TokenName = process.env.TokenName || 'Token';
        const cookie = req?.cookies[TokenName];

        if (cookie) {
            return res.status(404).json(
                new ApiError('Session already running')
            )
        }

        if (!(identifier && password)) {
            return res
                .status(404)
                .json(
                    new ApiError('All fileds required')
                )
        }

        const { _doc } = await Users.findOne(
            {
                $or: [{ email: identifier.toLowerCase() }, { username: identifier }]
            }
        );
        let { password: SetPassword, ...user } = _doc;
        if (!user) {
            return res
                .status(404)
                .json(
                    new ApiError('user not found')
                )
        }

        if (!user.isVerified) {
            return res
                .status(404)
                .json(
                    new ApiError('User not verified')
                )
        }
        const compare = await bcrypt.compare(password, SetPassword);
        if (!compare) {
            return res
                .status(404)
                .json(
                    new ApiError('Invalid password')
                )
        }
        const token = jsonwebtoken.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' });
        return res
            .cookie(TokenName, token, CookieOptions)
            .json(
                new ApiResponse('login successfully', { token, user: user })
            )
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json(
                new ApiError('Server Error', { error }, false, 500)
            )
    }

}
