import React from 'react';
import { Education } from '../types';

interface EducationItemProps {
  education: Education;
}

const EducationItem: React.FC<EducationItemProps> = ({ education }) => {
  const { institution, degree, duration } = education;

  return (
    <div className="bg-gray-50 p-6 rounded-lg hover:bg-gray-100 transition-colors">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-1">
            <h3 className="text-xl font-bold text-black">{institution}</h3>
            <p className="text-sm text-gray-500 text-left sm:text-right min-w-max mt-2 sm:mt-0 sm:ml-4">{duration}</p>
        </div>
      <p className="text-md text-gray-700">{degree}</p>
    </div>
  );
};

export default EducationItem;