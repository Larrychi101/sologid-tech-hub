import { useState } from "react";
import { motion } from "framer-motion";

import { InvitationModal } from "./InvitationModal";

export const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section
      className="w-screen flex flex-col justify-center items-center bg-bgDark1 mb-[20vw] md:mb-[12vw] lg:mb-[8vw] xl:mb-[10vw] hero-bg-gradient pb-16 sm:pb-24 md:pb-32 lg:pb-0"
      id="home"
    >
      <div className="w-full md:w-[800px] xl:w-[900px] flex flex-col justify-center items-center pt-12 md:pt-14 lg:pt-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-secondaryColor text-sm sm:text-base  mb-6 sm:mt-32 mt-20  font-bold">
          Transform Your STEM Capabilities into
          </h3>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          <div className="text-5xl sm:text-6xl lg:text-7xl xl:text-7xl font-bold tracking-wide  text-primaryText  px-8 sm:px-8 md:px-20 lg:px-4">
            <h1 className="inline md:hidden">AI & IoT-Powered</h1>
            <h1 className="hidden md:inline">AI & IoT-Powered</h1>
          </div>
          <h1 className="mt-2 sm:mt-2 text-4xl sm:text-6xl lg:text-7xl xl:text-7xl font-bold tracking-wide  text-primaryText  px-8 sm:px-20 md:px-24 lg:px-24">
            Startup
          </h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-secondaryText text-sm lg:text-base xl:text-lg sm:text-base mt-10 px-12 sm:px-48 ">
          We are a next-gen digital innovation hub empowering Africa-focused
            STEM professionals and startups with smart technologies and tailored
            resources to unlock new revenue streams and drive sustainable
            growth
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="flex flex-col gap-2 sm:flex-row mt-10 mb-16 sm:mb-24 justify-center">
            <button
              className="contained-button w-64 sm:w-52 h-12 mr-0 sm:mr-4 lg:mr-6 mb-2 sm:mb-0"
              onClick={() =>
                window.open(
                  "https://forms.microsoft.com/r/tyfRraEyci?origin=lprLink",
                  "_blank"
                )
              }
              aria-label="Get started"
            >
              Get Started
            </button>
          </div>
        </motion.div>
      </div>
      {isModalOpen && (
        <InvitationModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      )}
    </section>
  );
};