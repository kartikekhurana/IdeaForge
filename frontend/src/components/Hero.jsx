import { motion } from "framer-motion";
import "../styles/hero.css";
import Tilt from "react-parallax-tilt";
import { Player } from "@lottiefiles/react-lottie-player";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";

const features = [
  {
    icon: "🧠",
    title: "AI-Powered Suggestions",
    description:
      "Leverage AI to get startup, product, or side-project ideas tailored to your interests.",
  },
  {
    icon: "🗃️",
    title: "Organize Your Ideas",
    description:
      "Categorize, stage, and favorite your ideas like a digital product roadmap.",
  },
  {
    icon: "🌐",
    title: "Access Anywhere",
    description:
      "Your ideas are always with you - accessible on desktop, tablet, or mobile.",
  },
  {
    icon: "🔐",
    title: "Private & Secure",
    description:
      "Your ideas are protected and private. Only you control what you share.",
  },
  {
    icon: "🚀",
    title: "Track Your Progress",
    description:
      "Mark ideas as raw, in-progress, or launched to visualize your journey.",
  },
  {
    icon: "💬",
    title: "Comment & Collaborate",
    description:
      "Add thoughts, comments, or feedback to every idea in your collection.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
      type: "spring",
    },
  }),
};

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div>
      <section className='relative z-0 hero-section min-h-screen flex items-center justify-center px-6 text-gray-700 dark:text-white'>
        <div className='absolute inset-0 z-0 overflow-hidden pointer-events-none'>
          <motion.img
            src='/preview/preview-1.png'
            alt='floating preview'
            className='absolute top-1/3 left-1/4 w-64 opacity-30 blur-sm mix-blend-overlay -translate-x-1/2 -translate-y-1/2 pointer-events-none'
            initial={{ opacity: 0, y: 0, x: 0 }}
            animate={{
              opacity: 0.35,
              y: [0, -10, 0, 10, 0],
              x: [0, 5, 0, -5, 0],
              rotate: [0, 1, 0, -1, 0],
            }}
            transition={{
              duration: 24,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.img
            src='/preview/preview-3.png'
            alt='floating preview 2'
            className='absolute bottom-24 right-16 w-80 opacity-30 blur-[1px] mix-blend-overlay pointer-events-none'
            initial={{ opacity: 0, y: 0, x: 0 }}
            animate={{
              opacity: 0.35,
              y: [0, -15, 0, 15, 0],
              x: [0, 8, 0, -8, 0],
              rotate: [0, 2, 0, -2, 0],
            }}
            transition={{
              duration: 26,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
        <div className='absolute inset-0 z-0 overflow-hidden pointer-events-none'>
          <div className='blob blob1'></div>
          <div className='blob blob2'></div>

          {/* SVG wave */}
          <svg
            className='absolute bottom-0 left-0 w-full'
            viewBox='0 0 1440 320'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              fill='#3b82f6'
              fillOpacity='0.1'
              d='M0,192L60,192C120,192,240,192,360,186.7C480,181,600,171,720,160C840,149,960,139,1080,149.3C1200,160,1320,192,1380,208L1440,224V320H1380C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320H0Z'></path>
          </svg>
        </div>
        <div className='relative z-20 flex flex-col md:flex-row items-center justify-center gap-16'>
          <div className='max-w-xl space-y-6 text-center md:text-left'>
            <h1 className='text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-gray-800 dark:text-white'>
              Turn your <span className='text-blue-500'>ideas</span> into
              reality
            </h1>
            <p className='text-gray-600 dark:text-gray-300 text-lg md:text-xl'>
              A digital vault for your wildest app, AI, and product ideas.
            </p>
            <div className='flex gap-4 justify-center md:justify-start'>
              <button
                className='px-6 py-3 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition'
                onClick={() => {
                  navigate("/signup");
                }}>
                Get started
              </button>
              <button
                className='px-6 py-3 bg-white text-blue-500 border border-blue-500 rounded-md hover:bg-blue-50 transition dark:bg-gray-900 dark:border-blue-400 dark:text-blue-400'
                onClick={() => navigate("/ai")}>
                Try Ai Brainstorm
              </button>
            </div>
          </div>

          <Tilt
            glareEnable={true}
            glareMaxOpacity={0.2}
            scale={1.02}
            transitionSpeed={250}>
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{
                opacity: 1,
                y: [0, -10, 0],
                scale: 1,
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
              whileHover={{ scale: 1.02, rotate: 1 }}
              className='flex flex-col gap-4 bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6 w-96 border dark:border-gray-700'>
              <h3 className='text-xl font-semibold text-gray-800 dark:text-white'>
                💡 Build an AI Workout App
              </h3>
              <p className='text-gray-600 dark:text-gray-300'>
                A fitness app that adapts to your style using machine learning.
              </p>
              <div className='text-sm text-gray-500 dark:text-gray-400 mt-4'>
                📂 Category: AI, Fitness <br />
                🚀 Stage: In Progress
              </div>
            </motion.div>
          </Tilt>
        </div>
        <motion.div
          className='absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30'
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}>
          <a href='#features'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-12 w-12 text-blue-600 dark:text-blue-400 drop-shadow-lg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2.5}>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M19 9l-7 7-7-7'
              />
            </svg>
          </a>
        </motion.div>
      </section>
      <section className='bg-white dark:bg-gray-900 py-6 border-t border-gray-200'>
        <div className='max-w-6xl mx-auto px-6 text-center'>
          <p className='text-gray-700 dark:text-gray-300 text-lg font-semibold'>
            Trusted by makers, hackers & dreamers 💫
          </p>
          <div className='flex flex-wrap justify-center gap-6 mt-10'>
            <Player
              autoplay
              loop
              src='https://assets10.lottiefiles.com/packages/lf20_tno6cg2w.json'
              style={{ height: "250px", width: "250px" }}
            />
            <Player
              autoplay
              loop
              src='https://assets2.lottiefiles.com/packages/lf20_9cyyl8i4.json'
              style={{ height: "250px", width: "250px" }}
            />
          </div>
        </div>
      </section>
      <section
        id='features'
        className='py-20 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white'>
        <div className='max-w-6xl mx-auto px-6'>
          <h2 className='text-4xl font-bold text-center mb-12'>
            Why use <span className='text-blue-500'>IdeaForge</span>?
          </h2>

          <div className='grid gap-10 sm:grid-cols-2 lg:grid-cols-3'>
            {features.map((feature, i) => (
              <motion.div
                key={i}
                custom={i}
                initial={{
                  opacity: 0,
                  y: 30,
                  x: i % 3 === 0 ? -30 : i % 3 === 2 ? 30 : 0,
                }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                transition={{ delay: i * 0.2, duration: 0.6, type: "spring" }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.04, rotate: 1 }}
                className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 border border-transparent hover:border-blue-400'>
                <div className='text-4xl mb-4'>{feature.icon}</div>
                <h3 className='text-xl font-semibold mb-2'>{feature.title}</h3>
                <p className='text-gray-600 dark:text-gray-300'>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          <p className='text-center mt-16 text-lg'>
            Ready to turn your next idea into reality?{" "}
            <a
              href='/signup'
              className='text-blue-500 font-semibold hover:underline'>
              Join now →
            </a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Hero;
