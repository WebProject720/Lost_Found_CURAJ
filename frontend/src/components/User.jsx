import React, { useEffect, useState } from 'react';
import { AdminGetAPIs, AdminPostAPIs } from '../APIs/admin/adminAPIs';

const User = () => {


  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await AdminGetAPIs('/users/list');
      console.log(data.data);

      setUsers(data.data);
    })();
  }, [])


  const deleteUser = (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this user?');
    if (confirmed) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  return (
    <div className="container w-screen mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">User List</h2>

      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search users..."
          className="px-4 py-2 border border-gray-300 rounded-md w-1/3"
        />

      </div>
      <div className='max-w-full overflow-x-scroll'>

        <table className="w-full table-auto bg-white border border-gray-300 shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-gray-700">User Name</th>
              <th className="px-6 py-3 text-left text-gray-700">Email</th>
              <th className="px-6 py-3 text-left text-gray-700">Account Created Date</th>
              <th className="px-6 py-3 text-left text-gray-700">No. of Complaints</th>
              <th className="px-6 py-3 text-left text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody >
            {users.length > 0 ? (
              users.map(user => (
                <tr key={user._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">{user.username}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">{new Date(user.createdAt).toLocaleString()}</td>
                  <td className="px-4 py-3 text-center">{user.Reports.length || 0}</td>
                  <td className="px-4 py-3">
                    <button
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-6 py-3 text-center text-gray-500" colSpan="4">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default User;
