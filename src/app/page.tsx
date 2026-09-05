"use client";

import Link from "next/link";
import { Map, Bot, Compass, Clock, BarChart2, Beaker, BookOpen, Info, ArrowRight, Landmark, MapPin, AudioLines } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { lang, t } = useLanguage();

  const features = [
    {
      href: "/map",
      icon: Map,
      color: "#1A5F7A",
      bg: "rgba(26,95,122,0.1)",
      border: "rgba(26,95,122,0.25)",
      title: { kk: "Интерактивті карта", ru: "Интерактивная карта" },
      desc: { kk: "GIS картада нысандарды іздеңіз", ru: "Ищите объекты на GIS-карте" },
    },
    {
      href: "/guide",
      icon: Bot,
      color: "#8B3A8B",
      bg: "rgba(139,58,139,0.1)",
      border: "rgba(139,58,139,0.25)",
      title: { kk: "AI Guide", ru: "AI Guide" },
      desc: { kk: "Тарихшы AI-мен сөйлесіңіз", ru: "Общайтесь с AI-историком" },
    },
    {
      href: "/routes",
      icon: Compass,
      color: "#C9A227",
      bg: "rgba(201,162,39,0.1)",
      border: "rgba(201,162,39,0.25)",
      title: { kk: "Маршруттар", ru: "Маршруты" },
      desc: { kk: "AI арқылы жеке маршрут", ru: "Персональный маршрут с AI" },
    },
    {
      href: "/timeline",
      icon: Clock,
      color: "#2D6A4F",
      bg: "rgba(45,106,79,0.1)",
      border: "rgba(45,106,79,0.25)",
      title: { kk: "Тарихи лента", ru: "Историческая лента" },
      desc: { kk: "Дәуірлер бойынша зерттеу", ru: "Исследование по эпохам" },
    },
    {
      href: "/statistics",
      icon: BarChart2,
      color: "#C4714F",
      bg: "rgba(196,113,79,0.1)",
      border: "rgba(196,113,79,0.25)",
      title: { kk: "Статистика", ru: "Статистика" },
      desc: { kk: "Деректер базасының аналитикасы", ru: "Аналитика базы данных" },
    },
    {
      href: "/laboratory",
      icon: Beaker,
      color: "#1A5F7A",
      bg: "rgba(26,95,122,0.1)",
      border: "rgba(26,95,122,0.25)",
      title: { kk: "AI Зертхана", ru: "AI Лаборатория" },
      desc: { kk: "Ұсыныс алгоритмдері", ru: "Алгоритмы рекомендаций" },
    },
    {
      href: "/research",
      icon: BookOpen,
      color: "#8B3A8B",
      bg: "rgba(139,58,139,0.1)",
      border: "rgba(139,58,139,0.25)",
      title: { kk: "Зерттеу", ru: "Исследование" },
      desc: { kk: "Жобаның ғылыми негіздемесі", ru: "Научное обоснование проекта" },
    },
    {
      href: "/about",
      icon: Info,
      color: "#5C4A35",
      bg: "rgba(92,74,53,0.1)",
      border: "rgba(92,74,53,0.2)",
      title: { kk: "Жоба туралы", ru: "О проекте" },
      desc: { kk: "Технологиялар мен идея", ru: "Технологии и идея" },
    },
  ];

  return (
    <div className="min-h-screen kazakh-pattern overflow-x-hidden relative" style={{ background: "#F5EFE6" }}>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-5 py-16 relative z-10">

        {/* School Name + Hero */}
        <div className="text-center mb-14 animate-fade-in-down">
          {/* School badge */}
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase"
            style={{ background: "rgba(201,162,39,0.15)", border: "1px solid rgba(201,162,39,0.35)", color: "#8B6914" }}>
            <Landmark className="w-3.5 h-3.5" />
            {t("№290 ОРТА МЕКТЕБІ", "СРЕДНЯЯ ШКОЛА №290")}
          </div>

          {/* Main title */}
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 leading-tight" style={{ color: "#2C1F14" }}>
            GeoCulture{" "}
            <span className="relative inline-block">
              <span style={{
                background: "linear-gradient(135deg, #C9A227, #C4714F)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                AI
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-2xl font-light max-w-3xl mx-auto mb-10 leading-relaxed" style={{ color: "#5C4A35" }}>
            {t(
              "Қазақстанның мәдени-тарихи мұрасын жасанды интеллект арқылы зертте",
              "Исследуй культурно-историческое наследие Казахстана с помощью искусственного интеллекта"
            )}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16">
            <Link
              href="/map"
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-base transition-all hover:scale-105 shadow-lg"
              style={{ background: "#1A5F7A", color: "#fff", boxShadow: "0 8px 24px rgba(26,95,122,0.3)" }}
            >
              <Map className="w-5 h-5" />
              {t("Картаны ашу", "Открыть карту")}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/guide"
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-base transition-all hover:scale-105 border-2"
              style={{ background: "rgba(196,113,79,0.1)", borderColor: "#C4714F", color: "#C4714F" }}
            >
              <Bot className="w-5 h-5" />
              {t("AI гидті іске қосу", "Запустить AI Guide")}
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16">
          {[
            { icon: Landmark, value: "100+", label: t("тарихи нысан", "исторических объектов"), color: "#C9A227" },
            { icon: MapPin, value: "17", label: t("облыс", "областей"), color: "#1A5F7A" },
            { icon: AudioLines, value: "AI", label: t("аудиогид", "аудиогид"), color: "#C4714F" },
            { icon: Compass, value: "Smart", label: t("маршруттар", "маршруты"), color: "#2D6A4F" },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="rounded-2xl p-5 text-center flex flex-col items-center"
                style={{ background: "rgba(255,248,240,0.8)", border: "1px solid rgba(196,113,79,0.15)", boxShadow: "0 2px 12px rgba(44,31,20,0.06)" }}>
                <Icon className="w-7 h-7 mb-2" style={{ color: stat.color }} />
                <div className="text-2xl font-extrabold mb-1" style={{ color: "#2C1F14" }}>{stat.value}</div>
                <div className="text-xs" style={{ color: "#8B6914" }}>{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Features Grid */}
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8" style={{ color: "#2C1F14" }}>
            {t("Барлық мүмкіндіктер", "Все возможности")}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={feature.href}
                  href={feature.href}
                  className="group flex flex-col gap-3 p-5 rounded-2xl border transition-all hover:scale-[1.03] hover:shadow-lg"
                  style={{ background: feature.bg, borderColor: feature.border }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: feature.bg, border: `1px solid ${feature.border}` }}>
                    <Icon className="w-5 h-5" style={{ color: feature.color }} />
                  </div>
                  <div>
                    <p className="font-bold text-sm" style={{ color: "#2C1F14" }}>{feature.title[lang]}</p>
                    <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "#8B6914" }}>{feature.desc[lang]}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs mt-14 pb-4" style={{ color: "#A08060" }}>
          GeoCulture AI · {t("№290 орта мектебінің ғылыми жобасы", "Научный проект средней школы №290")} · 2024
        </p>
      </main>
    </div>
  );
}
