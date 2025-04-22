import React, { useEffect, useState } from 'react';
import { AdminGetAPIs } from '../APIs/admin/adminAPIs';
import { confirmBox } from './alertLogic';
import { Loader } from './utility/Loader';
import { Button } from './utility/Button';
import { Input } from './utility/Input';

const User = () => {


  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await AdminGetAPIs('/users/list');
      setUsers(data.data);
      setLoading(false);
    })();
  }, [])


  //delete user on click
  const deleteUser = (id) => {
    const confirmed = confirmBox('Are you sure you want to delete this user?');
    // if (confirmed) {
    //   setUsers(users.filter(user => user.id !== id));
    // }
  };


  return (
    <div className="container w-screen mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Users List</h2>
      <div className="desktop:w-1/4 pt-3 pb-6 tablet:w-full ">
        <Input placeholder="Search" className="bg-transparent active:bg-transparent focus:bg-transparent"></Input>
      </div>
      {loading ?
        <div className='w-full h-80 flex justify-center items-center'>
          <Loader></Loader>
        </div>
        :
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
                      <Button className='!bg-red-600'>
                        <p>Delete</p>
                      </Button>
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
      }

    </div>
  );
};

export default User;
