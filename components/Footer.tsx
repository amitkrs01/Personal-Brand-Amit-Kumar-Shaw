import React from 'react';
import { ResumeData } from '../types';

interface FooterProps {
  personalInfo: ResumeData['personalInfo'];
  onEmailClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ personalInfo, onEmailClick }) => {
  return (
    <footer id="contact" className="bg-black text-white py-10">
      <div className="container mx-auto max-w-5xl px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Let's Connect</h2>
        <p className="text-gray-400 mb-6 max-w-md mx-auto">
          I'm open to new opportunities and collaborations. Feel free to reach out.
        </p>
        <div className="flex justify-center space-x-6 mb-8">
          <a href={`https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-3xl text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
            <i className="fab fa-linkedin"></i>
          </a>
          <button onClick={onEmailClick} className="text-3xl text-gray-400 hover:text-white transition-colors" aria-label="Email">
            <i className="fas fa-envelope"></i>
          </button>
          <a href={`tel:${personalInfo.phone}`} target="_blank" rel="noopener noreferrer" className="text-3xl text-gray-400 hover:text-white transition-colors" aria-label="Phone">
            <i className="fas fa-phone"></i>
          </a>
        </div>
        <p className="text-gray-500">&copy; {new Date().getFullYear()} {personalInfo.name}. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;