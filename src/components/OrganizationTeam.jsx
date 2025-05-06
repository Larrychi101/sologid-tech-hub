import React from 'react';

const teamMembers = [
  {
    name: 'Lawrence Chiagozie',
    role: 'Founder/CTO',
    image: '/images/team1.jpg', // Updated path
    description: 'Lawrence is an experienced Azure DevOps engineer with a strong background in cloud and edge computing. His expertise drives our technological innovations and strategic direction',
    linkedin: 'https://www.linkedin.com/in/lawrence-chiagozie-450435189/',
  },
  {
    name: 'Emmanuel Adebayo',
    role: 'COO',
    image: '/images/team2.jpg', // Updated path
    description: 'Emmanuel is a seasoned support engineer specializing in Microsoft Azure. His operational excellence ensures our services run smoothly and efficiently',
    linkedin: 'https://www.linkedin.com/in/emmanuel-adebayo-cloud-doc/',
  },
  {
    name: 'Christopher Adebayo',
    role: 'Brand identity designer',
    image: '/images/team3.jpg', // Updated path
    description: 'Christopher is a creative force with extensive experience in the Adobe tech stack. He crafts compelling brand identities that resonate with our audience and elevate our visual presence',
    linkedin: 'https://www.linkedin.com/in/christopher-adebayo-979514247/',
  },
  {
    name: 'Uzoma Mgbugba',
    role: 'Content creator',
    image: '/images/team4.jpg', // Updated path
    description: 'Uzoma is a talented content creator with a knack for podcasting and brand storytelling. His engaging content brings our brands story to life and connects with our community',
    linkedin: 'https://www.linkedin.com/in/uzoma-corinthians-94326429a/',
  },
];

const OrganizationTeamComponent = () => (
  <div className="container mx-auto px-4 py-32 bg-bgDark1"> {/* Increased top padding */}
    <h1 className="text-4xl font-bold text-center mb-12 text-white">Meet Our Team</h1>
    <div className="flex flex-wrap justify-center">
      {teamMembers.map((member, index) => (
        <div key={index} className="w-full md:w-1/2 lg:w-1/4 p-4 flex">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
            <img src={member.image} alt={member.name} className="w-full h-64 object-cover" />
            <div className="p-6 flex-grow flex flex-col">
              <h2 className="text-xl font-bold mb-2">{member.name}</h2>
              <p className="text-gray-700 mb-4">{member.role}</p>
              <p className="text-gray-600 mb-4 flex-grow">{member.description}</p>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-white bg-[#7276f3] hover:bg-[#5e62d1] rounded-full px-4 py-2 mt-auto"
              >
                Find on LinkedIn
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default OrganizationTeamComponent;