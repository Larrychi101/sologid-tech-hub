import { motion } from "framer-motion";

import { QuoteIcon } from "../assets/icons/QuoteIcon";


const testimonialsData = [
  {
    customerName: "Michael Oluwagbemi",
    customerTitle: "Founder of Hoodarting Media",
    content:
      "Partnering with Sologid has been a game-changer for us. The resources and mentorship provided have enabled us to integrate AIOT solutions into our multimedia projects, enhancing our production quality and efficiency. The support we received has truly transformed our business",
  },
  {
    customerName: "Amaka Nwadigune",
    customerTitle: "Engineering Student",
    content:
      "As an engineering student, Sologid has given me the practical experience and business acumen I needed. The hands-on learning and access to advanced resources have been invaluable. I now feel confident in my ability to turn my ideas into a successful AIOT startup",
  },
  {
    customerName: "Blessed Agoziem",
    customerTitle: "Founder of SoloFabless NG",
    content:
      "Joining this incubation program was the best decision we made. The comprehensive support, from prototyping to business development, has accelerated our growth. The funding and mentorship have been crucial in helping us navigate the challenges of scaling our AIOT startup. We are now well on our way to becoming a global player",
  },
];

export const Testimonials = () => (
  <section className="w-full flex justify-center pt-16 mb-16 lg:mb-32 bg-bgDark2 relative">
    <div className="absolute -top-16" id="feedback" />
    <div className="flex flex-col w-full lg:w-[1150px] justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <div className="block-subtitle text-center mb-6">Testimonials</div>
        <div className="block-big-title text-center mb-20 px-8 sm:px-24 md:px-48">
          People like you love Sologid hub
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-5 xl:gap-10 px-6 xl:px-0 items-center">
          {testimonialsData.map((testimonial, index) => (
            <div
              className="w-11/12 sm:w-4/5 md:w-[560px] lg:w-1/3 main-border-gray-darker rounded-xl bg-bgDark3 flex flex-col px-6 py-4"
              key={`${testimonial.customerName}-${index}`}
            >
              <div className="flex mb-2">
                <QuoteIcon />
              </div>
              <div className="content-text-white">"{testimonial.content}"</div>
              <div className="flex flex-col mt-4 mb-2 xl:mt-8 xl:mb-4">
                <div className="content-text-white font-medium">
                  {testimonial.customerName}
                </div>
                <div className="content-text-gray">
                  {testimonial.customerTitle}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);