import React from 'react';

interface SectionProps {
  title: string;
  id: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, id, children }) => {
  return (
    <section id={id} className="py-10 sm:py-16">
      <div className="mb-8 sm:mb-12">
         <h2 className="text-3xl font-bold text-black border-l-4 border-black pl-4">
            {title}
        </h2>
      </div>
      <div>
        {children}
      </div>
    </section>
  );
};

export default Section;
