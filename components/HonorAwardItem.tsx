import React from 'react';
import { HonorAward } from '../types';

interface HonorAwardItemProps {
  award: HonorAward;
}

const HonorAwardItem: React.FC<HonorAwardItemProps> = ({ award }) => {
  const { title, issuer, date, description } = award;

  return (
    <div className="bg-gray-50 p-6 rounded-lg hover:bg-gray-100 transition-colors flex flex-col h-full">
      <h3 className="text-xl font-bold text-black">{title}</h3>
      <p className="font-semibold text-gray-700 text-lg mb-2">{issuer}</p>
      {description && <p className="text-gray-600 text-sm flex-grow">{description}</p>}
      <p className="text-sm text-gray-500 mt-auto pt-2">{date}</p>
    </div>
  );
};

export default HonorAwardItem;