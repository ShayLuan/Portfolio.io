import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { skills } from '../data/skills';
import { interests } from '../data/interests';
import { useLanguage } from '../context/LanguageContext';
import { getTranslation } from '../translations';

export default function Skills() {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);
  const [activeTab, setActiveTab] = useState('technical');

  // Map interest names to translation keys
  const getInterestTranslationKey = (name) => {
    const mapping = {
      "Backend Development": "interests.backendDevelopment",
      "System Design": "interests.systemDesign",
      "Database Optimization": "interests.databaseOptimization",
      "API Development": "interests.apiDevelopment",
      "Performance Tuning": "interests.performanceTuning",
      "Cloud Architecture": "interests.cloudArchitecture",
      "Game/Game Engine Development": "interests.gameGameEngineDevelopment",
      "Bare-metal/Embedded Development": "interests.bareMetalEmbeddedDevelopment",
      "Healthcare Research": "interests.healthcareResearch",
      "AI/ML/LLM Development": "interests.aiMlLlmDevelopment"
    };
    return mapping[name] || name;
  };

  const getItemName = (item) => {
    if (activeTab === 'interests') {
      return t(getInterestTranslationKey(item.name));
    }
    return item.name;
  };

  const currentData = activeTab === 'technical' ? skills : interests;
  const barColor = activeTab === 'technical' 
    ? 'bg-gradient-to-r from-emerald-500 to-teal-600'
    : 'bg-gradient-to-r from-orange-500 via-red-500 to-orange-600';

  return (
    <section id="skills" className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400" style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{t('skills.title')}</h2>
          
          {/* Tabs */}
          <div className="flex justify-center gap-4 mt-8">
            <motion.button
              onClick={() => setActiveTab('technical')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === 'technical'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('skills.technicalTab')}
            </motion.button>
            <motion.button
              onClick={() => setActiveTab('interests')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === 'interests'
                  ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('skills.interestsTab')}
            </motion.button>
          </div>

          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
            {activeTab === 'technical' 
              ? t('skills.technicalDescription')
              : t('skills.interestsDescription')}
          </p>
        </motion.div>
        
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto"
        >
          {currentData.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="space-y-2"
            >
              <div className="flex justify-between text-sm font-medium text-gray-200">
                <span>{getItemName(item)}</span>
                <span>{item.level}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className={`h-full ${barColor} rounded-full`}
                ></motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-20 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className={`inline-block text-white px-6 py-3 rounded-xl font-medium shadow-lg ${
              activeTab === 'technical'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600'
                : 'bg-gradient-to-r from-orange-500 to-red-600'
            }`}
          >
            {activeTab === 'technical'
              ? t('skills.technicalFooter')
              : t('skills.interestsFooter')}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

