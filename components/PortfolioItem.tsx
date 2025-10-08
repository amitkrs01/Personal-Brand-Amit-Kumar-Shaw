import React from 'react';
import { PortfolioProject, PortfolioFeature } from '../types';

interface PortfolioItemProps {
  project: PortfolioProject;
}

const PortfolioItem: React.FC<PortfolioItemProps> = ({ project }) => {
  return (
    <div className="bg-white border border-gray-200 p-6 sm:p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-2xl font-bold text-black mb-6 border-l-4 border-black pl-4">{project.title}</h3>
      <div className="space-y-6">
        {project.products.map((product, pIndex) => (
          <div key={pIndex} className="bg-gray-50/50 p-4 rounded-md">
            <h4 className="text-xl font-semibold text-gray-800 mb-3">{product.name}</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700 pl-2">
              {product.features.map((feature, fIndex) => {
                if (typeof feature === 'string') {
                  return <li key={fIndex}>{feature}</li>;
                }
                const portfolioFeature = feature as PortfolioFeature;
                return (
                  <li key={fIndex}>
                    {portfolioFeature.name}
                    {portfolioFeature.details && portfolioFeature.details.length > 0 && (
                      <ul className="list-['–'] list-inside space-y-1 text-gray-600 pl-6 mt-1">
                        {portfolioFeature.details.map((detail, dIndex) => (
                          <li key={dIndex}>{detail}</li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioItem;