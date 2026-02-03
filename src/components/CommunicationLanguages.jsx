import React from 'react';
import { motion } from 'framer-motion';
import { languages, currentlyLearning } from '../data/languages';
import { useLanguage } from '../context/LanguageContext';
import { getTranslation } from '../translations';

export default function CommunicationLanguages() {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);
  
  // Map language names to translation keys
  const getLanguageTranslationKey = (name) => {
    const mapping = {
      "English": "languages.languageNames.english",
      "French": "languages.languageNames.french",
      "Mandarin": "languages.languageNames.mandarin",
      "Spanish": "languages.languageNames.spanish",
      "Russian": "languages.languageNames.russian"
    };
    return mapping[name] || name;
  };
  
  return (
    <section id="languages" className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400" style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{t('languages.title')}</h2>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
            {t('languages.caption')}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {languages.map((language, index) => (
            <motion.div
              key={language.name}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="space-y-2"
            >
              <div className="flex justify-between text-sm font-medium text-gray-200">
                <span>{t(getLanguageTranslationKey(language.name))}</span>
                <span>{language.level}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${language.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full"
                ></motion.div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {currentlyLearning.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-12 text-center"
          >
            <h3 className="text-lg font-semibold text-gray-300 mb-4">{t('languages.currentlyLearning')}</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {currentlyLearning.map((language, index) => (
                <motion.span
                  key={language}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                  className="px-4 py-2 bg-emerald-900/50 text-emerald-300 rounded-full font-medium border border-emerald-700/50"
                >
                  {t(getLanguageTranslationKey(language))}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
