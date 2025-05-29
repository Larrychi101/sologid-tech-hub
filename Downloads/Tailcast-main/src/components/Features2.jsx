import { motion } from "framer-motion";

import feature5 from "../assets/images/feature5.jpg";
import { CheckArrowIcon } from "../assets/icons/CheckArrowIcon";

export const Features2 = () => (
  <section className="w-full bg-bgDark2 mt-12 sm:mt-24 mb-12 lg:my-20 lg:mb-24 pt-4">
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex flex-wrap items-center 2xl:w-[1450px] xl:w-[1300px] w-11/12 mx-auto md:pl-4 xl:pr-16 xl:pl-16">
        <div className="w-11/12 sm:w-3/4 mx-auto lg:w-1/2 flex flex-wrap lg:-mx-4 sm:pr-8 justify-center order-last lg:order-first">
          <div className="mb-8 lg:mb-0 w-full px-2 lg:pl-16 flex flex-col justify-center md:pl-8">
            <div className="mb-4 py-3 md:pl-3 md:pr-20 lg:pr-12 rounded">
              <img
                src={feature5.src}
                alt="Feature image 5"
                className="rounded-xl"
              />
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 mb-12 lg:mb-0 xl:pl-8">
          <div className="mx-auto lg:mx-auto w-11/12 sm:w-4/5 md:w-3/4 lg:w-unset">
            <span className="block-subtitle"> </span>
            <h2 className="mt-6 mb-8 text-4xl lg:text-5xl block-big-title">
              The Challenge We Aim to Address
            </h2>
            <p className="mb-12 text-secondaryText leading-loose">
              As the world transitions to artificial intelligence and smart devices, the demand for semiconductors and microchips is outpacing supply. This technological shift has created a global surge in demand for electronic design automation engineers. The world is increasingly focusing on this sector, and Africa is just beginning to enter this critical phase. The potential for Africa to play a crucial role in meeting this demand is immense, and unlocking this potential is essential for the future of technology
            </p>
            <ul className="mb-6 text-primaryText">
              <li className="mb-4 flex">
                <CheckArrowIcon />
                <span>Unmet Global Demand</span>
              </li>
              <li className="mb-4 flex">
                <CheckArrowIcon />
                <span>Technological Surge</span>
              </li>
              <li className="mb-4 flex">
                <CheckArrowIcon />
                <span>Africa's Emerging Role</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  </section>
);