import React, { useState } from 'react';
import Header from './components/Header';
import Section from './components/Section';
import ExperienceItem from './components/ExperienceItem';
import EducationItem from './components/EducationItem';
import Footer from './components/Footer';
import { resumeData } from './constants';
import VentureItem from './components/VentureItem';
import HonorAwardItem from './components/HonorAwardItem';
import CertificationItem from './components/CertificationItem';
import ContactForm from './components/ContactForm';
import Toast from './components/Toast';
import PortfolioItem from './components/PortfolioItem';
import Chatbot from './components/Chatbot';

const App: React.FC = () => {
  const { personalInfo, summary, topSkills, experience, education, honorsAwards, ventures, certifications, portfolio } = resumeData;
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleFormSubmit = (success: boolean) => {
    setIsFormOpen(false);
    setToastMessage(success ? "Message sent successfully!" : "Failed to send message.");
    setShowToast(true);
  };

  return (
    <div className="font-sans text-gray-800">
      <Header name={personalInfo.name} />
      
      <main className="container mx-auto max-w-7xl px-6 pt-10 pb-20">
        {/* Hero Section */}
        <section id="hero" className="grid md:grid-cols-2 items-center pt-20 pb-20 sm:pt-28 sm:pb-28 gap-12">
          <div className="text-center md:text-left">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-black tracking-tight mb-4">
              {personalInfo.name}
            </h1>
            <p className="text-xl sm:text-2xl text-gray-700 mb-8">{personalInfo.title}</p>
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-transparent text-black font-bold py-3 px-8 rounded-full border border-black hover:bg-black hover:text-white transition duration-300 text-lg"
            >
              Get In Touch
            </button>
          </div>
          <div className="hidden md:block">
             <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="max-w-sm mx-auto">
              <path fill="#000000" d="M37.7,-63.3C51.2,-57.4,65.9,-51.1,75.4,-40.4C84.9,-29.7,89.2,-14.9,88.4,-0.4C87.6,14.2,81.7,28.4,72.3,39.7C62.9,51,49.9,59.5,36.7,66.1C23.5,72.7,10.1,77.4,-3.6,79.1C-17.3,80.7,-34.7,79.2,-48.5,71.8C-62.3,64.4,-72.6,51,-77.8,36.6C-83,22.2,-83.1,6.8,-79.8,-7.2C-76.5,-21.1,-70,-33.7,-60.5,-42.6C-51,-51.5,-38.6,-56.7,-26.7,-61.8C-14.9,-66.8,-3.6,-71.8,8.2,-74.6C20,-77.4,42.3,-78,37.7,-63.3" transform="translate(100 100)" />
            </svg>
          </div>
        </section>
        
        <div id="about" className="py-10 sm:py-16 grid md:grid-cols-3 gap-8 md:gap-16 items-start">
          <div className="md:col-span-1">
             <h2 className="text-3xl font-bold text-black border-l-4 border-black pl-4 sticky top-24">About Me</h2>
          </div>
          <div className="md:col-span-2">
             <p className="text-gray-600 leading-relaxed text-lg">{summary}</p>
          </div>
        </div>

        <div id="skills" className="py-10 sm:py-16 grid md:grid-cols-3 gap-8 md:gap-16 items-start">
            <div className="md:col-span-1">
                <h2 className="text-3xl font-bold text-black border-l-4 border-black pl-4 sticky top-24">Top Skills</h2>
            </div>
            <div className="md:col-span-2">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-lg">
                    {topSkills.map((skill, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg flex items-center hover:bg-gray-100 transition-colors">
                        <i className="fas fa-check-circle text-black mr-3"></i>
                        <span>{skill}</span>
                      </div>
                    ))}
                </div>
            </div>
        </div>

        <Section title="Experience" id="experience">
          <div className="space-y-12">
            {experience.map((exp, index) => (
              <ExperienceItem key={index} experience={exp} />
            ))}
          </div>
        </Section>

        <Section title="Product Portfolio" id="portfolio">
          <div className="space-y-12">
            {portfolio.map((project, index) => (
              <PortfolioItem key={index} project={project} />
            ))}
          </div>
        </Section>

        <Section title="Ventures" id="ventures">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ventures.map((venture, index) => (
              <VentureItem key={index} venture={venture} />
            ))}
          </div>
        </Section>
        
        <Section title="Education" id="education">
          <div className="space-y-8">
            {education.map((edu, index) => (
              <EducationItem key={index} education={edu} />
            ))}
          </div>
        </Section>

        <Section title="Certifications" id="certifications">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {certifications.map((cert, index) => <CertificationItem key={index} certification={cert} />)}
            </div>
        </Section>

         <Section title="Honors & Awards" id="honors">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {honorsAwards.map((award, index) => <HonorAwardItem key={index} award={award} />)}
            </div>
        </Section>

      </main>
      
      <Footer personalInfo={personalInfo} onEmailClick={() => setIsFormOpen(true)} />

      {isFormOpen && <ContactForm onClose={() => setIsFormOpen(false)} onFormSubmit={handleFormSubmit} />}
      {showToast && <Toast message={toastMessage} onClose={() => setShowToast(false)} />}
      
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-8 right-8 bg-black text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-3xl hover:bg-gray-800 transition-transform duration-300 z-40 transform hover:scale-110"
        aria-label="Chat with AI assistant"
      >
        <i className="fas fa-robot"></i>
      </button>

      {isChatOpen && <Chatbot onClose={() => setIsChatOpen(false)} />}
    </div>
  );
};

export default App;
