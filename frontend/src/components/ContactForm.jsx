import axios from "../utils/AxiosInstance";
import React, { useState } from "react";
import { motion } from "framer-motion";

const ContactForm = () => {
  const [form, setForm] = useState({ fullname: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const res = await axios.post("/submit", form);
      setStatus("messsage sent successfully");
      setForm({ fullname: "", email: "", message: "" });
    } catch (error) {
      console.error("form error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='py-20 px-4 bg-transparent dark:bg-transparent'>
      <motion.div
        className='max-w-2xl mx-auto p-10 bg-white dark:bg-gray-800 shadow-xl rounded-2xl border dark:border-gray-600'
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}>
        <h2 className='text-3xl font-bold text-blue-600 dark:text-white mb-6 text-center'>
          Get in touch
        </h2>
        <div className='max-w-2xl mx-auto mt-10 px-6'>
          <motion.form
            onSubmit={handleSubmit}
            className='flex flex-col gap-5'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}>
            <input
              name='fullname'
              type='text'
              placeholder='Full Name'
              className='w-full px-4 py-3 rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white focus:outline-none'
              value={form.fullname}
              onChange={handleChange}
              required
            />
            <input
              name='email'
              type='email'
              placeholder='Email'
              className='w-full px-4 py-3 rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white focus:outline-none'
              value={form.email}
              onChange={handleChange}
              required
            />
            <textarea
              name='message'
              rows='4'
              placeholder='Your Message'
              className='w-full px-4 py-3 rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white focus:outline-none'
              value={form.message}
              onChange={handleChange}
              required
            />
            <motion.button
              type='submit'
              className='w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition'
              whileTap={{ scale: 0.98 }}>
              {loading ? "Sending..." : "Send message"}
            </motion.button>
            {status && <p className='text-center mt-3 text-sm'>{status}</p>}
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactForm;
