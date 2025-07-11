import axios from "../utils/AxiosInstance";
import "../styles/hero.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
  const { setCurrentUser } = useAuth();

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {

    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const loadingToast = toast.loading("Logging in....");
    try {
      const res = await axios.post("/login", formData);
      toast.dismiss(loadingToast);
      if (res.data.success) {
        const user = res.data.user;
        setCurrentUser(user);
        toast.success("Logged In");

        const redirectPath = user.isAdmin ? "/admin" : "/dashboard";
        setTimeout(() => navigate(redirectPath), 1000);
    
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      console.error("Login error:", error);
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
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
        <h2 className='text-3xl font-bold text-center text-blue-600 dark:text-white mb-6'>
          Welcome back👋🏻{" "}
        </h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            placeholder='Email'
            required
            className='w-full px-4 py-2 rounded-lg border text-black dark:text-white bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:outline-blue-500'
          />
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            placeholder='Password'
            required
            className='w-full px-4 py-2 rounded-lg border text-black dark:text-white bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:outline-blue-500'
          />
          {error && <p className='text-sm text-red-500'>{error}</p>}
          <button
            type='submit'
            disabled={loading}
            className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50'>
            {loading ? "Logging in...." : "Login"}
          </button>
          <div className='text-right mt-2'>
            <Link
              to='/forgot-password'
              className='text-sm text-blue-600 hover:underline dark:text-blue-400'>
              Forgot password?
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
