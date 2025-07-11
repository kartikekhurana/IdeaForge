import { NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  PlusCircle,
  Sparkles,
  User,
  LogOut,
  FileText,
  ChevronLeft,
  ChevronRight,
  Icon,
} from "lucide-react";
import { motion, time } from "framer-motion";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { toast } from "react-hot-toast";

const navitems = [
  { label: "Home", path: "/dashboard", icon: Home },
  { label: "Create Idea", path: "/dashboard/create", icon: PlusCircle },
  { label: "My Ideas", path: "/dashboard/my-ideas", icon: FileText },
  { label: "AI Spark", path: "/dashboard/ai", icon: Sparkles },
  { label: "Profile", path: "/dashboard/profile", icon: User },
];

const SideBar = () => {
  const { setCurrentUser } = useAuth();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handlelogout = () => {
    document.cookie =
      "accessToken=; expires=Thu,07 July 2004 00:00:00 UTC; path=/;";
    setCurrentUser(null);
    toast.success("Logget Out Successfully");
    navigate("/");
  };

  return (
    <motion.div
      animate={{ width: isCollapsed ? "5rem" : "16rem" }}
      className={`h-screen fixed top-0 left-0 z-50 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 shadow-lg flex flex-col justify-between transition-all duration-300 `}>
      <div>
        <div className='flex items-center justify-between px-4 py-4'>
          {!isCollapsed && (
            <div className='flex items-center gap-4'>
              <img src={logo} alt='logo' className='w-8 h-8' />
              <h2 className='text-lg font-bold text-gray-800 dark:text-white'>
                IdeaForge
              </h2>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className='text-gray-600 dark:text-white'>
            {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </button>
        </div>
        <nav className='mt-4 flex flex-col gap-2 px-2'>
          {navitems.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={label}
              to={path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`
              }
              title={isCollapsed ? label : ""}>
              <Icon className='w-5 h-5' />
              {!isCollapsed && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className='px-2 pb-6'>
        <button
          onClick={handlelogout}
          className='w-full flex items-center gap-3 px-4 py-2 rounded-lg bg-red-100 text-red-500 dark:bg-red-900 dark:text-red-300  hover:bg-red-200 dark:hover:bg-red-800 transition-all font-medium text-sm'
          title={isCollapsed ? "Logout" : ""}>
          {" "}
          <LogOut className='w-5 h-5' /> {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </motion.div>
  );
};

export default SideBar;
