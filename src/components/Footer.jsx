import { InstagramIcon } from "../assets/icons/InstagramIcon";
import { LinkedInIcon } from "../assets/icons/LinkedinIcon";

const footerData = [
  {
    title: "Products",
    items: [
      { name: "Services", link: "#features-diagonal" },
      { name: "News and Stories", link: "https://sologid.home.blog/2025/01/04/microsoft-is-finally-making-custom-chips-and-theyre-all-about-ai" },
    ],
  },
  {
    title: "Important Links",
    items: [
      { name: "Organization Team", link: "/organization-team" },
      { name: "Privacy Policy", link: "/policy" },
    ],
  },
  {
    title: "Company",
    items: [
      { name: "About Us", link: "#features" },
      { name: "Contact Us", link: "https://www.linkedin.com/company/sologid-technology-hub" },
    ],
  },
  {
    title: "Support",
    items: [
      { name: "Support Center", link: "/support" },
    ],
  },
];

export const Footer = () => {
  return (
    <footer aria-label="Site footer">
      <div className="pt-10 lg:pt-20 lg:pb-16 bg-bgDark1 radius-for-skewed">
        <div className="container mx-auto px-4 w-4/5 md:w-11/12 lg:w-10/12 xl:w-4/5 2xl:w-2/3">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-1/3 mb-16 lg:mb-0">
              <div className="flex justify-center lg:justify-start items-center grow basis-0">
                <div className="text-white font-['Inter'] font-bold text-xl">
                  SOLOGID
                </div>
              </div>
              <p className="mb-10 mt-4 sm:w-[22rem] lg:w-[20rem] xl:w-[24rem] text-gray-400 leading-loose text-center lg:text-left mx-auto lg:mx-0">
                Empowering skilled professionals in Africa to turn their expertise into tech startups and monetize their intellectual capabilities with our AI-powered business incubation platform
              </p>
              <div className="w-36 mx-auto lg:mx-0">
                <a
                  className="inline-block w-10 h-10 mr-2 p-2 pt-[0.55rem] pl-[0.55rem] outlined-button"
                  href="https://instagram.com/sologid"
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramIcon />
                </a>
                <a
                  className="inline-block w-10 h-10 mr-2 p-2 pt-[0.55rem] pl-[0.55rem] outlined-button"
                  href="https://www.linkedin.com/company/sologid-technology-hub"
                  aria-label="LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedInIcon />
                </a>
              </div>
              <p className="mt-4 text-gray-400 leading-loose text-center lg:text-left mx-auto lg:mx-0">
                18A Olusegun Aina Street, Parkview Estate, Ikoyi Lagos, Nigeria 101233
              </p>
            </div>
            <div className="w-full lg:w-2/3 lg:pl-16 hidden lg:flex flex-wrap justify-between">
              {footerData.map((section, sectionIndex) => (
                <div key={section.title} className="w-full md:w-1/3 lg:w-auto mb-16 md:mb-0">
                  <h3 className="mb-6 text-2xl font-bold text-primaryText">{section.title}</h3>
                  <ul>
                    {section.items.map((item, itemIndex) => (
                      <li key={`${item.name}-${itemIndex}`} className="mb-4">
                        <a
                          className="text-gray-400 hover:text-gray-300"
                          href={item.link}
                          aria-label={item.name}
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="text-center text-gray-400 mt-8">
          &copy; 2025 SOLOGID. All rights reserved.
        </div>
      </div>
    </footer>
  );
};