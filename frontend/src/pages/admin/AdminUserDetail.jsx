import { motion } from "framer-motion";
import axios from "../../utils/AxiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const AdminUserDetail = () => {
  const { id } = useParams();
  const [user, setUsers] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetcHUser = async () => {
    try {
      const res = await axios.get(`/admin/users/${id}`);
      setUsers(res.data.user);
    } catch (error) {
      toast.error("Failed to fetch user details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetcHUser();
  }, [id]);

  if (loading) {
    return (
      <p className='min-h-screen flex items-center justify-center'>
        Loading user details...
      </p>
    );
  }
  if (!user) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <p>User not found</p>
      </div>
    );
  }
  return (
    <div className='min-h-screen bg-gradient-to-br from-white to-blue-600 dark:from-gray-900 dark:to-dray-800 p-6 flex items-center justify-center'>
      <div className='bg-white dark:bg-gray-900 rounded-xl shadow-xl max-w-xl w-full p-8 space-y-6'>
        <h1 className='text-3xl font-bold text-center text-blue-700 dark:text-white'>
          👤 User Detail
        </h1>
        <div className='space-y-4'>
          <div>
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              Full Name
            </p>
            <h2 className='text-xl font-semibold text-gray-800 dark:text-white'>
              {user.fullname}
            </h2>
          </div>
          <div>
            <p className='text-sm text-gray-500 dark:text-gray-400'>Email</p>
            <p className='text-md text-gray-700 dark:text-gray-300'>
              {user.email}
            </p>
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <p className='text-sm text-gray-500 dark:text-gray-400'>Role:</p>
          <span
            className={`text-sm font-semibold px-2 py-1 rounded ${
              user.isAdmin
                ? "bg-yellow-200 text-yellow-700"
                : "bg-blue-200 text-blue-700"
            } `}>
            {user.isAdmin ? "Admin" : "User"}
          </span>
        </div>
        <div>
          <p className='text-sm text-gray-500 dark:text-gray-400'>Joined On</p>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            {new Date(user.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminUserDetail;
