import { FaHeart, FaRegHeart } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { MdRocketLaunch } from "react-icons/md";
import { motion } from "framer-motion";
import { useState } from "react";
import Modal from "./Modal";
import CommentsSection from "./CommentsSection";

const IdeaCard = ({ idea }) => {
  const [showModal, setshowModal] = useState(false);
  const handleOpen = () => setshowModal(true);
  const handleClose = () => setshowModal(false);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.3 }}
        className='bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 space-y-3 hover:shadow-lg transition-all'>
        <h3 className='text-xl font-semibold text-blue-600 dark:text-white line-clamp-1'>
          {idea.title}
        </h3>

        <p className='text-gray-600 dark:text-gray-300 text-sm line-clamp-3'>
          {idea.description}
        </p>

        <div className='flex items-center gap-3 text-xs font-medium mt-2'>
          <span className='flex items-center gap-1 text-blue-500'>
            <BiCategory /> #{idea.category || "uncategorized"}
          </span>
          <span className='flex items-center gap-1 text-green-500'>
            <MdRocketLaunch />
            {idea.stage}
          </span>
        </div>

        <p className='text-xs text-gray-500 dark:text-gray-400 italic'>
          Posted By: {idea.owner?.fullname || "unknown"}
        </p>

        <div className='flex justify-between items-center mt-3'>
          <button
            className='text-blue-500 hover:text-blue-700 text-sm'
            onClick={handleOpen}>
            Comment
          </button>
        </div>
      </motion.div>

      {showModal && (
        <Modal onClose={handleClose}>
          <h2 className='text-xl font-bold mb-2'>{idea.title}</h2>
          <p className='mb-4 text-sm text-gray-600  dark:text-gray-300'>
            {idea.description}
          </p>
          <CommentsSection ideaId={idea._id} />
        </Modal>
      )}
    </div>
  );
};

export default IdeaCard;
