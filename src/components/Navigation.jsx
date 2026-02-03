import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navigation({ isMenuOpen, setIsMenuOpen, activeSection, closeMenu }) {
  const [currentLanguage, setCurrentLanguage] = useState('EN');
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

  const languages = [
    { code: 'EN', flag: 'https://flagcdn.com/w20/ca.png', name: 'English' }, // Canada
    { code: 'FR', flag: 'https://flagcdn.com/w20/ca.png', name: 'French' }, // Canadian French
    { code: 'ZH', flag: 'https://flagcdn.com/w20/cn.png', name: 'Mandarin' } // China
  ];

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];
  return (
    <nav className="fixed w-full bg-gray-900/90 backdrop-blur-sm z-50 shadow-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-xl">
              SL
            </div>
            <span 
              className="font-bold text-xl"
              style={{ 
                WebkitTextStroke: '1px rgba(16, 185, 129, 0.8)',
                textStroke: '1px rgba(16, 185, 129, 0.8)',
                WebkitTextFillColor: 'transparent',
                color: 'transparent'
              }}
            >
              Portfolio
            </span>
          </motion.div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {['About', 'Projects', 'Skills', 'Connect'].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={closeMenu}
                className={`font-medium transition-all duration-300 ${
                  activeSection === item.toLowerCase() 
                    ? 'text-emerald-400 font-bold' 
                    : 'text-gray-300 hover:text-emerald-400'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
              </motion.a>
            ))}
            <span className="text-gray-600 mx-2">|</span>
            <div className="relative">
              <motion.button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="flex items-center space-x-2 text-gray-300 hover:text-emerald-400 transition-colors font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img 
                  src={currentLang.flag} 
                  alt={currentLang.name}
                  className="w-5 h-4 object-cover rounded-sm"
                />
                <span>{currentLang.code}</span>
                <svg 
                  className={`w-4 h-4 transition-transform duration-200 ${isLanguageMenuOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.button>
              
              <AnimatePresence>
                {isLanguageMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-40 bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden z-50"
                    onMouseLeave={() => setIsLanguageMenuOpen(false)}
                  >
                    {languages.map((lang) => (
                      <motion.button
                        key={lang.code}
                        onClick={() => {
                          setCurrentLanguage(lang.code);
                          setIsLanguageMenuOpen(false);
                        }}
                        className={`w-full px-4 py-2 text-left flex items-center space-x-2 transition-colors ${
                          currentLanguage === lang.code
                            ? 'bg-emerald-900/50 text-emerald-400'
                            : 'text-gray-300 hover:bg-gray-700'
                        }`}
                        whileHover={{ x: 4 }}
                      >
                        <img 
                          src={lang.flag} 
                          alt={lang.name}
                          className="w-5 h-4 object-cover rounded-sm"
                        />
                        <span>{lang.code}</span>
                        {currentLanguage === lang.code && (
                          <span className="ml-auto text-emerald-400">✓</span>
                        )}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 focus:outline-none"
              whileTap={{ scale: 0.9 }}
            >
              <div className="space-y-1.5">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-6 h-0.5 bg-gray-300 rounded"
                    initial={false}
                    animate={{
                      rotate: isMenuOpen ? (i === 1 ? 45 : i === 0 ? 45 : -45) : 0,
                      y: isMenuOpen ? (i === 1 ? 0 : i === 0 ? 6 : -6) : i * 4,
                      opacity: isMenuOpen && i === 1 ? 0 : 1
                    }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </div>
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-gray-900 border-t border-gray-800"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {['About', 'Projects', 'Skills', 'Connect'].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={closeMenu}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  activeSection === item.toLowerCase()
                    ? 'bg-emerald-900/50 text-emerald-400'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
                whileTap={{ scale: 0.98 }}
              >
                {item}
              </motion.a>
            ))}
            <div className="border-t border-gray-700 mt-2 pt-2">
              <div className="px-3 py-2 text-gray-400 text-sm font-medium mb-1">Language</div>
              {languages.map((lang) => (
                <motion.button
                  key={lang.code}
                  onClick={() => {
                    setCurrentLanguage(lang.code);
                    setIsLanguageMenuOpen(false);
                  }}
                  className={`w-full px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center space-x-2 ${
                    currentLanguage === lang.code
                      ? 'bg-emerald-900/50 text-emerald-400'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                  whileTap={{ scale: 0.98 }}
                >
                  <img 
                    src={lang.flag} 
                    alt={lang.name}
                    className="w-5 h-4 object-cover rounded-sm"
                  />
                  <span>{lang.code}</span>
                  {currentLanguage === lang.code && (
                    <span className="ml-auto text-emerald-400">✓</span>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}

