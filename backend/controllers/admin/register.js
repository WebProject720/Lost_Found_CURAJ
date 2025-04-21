import { Admins } from "../../Models/admin.model.js";
import { ApiError } from "../../utils/apiError.js";
import { ApiResponse } from "../../utils/apiResponse.js";


import bcrypt from 'bcrypt';
import 'dotenv/config'


export const AdminRegister = async (req, res) => {
    try {
        let { enrollment, username, password } = req.body;

        let enroll = enrollment?.trim();
        username = username?.trim();
        password = password?.trim();


        if (!(enroll && username && password)) {
            return res
                .status(404)
                .json(new ApiError('All fields Required'));
        }
        enroll = enroll.toLowerCase() + '@curaj.ac.in';

        const existUser = await Admins.findOne(
            {
                $or: [{ email: enroll }, { username: username }]
            }
        );
        if (existUser && !existUser?.isVerified) {
            await Admins.deleteOne({ _id: existUser?._id });
        }

        if (existUser && existUser?.isVerified) {
            return res
                .status(404)
                .json(new ApiError('Admin already exits !!'))
        }
        const encodePass = await bcrypt.hash(password, 10);
        const newUser = await Admins({
            username,
            email: enroll.toLowerCase(),
            password: encodePass,
            isVerified: true//no need to verify admin
        })

        // const EmailResponse = await sendMail(enroll);
        // if (!EmailResponse.status) {
        //     return res
        //         .status(404)
        //         .json(new ApiError('Email not Send !! Try Again'));
        // }
        const response = await newUser.save();


        return res
            .status(200)
            .json(new ApiResponse('Admin Registered successfully', response))
    } catch (error) {
        console.log(error);

        return res
            .status(500)
            .json(
                new ApiError('Server Error', error)
            )
    }
}