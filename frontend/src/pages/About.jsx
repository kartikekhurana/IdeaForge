
import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaDatabase } from "react-icons/fa";
import ContactForm from "../components/ContactForm";

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className='min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white px-6 py-16 hero-section'>
      {/* description */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        className='text-center max-w-3xl mx-auto mb-16'>
        <h1 className='text-4xl font-bold mb-4'>
          What is{" "}
          <span className='text-blue-500 mt-10 dark:text-gray-700 inline-block'>
            IdeaForge?
          </span>
        </h1>
        <p className='text-lg text-gray-600 dark:text-gray-700'>
          IdeaForge lets you capture, organize, and track your ideas by
          categorizing them as <strong>Raw</strong>,{" "}
          <strong>In Progress</strong>, or <strong>Launched</strong>. You can
          also explore AI-powered suggestions to spark new directions and refine
          your thoughts.
        </p>
      </motion.div>
      <motion.div
        className='grid md:grid-cols-3 gap-8 mb-20'
        initial='hidden'
        whileInView='visible'
        transition={{ staggerChildren: 0.2 }}
        viewport={{ once: true }}>
        {[
          {
            icon: "💡",
            title: "Save Ideas",
            text: "Capture your wildest ideas instantly.",
          },
          {
            icon: "🧠",
            title: "AI suggestion",
            text: "Let AI inspire your next big move.",
          },
          {
            icon: "🚀",
            title: "Launch flow",
            text: "Track your journey from tought to process",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            className='p-6 bg-white dark:bg-gray-800 rounded shadow text-center'
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}>
            <div className='text-4xl bg-3'>{item.icon}</div>
            <h3 className='text-xl font-semibold mb-2 '>{item.title}</h3>
            <p className='text-gray-600 dark:text-gray-500'>{item.text}</p>
          </motion.div>
        ))}
      </motion.div>
      <motion.section
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className='text-center mb-20'>
        <h2 className='text-3xl md:text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600'>
          Built by a maker, for makers
        </h2>
        <p className='text-gray-600 dark:text-gray-700 italic text-lg max-w-xl mx-auto px-4 border-l-4 border-blue-400 pl-4'>
          Hi, I'm <strong className='text-blue-500'>Kartike</strong> — a
          passionate developer on a mission to turn wild ideas into reality.
          This project is my way of helping others build, launch, and grow their
          ideas faster.
        </p>
      </motion.section>
      <motion.div
        className='flex justify-center gap-10 items-center flex-wrap mb-20'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        viewport={{ once: true }}>
        <h3 className='text-2xl font-semibold mb-4'> Powered By</h3>
        <div className='flex justify-center gap-10 text-4xl text-blue-500'>
          <FaReact
            className='hover:text-cyan-400 hover:scale-110 transition-all duration-300 cursor-pointer'
            title='React'></FaReact>
          <FaNodeJs
            className='hover:text-green-500 hover:scale-110 transition-all duration-300 cursor-pointer '
            title='Node.js'></FaNodeJs>

          <FaDatabase
            className='hover:text-yellow-500 hover:scale-110 transition-all duration-300 cursor-pointer '
            title='MongoDB'></FaDatabase>
        </div>
      </motion.div>
      <ContactForm />
    </motion.div>
  );
};

export default About;
