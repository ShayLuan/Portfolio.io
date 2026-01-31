import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import CommunicationLanguages from './components/CommunicationLanguages';
import Connect from './components/Connect';
import Footer from './components/Footer';
import './index.css';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  
  // Close mobile menu when clicking a link
  const closeMenu = () => setIsMenuOpen(false);
  
  // Handle scroll spy for active section highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'projects', 'skills', 'connect'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop && 
            scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="text-gray-100 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <Navigation 
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        activeSection={activeSection}
        closeMenu={closeMenu}
      />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <CommunicationLanguages />
      <Connect />
      <Footer />
    </div>
  );
}

