import { ApiError } from "../../utils/apiError.js"
import { ApiResponse } from "../../utils/apiResponse.js"
import { Reports, User } from "../../Models/model.js"

export const stats = async (req, res) => {
    try {
        const usersCount = await User.countDocuments();
        const stats = await Reports.aggregate(
            [
                {
                    $facet: {
                        total: [{ $group: { _id: null, count: { $sum: 1 } } }],
                        counts: [{ $group: { _id: "$isOpen", count: { $sum: 1 } } }],
                        todays: [{
                            $match: {
                                createdAt: {
                                    $gte: new Date(new Date().setHours(0, 0, 0, 0)),
                                    $lte: new Date(new Date().setHours(23, 59, 59, 999))
                                }
                            },
                        }, { $count: "todays" }]
                    }
                }
            ]
        )

        const reponse = await stats[0];
        const data = {
            totalComplains: reponse?.total[0]?.count || 0,
            openedComplains: 0,
            closedComplains: 0,
            todaysComplains: reponse?.todays?.length > 0 ? reponse.todays[0].todays || 0 : 0,
            usersCount
        }
        reponse.counts.forEach(element => {
            if (element._id === true) {
                data.openedComplains = element?.count || 0;
            } else {
                data.closedComplains = element?.count || 0;
            }
        });

        return res.status(200).json(
            new ApiResponse('All reports', data, true, 200)
        )
    } catch (error) {
        console.log(error);
        return res.status(500).json(
            new ApiError("Server failed ", error, false, 500)
        )
    }
}