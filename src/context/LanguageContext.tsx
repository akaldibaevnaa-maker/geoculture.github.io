"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language } from "@/types";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (kkText: string, ruText: string, enText?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("kk");

  useEffect(() => {
    const savedLang = localStorage.getItem("geoculture-lang") as Language;
    if (savedLang && (savedLang === "kk" || savedLang === "ru" || savedLang === "en")) {
      setLang(savedLang);
    }
  }, []);

  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem("geoculture-lang", newLang);
  };

  const t = (kkText: string, ruText: string, enText?: string) => {
    if (lang === "kk") return kkText;
    if (lang === "en") return enText || ruText;
    return ruText;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}