import Navbar from '../components/Navbar';
import Starfield from '../components/Starfield';
import { Github, Linkedin } from 'lucide-react';

/**
 * TeamMemberCard Component
 * Displays individual team member with profile image, name, and social links
 * Used in both featured and core team sections
 */
const TeamMemberCard = ({ name, role, image, github, linkedin, isFeatured = false }) => {
  return (
    <div
      className={`group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden hover:bg-white/10 hover:border-cosmic-purple/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
    >
      {/* Profile Image Container - Rectangular with soft rounded corners */}
      <div className={`relative overflow-hidden bg-gradient-to-br from-cosmic-purple/20 to-nebula-pink/20 h-36 sm:h-44 md:h-52`}>
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-lg m-2 hover:scale-105 transition-transform duration-300"
        />
        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-cosmic-purple/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg m-2" />
      </div>

      {/* Member Info */}
      <div className={`p-2 sm:p-3 flex flex-col justify-between h-24 sm:h-32 ${isFeatured ? 'text-center' : ''}`}>
        <div>
          <h3 className={`font-bold text-white transition-colors duration-300 text-sm sm:text-base mb-0.5`}>
            {name}
          </h3>

          {/* Role - Only shown for featured members */}
          {isFeatured && role && (
            <p className="text-xs text-cosmic-purple font-semibold mb-1">
              {role}
            </p>
          )}
        </div>

        {/* Social Links */}
        <div className={`flex gap-3 ${isFeatured ? 'justify-center' : 'justify-start'}`}>
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full glass-effect flex items-center justify-center text-cosmic-purple hover:text-white hover:glow-effect transition-all duration-300"
              aria-label={`${name}'s GitHub`}
              title={`${name}'s GitHub`}
            >
              <Github size={18} />
            </a>
          )}
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full glass-effect flex items-center justify-center text-cosmic-purple hover:text-blue-500 hover:glow-effect transition-all duration-300"
              aria-label={`${name}'s LinkedIn`}
              title={`${name}'s LinkedIn`}
            >
              <Linkedin size={18} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const Team = () => {
  // Featured Team Member (Technical Secretary)
  const technicalSecretary = {
    name: 'sameer chaudhary',
    role: 'Technical Secretary',
    image: '',
    github: 'https://github.com/AdmGenSameer',
    linkedin: 'https://www.linkedin.com/in/sameer-chaudhary-3a341027a/',
  };

  // Core Team Members
  const coreTeamMembers = [
    {
      name: 'Prem Kumar r',
      image: '/picture-prem.png',
      github: 'https://github.com/prem-ramamoorthy',
      linkedin: 'https://linkedin.com/in/premramamoorthy',
    },
    {
      name: 'Divyanshu Dwivedi',
      image: '/picture-divyanshu.png',
      github: 'https://github.com/divyanshu12-fullstack',
      linkedin: 'https://www.linkedin.com/in/divyanshu-dwivedi-4963282b9/',
    },
    {
      name: 'Abhishek Tripathi',
      image: '/picture-abhishek.png',
      github: 'https://github.com/Abhishekhack2909',
      linkedin: 'https://www.linkedin.com/in/abhishek-tripathi-a714ab30b/',
    },
    {
      name: 'Poorva Jaiswal',
      image: '/picture-poorva.png',
      github: 'https://github.com/Poorva77',
      linkedin: 'https://www.linkedin.com/in/poorva-jaiswal-53aa29303/',
    },
  ];

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-space-black via-midnight-blue to-space-black">
      {/* Starfield background */}
      <Starfield />

      <div className="relative z-10">
        <Navbar />

        {/* Main Content with padding for navbar */}
        <main className="pt-20 sm:pt-24 w-full px-0 sm:px-0 py-8 sm:py-12">
          {/* Hero Section - Combined Intro & Tagline */}
          <section className="mb-12 sm:mb-16 py-8 sm:py-10 px-6 sm:px-8 text-center border-b border-cosmic-purple/20 bg-gradient-to-br from-cosmic-purple/10 via-nebula-pink/5 to-cosmic-purple/10 backdrop-blur-sm shadow-md shadow-cosmic-purple/10 animate-fade-in-up w-full">
            {/* Main Heading with Glow */}
            <h1 className="text-2xl sm:text-3xl font-bold text-glow mb-2 sm:mb-3">
              Meet the Team Behind DSC Winter of Code
            </h1>
            
            {/* Description with Glow */}
            <p className="text-xs sm:text-sm text-glow leading-relaxed max-w-3xl mx-auto mb-4 sm:mb-5 opacity-90">
              Our talented community of designers, developers, and data enthusiasts work tirelessly to 
              create an inclusive platform for learning and contributing to open-source projects.
            </p>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-cosmic-purple/30 to-transparent my-3 sm:my-4"></div>

            {/* Team Tagline with Glow */}
            <h2 className="text-base sm:text-lg font-bold text-glow mb-0.5">
              Software Development Team
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-glow opacity-90">
              Data Science Club
            </p>
          </section>

          {/* All Team Members Section - Combined Grid */}
          <section className="mb-12 sm:mb-16 px-6 sm:px-8 max-w-7xl mx-auto">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-5 sm:mb-8 text-center">
              Members
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
              {/* Technical Secretary - Featured (centered on mobile) */}
              <div
                className="col-span-2 sm:col-span-1 flex justify-center animate-fade-in-up"
                style={{ animationDelay: '0ms' }}
              >
                <div className="w-40 sm:w-auto">
                  <TeamMemberCard
                    name={technicalSecretary.name}
                    role={technicalSecretary.role}
                    image={technicalSecretary.image}
                    github={technicalSecretary.github}
                    linkedin={technicalSecretary.linkedin}
                    isFeatured={true}
                  />
                </div>
              </div>

              {/* Core Team Members */}
              {coreTeamMembers.map((member, index) => (
                <div
                  key={index}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${(index + 1) * 100}ms` }}
                >
                  <TeamMemberCard
                    name={member.name}
                    image={member.image}
                    github={member.github}
                    linkedin={member.linkedin}
                    isFeatured={false}
                  />
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* Mini Footer */}
        <footer className="relative mt-12 sm:mt-16 py-6 sm:py-8 px-6 sm:px-8 border-t border-cosmic-purple/20 bg-gradient-to-b from-cosmic-purple/5 to-transparent">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs sm:text-sm text-gray-400 text-center sm:text-left">
              © 2025 DSC Winter of Code. Built with 💜 for open source.
            </p>
            <div className="flex gap-4 sm:gap-6">
              <a href="https://github.com/cdsvitbhopal" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cosmic-purple transition-colors text-xs sm:text-sm">
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/data-science-club-vit-bhopal-5b9b02232/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cosmic-purple transition-colors text-xs sm:text-sm">
                LinkedIn
              </a>
              <a href="mailto:dsc.vitb@vitbhopal.ac.in" className="text-gray-400 hover:text-cosmic-purple transition-colors text-xs sm:text-sm">
                Contact
              </a>
              <a href="https://www.instagram.com/dsc_vitb/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cosmic-purple transition-colors text-xs sm:text-sm">
                Instagram
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Team;
