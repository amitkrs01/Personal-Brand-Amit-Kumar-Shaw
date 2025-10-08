import React from 'react';

interface SectionProps {
  title: string;
  id: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, id, children }) => {
  return (
    <section id={id} className="py-10 sm:py-16">
      <h2 className="text-3xl font-bold text-black mb-8 sm:mb-12 border-l-4 border-black pl-4">
        {title}
      </h2>
      {children}
    </section>
  );
};

export default Section;