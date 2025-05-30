import { ApiError } from "../../utils/apiError.js"
import { ApiResponse } from "../../utils/apiResponse.js"
import { Reports } from "../../Models/model.js"
//get All complaint which are open
export const ComplaintList = async (req, res) => {
    try {
        // const {from,to}=req.body;

        const reports = await Reports.aggregate([
            {
                $lookup: {
                    from: "Users",
                    localField: "userID",
                    foreignField: "_id",
                    as: "userDetails",
                    pipeline: [
                        {
                            $project: {
                                email: 1,
                                username: 1,
                                _id: 1
                            }
                        }
                    ]
                }
            },
            {
                $unwind: "$userDetails"
            },
            {
                $project: {
                    userID: 0,
                    imgDetails:0
                }
            },
            { $sort: { createdAt: -1 } },
            // { $limit: 50 }
        ]);


        return res.status(200).json(
            new ApiResponse('All reports', reports, true, 200)
        )
    } catch (error) {
        console.log(error);
        return res.status(500).json(
            new ApiError("Internal Server Error: The server encountered an unexpected condition.", error, false, 500)
        )
    }
}