import { useEffect, useState } from "react";
import axios from "../../utils/AxiosInstance";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import AnalyticsChartsComponent from "./AnalyticsChartsComponent";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2 },
  }),
};

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    ideas: 0,
    comments: 0,
    logs: 0,
  });
  const [logs, setLogs] = useState([]);
  const fetchStats = async () => {
    try {
      const [usersRes, ideaRes, commentsRes, logsRes] = await Promise.all([
        axios.get("/admin/users"),
        axios.get("/admin/ideas"),
        axios.get("/admin/comments"),
        axios.get("/admin/logs"),
      ]);
      setStats({
        users: usersRes.data.users?.length || 0,
        ideas: ideaRes.data.ideas?.length || 0,
        comments: commentsRes.data.count || 0,
        logs: logsRes.data.count || 0,
      });
    } catch (error) {
      toast.error("failed to fetch stats");
      console.error("something went wrong file fetching stats", error);
    }
    try {
      const activityRes = await axios.get("/admin/activity");
      setLogs(activityRes.data.logs || []);
    } catch (error) {
      console.error("error fetching activity logs", error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const statData = [
    { label: "Users", value: stats.users, emoji: "👥", color: "bg-blue-500" },
    {
      label: "Ideas",
      value: stats.ideas,
      emoji: "💡",
      color: "bg-green-500",
    },
    {
      label: "Comments",
      value: stats.comments,
      emoji: "💬",
      color: "bg-yellow-500",
    },
    { label: "Logs", value: stats.logs, emoji: "🪵", color: "bg-purple-500" },
  ];

  return (
    <div className='p-6 min-h-screen bg-gradient-to-br from-white to-blue-200 dark:from-gray-900 dark:to-gray-800'>
      <h1 className='text-3xl font-bold text-center text-blue-700 dark:text-white mb-10'>
        📊 Admin Dashboard Overview
      </h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        {statData.map((stat, index) => (
          <motion.div
            key={stat.label}
            className={`rounded-lg p-6 text-white shadow-lg ${stat.color}`}
            custom={index}
            initial='hidden'
            animate='visible'
            variants={cardVariants}>
            <div className='text-4xl mb-2'>{stat.emoji}</div>
            <div className='text-lg'>{stat.label}</div>
            <div className='text-2xl font-bold'>{stat.value}</div>
          </motion.div>
        ))}
      </div>
      <div className='mt-12'>
        <h2 className='text-2xl font-semibold mb-4 text-gray-800 dark:text-white'>
          🕒 Recent Activity
        </h2>
        <div className='space-y-4'>
          {logs.length > 0 ? (
            logs.map((log, idx) => (
              <motion.div
                key={idx}
                className='bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex items-center gap-4'
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}>
                <div className='text-2xl'>
                  {log.message.includes("commented") && "💬"}
                  {log.message.includes("deleted") && "🗑️"}
                  {log.message.includes("created") && "📝"}
                  {!["commented", "deleted", "created"].some((k) =>
                    log.message.includes(k)
                  ) && "🔔"}
                </div>
                <div className='flex-1'>
                  <div className='text-gray-700 dark:text-gray-200 font-medium'>
                    {log.user?.fullname || "Unknown User"} — {log.message}
                  </div>
                  <div className='text-sm text-gray-500 dark:text-gray-400'>
                    {new Date(log.createdAt).toLocaleString()}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className='text-gray-500 dark:text-gray-400 italic'>
              No recent activity.
            </div>
          )}
        </div>
      </div>
      <div className='mt-16'>
        <h2 className='text-2xl font-semibold mb-4 text-gray-800 dark:text-white'>
          📈 Analytics Overview
        </h2>
        <AnalyticsChartsComponent />
      </div>
    </div>
  );
};

export default AdminDashboard;
