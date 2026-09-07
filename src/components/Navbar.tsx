"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Bot, Menu, X, Map, Compass, Clock, BarChart2, BookOpen, Info, Beaker, Trophy, ChevronDown, GraduationCap } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navGroups = [
    {
      id: "explore",
      title: { kk: "Зерттеу", ru: "Исследование", en: "Explore" },
      links: [
        { href: "/map", kk: "Карта", ru: "Карта", en: "Map", icon: Map },
        { href: "/timeline", kk: "Тарихи лента", ru: "Историческая лента", en: "Timeline", icon: Clock },
        { href: "/statistics", kk: "Статистика", ru: "Статистика", en: "Statistics", icon: BarChart2 },
      ]
    },
    {
      id: "interactive",
      title: { kk: "Интерактив", ru: "Интерактив", en: "Interactive" },
      links: [
        { href: "/guide", kk: "AI Guide", ru: "AI Guide", en: "AI Guide", icon: Bot },
        { href: "/routes", kk: "Маршруттар", ru: "Маршруты", en: "Routes", icon: Compass },
        { href: "/quests", kk: "Квесттер", ru: "Квесты", en: "Quests", icon: Trophy },
      ]
    },
    {
      id: "edu",
      title: { kk: "Ғылым мен Білім", ru: "Наука и Образование", en: "Science & Edu" },
      links: [
        { href: "/laboratory", kk: "AI Зертхана", ru: "AI Лаборатория", en: "AI Lab", icon: Beaker },
        { href: "/research", kk: "Әдістеме (Edu Mode)", ru: "Методика (Edu Mode)", en: "Edu Mode", icon: GraduationCap },
      ]
    },
    {
      id: "about",
      title: { kk: "Жоба туралы", ru: "О проекте", en: "About" },
      links: [
        { href: "/about", kk: "Команда және Мәлімет", ru: "Команда и Информация", en: "Team & Info", icon: Info },
      ]
    }
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="fixed w-full z-50 border-b transition-all duration-300" style={{
      background: "rgba(245, 239, 230, 0.85)",
      borderColor: "rgba(196, 113, 79, 0.15)",
      backdropFilter: "blur(20px)",
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex flex-col leading-tight group">
              <span className="text-[8px] sm:text-[9px] font-bold tracking-[0.2em] uppercase transition-colors" style={{ color: "#1A5F7A" }}>
                {t("AI-POWERED CULTURAL ECOSYSTEM", "AI-POWERED CULTURAL ECOSYSTEM", "AI-POWERED CULTURAL ECOSYSTEM")}
              </span>
              <span className="text-lg sm:text-xl font-extrabold" style={{ color: "#2C1F14" }}>
                GeoCulture <span className="transition-colors group-hover:text-blue-600" style={{ color: "#C9A227" }}>AI</span>
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex flex-1 justify-center" ref={dropdownRef}>
            <div className="flex items-center space-x-1">
              <Link href="/" className="px-3 py-2 rounded-xl text-sm font-semibold transition-all hover:bg-orange-50" style={{ color: isActive('/') ? "#C4714F" : "#5C4A35" }}>
                {t("Басты бет", "Главная", "Home")}
              </Link>
              
              {navGroups.map((group) => (
                <div key={group.id} className="relative">
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === group.id ? null : group.id)}
                    className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-semibold transition-all hover:bg-orange-50"
                    style={{ color: "#5C4A35" }}
                  >
                    {t(group.title.kk, group.title.ru, group.title.en)}
                    <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === group.id ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Dropdown Menu */}
                  {activeDropdown === group.id && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 rounded-2xl shadow-xl border overflow-hidden animate-fade-in-down"
                      style={{ background: "#FFF8F0", borderColor: "rgba(196,113,79,0.15)" }}>
                      <div className="p-2 flex flex-col gap-1">
                        {group.links.map(link => {
                          const Icon = link.icon;
                          return (
                            <Link
                              key={link.href}
                              href={link.href}
                              onClick={() => setActiveDropdown(null)}
                              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors hover:bg-white"
                              style={{ 
                                color: isActive(link.href) ? "#C4714F" : "#2C1F14",
                                background: isActive(link.href) ? "rgba(196,113,79,0.05)" : "transparent",
                                fontWeight: isActive(link.href) ? "bold" : "medium"
                              }}
                            >
                              {Icon && <Icon className="w-4 h-4 opacity-70" style={{ color: isActive(link.href) ? "#C4714F" : "#1A5F7A" }} />}
                              {t(link.kk, link.ru, link.en)}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Language switcher */}
            <div className="flex items-center space-x-0.5 rounded-full p-1" style={{ background: "rgba(196, 113, 79, 0.05)", border: "1px solid rgba(196, 113, 79, 0.15)" }}>
              {(['kk', 'ru'] as const).map(l => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className="px-2.5 py-1 rounded-full text-[11px] font-bold transition-all uppercase"
                  style={{
                    background: lang === l ? "#1A5F7A" : "transparent",
                    color: lang === l ? "#fff" : "#5C4A35",
                  }}
                >
                  {l}
                </button>
              ))}
            </div>

            <Link
              href="/guide"
              className="group flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-bold transition-all shadow-[0_0_15px_rgba(26,95,122,0.2)] hover:shadow-[0_0_20px_rgba(26,95,122,0.4)]"
              style={{ background: "#1A5F7A", color: "#fff" }}
            >
              <Bot className="w-4 h-4 group-hover:animate-pulse" />
              <span>{t("AI Guide", "AI Guide")}</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-2">
            <div className="flex items-center rounded-full p-0.5" style={{ background: "rgba(196,113,79,0.05)", border: "1px solid rgba(196,113,79,0.15)" }}>
              {(['kk', 'ru'] as const).map(l => (
                <button key={l} onClick={() => setLang(l)} className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase" style={{ background: lang === l ? "#1A5F7A" : "transparent", color: lang === l ? "#fff" : "#5C4A35" }}>
                  {l}
                </button>
              ))}
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg transition-colors"
              style={{ color: "#5C4A35" }}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden border-t max-h-[80vh] overflow-y-auto" style={{ background: "rgba(245,239,230,0.98)", borderColor: "rgba(196,113,79,0.15)" }}>
          <div className="px-4 py-4 space-y-4">
            <Link href="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm font-bold" style={{ color: isActive('/') ? "#C4714F" : "#1e3a8a" }}>
              {t("Басты бет", "Главная", "Home")}
            </Link>
            
            {navGroups.map(group => (
              <div key={group.id} className="space-y-2">
                <h3 className="text-[10px] font-bold uppercase tracking-wider pl-3 opacity-60" style={{ color: "#1e3a8a" }}>
                  {t(group.title.kk, group.title.ru, group.title.en)}
                </h3>
                <div className="grid grid-cols-1 gap-1">
                  {group.links.map(link => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors"
                        style={{
                          color: isActive(link.href) ? "#C4714F" : "#2C1F14",
                          background: isActive(link.href) ? "rgba(196,113,79,0.08)" : "transparent",
                          fontWeight: isActive(link.href) ? "bold" : "medium",
                        }}
                      >
                        {Icon && <Icon className="w-4 h-4 opacity-70" />}
                        {t(link.kk, link.ru, link.en)}
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
            
            <div className="pt-4 border-t" style={{ borderColor: "rgba(196,113,79,0.1)" }}>
              <Link
                href="/guide"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-bold shadow-md"
                style={{ background: "#1A5F7A", color: "#fff" }}
              >
                <Bot className="w-4 h-4" />
                {t("AI Guide", "AI Guide", "AI Guide")}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
