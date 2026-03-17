import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import { useLanguage } from '../context/LanguageContext';
import { getTranslation } from '../translations';

const CARD_SIZE_FACTOR = 1 / 1.05; // smaller slots so hover doesn't overflow
const GAP_PX_MOBILE = 16; // gap-4
const GAP_PX_DESKTOP = 40; // gap-10

export default function Projects() {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);
  const [hoveredId, setHoveredId] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideStepPx, setSlideStepPx] = useState(0);
  const trackContainerRef = useRef(null);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [gapPx, setGapPx] = useState(GAP_PX_DESKTOP);
  const maxIndex = Math.max(0, projects.length - cardsPerView);

  useEffect(() => {
    const md = window.matchMedia('(min-width: 768px)');
    const lg = window.matchMedia('(min-width: 1024px)');
    const update = () => {
      if (lg.matches) {
        setCardsPerView(3);
        setGapPx(GAP_PX_DESKTOP);
      } else if (md.matches) {
        setCardsPerView(2);
        setGapPx(GAP_PX_DESKTOP);
      } else {
        setCardsPerView(1);
        setGapPx(GAP_PX_MOBILE);
      }
    };
    update();
    md.addEventListener('change', update);
    lg.addEventListener('change', update);
    return () => {
      md.removeEventListener('change', update);
      lg.removeEventListener('change', update);
    };
  }, []);

  useEffect(() => {
    const el = trackContainerRef.current;
    if (!el) return;
    const updateStep = () => {
      const w = el.offsetWidth;
      setSlideStepPx(w ? (w - (cardsPerView - 1) * gapPx) / cardsPerView + gapPx : 0);
    };
    updateStep();
    const ro = new ResizeObserver(updateStep);
    ro.observe(el);
    return () => ro.disconnect();
  }, [cardsPerView, gapPx]);

  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const nextCards = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevCards = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const cardWidthPx = slideStepPx > 0 ? (slideStepPx - gapPx) * CARD_SIZE_FACTOR : 280 * CARD_SIZE_FACTOR;
  const stepDistancePx = cardWidthPx + gapPx;

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
              className="absolute left-2 md:left-0 top-1/2 -translate-y-1/2 translate-x-0 md:-translate-x-4 z-10 w-12 h-12 rounded-full bg-gray-800 border border-gray-700 text-emerald-400 hover:bg-emerald-400 hover:text-white transition-all duration-300 flex items-center justify-center shadow-lg hover:scale-110"
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
              className="flex flex-row gap-4 md:gap-10"
              style={{
                width: projects.length * cardWidthPx + (projects.length - 1) * gapPx,
              }}
              animate={{ x: -currentIndex * stepDistancePx }}
              transition={{ type: 'tween', ease: 'easeInOut', duration: 0.5 }}
            >
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  style={{
                    flex: `0 0 ${cardWidthPx}px`,
                    minWidth: 0,
                  }}
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 0.9 }}
                  onHoverStart={() => setHoveredId(project.id)}
                  onHoverEnd={() => setHoveredId(null)}
                  whileHover={{
                    scale: 0.9,
                    y: -9,
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
                    transition: { duration: 0.3, ease: 'easeOut' },
                  }}
                  className={`bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-700 transition-all duration-300 ${hoveredId && hoveredId !== project.id ? 'blur-sm opacity-50' : ''}`}
                >
                  <div className="h-36 md:h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-200 hover:scale-110"
                    />
                  </div>
                  <div className="p-4 md:p-6">
                    <h3 className="text-lg md:text-xl font-bold text-gray-100 mb-2">{project.title}</h3>
                    <p className="text-gray-300 text-sm md:text-base mb-4">{project.description}</p>
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
              className="absolute right-2 md:right-0 top-1/2 -translate-y-1/2 translate-x-0 md:translate-x-4 z-10 w-12 h-12 rounded-full bg-gray-800 border border-gray-700 text-emerald-400 hover:bg-emerald-400 hover:text-white transition-all duration-300 flex items-center justify-center shadow-lg hover:scale-110"
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

