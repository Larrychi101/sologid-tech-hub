import { useState } from "react";
import { motion } from "framer-motion";
import { InvitationModal } from "./InvitationModal";

export const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section
      className="relative w-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-900 via-purple-900 to-bgDark1 mb-[20vw] md:mb-[12vw] lg:mb-[8vw] xl:mb-[10vw] pb-16 sm:pb-24 md:pb-32 lg:pb-0 overflow-hidden"
      id="home"
    >
      {/* Abstract SVG shapes for background */}
      <svg
        className="absolute top-0 left-0 w-1/2 h-1/2 opacity-30 pointer-events-none"
        viewBox="0 0 400 400"
        fill="none"
      >
        <circle cx="200" cy="200" r="180" fill="url(#grad1)" />
        <defs>
          <radialGradient id="grad1" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#7F5AF0" />
            <stop offset="100%" stopColor="#2CB67D" stopOpacity="0.3" />
          </radialGradient>
        </defs>
      </svg>
      <div className="w-full md:w-[800px] xl:w-[900px] flex flex-col justify-center items-center pt-16 md:pt-20 lg:pt-24 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h3 className="text-white text-base sm:text-lg mb-8 sm:mt-32 mt-20 font-semibold tracking-wide drop-shadow-lg">
            Transform Your STEM Capabilities into
          </h3>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
        >
          <div className="text-5xl sm:text-6xl lg:text-7xl xl:text-7xl font-extrabold tracking-tight text-white px-8 sm:px-8 md:px-20 lg:px-4 drop-shadow-xl">
            <h1 className="inline md:hidden">AI & IoT-Powered</h1>
            <h1 className="hidden md:inline">AI & IoT-Powered</h1>
          </div>
          <h1 className="mt-2 sm:mt-2 text-4xl sm:text-6xl lg:text-7xl xl:text-7xl font-extrabold tracking-tight text-white px-8 sm:px-20 md:px-24 lg:px-24 drop-shadow-xl">
            Startup
          </h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <h2 className="text-white text-base lg:text-lg xl:text-xl sm:text-lg mt-10 px-12 sm:px-48 font-medium">
            We are a next-gen digital innovation hub empowering Africa-focused STEM professionals and startups with smart technologies and tailored resources to unlock new revenue streams and drive sustainable growth
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
        >
          <div className="flex flex-col gap-2 sm:flex-row mt-12 mb-16 sm:mb-24 justify-center">
            <button
              className="w-64 sm:w-52 h-14 mr-0 sm:mr-4 lg:mr-6 mb-2 sm:mb-0 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-500 to-green-400 text-white font-bold shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
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