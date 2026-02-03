import { en } from './en';
import { fr } from './fr';
import { zh } from './zh';

export const translations = {
  EN: en,
  FR: fr,
  ZH: zh
};

export const getTranslation = (language, key) => {
  const keys = key.split('.');
  let value = translations[language];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
};
