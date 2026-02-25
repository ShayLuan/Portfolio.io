import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import { useLanguage } from '../context/LanguageContext';
import { getTranslation } from '../translations';

const GAP_PX = 40; // gap-10 = 2.5rem

export default function Projects() {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);
  const [hoveredId, setHoveredId] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideStepPx, setSlideStepPx] = useState(0);
  const trackContainerRef = useRef(null);
  const cardsPerView = 3;
  const maxIndex = Math.max(0, projects.length - cardsPerView);

  useEffect(() => {
    const el = trackContainerRef.current;
    if (!el) return;
    const updateStep = () => {
      const w = el.offsetWidth;
      setSlideStepPx(w ? (w - (cardsPerView - 1) * GAP_PX) / cardsPerView + GAP_PX : 0);
    };
    updateStep();
    const ro = new ResizeObserver(updateStep);
    ro.observe(el);
    return () => ro.disconnect();
  }, [cardsPerView]);

  const nextCards = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevCards = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

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

          {/* Cards: overflow window + sliding track */}
          <div ref={trackContainerRef} className="overflow-hidden">
            <motion.div
              className="flex flex-row gap-10"
              style={{
                width: slideStepPx > 0
                  ? projects.length * (slideStepPx - GAP_PX) + (projects.length - 1) * GAP_PX
                  : projects.length * 280 + (projects.length - 1) * GAP_PX,
              }}
              animate={{ x: -currentIndex * slideStepPx }}
              transition={{ type: 'tween', ease: 'easeInOut', duration: 0.5 }}
            >
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  style={{
                    flex: `0 0 ${slideStepPx > 0 ? slideStepPx - GAP_PX : 280}px`,
                    minWidth: 0,
                  }}
                  onHoverStart={() => setHoveredId(project.id)}
                  onHoverEnd={() => setHoveredId(null)}
                  whileHover={{
                    scale: 1.05,
                    y: -10,
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
                    transition: { duration: 0.3, ease: 'easeOut' },
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
            </motion.div>
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

