import React, { useState, useEffect } from 'react';

interface HeaderProps {
    name: string;
}

const Header: React.FC<HeaderProps> = ({ name }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const navItems = ["about", "skills", "experience", "portfolio", "ventures", "education", "certifications", "honors"];
    
    const navLabels: { [key: string]: string } = {
        about: "About",
        skills: "Skills",
        experience: "Experience",
        portfolio: "Portfolio",
        ventures: "Ventures",
        education: "Education",
        certifications: "Certifications",
        honors: "Honors & Awards",
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}>
            <nav className="container mx-auto max-w-7xl px-6 py-4">
                <div className="flex justify-between items-center">
                    <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }} className="text-2xl font-bold text-black hover:text-gray-700 transition-colors">
                        {name.split(' ').map(n => n[0]).join('')}
                    </a>
                    <ul className="hidden sm:flex space-x-8">
                        {navItems.map(item => (
                            <li key={item}>
                                <a href={`#${item}`} onClick={(e) => { e.preventDefault(); scrollToSection(item); }} className="text-lg text-gray-600 hover:text-black transition-colors font-medium">
                                    {navLabels[item] || item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;