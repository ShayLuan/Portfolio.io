import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import { useLanguage } from '../context/LanguageContext';
import { getTranslation } from '../translations';

export default function Projects() {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);
  const [hoveredId, setHoveredId] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const cardsPerView = 3;
  const maxIndex = Math.max(0, projects.length - cardsPerView);

  const nextCards = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevCards = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const visibleProjects = projects.slice(currentIndex, currentIndex + cardsPerView);

  return (
    <section id="projects" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400" style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{t('projects.title')}</h2>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
            {t('projects.description')}
          </p>
        </motion.div>
        
        <div className="relative">
          {/* Left Navigation Button */}
          {projects.length > cardsPerView && (
            <button
              onClick={prevCards}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-gray-800 border border-gray-700 text-emerald-400 hover:bg-emerald-400 hover:text-white transition-all duration-300 flex items-center justify-center shadow-lg hover:scale-110"
              aria-label="Previous projects"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Cards Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 relative">
            {visibleProjects.map((project, index) => (
              <motion.div
                key={`${project.id}-${currentIndex}`}
                initial={{ 
                  opacity: 0, 
                  x: direction > 0 ? 100 : direction < 0 ? -100 : 0,
                  scale: 0.9
                }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  scale: 1
                }}
                transition={{ 
                  duration: 0.4, 
                  ease: "easeOut",
                  delay: index * 0.05
                }}
                onHoverStart={() => setHoveredId(project.id)}
                onHoverEnd={() => setHoveredId(null)}
                whileHover={{ 
                  scale: 1.05,
                  y: -10, 
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className={`bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-700 transition-all duration-300 ${hoveredId && hoveredId !== project.id ? 'blur-sm opacity-50' : ''}`}
              >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-200 hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-100 mb-2">{project.title}</h3>
                    <p className="text-gray-300 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.tech.map((tech, i) => (
                        <span 
                          key={i} 
                          className="px-3 py-1 bg-green-900/50 text-green-300 text-sm rounded-full font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-emerald-400 font-medium hover:text-emerald-300 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      <span className="mr-2">🐙</span> {t('projects.viewOnGitHub')}
                    </motion.a>
                  </div>
                </motion.div>
              ))}
          </div>

          {/* Right Navigation Button */}
          {projects.length > cardsPerView && (
            <button
              onClick={nextCards}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-gray-800 border border-gray-700 text-emerald-400 hover:bg-emerald-400 hover:text-white transition-all duration-300 flex items-center justify-center shadow-lg hover:scale-110"
              aria-label="Next projects"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center mt-16"
        >
          <motion.a
            href="https://github.com/ShayLuan"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('projects.viewAll')}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

