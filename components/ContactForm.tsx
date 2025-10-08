import React, { useState } from 'react';
import { resumeData } from '../constants';
import { countries } from '../data/countries';

interface ContactFormProps {
  onClose: () => void;
  onFormSubmit: (success: boolean) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onClose, onFormSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+91',
    phone: '',
    purpose: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const scriptURL = resumeData.personalInfo.googleScriptWebAppUrl;
    if (!scriptURL || scriptURL === "YOUR_GOOGLE_SCRIPT_WEB_APP_URL_HERE") {
        console.error("Google Script Web App URL is not configured.");
        onFormSubmit(false);
        setIsSubmitting(false);
        return;
    }

    const body = new FormData();
    // Prepend with a single quote to ensure Google Sheets treats it as a string
    const fullPhoneNumber = `'${formData.countryCode} ${formData.phone}`;
    
    body.append('Name', formData.name);
    body.append('Email', formData.email);
    body.append('Phone', fullPhoneNumber);
    body.append('Purpose', formData.purpose);

    try {
      const response = await fetch(scriptURL, {
        method: 'POST',
        body: body,
      });

      const result = await response.json();
      if (result.result === 'success') {
        onFormSubmit(true);
      } else {
        console.error('Form submission error:', result.error);
        onFormSubmit(false);
      }
    } catch (error) {
      console.error('An error occurred during form submission:', error);
      onFormSubmit(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 animate-fade-in-down"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative text-black transform transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 text-2xl" aria-label="Close form">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        <h2 className="text-4xl font-extrabold mb-8 text-center text-black">Get In Touch</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input 
              type="text" 
              name="name" 
              id="name"
              value={formData.name}
              onChange={handleChange}
              required 
              className="w-full bg-white border-2 border-gray-300 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input 
              type="email" 
              name="email" 
              id="email" 
              value={formData.email}
              onChange={handleChange}
              required 
              className="w-full bg-white border-2 border-gray-300 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <div className="flex items-center border-2 border-gray-300 rounded-xl focus-within:ring-2 focus-within:ring-black focus-within:border-black transition-all">
              <div className="relative w-[45%]">
                 <select
                  name="countryCode"
                  id="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  className="w-full bg-transparent border-0 focus:outline-none focus:ring-0 py-3 pl-4 pr-8 text-gray-900 appearance-none"
                >
                  {countries.map(country => (
                    <option key={country.code} value={country.dial_code}>
                      {country.name} ({country.dial_code})
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                </div>
              </div>
              <div className="w-px h-6 bg-gray-300 self-center"></div>
              <input 
                type="tel" 
                name="phone" 
                id="phone" 
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Your phone"
                className="w-[55%] bg-transparent border-0 focus:outline-none focus:ring-0 rounded-r-lg py-3 px-4"
              />
            </div>
          </div>
          <div>
            <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-2">Purpose</label>
            <textarea 
              name="purpose" 
              id="purpose" 
              rows={4}
              value={formData.purpose}
              onChange={handleChange}
              required 
              className="w-full bg-white border-2 border-gray-300 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all"
            ></textarea>
          </div>
          <div className="text-center pt-4">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-black text-white font-bold py-3 px-12 rounded-full hover:bg-gray-800 transition duration-300 text-lg w-full sm:w-auto disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;