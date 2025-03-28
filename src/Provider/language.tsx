import React, { createContext, useState, useEffect, ReactNode } from 'react';

type LanguageContextType = {
  language: 'en' | 'vi';
  toggleLanguage: () => void;
};

export const LanguageContext = createContext<LanguageContextType>({
  language: 'vi',
  toggleLanguage: () => {},
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<'en' | 'vi'>('vi');

  // Initialize language from localStorage if available
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage === 'en' || savedLanguage === 'vi') {
      setLanguage(savedLanguage as 'en' | 'vi');
    }
  }, []);

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prevLanguage => (prevLanguage === 'en' ? 'vi' : 'en'));
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};