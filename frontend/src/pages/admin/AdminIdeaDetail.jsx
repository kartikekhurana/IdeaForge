import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../utils/AxiosInstance";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const AdminIdeaDetail = () => {
  const { id } = useParams();
  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("details");
  const [logs, setLogs] = useState([]);

  const fetchIdea = async () => {
    try {
      const res = await axios.get(`/admin/ideas/${id}`);
      setIdea(res.data.idea);
   
    } catch (error) {
      toast.error("Failed to fetch idea");
    } finally {
      setLoading(false);
    }
  };
  const fetchLogs = async (id) => {
    try {
      const res = await axios.get(`/logs/idea/${id}`);
      setLogs(res.data.logs || []);
    } catch (error) {
      console.error("error while fetching logs for the admin page : ", error);
    }
  };

  useEffect(() => {
    fetchIdea();
  }, []);

  useEffect(() => {
    if (idea && idea._id) {
      fetchLogs(idea._id);
    }
  }, [idea]);

  const tabClasses = (tab) =>
    `px-4 py-2 rounded-t-lg ${
      activeTab === tab
        ? "bg-blue-600 text-white"
        : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
    }`;

  if (loading) return <div className='text-center mt-10'>Loading...</div>;
  if (!idea) return <div className='text-center mt-10'>Idea not found</div>;

  return (
    <div className='p-6 min-h-screen bg-gradient-to-br from-white to-blue-600 dark:from-gray-900 dark:to-gray-700'>
      <div className='max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6'>
        <h1 className='text-3xl font-bold mb-4 text-center text-blue-700 dark:text-white'>
          🧠 Admin Idea Detail
        </h1>

        <div className='flex space-x-2 border-b mb-4'>
          <button
            className={tabClasses("details")}
            onClick={() => setActiveTab("details")}>
            Details
          </button>
          <button
            className={tabClasses("comments")}
            onClick={() => setActiveTab("comments")}>
            Comments
          </button>
          <button
            className={tabClasses("logs")}
            onClick={() => setActiveTab("logs")}>
            Activity Logs
          </button>
        </div>

        <div className='mt-4'>
          {activeTab === "details" && (
            <div className='space-y-4'>
              <h2 className='text-xl font-semibold text-blue-600 dark:text-blue-300'>
                {idea.title}
              </h2>
              <p className='text-gray-700 dark:text-gray-300'>
                {idea.description}
              </p>
              <div className='flex gap-4 text-sm'>
                <span className='px-2 py-1 rounded bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100'>
                  {idea.category}
                </span>
                <span className='px-2 py-1 rounded bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100'>
                  {idea.stage}
                </span>
              </div>
              <div className='text-sm text-gray-500 dark:text-gray-400'>
                Owner: {idea.owner?.fullname || "Unknown"} ({idea.owner?.email})
              </div>
            </div>
          )}
          {activeTab === "comments" && (
            <div className='space-y-4'>
              {(idea.comments ?? []).length > 0 ? (
                idea.comments.map((comment) => (
                  <div
                    key={comment._id}
                    className='bg-gray-100 dark:bg-gray-800 p-3 rounded-lg shadow-sm'>
                    <div className='flex justify-between items-center mb-1'>
                      <span className='font-semibold text-gray-800 dark:text-gray-100'>
                        {comment.author?.fullname || "Anonymous"}
                      </span>
                      <span className='text-xs text-gray-500 dark:text-gray-400'>
                        {new Date(comment.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className='text-gray-700 dark:text-gray-300'>
                      {comment.content}
                    </p>
                  </div>
                ))
              ) : (
                <p className='italic text-gray-500 dark:text-gray-400'>
                  No comments available for this idea.
                </p>
              )}
            </div>
          )}
          {activeTab === "logs" && (
            <div className='space-y-4'>
              {logs && logs.length > 0 ? (
                logs.map((log) => (
                  <motion.div
                    key={log._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className='bg-yellow-50 dark:bg-gray-800 p-3 rounded-lg shadow-sm flex items-center space-x-3'>
                    <span className='text-xl'>
                      {log.message.includes("comment")
                        ? "📝"
                        : log.message.includes("delete")
                        ? "🗑️"
                        : "🔄"}
                    </span>
                    <div className='flex flex-col'>
                      <p className='text-gray-800 dark:text-gray-200'>
                        {log.message}
                      </p>
                      <span className='text-xs text-gray-500 dark:text-gray-400'>
                        {new Date(log.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </motion.div>
                ))
              ) : (
                <p className='italic text-gray-500 dark:text-gray-400'>
                  No Logs available for this idea .
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminIdeaDetail;
