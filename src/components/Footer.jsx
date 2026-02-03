import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { getTranslation } from '../translations';

export default function Footer() {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <div className="flex justify-center md:justify-start items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center font-bold text-xl">
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
            </div>
            <p className="mt-4 text-gray-400 max-w-xs mx-auto md:mx-0">
              {t('footer.description')}
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              {['About', 'Projects', 'Skills', 'Connect'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`} 
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {t(`nav.${item.toLowerCase()}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">{t('footer.connectWithMe')}</h3>
            <div className="flex justify-center md:justify-start space-x-6">
              {[
                { name: 'GitHub', icon: '🐙', url: 'https://github.com/ShayLuan' },
                { name: 'LinkedIn', icon: '🔗', url: 'https://linkedin.com/in/shay-luan' },
                { name: 'Email', icon: '✉️', url: 'mailto:luan.yq.shay@gmail.com' }
              ].map((platform) => (
                <motion.a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors text-xl"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {platform.icon}
                </motion.a>
              ))}
            </div>
            <p className="mt-6 text-gray-500 text-sm">
              © {new Date().getFullYear()} Shay Luan. {t('footer.allRightsReserved')}
            </p>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>
            {t('footer.builtWith')}
          </p>
        </div>
      </div>
    </footer>
  );
}

