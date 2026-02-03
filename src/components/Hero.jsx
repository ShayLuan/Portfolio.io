import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { getTranslation } from '../translations';

export default function Hero() {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);
  return (
    <section id="hero" className="pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-20">
        {/* Animated grid */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite'
        }}></div>
        
        {/* Floating geometric shapes */}
        {[...Array(6)].map((_, i) => {
          const positions = [
            { x: '10%', y: '15%' },
            { x: '85%', y: '20%' },
            { x: '15%', y: '70%' },
            { x: '80%', y: '75%' },
            { x: '45%', y: '10%' },
            { x: '60%', y: '85%' }
          ];
          const colors = [
            'rgba(16, 185, 129, 0.4)',
            'rgba(20, 184, 166, 0.4)',
            'rgba(34, 197, 94, 0.4)',
            'rgba(16, 185, 129, 0.3)',
            'rgba(20, 184, 166, 0.3)',
            'rgba(34, 197, 94, 0.3)'
          ];
          return (
            <motion.div
              key={i}
              className="absolute"
              initial={{
                x: positions[i].x,
                y: positions[i].y,
                opacity: 0.1,
                scale: 0.8
              }}
              animate={{
                x: [
                  positions[i].x,
                  `${parseFloat(positions[i].x) + (Math.random() * 20 - 10)}%`,
                  positions[i].x
                ],
                y: [
                  positions[i].y,
                  `${parseFloat(positions[i].y) + (Math.random() * 20 - 10)}%`,
                  positions[i].y
                ],
                opacity: [0.1, 0.3, 0.1],
                rotate: 360,
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 15 + i * 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                width: '20px',
                height: '20px',
                border: `2px solid ${colors[i]}`,
                borderRadius: i % 2 === 0 ? '50%' : '0%',
                transform: i % 2 === 0 ? 'rotate(45deg)' : 'none'
              }}
            />
          );
        })}
        
        {/* Animated connecting lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <motion.line
            x1="10%"
            y1="20%"
            x2="30%"
            y2="40%"
            stroke="rgba(16, 185, 129, 0.3)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.line
            x1="70%"
            y1="30%"
            x2="90%"
            y2="50%"
            stroke="rgba(20, 184, 166, 0.3)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <motion.line
            x1="20%"
            y1="70%"
            x2="50%"
            y2="80%"
            stroke="rgba(34, 197, 94, 0.3)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
        </svg>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-10">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400 leading-tight"
              style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'block', minHeight: '1.2em' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              {t('hero.greeting')} <span style={{ fontFamily: 'Neonderthaw, cursive' }}>{t('hero.name')}</span>
            </motion.h1>
          </div>
          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {t('hero.description')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row justify-center gap-4 mt-8"
          >
            <motion.a
              href="#projects"
              className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              {t('hero.viewProjects')}
            </motion.a>
            <motion.a
              href="#connect"
              className="px-6 py-3 bg-gray-800 border border-gray-700 text-gray-200 font-medium rounded-lg shadow hover:shadow-md transition-all duration-300 hover:bg-gray-700"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('hero.connect')}
            </motion.a>
          </motion.div>
        </motion.div>
        
        {/* Decorative elements with green theme */}
        <div className="mt-20 relative">
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-emerald-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-teal-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 -right-10 w-28 h-28 bg-green-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
      </div>
    </section>
  );
}

