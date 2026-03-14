import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import CommunicationLanguages from './components/CommunicationLanguages';
import Reviews from './components/Reviews';
import Connect from './components/Connect';
import Footer from './components/Footer';
import ForGeeksPage from './components/ForGeeksPage';
import './index.css';

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <CommunicationLanguages />
      <Reviews />
      <Connect />
      <Footer />
    </>
  );
}

function Layout() {
  const { language } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const pathname = useLocation().pathname;
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-lang', language);
  }, [language]);

  useEffect(() => {
    if (pathname !== '/') return;
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
  }, [pathname]);

  return (
    <div className="text-gray-100 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <Navigation
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        activeSection={activeSection}
        closeMenu={closeMenu}
      />
      <Outlet />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="forgeeks" element={<ForGeeksPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}
