import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "../../utils/AxiosInstance";
import { motion } from "framer-motion";

const AiSpark = () => {
  const [prompt, setPrompt] = useState("");
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);

  const randomPrompts = [
    "Generate 3 creative app ideas for productivity",
    "Suggest 3 fun startup ideas for Gen Z",
    "Give me 3 futuristic business models in AI",
    "Generate 3 app ideas for remote workers",
    "Suggest 3 tools for content creators",
  ];

  const handlegenerate = async () => {
    if (!prompt.trim()) {
      toast.error("please enter a prompt");
      return;
    }
    setLoading(true);
    setIdeas([]);
    try {
      const res = await axios.post("/ai/generate", { prompt });
      if (res.data.success) {
        setIdeas(res.data.ideas);
      } else {
        toast.error("failed to generate ideas");
      }
    } catch (error) {
      console.error("ai error : ", error);
      toast.error("AI generation failed");
    } finally {
      setLoading(false);
    }
  };

  const handlesurprise = () => {
    const random =
      randomPrompts[Math.floor(Math.random() * randomPrompts.length)];
    setPrompt(random);
  };
  return (
    <div className='p-6 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-bold mb-6 text-center text-blue-600 dark:text-blue-400 '>
        AI Spark
      </h1>
      <div className='flex flex-col md:flex-row items-center gap-4 mb-6'>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder='Enter a creative prompt'
          className='flex-1 w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-400 dark:bg-gray-800 focus:outline-none resize-none focus:ring-2 focus:ring-blue-400 transiton'
          rows={3}></textarea>
        <div className='flex flex-col gap-2 md:flex-row'>
          <button
            onClick={handlesurprise}
            className='bg-slate-200 dark:bg-gray-700 px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-400
          '>
            🎲 Surprise Me
          </button>
          <button
            onClick={handlegenerate}
            disabled={loading}
            className='bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-70'>
            {loading ? "Generating..." : "generate Ideas"}
          </button>
        </div>
      </div>
      <div className='mt-8 space-y-4'>
        {ideas.map((idea, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className='p-4 rounded shadow bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'>
            <h2 className='text-xl font-semibold text-blue-600 dark:text-blue-400 mb-1'>
              {idea.title}
            </h2>
            <p className='text-gray-700 dark:text-gray-300'>
              {idea.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AiSpark;
