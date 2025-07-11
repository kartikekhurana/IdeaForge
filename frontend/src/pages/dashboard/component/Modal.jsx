import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";

const Modal = ({ onClose, children }) => {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center  bg-black/50 backdrop-blur-sm'>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 10 }}
        transition={{ duration: 0.3 }}
        className='bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-2xl relative'>
        <button
          onClick={onClose}
          className='absolute top-3 right-3 text-gray-400 hover:text-red-400 text-2xl'>
          <IoClose />
        </button>
        <div className='mt-4'>{children}</div>
      </motion.div>
    </div>
  );
};

export default Modal;
