import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/AxiosInstance";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const CreateIdea = () => {
  const navigate = useNavigate();
  const [formdata, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    stage: "raw",
  });
  const handlechange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/ideas", formdata);
      if (res.data.success) {
        toast.success("Idea created Successfully");
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "failed to create idea");
    }
  };
  return (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="flex justify-center items-center px-4 py-10"
  >
    <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-gray-900 dark:text-white">
      <h2 className="text-3xl font-bold text-center mb-6">Create New Idea</h2>
      <form onSubmit={handlesubmit} className="space-y-6">
        <div>
          <label className="block mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formdata.title}
            onChange={handlechange}
            className="w-full px-4 py-2 rounded-md border dark:bg-gray-900 dark:border-gray-600"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Description</label>
          <textarea
            name="description"
            value={formdata.description}
            onChange={handlechange}
            rows={4}
            className="w-full px-4 py-2 rounded-md border dark:bg-gray-900 dark:border-gray-600"
            required
          ></textarea>
        </div>
        <div>
          <label className="block mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={formdata.category}
            onChange={handlechange}
            className="w-full px-4 py-2 rounded-md border dark:bg-gray-900 dark:border-gray-600"
          />
        </div>
        <div>
          <label className="block mb-1">Stage</label>
          <select
            name="stage"
            value={formdata.stage}
            onChange={handlechange}
            className="w-full px-4 py-2 rounded-md border dark:bg-gray-900 dark:border-gray-600"
          >
            <option value="raw">Raw</option>
            <option value="in-progress">In-Progress</option>
            <option value="launched">Launched</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-all"
        >
          Publish Idea 🚀
        </button>
      </form>
    </div>
  </motion.div>
);
};

export default CreateIdea;
