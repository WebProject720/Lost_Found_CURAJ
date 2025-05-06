import { ApiError } from "../../utils/apiError.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { Users } from '../../Models/users.model.js'
import { Types } from "mongoose";
import bcrypt from "bcrypt"
import { Admins } from "../../Models/model.js"
import { forwordMail } from "../../utils/email.js";

export const ChangePassword = async (req, res) => {
    try {
        const { user } = req;
        const { NewPassword, identifier = false } = req.body;

        if (!NewPassword)
            return res.status(401).json(
                new ApiError('New Password not found', false, false, 401)
            )
        const encodePass = await bcrypt.hash(NewPassword, 10);

        //if admin changing password for users

        if (identifier && user?.isAdmin) {
            const response = await Users.findOneAndUpdate({
                $or: [{ _id: new Types.ObjectId(identifier) }, { email: identifier.toLowerCase() }, { username: identifier }]
            }, { password: encodePass })

            const Mail = {
                body: `
                    Dear ${response.username || 'User'},
                     </br>
                    This is to inform you that your password has been changed by an administrator. 
                    Your new password is: ${NewPassword}
                     </br>
                    Please make sure to log in and change your password immediately for security purposes.
                     </br>
                    If you did not request this change, please contact support immediately.
                    </br>
                    Best regards,
                    Lost & Found CURAJ Team
                `,
                subject: 'Password Changed by Administrator',
                email: response.email
            }

            await forwordMail(Mail);
            return res.status(200).json(
                new ApiResponse("User Password Changed", true, true, 200)
            )
        }
        //if user self change password
        if (!user?.isAdmin)
            await Users.findOneAndUpdate({ _id: user._id }, { password: encodePass })
        //change admin password for itself
        else
            await Admins.findOneAndUpdate({ _id: user._id }, { password: encodePass })

        return res.status(200).json(
            new ApiResponse("Password Changed", true, true, 200)
        )



    } catch (error) {
        console.log(error);

        return res.status(500).json(
            new ApiError('Server Error : Try again', error, false, 500)
        )
    }
}