import { Admins } from "../../Models/admin.model.js";
import { ApiError } from "../../utils/apiError.js";
import { ApiResponse } from "../../utils/apiResponse.js";

const AdminList = async (req, res) => {
    try {
        const list = await Admins.find().select("-password");

        return res.status(200).json(
            new ApiResponse(
                "Admin List", list, true, 200
            )
        )
    } catch (error) {
        console.log(error);

        return res.status(500).json(
            new ApiError("Server Error ", error, false, 500)
        )
    }
}

export default AdminList;