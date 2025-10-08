import React from 'react';
import { Certification } from '../types';

interface CertificationItemProps {
  certification: Certification;
}

const CertificationItem: React.FC<CertificationItemProps> = ({ certification }) => {
  const { title, issuer, date } = certification;

  return (
    <div className="bg-gray-50 p-6 rounded-lg hover:bg-gray-100 transition-colors flex flex-col h-full">
      <h3 className="text-xl font-bold text-black mb-1">{title}</h3>
      <p className="font-semibold text-gray-700 text-lg">{issuer}</p>
      <p className="text-sm text-gray-500 mt-auto pt-2">{date}</p>
    </div>
  );
};

export default CertificationItem;