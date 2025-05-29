import { motion } from "framer-motion";

import feature5 from "../assets/images/feature7.jpg";
import { CheckArrowIcon } from "../assets/icons/CheckArrowIcon";

export const Features3 = () => (
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
                alt="Feature image 7"
                className="rounded-xl"
              />
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 mb-12 lg:mb-0 xl:pl-8">
          <div className="mx-auto lg:mx-auto w-11/12 sm:w-4/5 md:w-3/4 lg:w-unset">
            <span className="block-subtitle"> </span>
            <h2 className="mt-6 mb-8 text-4xl lg:text-5xl block-big-title">
              Our Mission and Goals
            </h2>
            <p className="mb-12 text-secondaryText leading-loose">
              Our objective is to contribute to the Sustainable Development Goals for reducing poverty in all its forms (SDG 1), promoting lifelong learning opportunities and access to quality education (SDG 4), serving as a talent incubator for bespoke AI hardware and semiconductor chip designs in and for Africa (SDG 8) and building resilient infrastructure, promoting inclusive and sustainable industrialization, and fostering innovation (SDG 9). Through our platform, we empower skilled professionals to transform their intellectual capabilities into thriving technology startups, driving economic growth, technological advancement, and educational development across the continent
            </p>
            <ul className="mb-6 text-primaryText">
              <li className="mb-4 flex">
                <CheckArrowIcon />
                <span>SDG 1: Reducing Poverty</span>
              </li>
              <li className="mb-4 flex">
                <CheckArrowIcon />
                <span>SDG 4: Quality Education</span>
              </li>
              <li className="mb-4 flex">
                <CheckArrowIcon />
                <span>SDG 8: Decent Work and Economic Growth</span>
              </li>
              <li className="mb-4 flex">
                <CheckArrowIcon />
                <span>SDG 9: Industry, Innovation, and Infrastructure</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  </section>
);
