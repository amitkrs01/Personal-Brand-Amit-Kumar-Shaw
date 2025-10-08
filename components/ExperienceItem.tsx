import React from 'react';
import { Experience } from '../types';

interface ExperienceItemProps {
  experience: Experience;
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({ experience }) => {
  const { company, role, duration, location, responsibilities } = experience;

  return (
    <div className="relative pl-8 border-l-2 border-gray-300">
       <div className="absolute w-4 h-4 bg-black rounded-full -left-2 top-1 border-4 border-white"></div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-1">
            <div>
                <h3 className="text-xl font-bold text-black">{role}</h3>
                <p className="font-semibold text-gray-700 text-lg">{company}</p>
            </div>
            <p className="text-sm text-gray-500 text-left sm:text-right min-w-max mt-2 sm:mt-0 sm:ml-4">{duration}</p>
        </div>
        <p className="text-sm text-gray-500 mb-4">{location}</p>
        
        {responsibilities.length > 0 && (
            <ul className="list-disc list-inside space-y-2 text-gray-600">
                {responsibilities.map((resp, index) => (
                <li key={index}>{resp}</li>
                ))}
            </ul>
        )}
    </div>
  );
};

export default ExperienceItem;