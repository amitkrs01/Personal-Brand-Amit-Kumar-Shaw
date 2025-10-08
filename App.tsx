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

const App: React.FC = () => {
  const { personalInfo, summary, topSkills, experience, education, honorsAwards, ventures, certifications } = resumeData;
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleFormSubmit = (success: boolean) => {
    setIsFormOpen(false);
    setToastMessage(success ? "Message sent successfully!" : "Failed to send message.");
    setShowToast(true);
  };

  return (
    <div className="font-sans text-gray-800">
      <Header name={personalInfo.name} />
      
      <main className="container mx-auto max-w-5xl px-6 pt-10 pb-20">
        {/* Hero Section */}
        <section id="hero" className="flex flex-col items-center justify-center text-center pt-20 pb-20 sm:pt-28 sm:pb-28">
          <div>
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
        </section>
        
        <Section title="About Me" id="about">
          <p className="text-gray-600 leading-relaxed text-lg">{summary}</p>
        </Section>

        <Section title="Top Skills" id="skills">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-lg">
              {topSkills.map((skill, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg flex items-center hover:bg-gray-100 transition-colors">
                  <i className="fas fa-check-circle text-black mr-3"></i>
                  <span>{skill}</span>
                </div>
              ))}
          </div>
        </Section>

        <Section title="Experience" id="experience">
          <div className="space-y-12">
            {experience.map((exp, index) => (
              <ExperienceItem key={index} experience={exp} />
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
      
    </div>
  );
};

export default App;