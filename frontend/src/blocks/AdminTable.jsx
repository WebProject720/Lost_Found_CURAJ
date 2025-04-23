import { useState, useEffect } from "react";
import { Loader } from "../components/utility/Loader";
import { AdminGetAPIs } from "../APIs/admin/adminAPIs";

export const AdminTable = () => {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const response = await AdminGetAPIs("/list");
                if (response.success) {
                    setAdmins(response.data);
                } else {
                    console.error("Failed to fetch admin list");
                }
            } catch (error) {
                console.error("Error fetching admin list:", error);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <div className="container mx-auto p-4">
            {loading ? (
                <div className="w-full h-48 flex justify-center items-center">
                    <Loader />
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                        <thead className="bg-gray-100">
                            <tr className="bg-gray-300 ">
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                                    Username
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                                    Date to Join
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {admins.length > 0 ? (
                                admins.map((admin, index) => (
                                    <tr
                                        key={index}
                                        className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                            } hover:bg-orange-200 transition-all`}
                                    >
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {admin.username || "N/A"}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {admin.email || "N/A"}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {new Date(admin.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="3"
                                        className="px-6 py-4 text-center text-gray-500"
                                    >
                                        No admins found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};
