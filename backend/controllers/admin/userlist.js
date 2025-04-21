import { Users } from "../../Models/users.model.js";
import { ApiError } from "../../utils/apiError.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import 'dotenv/config'


export const UserList = async (req, res) => {
    try {
        const users = await Users.find().select("-password");

        return res.status(200).json(
            new ApiResponse('User List', users, true, 200)
        )

    } catch (error) {
        return res.status(500).json(
            new ApiError('Server Error', error, false, 500)
        )
    }
}