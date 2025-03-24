import { ApiError } from "../../utils/apiError.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { Reports, User } from "../../Models/model.js";

export const Add = async (req, res) => {
    try {
        const { uploadedImage } = req;
        const { title, description } = req.body;


        if (!req.user || !req.user._id) {
            return res.status(401).json(new ApiError("Unauthorized user access", null, false, 401));
        }

        if (!title || !description) {
            return res.status(400).json(new ApiError("Title and Description required", null, false, 400));
        }

        let newReport;
        if (uploadedImage?.hasImage && uploadedImage.success) {
            newReport = new Reports({
                userID: req.user._id,
                title,
                description,
                images: [uploadedImage.data.url],
                imgDetails: uploadedImage.data,
            });
        } else {
            newReport = new Reports({
                userID: req.user._id,
                title,
                description,
            });
        }

        const report = await newReport.save();
        if (!report) {
            return res.status(405).json(new ApiError("Complaint not Registered"));
        }

        const updatedUser = await User.findOneAndUpdate(
            { _id: req.user._id },
            { $push: { Reports: report } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json(new ApiError("User not found"));
        }

        return res.json(new ApiResponse("Report Added Successfully", report));

    } catch (error) {
        return res.status(500).json(new ApiError("Internal Server Error", error));
    }
};
