
import { ApiError } from "../../utils/apiError.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import bcrypt from 'bcrypt'
import 'dotenv/config'
import { CookieOption } from "../../utils/cookieOptions.js";
import jsonwebtoken from 'jsonwebtoken'
import { Admins } from "../../Models/admin.model.js";

export const AdminLogin = async (req, res) => {
    const production = process.env.PRODUCTION == "true";
    const CookieOptions = CookieOption(production, true);

    try {
        let { identifier, password } = req.body;
        identifier = identifier?.trim();
        password = password?.trim();
        const AdminTokenName = process.env.AdminTokenName || 'Token';
        const cookie = req?.cookies[AdminTokenName];

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

        
        const DBuser = await Admins.findOne(
            {
                $or: [{ email: identifier.toLowerCase() }, { username: identifier }]
            }
        );

        
        if (!DBuser) {
            return res
                .status(404)
                .json(
                    new ApiError('Admin not found')
                )
        }
        const _doc = DBuser._doc;
        let { password: SetPassword, ...user } = _doc;
        if (!user) {
            return res
                .status(404)
                .json(
                    new ApiError('admin not found')
                )
        }

        if (!user.isVerified) {
            return res
                .status(404)
                .json(
                    new ApiError('admin not verified')
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
            .cookie(AdminTokenName, token, CookieOptions)
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
