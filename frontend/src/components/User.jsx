import  { useEffect, useState } from 'react';
import { AdminGetAPIs, AdminPostAPIs } from '../APIs/admin/adminAPIs';
import { confirmBox, ShowAlert } from './alertLogic';
import { Loader } from './utility/Loader';
import { Button } from './utility/Button';
import { Input } from './utility/Input';
import { ChangePassword } from './utility/ChangePassword';

const User = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]); // State for filtered users
  const [loading, setLoading] = useState(true);
  const [deletingUserId, setDeletingUserId] = useState(null); // Track the user being deleted
  const [changeActiveStatus, changingActiveStatus] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input

  useEffect(() => {
    (async () => {
      const data = await AdminGetAPIs('/users/list');
      setUsers(data.data);
      setFilteredUsers(data.data); // Initialize filtered users
      setLoading(false);
    })();
  }, []);

  // Function to handle search input change
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter users based on the search query
    const filtered = users.filter((user) =>
      user.username?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query)
    );
    setFilteredUsers(filtered);
  };

  // Function to toggle active/deactive status
  const changeStatus = async (id) => {
    changingActiveStatus(id); // Set the loading state for the specific user

    try {
      const res = await AdminPostAPIs('/users/changeblockstatus', { id });
      if (res.success) {
        ShowAlert(`User ${res.data.isBlocked ? "deactivated" : "activated"} successfully`, true);

        // Update the user's status in the state
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === id ? { ...user, isBlocked: res.data.isBlocked } : user
          )
        );
        setFilteredUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === id ? { ...user, isBlocked: res.data.isBlocked } : user
          )
        );
      } else {
        ShowAlert("Failed to change user status", false);
      }
    } catch (error) {
      console.error("Error changing user status:", error);
      ShowAlert("An error occurred while changing user status", false);
    } finally {
      changingActiveStatus(null); // Reset the loading state
    }
  };

  // Function to delete a user
  const deleteUser = async (id) => {
    const confirmed = await confirmBox('Are you sure you want to delete this user?');
    if (!confirmed) return;

    setDeletingUserId(id); // Set the ID of the user being deleted

    try {
      const res = await AdminPostAPIs('/users/delete', { identifier: id });
      if (res.success) {
        ShowAlert("User deleted successfully", true);
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id)); // Remove the deleted user from the list
        setFilteredUsers((prevUsers) => prevUsers.filter((user) => user._id !== id)); // Update filtered users
      } else {
        ShowAlert("Failed to delete user", false);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      ShowAlert("An error occurred while deleting the user", false);
    } finally {
      setDeletingUserId(null); // Reset the deleting state
    }
  };

  return (
    <div className="container w-screen mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Users List</h2>
      <div className="desktop:w-1/4 pt-3 pb-6 tablet:w-full">
        <Input
          placeholder="Search by username or email"
          value={searchQuery}
          onChange={handleSearch} // Handle search input change
          className="bg-transparent active:bg-transparent focus:bg-transparent"
        />
      </div>
      {loading ? (
        <div className='w-full h-80 flex justify-center items-center'>
          <Loader />
        </div>
      ) : (
        <div className='max-w-full overflow-x-scroll'>
          <table className="w-full table-auto bg-white border border-gray-300 shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-center text-gray-700 text-nowrap">User Name</th>
                <th className="px-6 py-3 text-center text-gray-700">Email</th>
                <th className="px-6 py-3 text-center text-gray-700 text-nowrap">Account Created Date</th>
                <th className="px-6 py-3 text-center text-gray-700">Verified</th>
                <th className="px-6 py-3 text-center text-gray-700 ">Complaints</th>
                <th className="px-6 py-3 text-center text-gray-700 text-nowrap min-w-72">Change Password</th>
                <th className="px-6 py-3 text-center text-gray-700">Block User</th>
                <th className="px-6 py-3 text-center text-gray-700">Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers?.length > 0 ? (
                filteredUsers.map(user => (
                  <tr key={user._id} className="border-t text-center hover:bg-orange-100 ">
                    <td className="px-4 py-3 text-center">{user.username}</td>
                    <td className="px-4 py-3 text-center">{user.email}</td>
                    <td className="px-4 py-3 text-center text-nowrap">{new Date(user.createdAt).toLocaleString()}</td>
                    <td className={`px-4 py-3 text-center`}>
                      <span className={`p-2 rounded-full text-xs ${user.isVerified ? 'bg-green-300' : 'bg-red-300'}`}>
                        {user.isVerified ? 'Verified' : 'Not Verify'}
                      </span>
                    </td>
                    <td className="px-4 py-3  text-center">{user.Reports.length || 0}</td>
                    <td className="px-4 py-3 text-center min-w-72">
                      <ChangePassword isAdmin={true} identifier={user._id} isList={true} />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Button
                        disabled={changeActiveStatus === user._id}
                        onClick={() => changeStatus(user._id)}
                        className={`!bg-blue-600 ${changeActiveStatus === user._id ? 'disabled:!bg-gray-400' : ''}`}
                      >
                        {changeActiveStatus === user._id ? (
                          <Loader />
                        ) : user.isBlocked ? (
                          <p>Activate</p>
                        ) : (
                          <p>Deactivate</p>
                        )}
                      </Button>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Button
                        disabled={deletingUserId === user._id}
                        onClick={() => deleteUser(user._id)}
                        className={`!bg-red-600 ${deletingUserId === user._id ? 'disabled:!bg-gray-400' : ''}`}
                      >
                        {deletingUserId === user._id ? <Loader /> : <p>Delete</p>}
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className='text-center'>
                  <td className="px-6 py-3 text-center text-gray-500" colSpan="8">
                    No users found.
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

export default User;