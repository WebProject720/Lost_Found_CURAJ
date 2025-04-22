import { useEffect, useState } from "react";
import { AdminPostAPIs } from "../../../APIs/admin/adminAPIs";
import { Loader } from "../../../components/utility/Loader";
import { Button } from "../../../components/utility/Button";
import { Input } from "../../../components/utility/Input";

const ComplaintsList = () => {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const complaints = await AdminPostAPIs('/complaints/list', null);
            complaints?.data ? setComplaints(complaints.data) : setComplaints([]);
            setLoading(false);
        })();
    }, []);

    return (
        <div className="container p-4">
            <div>
                <h1 className="font-black text-2xl pt-6 text-start">
                    Complaints List
                </h1>
            </div>
            <div className="desktop:w-1/4 pt-3 pb-6 tablet:w-full ">
                <Input placeholder="Search" className="bg-transparent active:bg-transparent focus:bg-transparent"></Input>
            </div>
            <div>
                {loading && (
                    <div className="w-full h-48 flex justify-center items-center">
                        <Loader />
                    </div>
                )}
            </div>
            <div className="overflow-x-auto mt-6">
                {complaints.length > 0 ? (
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                        <thead className="bg-blue-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                                    Title
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                                    Username
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                                    Created Date
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                                    Status
                                </th><th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                                    Operations
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {complaints.map((complaint, index) => (
                                <tr
                                    key={index}
                                    className={`${index % 2 === 0
                                        ? "bg-gray-50"
                                        : "bg-white"
                                        } hover:bg-orange-100 transition-all`}
                                >
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        {complaint.title || "N/A"}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        {complaint.userDetails?.username || "N/A"}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        {new Date(complaint.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <span
                                            className={`px-3 py-1 rounded-full text-white text-xs font-medium ${complaint.isOpen === true
                                                ? "bg-green-500"
                                                : "bg-red-500"
                                                }`}
                                        >
                                            {complaint.isOpen ? 'Open' : 'Close'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        <Button className='!bg-red-600'>
                                            <p>Delete</p>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    !loading && (
                        <div className="text-center text-gray-500 mt-6">
                            No complaints found.
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default ComplaintsList;