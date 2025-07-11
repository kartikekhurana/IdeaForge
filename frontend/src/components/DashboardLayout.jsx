import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const navigate = useNavigate();
  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-blue-400 dark:from-gray-900 dark:via-slate-800 dark:text-white transition-colors duration-500'>
      <div className='sticky top-0 z-30 px-6 py-4 shadow-md bg-white/60 dark:bg-black/40 backdrop-blur-md flex items-center justify-between'>
        <h1 className='ml-auto text-2xl font-semibold text-blue-600 dark:text-white hover:text-blue-700'>
          Dashboard
        </h1>
      </div>
      <div className='flex mt-[72px]'>
        <SideBar />
        <div className=' ml-64 p-6 flex-1'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
