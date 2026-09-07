"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Globe, Landmark, MapPin, Bot, AudioLines, Compass, ShieldCheck, Sparkles, BookOpen } from "lucide-react";

export default function AboutPage() {
  const { lang, t } = useLanguage();

  return (
    <div className="min-h-full py-10 px-4 custom-scrollbar" style={{ background: "#FAF7F2" }}>
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full text-xs font-bold"
            style={{ background: "rgba(201,162,39,0.12)", border: "1px solid rgba(201,162,39,0.25)", color: "#8B6914" }}>
            <Landmark className="w-3.5 h-3.5" />
            {t("№290 ОРТА МЕКТЕБІ", "СРЕДНЯЯ ШКОЛА №290")}
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3" style={{ color: "#2C1F14" }}>
            {t("Жоба туралы", "О проекте")}
          </h1>
          <p className="text-base max-w-2xl mx-auto" style={{ color: "#8B6914" }}>
            GeoCulture AI — {t(
              "Қазақстанның мәдени-тарихи мұрасын жасанды интеллект және GIS технологиялары арқылы зерттеуге арналған мектептік ғылыми-инновациялық платформа.",
              "Инновационная школьная исследовательская платформа для изучения культурно-исторического наследия Казахстана с помощью AI и GIS-технологий."
            )}
          </p>
        </div>

        {/* Mission & Overview */}
        <div className="rounded-2xl p-6 shadow-sm border space-y-6" style={{ background: "#FFF8F0", borderColor: "rgba(196,113,79,0.2)" }}>
          <div>
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2" style={{ color: "#1A5F7A" }}>
              <BookOpen className="w-5 h-5" style={{ color: "#C4714F" }} />
              {t("Жобаның мақсаты", "Цель проекта")}
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "#5C4A35" }}>
              {t(
                "GeoCulture AI платформасы №290 орта мектебі оқушыларының ғылыми-зерттеу жұмысы аясында жасалған. Басты мақсат — еліміздің тарихи нысандарын, киелі орындарын, ЮНЕСКО мұраларын заманауи интерактивті картада біріктіріп, оларды оқушыларға, туристерге және зерттеушілерге AI гид және аудиогид арқылы қолжетімді ету.",
                "Платформа GeoCulture AI создана в рамках научно-исследовательской работы учащихся средней школы №290. Главная цель — объединить исторические объекты, сакральные места и наследие ЮНЕСКО Казахстана на интерактивной карте, сделав их доступными для учащихся, туристов и исследователей с помощью AI-гида и аудиогида."
              )}
            </p>
          </div>

          {/* Key Technologies */}
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: "#C9A227" }}>
              <Globe className="w-5 h-5" />
              {t("Қолданылған технологиялар", "Используемые технологии")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { name: "Next.js 16 (App Router)", desc: t("Заманауи веб-фреймворк", "Современный веб-фреймворк"), icon: Globe },
                { name: "React Leaflet + OSM", desc: t("Тегін интерактивті GIS карта", "Интерактивная бесплатная GIS карта"), icon: MapPin },
                { name: "OpenAI ChatGPT API", desc: t("Тарихи AI көмекші (GPT-4o-mini)", "Исторический AI-помощник"), icon: Bot },
                { name: "OpenAI TTS API", desc: t("AI Аудиогид дыбыстау", "Озвучка аудиогида через AI"), icon: AudioLines },
                { name: "DALL-E 3 API", desc: t("AI Тарихи иллюстрациялар", "AI-исторические иллюстрации"), icon: Sparkles },
                { name: "Smart Routes Algorithm", desc: t("Интеллектуалды маршруттар", "Интеллектуальные маршруты"), icon: Compass },
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

          {/* School Badge */}
          <div className="p-4 rounded-xl flex items-center gap-4" style={{ background: "rgba(201,162,39,0.08)", border: "1px solid rgba(201,162,39,0.2)" }}>
            <ShieldCheck className="w-8 h-8 flex-shrink-0" style={{ color: "#C9A227" }} />
            <div>
              <p className="text-xs font-bold" style={{ color: "#2C1F14" }}>
                {t("№290 орта мектебінің ғылыми жобасы", "Научный проект средней школы №290")}
              </p>
              <p className="text-[11px] mt-0.5" style={{ color: "#8B6914" }}>
                {t(
                  "Мектеп оқушыларының тарихи мұраны цифрландыру және AI интеграциялау бойынша авторлық жобасы.",
                  "Авторский проект школьников по цифровизации исторического наследия и интеграции искусственного интеллекта."
                )}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}