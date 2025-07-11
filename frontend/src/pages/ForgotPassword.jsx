import { useState } from "react";
import axios from "../utils/AxiosInstance";
import toast from "react-hot-toast";
import "../styles/hero.css";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/forgot-password", { email });
      if (res.data.success) {
        toast.success("Reset password email sent");
      }
    } catch (error) {
      console.error("forgot pass error : ", error);
      toast.error(
        error.response?.data?.message || "Failed to sent reset email"
      );
    }
  };
  return (
    <section className='relative z-0 hero-section min-h-screen flex items-center justify-center px-6 text-gray-700 dark:text-white'>
      <div className='absolute inset-0 overflow-hidden pointer-events-none -z-10'>
        <div className='blob blob1'></div>
        <div className='blob blob2'></div>
        <svg
          className='absolute bottom-0 left-0 w-full'
          viewBox='0 0 1440 320'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            fill='#3b82f6'
            fillOpacity='0.1'
            d='M0,192L60,192C120,192,240,192,360,186.7C480,181,600,171,720,160C840,149,960,139,1080,149.3C1200,160,1320,192,1380,208L1440,224V320H1380C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320H0Z'></path>
        </svg>
      </div>

      <div className='relative z-20 w-full max-w-md bg-white dark:bg-gray-900 shadow-xl rounded-xl p-8'>
        <h2 className='text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white'>
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit}>
          <label className='block mb-2 text-sm text-gray-700 dark:text-gray-300'>
            Enter your email
          </label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full px-4 py-2 mb-4 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600'
            required
          />
          <button
            type='submit'
            className='w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition'>
            Send Reset Link
          </button>
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
