import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "../../utils/AxiosInstance";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AnalyticsChartsComponent = () => {
  const [data, setData] = useState({
    users: [],
    ideas: [],
    comments: [],
  });
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    try {
      const res = await axios.get("/admin/analytics");
      if (res.data.success) {
        setData(res.data.analytics);
      }
    } catch (error) {
      console.error("Error while fetching analytics", error);
      toast.error("Failed to load analytics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const renderCharts = (title, charData, color, dataKey) => {
    return (
      <div className='bg-white dark:bg-gray-900 shadow rounded p-4 mb-6'>
        <h2 className='text-lg font-bold mb-4 text-blue-700 dark:text-white'>
          {title}
        </h2>
        <ResponsiveContainer width='100%' height={300}>
          <LineChart data={charData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='month' stroke='#8884d8' />
            <YAxis />
            <Tooltip />
            <Line
              type='monotone'
              dataKey={dataKey}
              stroke={color}
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };
  if (loading) {
    return (
      <div className='text-center text-gray-600 dark:text-gray-300'>
        Loading analytics...
      </div>
    );
  }

  return (
    <div className='space-y-8'>
      {renderCharts("Users Joined Per Month", data.users, "#8884d8", "count")}
      {renderCharts("Ideas Created Monthly", data.ideas, "#82ca9d", "count")}
      {renderCharts("Comments Over Time", data.comments, "#ffc658", "count")}
    </div>
  );
};

export default AnalyticsChartsComponent;
