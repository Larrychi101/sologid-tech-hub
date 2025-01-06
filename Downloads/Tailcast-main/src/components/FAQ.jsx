import { useState } from "react";
import { motion } from "framer-motion";

const FAQData = [
  {
    question: "What is the process for joining the incubation program?",
    answer:
      "We start with a 1-on-1 consultation to understand your idea and assist in team formation. This personalized approach ensures you have the right foundation for success",
  },
  {
    question: " What resources are available to help me develop my startup?",
    answer:
      "We provide tailored accelerated learning resources, including access to Nvidia Inception and Microsoft Founders Hub, through our human-AI-human communication system. This ensures you receive the most relevant and up-to-date information",
  },
  {
    question: " How does the hands-on learning experience work?",
    answer:
      " You'll gain practical experience through our maker-space and partnerships with local manufacturing experts. This hands-on approach helps you turn your ideas into tangible products",
  },
  {
    question: "What kind of support can I expect for prototyping and product development? ",
    answer:
      "Depending on your subscription plan, we provide Microcontroller development kits and additional hardware to help you rapidly prototype and develop your products",
  },
  {
    question: " How do I submit my project for funding and further support?",
    answer:
      "We request project submissions and proposals at specific stages of the program. Our team will guide you through the process to ensure your project is ready for funding opportunities",
  },
  {
    question: " What are the benefits of the different subscription plans?",
    answer:
      "Each plan offers unique benefits. Innovator's Edge provides essential resources and mentorship, Ignite includes hardware for prototyping, and Accelerate offers comprehensive support for manufacturing and business development",
  },
  {
    question: " How can I become an IoT consultant after completing the program?",
    answer:
      " Our Accelerate plan includes dedicated consulting sessions and business development strategies to help you transition into a global IoT consultant, serving the needs of international companies",
  },
  {
    question: " What is the Elevate plan and what does it offer?",
    answer:
      " The Elevate plan automatically funds all subscribers between $15,000 - $75,000 USD through a Simple Agreement for Future Equity (SAFE), subject to terms and conditions. This plan is designed to give you the financial boost needed to accelerate your startup's growth",
  },
  {
    question: "Are there any conditions for receiving the funding in the Elevate plan? ",
    answer:
      "Yes, the funding is provided under specific terms and conditions outlined in the Simple Agreement for Future Equity (SAFE). Our team will provide detailed information and guidance on these terms",
  },
  {
    question: " What is the duration of the program and funding period?",
    answer:
      "The startup incubation and funding period last between 8 to 12 months, depending on the participant's dedication and progress within the program",
  },
  {
    question: " Who are your target customers?",
    answer:
      "Our typical customers are electronic, mechanical, computer, and other engineering-related students, graduates, school leavers, and enthusiasts. They possess the motivation and skills to build products but lack the business acumen and industry practices to monetize their intellectual capabilities.",
  },
  {
    question: " How do I access the maker-space and local manufacturing partners?",
    answer:
      " Access to the maker-space and local manufacturing partners is provided as part of our hands-on learning experience. Details on how to utilize these resources will be shared during the program",
  },
  {
    question: " What is the Simple Agreement for Future Equity (SAFE)?",
    answer:
      " SAFE is an agreement between an investor and a company that provides rights to the investor for future equity in the company, subject to certain conditions. It is designed to be simple and flexible for startups",
  },
  {
    question: " How do I know which subscription plan is right for me?",
    answer:
      " Our team can help you assess your needs and goals to determine which subscription plan best fits your stage of development and objectives",
  },
];

export const FAQ = () => (
  <section className="relative -mt-8 sm:mt-0 pt-12 sm:pt-16 pb-16 bg-blueGray-50 overflow-hidden">
    <div className="absolute -top-10" id="FAQ" />
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="relative z-10 container px-2 sm:px-8 lg:px-4 mx-auto w-11/12 sm:w-full">
        <div className="md:max-w-4xl mx-auto">
          <p className="mb-7 block-subtitle text-center">Have any questions?</p>
          <h2 className="mb-16 block-big-title text-center">
            Frequently Asked Questions
          </h2>
          <div className="mb-11 flex flex-wrap -m-1">
            {FAQData.map((item, index) => (
              <div className="w-full p-1" key={`${item.question}-${index}`}>
                <FAQBox
                  title={item.question}
                  content={item.answer}
                  key={`${item.question}-${item.answer}`}
                  defaultOpen={index === 0}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  </section>
);

const FAQBox = ({ defaultOpen, title, content }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      className="pt-2 sm:pt-6 pb-2 px-3 sm:px-8  rounded-3xl bg-bgDark3 main-border-gray-darker mb-4 relative hover:bg-bgDark3Hover cursor-pointer transition"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex flex-col p-2  justify-center items-start">
        <h3 className=" content-title pt-3 sm:pt-0 pr-8 sm:pr-0">{title}</h3>
        <p
          className={`text-secondaryText pt-4 transition-height duration-300 overflow-hidden ${
            isOpen ? "max-h-96" : "max-h-0"
          }`}
        >
          {content}
        </p>
      </div>
      <div className="absolute top-6 right-4 sm:top-8 sm:right-8">
        <svg
          width="28px"
          height="30px"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`transition-all duration-500  ${
            isOpen ? "rotate-[180deg]" : "rotate-[270deg]"
          }`}
        >
          <path
            d="M4.16732 12.5L10.0007 6.66667L15.834 12.5"
            stroke="#4F46E5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </div>
    </div>
  );
};
