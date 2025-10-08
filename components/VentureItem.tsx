import React from 'react';
import { Venture } from '../types';

interface VentureItemProps {
  venture: Venture;
}

const VentureItem: React.FC<VentureItemProps> = ({ venture }) => {
  const { name, role, description } = venture;

  return (
    <div className="bg-gray-50 p-6 rounded-lg hover:bg-gray-100 transition-colors flex flex-col h-full">
        <h3 className="text-xl font-bold text-black">{name}</h3>
        <p className="font-semibold text-gray-700 text-lg mb-3">{role}</p>
        <p className="text-gray-600 text-sm flex-grow">{description}</p>
    </div>
  );
};

export default VentureItem;