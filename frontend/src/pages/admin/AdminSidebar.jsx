import {
  FaBars,
  FaTimes,
  FaUserShield,
  FaUser,
  FaLightbulb,
  FaSignOutAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const adminLinks = [
  { path: "/", label: "Dashboard", icons: <FaUserShield /> },
  { path: "/admin/users", label: "Users", icons: <FaUser /> },
  { path: "/admin/ideas", label: "Ideas", icons: <FaLightbulb /> },
];

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setCollapsed((prev) => !prev);

  return (
    <motion.aside
      initial={{ width: 250 }}
      animate={{ width: collapsed ? 70 : 250 }}
      transition={{ duration: 0.3 }}
      className='bg-gray-900 text-white h-screen fixed top-0 left-0 shadow-lg z-50'>
      <div className='flex items-center justify-between px-4 py-4 border-b border-gray-600'>
        {!collapsed && <h1 className='text-xl font-bold'>Admin</h1>}
        <button
          className='text-white text-2xl focus:outline-none'
          onClick={toggleSidebar}>
          {collapsed ? <FaBars /> : <FaTimes />}
        </button>
      </div>
      <nav className='mt-4 space-y-2'>
        {adminLinks.map((link) => (
          <Link
            to={link.path}
            key={link.path}
            className={`flex items-center gap-3 px-4 py-3 transition-colors hover:bg-gray-700 ${
              location.pathname === link.path ? "bg-gray-800" : ""
            }`}>
            {" "}
            <span className='text-xl'>{link.icons}</span>
            {!collapsed && <span>{link.label}</span>}
          </Link>
        ))}
        <button
          className='flex items-center gap-3 px-4 py-3 w-full hover:bg-gray-700 text-left'
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}>
          <FaSignOutAlt className='text-xl' />
          {!collapsed && <span>Logout</span>}
        </button>
      </nav>
    </motion.aside>
  );
};

export default AdminSidebar;
