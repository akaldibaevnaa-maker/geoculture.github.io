"use client";

import Link from "next/link";
import { Map, Bot, Compass, Clock, BarChart2, Beaker, BookOpen, Info, ArrowRight, Landmark, MapPin, AudioLines, Trophy, Sparkles, GraduationCap, PlusCircle, CheckCircle2, X, Send, Globe, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useState } from "react";
import { SuggestedObjectSubmission } from "@/types";

export default function Home() {
  const { lang, t } = useLanguage();
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [formData, setFormData] = useState<SuggestedObjectSubmission>({
    name: "",
    region: "",
    category: "",
    description: "",
    legend: "",
    authorName: "",
    contact: "",
  });

  const features = [
    {
      href: "/map",
      icon: Map,
      color: "#1A5F7A",
      bg: "rgba(26,95,122,0.1)",
      border: "rgba(26,95,122,0.25)",
      title: { kk: "Интерактивті карта", ru: "Интерактивная карта", en: "Interactive Map" },
      desc: { kk: "20 өңір бойынша GIS іздеу", ru: "GIS-поиск по 20 регионам", en: "GIS search across 20 regions" },
    },
    {
      href: "/guide",
      icon: Bot,
      color: "#8B3A8B",
      bg: "rgba(139,58,139,0.1)",
      border: "rgba(139,58,139,0.25)",
      title: { kk: "AI Guide", ru: "AI Guide", en: "AI Guide" },
      desc: { kk: "Мультимодальді AI тарихшы", ru: "Мультимодальный AI-историк", en: "Multimodal AI historian" },
    },
    {
      href: "/routes",
      icon: Compass,
      color: "#C9A227",
      bg: "rgba(201,162,39,0.1)",
      border: "rgba(201,162,39,0.25)",
      title: { kk: "Маршруттар", ru: "Маршруты", en: "Smart Routes" },
      desc: { kk: "AI арқылы жеке саяхат", ru: "Персональный маршрут с AI", en: "Personalized AI routes" },
    },
    {
      href: "/timeline",
      icon: Clock,
      color: "#2D6A4F",
      bg: "rgba(45,106,79,0.1)",
      border: "rgba(45,106,79,0.25)",
      title: { kk: "Тарихи лента", ru: "Историческая лента", en: "Timeline" },
      desc: { kk: "13 тарихи дәуір шежіресі", ru: "Хроника 13 исторических эпох", en: "Chronicle of 13 eras" },
    },
    {
      href: "/quests",
      icon: Trophy,
      color: "#8B3A8B",
      bg: "rgba(139,58,139,0.1)",
      border: "rgba(139,58,139,0.25)",
      title: { kk: "Тарихи квесттер", ru: "Исторические квесты", en: "Heritage Quests" },
      desc: { kk: "Интерактивті викториналар", ru: "Интерактивные викторины", en: "Interactive quizzes" },
    },
    {
      href: "/laboratory",
      icon: Beaker,
      color: "#1A5F7A",
      bg: "rgba(26,95,122,0.1)",
      border: "rgba(26,95,122,0.25)",
      title: { kk: "AI Зертхана", ru: "AI Лаборатория", en: "AI Laboratory" },
      desc: { kk: "Семантикалық граф алгоритмі", ru: "Алгоритм семантического графа", en: "Semantic graph algorithm" },
    },
    {
      href: "/research",
      icon: GraduationCap,
      color: "#C4714F",
      bg: "rgba(196,113,79,0.1)",
      border: "rgba(196,113,79,0.25)",
      title: { kk: "Edu Mode (Білім)", ru: "Edu Mode (Образование)", en: "Edu Mode" },
      desc: { kk: "Сабақтарға интеграция", ru: "Интеграция в уроки", en: "Lesson integration" },
    },
    {
      href: "/statistics",
      icon: BarChart2,
      color: "#5C4A35",
      bg: "rgba(92,74,53,0.1)",
      border: "rgba(92,74,53,0.2)",
      title: { kk: "Статистика", ru: "Статистика", en: "Analytics" },
      desc: { kk: "Ұлттық мұра аналитикасы", ru: "Аналитика национального наследия", en: "National heritage analytics" },
    },
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.region) return;
    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setShowSubmitModal(false);
      setFormData({ name: "", region: "", category: "", description: "", legend: "", authorName: "", contact: "" });
    }, 2200);
  };

  return (
    <div className="min-h-screen overflow-x-hidden relative" style={{ background: "#F5EFE6" }}>

      {/* Dynamic Technological Background with Pulsing Sacred Geo-points */}
      <div className="absolute top-0 left-0 w-full h-[85vh] overflow-hidden -z-10 pointer-events-none">
        {/* Vector topographic grid */}
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: `linear-gradient(#C4714F 1px, transparent 1px), linear-gradient(90deg, #C4714F 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
          transform: 'perspective(1000px) rotateX(60deg) scale(2.2) translateY(-15%)',
          transformOrigin: 'top center'
        }}></div>

        {/* Pulsing Sacred Geo-points of Kazakhstan */}
        {[
          { top: '35%', left: '48%', label: 'Түркістан' },
          { top: '45%', left: '72%', label: 'Алматы' },
          { top: '25%', left: '55%', label: 'Астана' },
          { top: '48%', left: '22%', label: 'Маңғыстау' },
          { top: '38%', left: '42%', label: 'Сырдария' },
          { top: '28%', left: '78%', label: 'Алтай' },
          { top: '20%', left: '38%', label: 'Ұлытау' },
        ].map((pt, i) => (
          <div key={i} className="absolute flex items-center gap-1.5" style={{ top: pt.top, left: pt.left }}>
            <div className="relative flex items-center justify-center">
              <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full opacity-75" style={{ background: "#C9A227" }}></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ background: "#C4714F" }}></span>
            </div>
            <span className="text-[10px] font-bold tracking-wider opacity-40 uppercase hidden sm:inline" style={{ color: "#8B6914" }}>
              {pt.label}
            </span>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-5 py-14 relative z-10">

        {/* Rebranded National Level Hero */}
        <div className="text-center mb-14 animate-fade-in-down">
          {/* National Project Badge */}
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full text-xs font-extrabold tracking-widest uppercase shadow-sm"
            style={{ background: "rgba(201,162,39,0.15)", border: "1px solid rgba(201,162,39,0.35)", color: "#8B6914" }}>
            <Globe className="w-3.5 h-3.5" style={{ color: "#C4714F" }} />
            {t("РЕСПУБЛИКАЛЫҚ ЦИФРЛЫҚ МҰРА ЖОБАСЫ", "РЕСПУБЛИКАНСКИЙ ЦИФРОВОЙ ПРОЕКТ НАCЛЕДИЯ", "NATIONAL DIGITAL HERITAGE PROJECT")}
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

          {/* National Subtitle */}
          <p className="text-lg md:text-2xl font-light max-w-3xl mx-auto mb-10 leading-relaxed" style={{ color: "#5C4A35" }}>
            {t(
              "Қазақстанның бай тарихи-мәдени мұрасы мен сакралды географиясын жасанды интеллект арқылы зерттеудің бірыңғай ұлттық цифрлық платформасы",
              "Единая национальная цифровая платформа для исследования богатого историко-культурного наследия и сакральной географии Казахстана с помощью искусственного интеллекта",
              "Unified national digital platform for exploring Kazakhstan's rich cultural heritage and sacred geography powered by AI"
            )}
          </p>

          {/* CTA Buttons with Soundwave Equalizer Micro-animation */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-14">
            {/* Primary CTA */}
            <Link
              href="/map"
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-base transition-all hover:scale-105 shadow-lg"
              style={{ background: "#1A5F7A", color: "#fff", boxShadow: "0 8px 24px rgba(26,95,122,0.3)" }}
            >
              <Map className="w-5 h-5" />
              {t("Картаны ашу", "Открыть карту", "Open Map")}
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Technological Secondary CTA with Soundwave Equalizer */}
            <Link
              href="/guide"
              className="group w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-base transition-all hover:scale-105 border-2 relative overflow-hidden"
              style={{
                background: "rgba(196,113,79,0.08)",
                borderColor: "#C4714F",
                color: "#C4714F",
                boxShadow: "0 4px 16px rgba(196,113,79,0.15)",
              }}
            >
              <Bot className="w-5 h-5 transition-transform group-hover:scale-110" />
              <span>{t("AI гидті іске қосу", "Запустить AI Guide", "Launch AI Guide")}</span>
              
              {/* Soundwave Equalizer Micro-animation */}
              <div className="flex items-end gap-0.5 h-3.5 ml-1">
                {[0.4, 0.8, 0.5, 0.9, 0.3].map((delay, idx) => (
                  <span
                    key={idx}
                    className="w-0.5 rounded-full group-hover:animate-pulse"
                    style={{
                      height: `${(idx % 3 + 1) * 33}%`,
                      background: "#C4714F",
                      animationDuration: `${0.6 + delay}s`,
                      animationDelay: `${delay}s`,
                    }}
                  />
                ))}
              </div>
            </Link>

            {/* Crowdsourcing Trigger Button */}
            <button
              onClick={() => setShowSubmitModal(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-sm transition-all hover:scale-105"
              style={{ background: "rgba(201,162,39,0.12)", border: "1px solid rgba(201,162,39,0.3)", color: "#8B6914" }}
            >
              <PlusCircle className="w-4 h-4" style={{ color: "#C9A227" }} />
              {t("Нысан ұсыну", "Предложить объект", "Suggest Object")}
            </button>
          </div>
        </div>

        {/* National Scaled Metric Cards (500+ objects, 20 regions) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16">
          {[
            { icon: Landmark, value: "500+", label: t("нысан мен аңыз", "объектов и легенд", "heritage & legends"), color: "#C9A227" },
            { icon: MapPin, value: "20", label: t("өңір (17+3)", "регионов (17+3)", "regions (17+3)"), color: "#1A5F7A" },
            { icon: AudioLines, value: "AI", label: t("аудио & сурет", "аудио & рисунок", "audio & visual AI"), color: "#C4714F" },
            { icon: Compass, value: "Smart", label: t("маршруттар", "маршруты", "smart routes"), color: "#2D6A4F" },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="rounded-2xl p-5 text-center flex flex-col items-center transition-all hover:shadow-md"
                style={{ background: "rgba(255,248,240,0.85)", border: "1px solid rgba(196,113,79,0.15)" }}>
                <Icon className="w-7 h-7 mb-2" style={{ color: stat.color }} />
                <div className="text-2xl font-extrabold mb-1" style={{ color: "#2C1F14" }}>{stat.value}</div>
                <div className="text-xs font-medium" style={{ color: "#8B6914" }}>{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Educational Contour Banner (Edu Mode) */}
        <div className="max-w-5xl mx-auto mb-14 rounded-2xl p-6 border shadow-sm flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ background: "linear-gradient(135deg, rgba(26,95,122,0.08) 0%, rgba(201,162,39,0.08) 100%)", borderColor: "rgba(26,95,122,0.2)" }}>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: "#1A5F7A", color: "#fff" }}>
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mb-1" style={{ background: "rgba(26,95,122,0.15)", color: "#1A5F7A" }}>
                {t("Білім контуры / Edu Mode", "Образовательный контур / Edu Mode", "Educational Contour / Edu Mode")}
              </div>
              <h3 className="text-lg font-bold" style={{ color: "#2C1F14" }}>
                {t("«Қазақстан тарихы» мен «География» сабақтарына арналған цифрлық кейстер", "Цифровые кейсы для уроков «История Казахстана» и «География»", "Digital cases for History of Kazakhstan & Geography lessons")}
              </h3>
              <p className="text-xs mt-1 leading-relaxed" style={{ color: "#5C4A35" }}>
                {t(
                  "Мұғалімдер мен оқушыларға арналған виртуалды турлар, интерактивті карта тапсырмалары және тарихи викториналар.",
                  "Виртуальные туры, задания на интерактивной карте и исторические викторины для учителей и учащихся.",
                  "Virtual tours, interactive map tasks, and historical quizzes for teachers and students."
                )}
              </p>
            </div>
          </div>
          <Link href="/research"
            className="flex-shrink-0 px-5 py-3 rounded-xl text-xs font-bold transition-all shadow-sm"
            style={{ background: "#1A5F7A", color: "#fff" }}>
            {t("Әдістемені ашу", "Открыть методику", "Open Edu Mode")}
          </Link>
        </div>

        {/* Crowdsourcing Banner ("Халықтық мұра" / Open Data) */}
        <div className="max-w-5xl mx-auto mb-16 rounded-2xl p-6 border shadow-sm flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ background: "rgba(255,248,240,0.9)", borderColor: "rgba(196,113,79,0.2)" }}>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: "#C4714F", color: "#fff" }}>
              <PlusCircle className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mb-1" style={{ background: "rgba(196,113,79,0.12)", color: "#C4714F" }}>
                {t("Халықтық мұра / Открытые данные", "Народное наследие / Открытые данные", "Crowdsourced Heritage / Open Data")}
              </div>
              <h3 className="text-lg font-bold" style={{ color: "#2C1F14" }}>
                {t("Өңіріңіздің киелі нысанын немесе аңызын ұсыныңыз", "Предложите сакральный объект или легенду своего региона", "Suggest a sacred object or legend of your region")}
              </h3>
              <p className="text-xs mt-1 leading-relaxed" style={{ color: "#5C4A35" }}>
                {t(
                  "Платформаны жалпыұлттық ашық банкке айналдыру үшін модерациядан өтетін ұсыныс пішіні.",
                  "Форма модерации для превращения платформы в пополняемый общенациональный банк данных.",
                  "Moderated submission form to make the platform an open national database."
                )}
              </p>
            </div>
          </div>
          <button onClick={() => setShowSubmitModal(true)}
            className="flex-shrink-0 px-5 py-3 rounded-xl text-xs font-bold transition-all border"
            style={{ background: "rgba(196,113,79,0.1)", borderColor: "#C4714F", color: "#C4714F" }}>
            {t("Нысан ұсыну", "Предложить объект", "Suggest Object")}
          </button>
        </div>

        {/* Features Grid */}
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8" style={{ color: "#2C1F14" }}>
            {t("Ұлттық платформа мүмкіндіктері", "Возможности национальной платформы", "National Platform Features")}
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

        {/* Footer with Exclusive School & Author Credits */}
        <footer className="mt-16 pt-8 border-t text-center text-xs space-y-2" style={{ borderColor: "rgba(196,113,79,0.15)", color: "#A08060" }}>
          <p className="font-semibold" style={{ color: "#5C4A35" }}>
            GeoCulture AI · {t("Республикалық цифрлық мұра платформасы", "Республиканская платформа цифрового наследия", "National Digital Heritage Platform")}
          </p>
          <p className="text-[11px]">
            {t(
              "Білім контуры: №290 орта мектебі оқушыларының ғылыми-зерттеу жобасы негізінде",
              "Образовательный контур: На основе научно-исследовательского проекта учащихся средней школы №290",
              "Educational Contour: Based on research project of School №290 students"
            )} · 2024–2026
          </p>
        </footer>

      </main>

      {/* Crowdsourcing Modal ("Нысан ұсыну") */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4" style={{ background: "rgba(44,31,20,0.6)", backdropFilter: "blur(6px)" }}>
          <div className="w-full max-w-lg rounded-2xl p-6 shadow-2xl animate-fade-in-down relative" style={{ background: "#FFF8F0", border: "1px solid rgba(196,113,79,0.3)" }}>
            <button onClick={() => setShowSubmitModal(false)} className="absolute top-4 right-4 p-1.5 rounded-lg text-stone-500 hover:bg-orange-100">
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-bold mb-1 flex items-center gap-2" style={{ color: "#2C1F14" }}>
              <PlusCircle className="w-5 h-5" style={{ color: "#C4714F" }} />
              {t("Сакралды нысан немесе аңыз ұсыну", "Предложить сакральный объект или легенду", "Suggest Sacred Object or Legend")}
            </h3>
            <p className="text-xs mb-4" style={{ color: "#8B6914" }}>
              {t("Ақпарат модерациядан өткен соң ұлттық банкке қосылады", "Информация будет добавлена в банк после модерации", "Information will be added after moderation")}
            </p>

            {submittedSuccess ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 mx-auto animate-bounce" style={{ color: "#2D6A4F" }} />
                <h4 className="text-base font-bold" style={{ color: "#2D6A4F" }}>
                  {t("Ұсынысыңыз қабылданды!", "Ваше предложение принято!", "Submission Received!")}
                </h4>
                <p className="text-xs" style={{ color: "#8B6914" }}>
                  {t("Рақмет! Өңіріңіздің мұрасын сақтауға қосқан үлесіңіз үшін.", "Спасибо за вклад в сохранение наследия вашего региона.", "Thank you for contributing to your region's heritage.")}
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: "#5C4A35" }}>
                    {t("Нысанның атауы", "Название объекта", "Object Name")} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t("Мысалы: Ақмешіт үңгірі", "Например: Пещера Акмечеть", "e.g., Akmeshit Cave")}
                    className="w-full px-3 py-2 text-xs rounded-xl focus:outline-none"
                    style={{ background: "rgba(196,113,79,0.06)", border: "1px solid rgba(196,113,79,0.2)", color: "#2C1F14" }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold mb-1" style={{ color: "#5C4A35" }}>
                      {t("Өңір / Қала", "Регион / Город", "Region / City")} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.region}
                      onChange={e => setFormData({ ...formData, region: e.target.value })}
                      placeholder={t("Түркістан облысы", "Туркестанская область", "Turkestan region")}
                      className="w-full px-3 py-2 text-xs rounded-xl focus:outline-none"
                      style={{ background: "rgba(196,113,79,0.06)", border: "1px solid rgba(196,113,79,0.2)", color: "#2C1F14" }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1" style={{ color: "#5C4A35" }}>
                      {t("Санат", "Категория", "Category")}
                    </label>
                    <select
                      value={formData.category}
                      onChange={e => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl focus:outline-none"
                      style={{ background: "rgba(196,113,79,0.06)", border: "1px solid rgba(196,113,79,0.2)", color: "#2C1F14" }}
                    >
                      <option value="">{t("Таңдаңыз", "Выберите", "Select")}</option>
                      <option value="sacred">{t("Киелі орын", "Сакральное место", "Sacred site")}</option>
                      <option value="monument">{t("Сәулет ескерткіші", "Памятник архитектуры", "Monument")}</option>
                      <option value="legend">{t("Аңыз бен жыр", "Легенда и предание", "Legend")}</option>
                      <option value="nature">{t("Табиғат", "Природа", "Nature")}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: "#5C4A35" }}>
                    {t("Сипаттамасы мен тарихи дерегі", "Описание и исторические данные", "Description & Context")} *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    placeholder={t("Нысанның тарихы, орналасқан жері...", "История объекта, местоположение...", "History of the object, location...")}
                    className="w-full px-3 py-2 text-xs rounded-xl focus:outline-none"
                    style={{ background: "rgba(196,113,79,0.06)", border: "1px solid rgba(196,113,79,0.2)", color: "#2C1F14" }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold mb-1" style={{ color: "#5C4A35" }}>
                      {t("Ұсынушы (Аты-жөні)", "Автор (ФИО)", "Author Name")}
                    </label>
                    <input
                      type="text"
                      value={formData.authorName}
                      onChange={e => setFormData({ ...formData, authorName: e.target.value })}
                      placeholder={t("Асан Әлиев", "Асан Алиев", "Asan Aliyev")}
                      className="w-full px-3 py-2 text-xs rounded-xl focus:outline-none"
                      style={{ background: "rgba(196,113,79,0.06)", border: "1px solid rgba(196,113,79,0.2)", color: "#2C1F14" }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1" style={{ color: "#5C4A35" }}>
                      {t("Байланыс (Email/Тел)", "Контакты (Email/Тел)", "Contact")}
                    </label>
                    <input
                      type="text"
                      value={formData.contact}
                      onChange={e => setFormData({ ...formData, contact: e.target.value })}
                      placeholder="email@example.com"
                      className="w-full px-3 py-2 text-xs rounded-xl focus:outline-none"
                      style={{ background: "rgba(196,113,79,0.06)", border: "1px solid rgba(196,113,79,0.2)", color: "#2C1F14" }}
                    />
                  </div>
                </div>

                <button type="submit"
                  className="w-full py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all mt-2"
                  style={{ background: "#1A5F7A", color: "#fff" }}>
                  <Send className="w-3.5 h-3.5" />
                  {t("Модерацияға жіберу", "Отправить на модерацию", "Submit for Moderation")}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}