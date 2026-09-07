"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Bot, Menu, X, Map, Compass, Clock, BarChart2, Info, Beaker, Trophy, ChevronDown, GraduationCap, Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Language } from "@/types";

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

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
        { href: "/map", kk: "Интерактивті карта", ru: "Интерактивная карта", en: "Interactive Map", icon: Map },
        { href: "/timeline", kk: "Тарихи лента", ru: "Историческая лента", en: "Historical Timeline", icon: Clock },
        { href: "/statistics", kk: "Статистика", ru: "Статистика", en: "Analytics & Stats", icon: BarChart2 },
      ]
    },
    {
      id: "interactive",
      title: { kk: "Интерактив", ru: "Интерактив", en: "Interactive" },
      links: [
        { href: "/guide", kk: "AI Guide", ru: "AI Guide", en: "AI Guide", icon: Bot },
        { href: "/routes", kk: "Маршруттар", ru: "Маршруты", en: "Smart Routes", icon: Compass },
        { href: "/quests", kk: "Тарихи квесттер", ru: "Исторические квесты", en: "Heritage Quests", icon: Trophy },
      ]
    },
    {
      id: "edu",
      title: { kk: "Ғылым мен Білім", ru: "Наука и Образование", en: "Edu & Science" },
      links: [
        { href: "/laboratory", kk: "AI Зертхана", ru: "AI Лаборатория", en: "AI Laboratory", icon: Beaker },
        { href: "/research", kk: "Әдістеме (Edu Mode)", ru: "Методика (Edu Mode)", en: "Edu Mode Rationale", icon: GraduationCap },
      ]
    },
    {
      id: "about",
      title: { kk: "Жоба туралы", ru: "О проекте", en: "About" },
      links: [
        { href: "/about", kk: "Жоба мен Команда", ru: "Проект и Команда", en: "Project & Team", icon: Info },
      ]
    }
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="fixed w-full z-50 border-b transition-all duration-300" style={{
      background: "rgba(245, 239, 230, 0.95)",
      borderColor: "rgba(196, 113, 79, 0.2)",
      backdropFilter: "blur(20px)",
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo - National Level Rebranding */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex flex-col leading-tight group">
              <span className="text-[8px] sm:text-[9px] font-bold tracking-[0.18em] uppercase transition-colors" style={{ color: "#C4714F" }}>
                {t("РЕСПУБЛИКАЛЫҚ ЦИФРЛЫҚ МҰРА ЖОБАСЫ", "РЕСПУБЛИКАНСКИЙ ЦИФРОВОЙ ПРОЕКТ", "NATIONAL DIGITAL HERITAGE PROJECT")}
              </span>
              <span className="text-lg sm:text-xl font-extrabold" style={{ color: "#2C1F14" }}>
                GeoCulture <span style={{ color: "#C9A227" }}>AI</span>
              </span>
            </Link>
          </div>

          {/* Desktop Menu - Grouped Dropdowns */}
          <div className="hidden lg:flex flex-1 justify-center" ref={dropdownRef}>
            <div className="flex items-center space-x-1">
              <Link href="/" className="px-3 py-2 rounded-xl text-sm font-semibold transition-all hover:bg-orange-50"
                style={{ color: isActive('/') ? "#C4714F" : "#5C4A35", fontWeight: isActive('/') ? 700 : 500 }}>
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
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeDropdown === group.id ? 'rotate-180' : ''}`} />
                  </button>

                  {activeDropdown === group.id && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 rounded-2xl shadow-xl border overflow-hidden animate-fade-in-down"
                      style={{ background: "#FFF8F0", borderColor: "rgba(196,113,79,0.2)" }}>
                      <div className="p-2 flex flex-col gap-1">
                        {group.links.map(link => {
                          const Icon = link.icon;
                          return (
                            <Link
                              key={link.href}
                              href={link.href}
                              onClick={() => setActiveDropdown(null)}
                              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors hover:bg-orange-50"
                              style={{
                                color: isActive(link.href) ? "#C4714F" : "#2C1F14",
                                fontWeight: isActive(link.href) ? 700 : 500,
                              }}
                            >
                              <Icon className="w-4 h-4" style={{ color: isActive(link.href) ? "#C4714F" : "#1A5F7A" }} />
                              <span>{t(link.kk, link.ru, link.en)}</span>
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

          {/* Right Actions: Multilingual (KZ | RU | EN) + AI Guide CTA */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Language switcher KZ | RU | EN */}
            <div className="flex items-center space-x-0.5 rounded-full p-1" style={{ background: "rgba(196, 113, 79, 0.08)", border: "1px solid rgba(196, 113, 79, 0.2)" }}>
              {(['kk', 'ru', 'en'] as Language[]).map(l => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className="px-2.5 py-1 rounded-full text-xs font-bold transition-all uppercase"
                  style={{
                    background: lang === l ? "#C4714F" : "transparent",
                    color: lang === l ? "#fff" : "#5C4A35",
                  }}
                >
                  {l}
                </button>
              ))}
            </div>

            <Link
              href="/guide"
              className="flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-bold transition-all shadow-sm"
              style={{ background: "#1A5F7A", color: "#fff" }}
            >
              <Bot className="w-4 h-4" />
              <span>{t("AI көмекші", "AI-помощник", "AI Assistant")}</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-2">
            <div className="flex items-center rounded-full p-0.5" style={{ background: "rgba(196,113,79,0.1)", border: "1px solid rgba(196,113,79,0.2)" }}>
              {(['kk', 'ru', 'en'] as Language[]).map(l => (
                <button key={l} onClick={() => setLang(l)} className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase"
                  style={{ background: lang === l ? "#C4714F" : "transparent", color: lang === l ? "#fff" : "#5C4A35" }}>
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
        <div className="lg:hidden border-t" style={{ background: "rgba(245,239,230,0.98)", borderColor: "rgba(196,113,79,0.15)" }}>
          <div className="px-3 pt-2 pb-4 space-y-2">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-xl text-sm font-semibold"
              style={{ color: isActive('/') ? "#C4714F" : "#2C1F14" }}
            >
              {t("Басты бет", "Главная", "Home")}
            </Link>

            {navGroups.map((group) => (
              <div key={group.id} className="space-y-1">
                <div className="px-3 py-1 text-xs font-bold uppercase tracking-wider" style={{ color: "#C4714F" }}>
                  {t(group.title.kk, group.title.ru, group.title.en)}
                </div>
                {group.links.map(link => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 rounded-xl text-xs font-medium"
                      style={{
                        color: isActive(link.href) ? "#C4714F" : "#5C4A35",
                        background: isActive(link.href) ? "rgba(196,113,79,0.1)" : "transparent",
                      }}
                    >
                      <Icon className="w-4 h-4" style={{ color: "#1A5F7A" }} />
                      <span>{t(link.kk, link.ru, link.en)}</span>
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}