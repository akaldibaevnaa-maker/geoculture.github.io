"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Globe, Landmark, MapPin, Bot, AudioLines, Compass, ShieldCheck, Sparkles, BookOpen, GraduationCap, Users } from "lucide-react";

export default function AboutPage() {
  const { lang, t } = useLanguage();

  return (
    <div className="min-h-full py-10 px-4 custom-scrollbar" style={{ background: "#FAF7F2" }}>
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header - National Level */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider"
            style={{ background: "rgba(201,162,39,0.15)", border: "1px solid rgba(201,162,39,0.35)", color: "#8B6914" }}>
            <Globe className="w-3.5 h-3.5" style={{ color: "#C4714F" }} />
            {t("РЕСПУБЛИКАЛЫҚ ЦИФРЛЫҚ МҰРА ЖОБАСЫ", "РЕСПУБЛИКАНСКИЙ ЦИФРОВОЙ ПРОЕКТ НАCЛЕДИЯ", "NATIONAL DIGITAL HERITAGE PROJECT")}
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3" style={{ color: "#2C1F14" }}>
            {t("Жоба мен Команда туралы", "О проекте и Команде", "About Project & Team")}
          </h1>
          <p className="text-base max-w-2xl mx-auto" style={{ color: "#8B6914" }}>
            GeoCulture AI — {t(
              "Қазақстанның мәдени-тарихи мұрасын жасанды интеллект және GIS технологиялары арқылы зерттеуге арналған ұлттық цифрлық платформа.",
              "Национальная цифровая платформа для исследования культурно-исторического наследия Казахстана с помощью AI и GIS-технологий.",
              "National digital platform for exploring Kazakhstan's cultural heritage using AI and GIS technologies."
            )}
          </p>
        </div>

        {/* Mission & Overview */}
        <div className="rounded-2xl p-6 shadow-sm border space-y-6" style={{ background: "#FFF8F0", borderColor: "rgba(196,113,79,0.2)" }}>
          <div>
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2" style={{ color: "#1A5F7A" }}>
              <BookOpen className="w-5 h-5" style={{ color: "#C4714F" }} />
              {t("Платформаның Мақсаты", "Цель Платформы", "Platform Mission")}
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "#5C4A35" }}>
              {t(
                "GeoCulture AI платформасының басты мақсаты — Еліміздің 20 өңіріндегі тарихи нысандарды, киелі орындарды, ЮНЕСКО мұраларын біртұтас GIS картада біріктіріп, оларды оқушыларға, туристерге және зерттеушілерге AI гид, аудиогид және краудсорсинг арқылы қолжетімді ету.",
                "Главная цель платформы GeoCulture AI — объединить исторические объекты, сакральные места и наследие ЮНЕСКО 20 регионов Казахстана на единой GIS-карте, сделав их доступными для учащихся, туристов и исследователей с помощью AI-гида, аудиогида и краудсорсинга.",
                "The main goal of GeoCulture AI is to unify historical sites, sacred locations, and UNESCO heritage across 20 regions of Kazakhstan on a single GIS map, making them accessible via AI guide, audio guide, and crowdsourcing."
              )}
            </p>
          </div>

          {/* Key Technologies */}
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: "#C9A227" }}>
              <Globe className="w-5 h-5" />
              {t("Технологиялық архитектура", "Технологическая архитектура", "Technical Architecture")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { name: "Next.js 16 (App Router)", desc: t("Заманауи веб-фреймворк", "Современный веб-фреймворк", "Modern Web Framework"), icon: Globe },
                { name: "React Leaflet + OSM", desc: t("Тегін интерактивті GIS карта", "Интерактивная бесплатная GIS карта", "Free Interactive GIS Map"), icon: MapPin },
                { name: "OpenAI ChatGPT API", desc: t("Тарихи AI көмекші (GPT-4o-mini)", "Исторический AI-помощник", "AI Historian Assistant"), icon: Bot },
                { name: "OpenAI TTS API", desc: t("AI Аудиогид дыбыстау", "Озвучка аудиогида через AI", "AI Audio Guide Voiceover"), icon: AudioLines },
                { name: "DALL-E 3 API", desc: t("AI Тарихи иллюстрациялар", "AI-исторические иллюстрации", "AI Historical Visualizations"), icon: Sparkles },
                { name: "Smart Routes Algorithm", desc: t("Интеллектуалды маршруттар", "Интеллектуальные маршруты", "Smart Route Algorithms"), icon: Compass },
              ].map((tech, i) => {
                const Icon = tech.icon;
                return (
                  <div key={i} className="p-3.5 rounded-xl border transition-all" style={{ background: "rgba(245,239,230,0.6)", borderColor: "rgba(196,113,79,0.15)" }}>
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="w-4 h-4" style={{ color: "#C4714F" }} />
                      <span className="text-xs font-bold" style={{ color: "#2C1F14" }}>{tech.name}</span>
                    </div>
                    <p className="text-[11px]" style={{ color: "#8B6914" }}>{tech.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Educational Contour & Authors credits (School #290) */}
          <div className="p-5 rounded-xl flex items-center gap-4 border" style={{ background: "rgba(201,162,39,0.08)", borderColor: "rgba(201,162,39,0.25)" }}>
            <GraduationCap className="w-9 h-9 flex-shrink-0" style={{ color: "#C9A227" }} />
            <div>
              <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "#C4714F" }}>
                {t("Білім контуры & Авторлар", "Образовательный контур & Авторы", "Educational Contour & Authors")}
              </p>
              <p className="text-xs font-semibold mt-0.5" style={{ color: "#2C1F14" }}>
                {t(
                  "№290 орта мектебі оқушыларының ғылыми-зерттеу жобасы негізінде әзірленген",
                  "Разработано на основе научно-исследовательского проекта учащихся средней школы №290",
                  "Developed based on research project of School №290 students"
                )}
              </p>
              <p className="text-[11px] mt-1 leading-relaxed" style={{ color: "#8B6914" }}>
                {t(
                  "Авторлық ұжым: Мектеп оқушылары мен ғылыми жетекшілерінің тарихи мұраны цифрландыру, AI интеграциялау және ашық халықтық банк жасау жұмысы.",
                  "Авторский коллектив: Работа учащихся и научных руководителей по цифровизации исторического наследия, интеграции AI и созданию открытого народного банка данных.",
                  "Author team: School students and research advisors digitizing cultural heritage and integrating AI into an open national dataset."
                )}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}