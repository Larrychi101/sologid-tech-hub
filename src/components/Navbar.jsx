import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GithubIcon } from "../assets/icons/GithubIcon";

const navbarLinks = [
  { label: "Home", href: "/#home", ariaLabel: "Home" },
  { label: "About Us", href: "/#features", ariaLabel: "Features" },
  { label: "Pricing", href: "/#pricing", ariaLabel: "Pricing" },
  { label: "Feedback", href: "/#feedback", ariaLabel: "Feedback" },
  { label: "FAQ", href: "/#FAQ", ariaLabel: "FAQ" },
  { label: "Blog", href: "https://sologid.home.blog/2025/01/04/microsoft-is-finally-making-custom-chips-and-theyre-all-about-ai/", ariaLabel: "Blog" },
  { label: "Project", href: "https://forms.microsoft.com/r/igCYPivBv0", ariaLabel: "Program/Project" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className="w-full h-20 flex flex-col justify-center items-center fixed bg-bgDark1 lg:bg-bgDarkTransparent z-40 lg:backdrop-blur-xl"
      aria-label="Main navigation"
    >
      <div className="2xl:w-[1280px] xl:w-10/12 w-11/12 flex justify-between items-center relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <a href="/#home" aria-label="Home">
            <div className="flex justify-start items-center grow basis-0">
              <div className="text-white font-['Inter'] font-bold text-2xl tracking-tight drop-shadow-xl">
                SOLOGID
              </div>
            </div>
          </a>
        </motion.div>
        <div className="hidden lg:flex items-center">
          {navbarLinks.map(({ label, href, ariaLabel }) => (
            <a
              className="text-white lg:text-base text-xl leading-6 mr-4 ml-4 2xl:mr-6 2xl:ml-6 cursor-pointer font-normal lg:font-medium hover:text-[#7F5AF0] hover:scale-110 transition h-full pt-2"
              href={href}
              aria-label={ariaLabel}
              key={label}
            >
              {label}
            </a>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="grow basis-0 justify-end hidden lg:flex">
            <a
              className="text-white main-border-gray rounded-xl bg-bgDark2 hover:bg-[#7F5AF0] border-gray-700 pl-6 pr-8 pt-2 pb-2 text-sm flex transition"
              href="https://github.com/Larrychi101/sologid-tech-hub.git"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon />
              Source code
            </a>
          </div>
        </motion.div>
        <div className="lg:hidden flex items-center">
          <button
            className="text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation"
          >
            {isOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            )}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 w-3/4 h-full bg-bgDark1 flex flex-col items-center z-50"
          >
            <button
              className="text-white focus:outline-none self-end m-4"
              onClick={() => setIsOpen(false)}
              aria-label="Close navigation"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
            {navbarLinks.map(({ label, href, ariaLabel }) => (
              <a
                className="text-white text-xl leading-6 py-2 cursor-pointer font-normal hover:text-[#7F5AF0] hover:scale-110 transition"
                href={href}
                aria-label={ariaLabel}
                key={label}
                onClick={() => setIsOpen(false)}
              >
                {label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};