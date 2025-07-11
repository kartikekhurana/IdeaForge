import { motion } from "framer-motion";
import { Bot } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "../utils/AxiosInstance";

const max_free_ideas = 5;

const Ai = () => {
  const [input, setInput] = useState("");
  const [ideas, setIdeas] = useState([]);
  const [loading, setloading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const res = await axios.get("/me");
        if (res.data?.currentUser) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error(error.message);
        setIsLoggedIn(false);
      }
    };
    checkAuthStatus();
  }, []);

  const handleAskSpark = async () => {
    setloading(true);
    if (!isLoggedIn && ideas.length >= max_free_ideas) {
      alert("🚀 Please login to unlock more ideas!");
      setloading(false);
      return;
    }
    try {
      const res = await axios.post("/ai/generate", { prompt: input });
      setIdeas(res.data.ideas || []);
    } catch (error) {
      console.error("spark error : ", error);
      setIdeas([]);
    } finally {
      setloading(false);
    }
  };

  return (
    <div
      className='relative min-h-screen flex flex-col items-center px-4 py-10 
    bg-gradient-to-b from-blue-50 via-white to-blue-100 text-gray-900 
    dark:from-gray-900 dark:via-slate-800 dark:to-gray-900 dark:text-white 
    transition-colors duration-500 overflow-hidden animate-gradient-x'>
      {/* Background Effects */}
      <div className='absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.1),transparent_70%)] z-0' />
      <div className='absolute top-0 left-0 w-full h-full z-0 pointer-events-none'>
        <div className='absolute w-96 h-96 bg-blue-300 opacity-20 rounded-full blur-3xl top-10 left-[-100px]' />
        <div className='absolute w-96 h-96 bg-purple-300 opacity-20 rounded-full blur-3xl bottom-0 right-[-100px]' />
      </div>

      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='text-4xl md:text-5xl font-bold text-center text-blue-400 z-10 mt-20'>
        Ask <span className='text-gray-700 dark:text-white'>Spark</span>
      </motion.h1>

      {/* Description */}
      <p className='text-gray-700 mt-4 text-center max-w-xl z-10 dark:text-white'>
        Let Spark generate innovative startup ideas for you in seconds. Just
        type your theme or interest below.
      </p>

      {/* Bot Icon */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, duration: 0.8 }}
        className='mt-10 bg-blue-950 p-6 rounded-full shadow-xl z-10'>
        <Bot className='w-32 h-32 text-blue-400 animate-pulse' />
      </motion.div>

      {/* Input + Button + Loading + Ideas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className='mt-6 w-full max-w-xl z-10'>
        {/* Textarea */}
        <textarea
          rows={4}
          placeholder='e.g. fitness, productivity, AI + health...'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className='w-full p-4 rounded-xl border border-gray-600 bg-gray-800 text-white placeholder:text-gray-400 focus:outline-blue-400 resize-none'
        />

        {/* Loading Spinner or Ask Button */}
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className='w-6 h-6 border-4 border-white border-t-blue-500 rounded-full mx-auto my-4'
          />
        ) : (
          <button
            onClick={handleAskSpark}
            disabled={!input.trim() || loading}
            className='mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed'>
            Ask Spark
          </button>
        )}
      </motion.div>

      {/* Displaying Generated Ideas */}
      <div className='mt-6 flex flex-wrap gap-4 justify-center z-10 w-full max-w-5xl'>
        {ideas.map((idea, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            className='p-4 bg-white dark:bg-gray-800 shadow-lg rounded-xl border-l-4 border-blue-500 w-full max-w-xl'>
            <h3 className='font-semibold text-lg text-blue-500'>
              {idea.title}
            </h3>
            <p className='text-gray-700 dark:text-gray-300'>
              {idea.description}
            </p>
          </motion.div>
        ))}
      </div>
      {!isLoggedIn && ideas.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className='mt-6 w-full max-w-xl bg-gray-200 rounded-full h-6 overflow-hidden relative'>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(ideas.length / max_free_ideas) * 100}%` }}
            transition={{ duration: 0.8 }}
            className='bg-gradient-to-r from-blue-500 to-purple-500 h-full'
          />
          <div className='absolute inset-0 flex justify-center items-center text-sm font-semibold text-gray-800'>
            {ideas.length}/{max_free_ideas} ideas shown —
            <span
              onClick={() => (window.location.href = "/login")}
              className='ml-1 text-blue-600 underline cursor-pointer'>
              Log in to unlock more
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Ai;
