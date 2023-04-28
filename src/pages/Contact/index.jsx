import React, { useRef } from 'react'

import { motion } from 'framer-motion'
import BackgroundCircles from '../../components/BackgroundCircles'
import emailjs from '@emailjs/browser';

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {

  const notify = () => toast('Email Sent Sucessfully!', {
    position: "top-right",
    autoClose: 3000,
    theme: "dark",
  });

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_ahbd4xf', 'template_g5q39ch', form.current, 'Sh0DiC36MJDUg54mW')
      .then((result) => {
        console.log(result.text);
        notify()
      }, (error) => {
        console.log(error.text);
      });
  };
  return (
    <section>
      <ToastContainer />
      <motion.div
        initial={{
          opacity: 0
        }}
        whileInView={{
          opacity: 1
        }}
        transition={{
          duration: 1.5
        }}
        className='flex flex-col h-screen relative text-center md:text-left lg:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center overflow-hidden'
      >
        <h3 className='absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl '>Contact me</h3>
        <h2 className='mt-10 md:mt-0 text-sm uppercase text-gray-500 tracking-[15px] '>Lets Talk.</h2>
        <div className='flex flex-col'>
          <form
            ref={form}
            onSubmit={sendEmail}
            className='flex flex-col mx-auto space-y-2 z-10'>
            <div className='flex flex-col space-y-2 md:space-x-2 md:space-y-0 md:flex-row'>
              <input
                name='user_name'
                placeholder='Name'
                className='contactInput'
                type="text" />
              <input
                name='user_email'
                placeholder='Email'
                className='contactInput'
                type="email" />
            </div>
            <input
              name='user_subject'
              placeholder='Subject'
              className='contactInput'
              type="text" />
            <textarea
              name='message'
              placeholder='Message'
              className='contactInput' />
            <button
              type='submit'
              className='bg-[#2525ba] py-5 px-10 rounded-md font-bold text-lg'
            >
              Submit
            </button>
          </form>
        </div>
        <div className='absolute top-64'>
          <BackgroundCircles />
        </div>
      </motion.div>
    </section>
  )
}

export default Contact