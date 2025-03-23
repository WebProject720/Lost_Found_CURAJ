import { ApiError } from "../../utils/apiError.js"
import { ApiResponse } from "../../utils/apiResponse.js"
import { Reports } from "../../Models/model.js"
import { Types } from "mongoose";
//get All complaint which are open
export const getOne = async (req, res) => {
    try {
        const { id } = req.body;
        const reports = await Reports.aggregate([
            {
                $match: {
                    _id: id.length==24?new Types.ObjectId(id):null
                }
            },
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
                }
            },
            { $sort: { createdAt: -1 } }
        ]);

        return res.status(200).json(
            new ApiResponse('All reports', reports.length>0?reports[0]:false, true, 200)
        )
    } catch (error) {
        console.log(error);

        return res.status(500).json(
            new ApiError("Server failed ", error, false, 500)
        )
    }
} 