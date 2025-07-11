import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "../../utils/AxiosInstance";
import { motion } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";
const Profile = () => {
  const { currentUser } = useAuth();
  const [ideaCount, setIdeaCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [userIdeas, setUserIdeas] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const statsRes = await axios.get(`/users/stats/${currentUser._id}`);
        setIdeaCount(statsRes.data.ideas || 0);
        setCommentCount(statsRes.data.comments || 0);

        const ideasRes = await axios.get(`/ideas`);
        const filtered = (ideasRes.data.ideas || []).filter(
          (idea) => idea.owner?._id === currentUser._id
        );
        setUserIdeas(filtered);
      } catch (error) {
        console.error("Failed to fetch profile users", error);
      }
    };

    if (currentUser?._id) {
      fetchStats();
    }
  }, [currentUser]);

  if (!currentUser) {
    <div className='text-center mt-20 text-gray-500 dark:text-gray-300'>
      Loading Profile...
    </div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className='max-w-3xl mx-auto px-6 py-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-gray-800 dark:text-white'>
      <div className='flex items-center justify-center mb-6'>
        <FaUserCircle className='text-6xl text-blue-500 dark:text-gray-300' />
      </div>
      <h2 className='text-2xl font-bold text-center mb-2'>
        {currentUser.fullname}
      </h2>
      <p className='text-center text-gray-500 dark:text-gray-600 mb-4'>
        {currentUser.email}
      </p>
      <div className='grid grid-cols-2 gap-4 text-center'>
        <div className='bg-blue-200 dark:bg-blue-900 p-4 rounded '>
          <p className='text-lg font-semibold'>{ideaCount}</p>
          <p className='text-sm text-gray-900 dark:text-gray-300'>
            Ideas Created
          </p>
        </div>
        <div className='bg-purple-200 dark:bg-purple-900 p-4 rounded'>
          <p className='text-lg font-semibold'>{commentCount}</p>
          <p className='text-sm text-gray-600 dark:text-gray-300'>
            Comments made
          </p>
        </div>
      </div>
      <div className='mt-8'>
        <h3 className='text-xl font-semibold mb-4'>Your Ideas</h3>
        {userIdeas.length > 0 ? (
          <ul className='space-y-4'>
            {userIdeas.map((idea, index) => (
              <li
                key={index}
                className='p-4 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600'>
                <h4 className='text-lg font-bold'>{idea.title}</h4>
                <p className='text-sm text-gray-600 dark:text-gray-300'>
                  {idea.description}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-gray-500 dark:text-gray-400'>
            You haven&apos;t created any ideas yet
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default Profile;
