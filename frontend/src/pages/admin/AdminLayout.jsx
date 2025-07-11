import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminBackground from "./AdminBackground";
const AdminLayout = () => {
  return (
    <div className='flex min-h-screen bg-gradient-to-br from-white via-blue-100 to-blue-300 text-gray-800 dark:text-white'>
      <AdminSidebar />
      <AdminBackground />
      <div className='flex-1'>
        <div className='p-4 bg-blue-900 text-white flex  items-center justify-end'>
          <h1 className='text-right text-2xl font-extrabold dark:text-white'>
            Admin panel
          </h1>
        </div>
        <div className='flex-1 p-6 ml-[250px] mt-[64px]'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
