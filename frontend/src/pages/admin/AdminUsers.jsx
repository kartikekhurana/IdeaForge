import React, { useEffect, useState } from "react";
import axios from "../../utils/AxiosInstance";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/admin/users");

      setUsers(res.data.users || []);
    } catch (error) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };
  const handleDeletec = async (id) => {
    if (!confirm("Are you sure u want to delete the users")) return;
    try {
      const res = await axios.delete(`/admin/users/${id}`);
      toast.success("User deleted successfully");
      fetchUsers();
    } catch (error) {
      toast.error("something went wrong while deleting user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className='p-6 min-h-screen bg-gradient-to-br from-white to-blue-600 dark:from-gray-900 dark:to-gray-800'>
      <h1 className='text-3xl font-bold text-center mb-6 text-blue-700 dark:text-white'>
        👤Admin Users Panel
      </h1>
      {loading ? (
        <p className='text-center text-gray-600 dark:text-gray-300'>
          Loading Users....
        </p>
      ) : users.length === 0 ? (
        <p className='text-center text-gray-500 dark:text-gray-400'>
          No Users found
        </p>
      ) : (
        <div className='grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 '>
          {users.map((user, index) => (
            <motion.div
              key={user._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className='bg-white dark:bg-gray-900 p-4 rounded-lg shadow hover:shadow-lg relative'>
              <h2 className='font-semibold text-blue-700 dark:text-blue-300 mb-1'>
                {user.fullname}
              </h2>
              <p className='text-sm text-gray-600 dark:text-gray-400'>
                {user.email}
              </p>
              <p className='text-xs text-gray-500 dark:text-gray-500'>
                Username : {user.username}
              </p>
              {user.isAdmin && (
                <span className='absolute top-2 right-2 text-xs bg-yellow-300 text-yellow-900 px-2 py-0.5 rounded'>
                  Admin
                </span>
              )}
              <div className='flex justify-end gap-2 mt-4'>
                <button onClick={() => navigate(`/admin/users/${user._id}`)}>
                  🔎
                </button>
                <button
                  onClick={() => handleDeletec(user._id)}
                  className='text-red-500 hover:scale-110'>
                  🗑️
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
