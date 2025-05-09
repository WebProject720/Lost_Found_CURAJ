import { useEffect, useState } from "react";
import { AdminPostAPIs } from "../APIs/admin/adminAPIs";
import { Loader } from "../components/utility/Loader";
import { Button } from "../components/utility/Button";
import { Input } from "../components/utility/Input";
import { confirmBox, ShowAlert } from "../components/alertLogic";

const ComplaintsList = () => {
    const [complaints, setComplaints] = useState([]);
    const [filteredComplaints, setFilteredComplaints] = useState([]); // State for filtered complaints
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);
    const [searchQuery, setSearchQuery] = useState(""); // State for search input

    useEffect(() => {
        (async () => {
            const complaints = await AdminPostAPIs('/complaints/list', null);
            if (complaints?.data) {
                setComplaints(complaints.data);
                setFilteredComplaints(complaints.data); // Initialize filtered complaints
            } else {
                setComplaints([]);
                setFilteredComplaints([]);
            }
            setLoading(false);
        })();
    }, []);

    // Function to handle search input change
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        // Filter complaints based on the search query
        const filtered = complaints.filter((complaint) =>
            complaint.title?.toLowerCase().includes(query) ||
            complaint.userDetails?.username?.toLowerCase().includes(query)
        );
        setFilteredComplaints(filtered);
    };

    const closeComplaint = async (id) => {
        const confirm = await confirmBox("Are you sure you want to close this complaint? This action cannot be undone.");
        if (!confirm) return;

        setDeleting(id); // Set the loading state for the specific complaint

        try {
            const res = await AdminPostAPIs("/complaints/changestatus", { id });
            if (res?.success) {
                ShowAlert("Complaint closed successfully", true);
                setComplaints((prevComplaints) =>
                    prevComplaints.map((complaint) =>
                        complaint._id === id ? { ...complaint, isOpen: false } : complaint
                    )
                );
                setFilteredComplaints((prevComplaints) =>
                    prevComplaints.map((complaint) =>
                        complaint._id === id ? { ...complaint, isOpen: false } : complaint
                    )
                );
            } else {
                ShowAlert(res.message || "Failed to close the complaint", false);
            }
        } catch (error) {
            console.error("Error closing complaint:", error);
            ShowAlert("An error occurred while closing the complaint", false);
        } finally {
            setDeleting(false); // Reset the loading state
        }
    };

    const deleteComplaint = async (id) => {
        const confirm = await confirmBox("Delete this Complaint ?");
        if (!confirm) return;

        setDeleting(id);
        try {
            const res = await AdminPostAPIs('/complaints/delete', { id });
            if (res.success) {
                ShowAlert("Complaint Deleted", true);
                setComplaints((prev) => prev.filter((c) => c._id !== id));
                setFilteredComplaints((prev) => prev.filter((c) => c._id !== id));
            } else {
                ShowAlert("Failed to delete the complaint", false);
            }
        } catch (error) {
            console.error("Error deleting complaint:", error);
            ShowAlert("An error occurred while deleting the complaint", false);
        } finally {
            setDeleting(false);
        }
    };

    return (
        <div className="container p-4">
            <div>
                <h1 className="font-black text-2xl pt-6 text-start">
                    Complaints List
                </h1>
            </div>
            <div className="desktop:w-1/4 pt-3 pb-6 tablet:w-full">
                <Input
                    placeholder="Search by title or username"
                    value={searchQuery}
                    onChange={handleSearch} // Handle search input change
                    className="bg-transparent active:bg-transparent focus:bg-transparent"
                />
            </div>
            <div>
                {loading && (
                    <div className="w-full h-48 flex justify-center items-center">
                        <Loader />
                    </div>
                )}
            </div>
            <div className="overflow-x-auto mt-6">
                {filteredComplaints.length > 0 ? (
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
                                </th>
                                <th className="px-6 text-center py-3 text-sm font-medium text-gray-600 uppercase tracking-wider">
                                    Operations
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredComplaints.map((complaint, index) => (
                                <tr
                                    key={index}
                                    className={`${index % 2 === 0
                                        ? "bg-gray-50"
                                        : "bg-white"
                                        } hover:bg-orange-100 transition-all`}
                                >
                                    <td className="px-6 py-4 text-sm text-gray-700 truncate">
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
                                    <td className="px-6 py-4 text-sm flex gap-2 text-gray-700">
                                        <Button disabled={deleting === complaint._id} onClick={() => deleteComplaint(complaint._id)} className='!bg-red-600 disabled:!bg-gray-400'>
                                            {deleting === complaint._id ? <Loader /> : <p>Delete</p>}
                                        </Button>
                                        <Button
                                            disabled={deleting === complaint._id}
                                            onClick={() => closeComplaint(complaint._id)}
                                            className={`!bg-blue-600 disabled:!bg-gray-400 ${complaint.isOpen ? "auto" : "hidden"}`}
                                        >
                                            {deleting === complaint._id ? (
                                                <Loader />
                                            ) : (
                                                complaint.isOpen ? "Close" : "Closed"
                                            )}
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