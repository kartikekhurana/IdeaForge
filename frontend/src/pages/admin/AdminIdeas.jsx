import { useEffect, useState } from "react";
import axios from "../../utils/AxiosInstance";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const AdminIdeas = () => {
  const navigate = useNavigate();
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchIdeas = async () => {
    try {
      const res = await axios.get("/admin/ideas");
      setIdeas(res.data.ideas || []);
    } catch (error) {
      console.error("failed ideas admin error", error);
      toast.error("failed to fetch ideas");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you wanted to delete this idea?")) return;
    try {
      const res = await axios.delete(`/admin/ideas/${id}`);
      toast.success(res.data.message || "Idea deleted");
      setIdeas((prev) => prev.filter((i) => i._id !== id));
    } catch (error) {
      toast.error("Failed to delete idea");
    }
  };

  useEffect(() => {

    fetchIdeas();
  }, []);

  return (
    <div className='p-8 min-h-screen bg-gradient-to-br from-white to-blue-600 dark:from-gray-900 dark:to-gray-600'>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='text-3xl font-bold mb-8 text-center text-blue-600 dark:text-white'>
        🚀 Admin Ideas Panel
      </motion.h1>
      {loading ? (
        <p className='text-center text-gray-600 dark:text-gray-400'>
          Loading ideas...
        </p>
      ) : ideas.length === 0 ? (
        <p className='text-center text-gray-500 dark:text-gray-400'>
          No Ideas found
        </p>
      ) : (
        <motion.div
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}>
          {ideas.map((idea, index) => (
            <motion.div
              key={idea._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className='bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 hover:shadow-2xl transition-all duration-300 group relative border border-blue-100 dark:border-gray-700 group-hover:ring-2 group-hover:ring-blue-400 dark:group-hover:ring-blue-500'>
              <h2 className='text-xl font-semibold text-blue-600 dark:text-blue-400 group-hover:underline'>
                {idea.title}
              </h2>
              <p className='text-sm text-gray-600 dark:text-gray-300 line-clamp-3 my-2'>
                {idea.description}
              </p>
              <div className='text-xs text-gray-500 dark:text-gray-400 italic'>
                Owner : {idea.owner?.fullname || "Unknown"}{" "}
                {idea.owner?.email || "N/A"}
              </div>
              <div className='mt-3 flex items-center justify-between'>
                <span className='text-xs px-2 py-1 bg-blue-200 text-blue-700 dark:bg-blue-900 dark:text-blue-200 rounded-full'>
                  {idea.category}
                </span>
                <span className='text-xs px-2 py-1 bg-green-200 text-green-700 dark:bg-green-900 dark:text-green-200 rounded-full'>
                  {idea.stage}
                </span>
              </div>
              <div className='absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all'>
                <button
                  className='text-blue-500 hover:scale-110'
                  onClick={() => navigate(`/admin/ideas/${idea._id}`)}>
                  🔎
                </button>
                <button
                  className='text-red-500 hover:scale-110'
                  onClick={() => handleDelete(idea._id)}>
                  🗑️
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default AdminIdeas;
