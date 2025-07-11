import { GiLightBulb } from "react-icons/gi";
import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext.jsx";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const { darkmode, setDarkMode } = useTheme();
  return (
    <nav className='px-7 py-3 bg-transparent bg-white dark:bg-gray-900  dark:text-gray-900 transition-colors duration-300 fixed top-0 left-0 w-full z-50  shadow-md'>
      <div className='max-w-7xl mx-auto flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <span
            className='text-2xl font-bold text-blue-500 cursor-pointer'
            onClick={() => navigate("/")}>
            IdeaForge
          </span>
          <GiLightBulb className='text-blue-500 text-2xl' />
        </div>
        <div className='flex gap-12 text-gray-700 dark:text-gray-200 text-sm font-medium'>
          <Link
            to='/'
            className='hover:text-blue-500 dark:hover:text-blue-300 transition'>
            Home
          </Link>
          <Link
            to='/about'
            className='hover:text-blue-500 dark:hover:text-blue-300 transition'>
            About
          </Link>
          <Link
            to='/ai'
            className='hover:text-blue-500 dark:hover:text-blue-300 transition'>
            AI
          </Link>
          <Link
            to='/login'
            className='hover:text-blue-500 dark:hover:text-blue-300 transition'>
            Login
          </Link>
          <Link
            to='/signup'
            className='hover:text-blue-500 dark:hover:text-blue-300 transition'>
            SignUp
          </Link>
        </div>
        <button
          onClick={() => setDarkMode(!darkmode)}
          className='text-xl p-2 hover:scale-110 transition'>
          {darkmode ? (
            <FiSun className='text-yellow-300' />
          ) : (
            <FiMoon className='text-blue-500' />
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
