import { useNavigate, useParams } from "react-router-dom";
import axios from "../utils/AxiosInstance";
import toast from "react-hot-toast";
import { useState } from "react";

const ResetPassword = () => {
  const { token } = useParams();
  const navitate = useNavigate();
  const [password, setPassword] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/reset-password/${token}`, { password });
      if (res.data.success) {
        toast.success("Password reset successfully");
        navitate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Reset Failed");
    }
  };
  return (
    <section className='min-h-screen flex items-center justify-center px-4 bg-gray-100 dark:bg-gray-900'>
      <form
        onSubmit={handleReset}
        className='bg-white dark:bg-gray-800 shadow-lg p-6 rounded w-full max-wmd'>
        <h2 className='text-2xl font-extrabold mb-4 text-center text-gray-800 dark:text-white'>
          🔐 Reset Password
        </h2>
        <label className='block mb-2 text-sm text-gray-600 dark:text-gray-300'>
          New Password
        </label>
        <input
          type='password'
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='w-full px-4 py-2 mb-4 rounded border dark:bg-gray-700 dark:text-white'
        />
        <button
          type='submit'
          className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition'>
          Reset Password
        </button>
      </form>
    </section>
  );
};

export default ResetPassword;
