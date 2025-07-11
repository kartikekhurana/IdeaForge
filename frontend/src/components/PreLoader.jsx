import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect } from "react";
import logo from "../assets/logo.png";
import TypingText from "./TypingText";

const PreLoader = ({ setLoading }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, [setLoading]);
  return (
    <AnimatePresence>
      <motion.div
        key='preloader'
        initial={{ opacity: 1, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{
          opacity: 0,
          scale: 1.2,
          backgroundColor: "#fff",
          transition: {
            duration: 0.6,
            ease: "easeInOut",
          },
        }}
        className='fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-black transition-all duration-500'>
        <motion.div
          className='absolute w-44 h-44 rounded-full bg-blue-500 opacity-30 blur-2xl z-10'
          initial={{ scale: 0.8, opacity: 0.2 }}
          animate={{ scale: [0.8, 1, 0.8], opacity: [0.2, 0.4, 0.2] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        />
        <motion.img
          src={logo}
          alt='IdeaForge logo'
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{
            scale: [1.2, 1.3, 1.2], // pulse in and out
            opacity: 1,
            boxShadow: [
              "0 0 0px #3b82f6",
              "0 0 20px #3b82f6",
              "0 0 0px #3b82f6",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
          className='w-36 h-36 rounded-full shadow-2xl z-20'
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className='mt-9'>
          <TypingText
            text='Boooting Up IdeaForge...'
            speed={60}
            className='text-2xl text-gray-500 dark:text-gray-300 mt-6 font-semibold tracking-widest'
          />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.2, ease: "easeInOut" }}
            className='mt-6 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full w-full max-w-md mx-auto'
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PreLoader;
