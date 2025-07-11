import { motion } from "framer-motion";

const AdminBackground = () => {
  return (
    <div className='fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]'>
      {/* Moving blurred blobs */}
      <motion.div
        className='absolute w-[500px] h-[500px] bg-purple-600 rounded-full blur-3xl opacity-30 top-1/3 left-[-10%]'
        animate={{ x: ["0%", "20%", "0%"], y: ["0%", "-10%", "0%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className='absolute w-[600px] h-[600px] bg-blue-500 rounded-full blur-2xl opacity-20 bottom-[-10%] right-[-10%]'
        animate={{ x: ["0%", "-10%", "0%"], y: ["0%", "10%", "0%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Central glowing pulse */}
      <motion.div
        className='absolute top-1/2 left-1/2 w-[200px] h-[200px] bg-white rounded-full blur-3xl opacity-10 -translate-x-1/2 -translate-y-1/2'
        animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      {/* Wavy motion background lines or grid */}
      <div className='absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:30px_30px] opacity-[0.05]' />

      {/* Optional animated icon or overlay */}
      <motion.img
        src='/preview/admin-orbit.svg'
        alt='floating orbit'
        className='absolute w-[600px] top-1/4 left-1/4 opacity-5'
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default AdminBackground;