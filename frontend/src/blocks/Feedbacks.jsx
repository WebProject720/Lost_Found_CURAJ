import { useState, useEffect } from "react";
import { Loader } from "../components/utility/Loader";
import AlertBox from "../components/utility/AlertBox.astro";
import { AdminGetAPIs } from "../APIs/admin/adminAPIs";
import { ReportsGetRequests } from "../APIs/reports/reportsAPI";

export const Feedbacks = () => {
    const [loading, setLoading] = useState(false);
    const [feedbacks, setFeedbacks] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await ReportsGetRequests("/feedback/get");
                if (response.success) {
                    setFeedbacks(response.data);
                } else {
                    setError(response.message || "Failed to fetch feedbacks.");
                }
            } catch (err) {
                console.error("Error fetching feedbacks:", err);
                setError("An error occurred while fetching feedbacks.");
            } finally {
                setLoading(false);
            }
        };

        fetchFeedbacks();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-xl font-bold mb-4 text-center">Feedbacks</h2>
            {loading ? (
                <div className="w-full h-48 flex justify-center items-center">
                    <Loader />
                </div>
            ) : error ? (
                <AlertBox message={error} type="error" />
            ) : feedbacks.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                                    Created At
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                                    Description
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {feedbacks.map((feedback, index) => (
                                <tr
                                    key={index}
                                    className={`${
                                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                    } hover:bg-gray-100 transition-all`}
                                >
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        {feedback.email || "N/A"}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        {new Date(feedback.createdAt).toLocaleString() || "N/A"}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        {feedback.description || "N/A"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="text-center text-gray-500 mt-6">
                    No feedbacks found.
                </div>
            )}
        </div>
    );
};