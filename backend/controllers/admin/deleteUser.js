import mongoose, { Types } from "mongoose";
import { Reports, Users } from "../../Models/model.js"
import { ApiError } from "../../utils/apiError.js";
import { ApiResponse } from "../../utils/apiResponse.js";


const deleteUser = async (req, res) => {
    try {
        const { identifier } = req.body;

        if (!identifier)
            return res.status(401).json(
                new ApiError("User identifier required", false, false, 401)
            )

        const user = await Users.findOne(
            {
                $or: [{ _id: identifier.length == 24 ? new mongoose.Types.ObjectId(identifier) : null }, { username: identifier }, { email: identifier }]
            }
        )
        if (!user)
            return res.status(401).json(
                new ApiError("User not found", false, false, 404)
            )


        //delete complaint from complaint table
        const updateComplaint = await Reports.deleteMany({
            _id: { $in: user.Reports }
        });

        if (!updateComplaint)
            return res.status(401).json(
                new ApiError('Complaints Not updated', false, false, 401))

        if (updateComplaint) {
            const deleteUser = await Users.deleteOne({ _id: user._id });
            if (!deleteUser)
                return res.status(401).json(
                    new ApiError("User not deleted ", deleteUser, false, 401)
                )
        }


        return res.status(200).json(
            new ApiResponse('User deleted', deleteUser, true, 200)
        )

    } catch (error) {
        console.log(error);
        return res.status(500).json(
            new ApiError('Server failed', error, false, false)
        )
    }
}
export default deleteUser;