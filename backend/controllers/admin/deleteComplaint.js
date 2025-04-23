import { ApiError } from "../../utils/apiError.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { Reports } from "../../Models/model.js"
import { Users } from "../../Models/users.model.js";

const deleteComplaint = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(404).json(
                new ApiError("Complaint ID required", false, false, 404)
            )
        }


        const Complaint = await Reports.findOne({ _id: id });

        if (!Complaint) {
            return res.status(404).json(
                new ApiError("Complaint not found", false, false, 404)
            )
        }
        const updateUser = await Users.findOneAndUpdate({ _id: Complaint.userID }, {
            $pull: { Reports: id }
        }, { new: true })

        if (updateUser)
            console.log(await Reports.deleteOne({ _id: id }));

        return res.status(200).json(
            new ApiResponse("Complaint Deleted Successfully", true, true, 200)
        )
    } catch (error) {
        return res.status(500).json(
            new ApiError("Server Failed", error, false, 500)
        )
    }
}
export default deleteComplaint;