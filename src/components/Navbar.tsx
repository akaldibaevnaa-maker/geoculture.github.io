"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Bot, Menu, X, Map, Compass, Clock, BarChart2, BookOpen, Info, Beaker } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", kk: "Басты бет", ru: "Главная", icon: null },
    { href: "/map", kk: "Карта", ru: "Карта", icon: Map },
    { href: "/guide", kk: "AI Guide", ru: "AI Guide", icon: Bot },
    { href: "/routes", kk: "Маршруттар", ru: "Маршруты", icon: Compass },
    { href: "/timeline", kk: "Тарих", ru: "История", icon: Clock },
    { href: "/statistics", kk: "Статистика", ru: "Статистика", icon: BarChart2 },
    { href: "/laboratory", kk: "Зертхана", ru: "Лаборатория", icon: Beaker },
    { href: "/research", kk: "Зерттеу", ru: "Исследование", icon: BookOpen },
    { href: "/about", kk: "Жоба туралы", ru: "О проекте", icon: Info },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="fixed w-full z-50 border-b" style={{
      background: "rgba(245, 239, 230, 0.95)",
      borderColor: "rgba(196, 113, 79, 0.2)",
      backdropFilter: "blur(16px)",
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex flex-col leading-tight">
              <span className="text-[9px] font-bold tracking-widest uppercase" style={{ color: "#C4714F" }}>
                {t("№290 ОРТА МЕКТЕБІ", "СРЕДНЯЯ ШКОЛА №290")}
              </span>
              <span className="text-lg font-extrabold" style={{ color: "#2C1F14" }}>
                GeoCulture <span style={{ color: "#C9A227" }}>AI</span>
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:block">
            <div className="ml-6 flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all"
                  style={{
                    color: isActive(link.href) ? "#C4714F" : "#5C4A35",
                    background: isActive(link.href) ? "rgba(196, 113, 79, 0.12)" : "transparent",
                    fontWeight: isActive(link.href) ? 700 : 500,
                  }}
                >
                  {t(link.kk, link.ru)}
                </Link>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Language switcher */}
            <div className="flex items-center space-x-0.5 rounded-full p-1" style={{ background: "rgba(196, 113, 79, 0.08)", border: "1px solid rgba(196, 113, 79, 0.2)" }}>
              <button
                onClick={() => setLang("kk")}
                className="px-3 py-1 rounded-full text-xs font-bold transition-all"
                style={{
                  background: lang === "kk" ? "#C4714F" : "transparent",
                  color: lang === "kk" ? "#fff" : "#5C4A35",
                }}
              >
                KZ
              </button>
              <button
                onClick={() => setLang("ru")}
                className="px-3 py-1 rounded-full text-xs font-bold transition-all"
                style={{
                  background: lang === "ru" ? "#C4714F" : "transparent",
                  color: lang === "ru" ? "#fff" : "#5C4A35",
                }}
              >
                RU
              </button>
            </div>

            <Link
              href="/guide"
              className="flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-bold transition-all shadow-sm"
              style={{ background: "#1A5F7A", color: "#fff" }}
            >
              <Bot className="w-4 h-4" />
              <span>{t("AI көмекші", "AI-помощник")}</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-2">
            <div className="flex items-center rounded-full p-0.5" style={{ background: "rgba(196,113,79,0.1)", border: "1px solid rgba(196,113,79,0.2)" }}>
              <button onClick={() => setLang("kk")} className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: lang === "kk" ? "#C4714F" : "transparent", color: lang === "kk" ? "#fff" : "#5C4A35" }}>KZ</button>
              <button onClick={() => setLang("ru")} className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: lang === "ru" ? "#C4714F" : "transparent", color: lang === "ru" ? "#fff" : "#5C4A35" }}>RU</button>
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
          <div className="px-3 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors"
                style={{
                  color: isActive(link.href) ? "#C4714F" : "#5C4A35",
                  background: isActive(link.href) ? "rgba(196,113,79,0.1)" : "transparent",
                  fontWeight: isActive(link.href) ? 700 : 500,
                }}
              >
                {t(link.kk, link.ru)}
              </Link>
            ))}
            <div className="pt-2">
              <Link
                href="/guide"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-bold"
                style={{ background: "#1A5F7A", color: "#fff" }}
              >
                <Bot className="w-4 h-4" />
                {t("AI көмекші", "AI-помощник")}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
