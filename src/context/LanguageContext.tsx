"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'kk' | 'ru';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (kkText: string, ruText: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('kk');

  // Load language preference from local storage if available
  useEffect(() => {
    const savedLang = localStorage.getItem('geoculture-lang') as Language;
    if (savedLang && (savedLang === 'kk' || savedLang === 'ru')) {
      setLang(savedLang);
    }
  }, []);

  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('geoculture-lang', newLang);
  };

  const t = (kkText: string, ruText: string) => {
    return lang === 'kk' ? kkText : ruText;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
