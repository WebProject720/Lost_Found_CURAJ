import { ApiError } from "../../utils/apiError.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { Users } from '../../Models/users.model.js'
import { Types } from "mongoose";
import bcrypt from "bcrypt"
import { Admins } from "../../Models/model.js"

export const ChangePassword = async (req, res) => {
    try {
        const { user } = req;
        const { NewPassword, identifier=false } = req.body;

        if (!NewPassword)
            return res.status(401).json(
                new ApiError('New Password not found', false, false, 401)
            )
        const encodePass = await bcrypt.hash(NewPassword, 10);

        //if admin changing password
        if (identifier && user?.isAdmin) {
            await Users.findOneAndUpdate({
                $or: [{ _id: Types.ObjectId(identifier) }, { email: identifier.toLowerCase() }, { username: identifier }]
            }, { password: encodePass })

            return res.status(200).json(
                new ApiResponse("Password Changed", true, true, 200)
            )
        }
        //if user self change password
        if (!user?.isAdmin)
            await Users.findOneAndUpdate({ _id: user._id }, { password: encodePass })
        //change admin password
        else
            await Admins.findOneAndUpdate({ _id: user._id }, { password: encodePass })

        return res.status(200).json(
            new ApiResponse("Password Changed", true, true, 200)
        )

        

    } catch (error) {
        return res.status(500).josn(
            new ApiError('Server Error : Try again', error, false, 500)
        )
    }
}