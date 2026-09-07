"use client";

import Link from "next/link";
import { Map, Bot, Compass, Clock, BarChart2, Beaker, BookOpen, Info, ArrowRight, Landmark, MapPin, AudioLines, GraduationCap, Users, X, Send } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useState } from "react";

export default function Home() {
  const { lang, t } = useLanguage();
  const [showSuggestModal, setShowSuggestModal] = useState(false);

  const features = [
    {
      href: "/map",
      icon: Map,
      color: "#1A5F7A",
      bg: "rgba(26,95,122,0.1)",
      border: "rgba(26,95,122,0.25)",
      title: { kk: "Интерактивті карта", ru: "Интерактивная карта", en: "Interactive Map" },
      desc: { kk: "GIS картада нысандарды іздеңіз", ru: "Ищите объекты на GIS-карте", en: "Search objects on GIS map" },
    },
    {
      href: "/guide",
      icon: Bot,
      color: "#8B3A8B",
      bg: "rgba(139,58,139,0.1)",
      border: "rgba(139,58,139,0.25)",
      title: { kk: "AI Guide", ru: "AI Guide", en: "AI Guide" },
      desc: { kk: "Тарихшы AI-мен сөйлесіңіз", ru: "Общайтесь с AI-историком", en: "Chat with AI Historian" },
    },
    {
      href: "/routes",
      icon: Compass,
      color: "#C9A227",
      bg: "rgba(201,162,39,0.1)",
      border: "rgba(201,162,39,0.25)",
      title: { kk: "Маршруттар", ru: "Маршруты", en: "Routes" },
      desc: { kk: "AI арқылы жеке маршрут", ru: "Персональный маршрут с AI", en: "Personalized AI routes" },
    },
    {
      href: "/timeline",
      icon: Clock,
      color: "#2D6A4F",
      bg: "rgba(45,106,79,0.1)",
      border: "rgba(45,106,79,0.25)",
      title: { kk: "Тарихи лента", ru: "Историческая лента", en: "Timeline" },
      desc: { kk: "Дәуірлер бойынша зерттеу", ru: "Исследование по эпохам", en: "Explore by eras" },
    },
    {
      href: "/statistics",
      icon: BarChart2,
      color: "#C4714F",
      bg: "rgba(196,113,79,0.1)",
      border: "rgba(196,113,79,0.25)",
      title: { kk: "Статистика", ru: "Статистика", en: "Statistics" },
      desc: { kk: "Деректер базасының аналитикасы", ru: "Аналитика базы данных", en: "Database analytics" },
    },
    {
      href: "/laboratory",
      icon: Beaker,
      color: "#1A5F7A",
      bg: "rgba(26,95,122,0.1)",
      border: "rgba(26,95,122,0.25)",
      title: { kk: "AI Зертхана", ru: "AI Лаборатория", en: "AI Lab" },
      desc: { kk: "Ұсыныс алгоритмдері", ru: "Алгоритмы рекомендаций", en: "Recommendation algorithms" },
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden relative bg-[#FAF7F2] font-sans">
      
      {/* Dynamic Technological Background for Hero */}
      <div className="absolute top-0 left-0 w-full h-[85vh] bg-[#FAF7F2] overflow-hidden -z-10">
        {/* Neon Grid Vector - updated for light mode */}
        <div className="absolute inset-0 opacity-[0.07]" style={{
          backgroundImage: `linear-gradient(#1e3a8a 1px, transparent 1px), linear-gradient(90deg, #1e3a8a 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          transform: 'perspective(1000px) rotateX(60deg) scale(2) translateY(-10%)',
          transformOrigin: 'top center'
        }}></div>
        {/* Pulsing Geo-points */}
        {[...Array(8)].map((_, i) => (
          <div key={i} className="absolute rounded-full bg-blue-500 animate-ping opacity-60" style={{
            width: '6px', height: '6px',
            top: `${20 + Math.random() * 50}%`,
            left: `${10 + Math.random() * 80}%`,
            animationDuration: `${2 + Math.random() * 3}s`,
            animationDelay: `${Math.random() * 2}s`
          }}></div>
        ))}
      </div>

      <main className="max-w-6xl mx-auto px-5 pt-32 pb-16 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in-down">
          {/* Main title */}
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-tight text-[#1e3a8a] drop-shadow-sm">
            GeoCulture{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              AI
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-3xl font-bold max-w-4xl mx-auto mb-12 leading-relaxed text-[#0f172a]">
            {t(
              "Қазақстанның мәдени-тарихи мұрасын жасанды интеллект арқылы зерттеуге арналған бірыңғай ұлттық экожүйе",
              "Единая национальная экосистема для исследования культурно-исторического наследия Казахстана с помощью ИИ",
              "A unified national ecosystem for exploring the cultural and historical heritage of Kazakhstan through AI"
            )}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-16">
            <Link
              href="/map"
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-extrabold text-lg transition-all hover:scale-105 shadow-[0_10px_30px_rgba(6,182,212,0.4)] bg-cyan-500 text-slate-900 hover:bg-cyan-400"
            >
              <Map className="w-6 h-6" />
              {t("Картаны ашу", "Открыть карту", "Open Map")}
              <ArrowRight className="w-5 h-5" />
            </Link>
            
            {/* Secondary CTA with Soundwave effect */}
            <Link
              href="/guide"
              className="group w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:scale-105 border border-cyan-400/50 bg-slate-900/50 backdrop-blur-md text-cyan-300 hover:shadow-[0_0_25px_rgba(34,211,238,0.3)] relative overflow-hidden"
            >
              {/* Soundwave equalizer micro-animation on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
              <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 absolute left-4 h-full transition-opacity">
                 <span className="w-1 bg-cyan-400 h-1/3 animate-bounce" style={{animationDelay: '0ms'}}></span>
                 <span className="w-1 bg-cyan-400 h-1/2 animate-bounce" style={{animationDelay: '100ms'}}></span>
                 <span className="w-1 bg-cyan-400 h-2/3 animate-bounce" style={{animationDelay: '200ms'}}></span>
                 <span className="w-1 bg-cyan-400 h-1/2 animate-bounce" style={{animationDelay: '300ms'}}></span>
                 <span className="w-1 bg-cyan-400 h-1/3 animate-bounce" style={{animationDelay: '400ms'}}></span>
              </div>
              <Bot className="w-6 h-6 group-hover:ml-8 transition-all" />
              <span>{t("AI гидті іске қосу", "Запустить AI Guide", "Launch AI Guide")}</span>
            </Link>
          </div>
        </div>

        {/* Republican Level Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-20 relative z-20">
          {[
            { icon: Landmark, value: "500+", label: t("нысан мен аңыз", "объектов и легенд", "objects & legends"), color: "#0ea5e9" },
            { icon: MapPin, value: "20", label: t("өңір", "регионов", "regions"), color: "#3b82f6" },
            { icon: AudioLines, value: "AI", label: t("аудиогид", "аудиогид", "audio guide"), color: "#8b5cf6" },
            { icon: Compass, value: "Smart", label: t("маршруттар", "маршруты", "routes"), color: "#06b6d4" },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="rounded-2xl p-6 text-center flex flex-col items-center bg-white/90 backdrop-blur-md border border-white/20 shadow-xl hover:-translate-y-1 transition-transform">
                <Icon className="w-8 h-8 mb-3" style={{ color: stat.color }} />
                <div className="text-3xl font-black mb-1 text-slate-800">{stat.value}</div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Republican Level Modules: Edu Mode & Crowdsourcing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {/* Edu Mode Section */}
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-3xl border border-indigo-100 shadow-sm relative overflow-hidden group">
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-indigo-100 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
            <GraduationCap className="w-10 h-10 text-indigo-600 mb-4 relative z-10" />
            <h3 className="text-2xl font-bold text-slate-800 mb-2 relative z-10">{t("Мұғалім мен Оқушы режимі", "Режим Учителя и Ученика", "Edu Mode")}</h3>
            <p className="text-slate-600 text-sm mb-6 relative z-10 leading-relaxed">
              {t("«Қазақстан тарихы» және «География» сабақтарына арналған дайын виртуалды турлар, цифрлық кейстер мен квиздер.", "Готовые виртуальные туры, цифровые кейсы и квизы для уроков «История Казахстана» и «География».", "Ready-made virtual tours, digital cases, and quizzes for History and Geography lessons.")}
            </p>
            <Link href="/research" className="inline-flex items-center gap-2 text-indigo-600 font-bold text-sm hover:gap-3 transition-all relative z-10">
              {t("Әдістемеге өту", "Перейти к методике", "Go to Edu Mode")} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Crowdsourcing Section */}
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-8 rounded-3xl border border-orange-100 shadow-sm relative overflow-hidden group">
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-orange-100 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
            <Users className="w-10 h-10 text-orange-500 mb-4 relative z-10" />
            <h3 className="text-2xl font-bold text-slate-800 mb-2 relative z-10">{t("Халықтық мұра (Crowdsourcing)", "Народное наследие (Крудсорсинг)", "Crowdsourcing")}</h3>
            <p className="text-slate-600 text-sm mb-6 relative z-10 leading-relaxed">
              {t("Өз өңіріңіздің сакралды нысанын немесе аңызын ұсыныңыз. Бізбен бірге жалпыұлттық деректер базасын толықтырыңыз.", "Предложите сакральный объект или легенду своего региона. Пополняйте общенациональный банк данных вместе с нами.", "Propose a sacred object or legend from your region to enrich the national databank.")}
            </p>
            <button 
              onClick={() => setShowSuggestModal(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold text-sm transition-all relative z-10 shadow-md"
            >
              {t("Нысан ұсыну", "Предложить объект", "Suggest an Object")}
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-[#1e3a8a]">
            {t("Платформа мүмкіндіктері", "Возможности платформы", "Platform Features")}
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={feature.href}
                  href={feature.href}
                  className="group flex flex-col gap-3 p-6 rounded-3xl bg-white border border-slate-100 transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-colors group-hover:scale-110" style={{ background: feature.bg }}>
                    <Icon className="w-6 h-6" style={{ color: feature.color }} />
                  </div>
                  <div>
                    <p className="font-bold text-[#1e3a8a] text-lg mb-1">{t(feature.title.kk, feature.title.ru, feature.title.en)}</p>
                    <p className="text-sm text-slate-500 leading-relaxed">{t(feature.desc.kk, feature.desc.ru, feature.desc.en)}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Footer info (Moving School Info here) */}
        <div className="text-center text-sm text-slate-500 border-t border-slate-200 pt-8 mt-12 pb-4">
          <p className="font-bold text-slate-700 mb-2">GeoCulture AI © 2026</p>
          <p>{t("Команда жобасы: №290 Орта мектеп", "Проект команды: Средняя школа №290", "Project by: Secondary School №290")}</p>
          <div className="mt-4 space-x-4">
            <Link href="/about" className="hover:text-blue-600 transition-colors">{t("Жоба туралы", "О проекте", "About Project")}</Link>
          </div>
        </div>
      </main>

      {/* Crowdsourcing Modal */}
      {showSuggestModal && (
        <div className="fixed inset-0 bg-slate-900/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative border border-orange-200 p-8">
            <button 
              onClick={() => setShowSuggestModal(false)}
              className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              {t("Нысан ұсыну", "Предложить объект", "Suggest an Object")}
            </h2>
            <p className="text-sm text-slate-500 mb-6">
              {t("Өңіріңіздегі тарихи немесе табиғи ескерткішті біздің базаға қосу үшін ақпарат қалдырыңыз. Модерациядан кейін ол картада пайда болады.", "Оставьте информацию, чтобы добавить исторический или природный памятник вашего региона в нашу базу. После модерации он появится на карте.", "Leave information to add a historical or natural monument of your region to our database. After moderation, it will appear on the map.")}
            </p>
            <div className="space-y-4">
              <input type="text" placeholder={t("Нысан атауы", "Название объекта", "Object Name")} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-orange-400" />
              <input type="text" placeholder={t("Өңір (Мысалы: Маңғыстау)", "Регион (Например: Мангистау)", "Region (e.g. Mangystau)")} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-orange-400" />
              <textarea placeholder={t("Қысқаша сипаттама немесе аңыз", "Краткое описание или легенда", "Brief description or legend")} rows={4} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-orange-400 resize-none"></textarea>
              <button 
                onClick={() => { alert(t("Рақмет! Ақпарат модерацияға жіберілді.", "Спасибо! Информация отправлена на модерацию.", "Thank you! Information sent for moderation.")); setShowSuggestModal(false); }}
                className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold text-sm transition-all flex justify-center items-center gap-2"
              >
                <Send className="w-4 h-4" /> {t("Жіберу", "Отправить", "Submit")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
