import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { GiLightBulb } from "react-icons/gi";

const Footer = () => {
  return (
    <footer className='bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700 py-10 px-6'>
      <div className='max-x-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8'>
        <div className='flex items-start gap-3'>
          <GiLightBulb className='text-blue-500 text-3xl mt-1' />
          <div>
            <h1 className='text-3xl font-bold text-blue-500'>IdeaForge</h1>
            <p className='text-sm mt-1'> Where Ideas ignite into reality</p>
          </div>
        </div>
        <div>
          <h3 className='text-lg font-semibold mb-3'>Quick Lines</h3>
          <ul className='space-y-2 text-sm'>
            <li>
              <a href='#' className='hover:text-blue-500 transition'>
                Home
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-blue-500 transition'>
                About
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-blue-500 transition'>
                Login
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-blue-500 transition'>
                Signup
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className='text-lg font-semibold mb-3'>Connect</h3>
          <div className='flex gap-4 text-xl'>
            <a
              href='https://www.linkedin.com/in/kartike-khurana/'
              rel='noopener noreferrer'
              className='hover:text-blue-500 transition'>
              <FaLinkedin />
            </a>
            <a
              href='https://github.com/kartikekhurana'
              rel='noopener noreferrer'
              className='hover:text-blue-500 transition'>
              <FaGithub />
            </a>
          </div>
        </div>
      </div>
      <div className='mt-8 text-center text-xs text-gray-500 dark:text-gray-400'>
        &copy; {new Date().getFullYear()} IdeaForge. All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
