"use client";

import { useLanguage } from "@/context/LanguageContext";
import { BookOpen, Landmark, BrainCircuit, Compass, Target, Database, FileText, CheckCircle2 } from "lucide-react";

export default function ResearchPage() {
  const { lang, t } = useLanguage();

  return (
    <div className="min-h-full p-6 custom-scrollbar" style={{ background: "#FAF7F2" }}>
      <div className="max-w-4xl mx-auto space-y-6 pb-12">

        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full text-xs font-bold"
            style={{ background: "rgba(201,162,39,0.12)", color: "#8B6914", border: "1px solid rgba(201,162,39,0.25)" }}>
            <BookOpen className="w-3.5 h-3.5" />
            {t("Ғылыми негіздеме", "Научное обоснование")}
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold" style={{ color: "#2C1F14" }}>
            {t("GeoCulture AI: Ғылыми-зерттеу Негіздері", "GeoCulture AI: Научно-исследовательские основы")}
          </h1>
          <p className="text-xs max-w-2xl mx-auto mt-1" style={{ color: "#8B6914" }}>
            {t("№290 орта мектебі оқушыларының тарихи-мәдени мұраны цифрландыру бойынша ғылыми жұмысының сипаттамасы", "Описание научной работы учащихся средней школы №290 по цифровизации историко-культурного наследия")}
          </p>
        </div>

        {/* Section 1: Problem & Relevance */}
        <div className="rounded-2xl p-6 border space-y-3" style={{ background: "#FFF8F0", borderColor: "rgba(196,113,79,0.2)" }}>
          <h2 className="text-base font-bold flex items-center gap-2" style={{ color: "#1A5F7A" }}>
            <Target className="w-4 h-4" style={{ color: "#C4714F" }} />
            {t("1. Өзектілігі мен Зерттеу Мәселесі", "1. Актуальность и проблема исследования")}
          </h2>
          <p className="text-xs leading-relaxed" style={{ color: "#5C4A35" }}>
            {t(
              "Қазақстан аумағында жүздеген тарихи-сәулет ескерткіштері мен ЮНЕСКО мұралары бар. Алайда, бұл ақпараттар әртүрлі оқулықтар мен ғылыми басылымдарда бытыраңқы орналасқан. Оқушылар мен туристерге тарихи нысандарды біртұтас GIS картада көру, AI көмегімен терең зерттеу және жеке маршруттар құру мүмкіндігі жетіспейді.",
              "На территории Казахстана находятся сотни историко-архитектурных памятников и объектов ЮНЕСКО. Однако эти сведения разрознены по различным учебникам и научным изданиям. Учащимся и туристам не хватает возможности увидеть исторические объекты на единой GIS-карте, глубоко изучить их с помощью AI и построить персональные маршруты."
            )}
          </p>
        </div>

        {/* Section 2: Research Object & Subject */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl p-5 border" style={{ background: "#FFF8F0", borderColor: "rgba(196,113,79,0.2)" }}>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5" style={{ color: "#C9A227" }}>
              <Landmark className="w-3.5 h-3.5" />
              {t("Зерттеу объектісі", "Объект исследования")}
            </h3>
            <p className="text-xs leading-relaxed" style={{ color: "#5C4A35" }}>
              {t(
                "Қазақстанның 17 облысы мен 3 республикалық қаласындағы тарихи-мәдени, археологиялық, сакралды және ЮНЕСКО объектілері.",
                "Историко-культурные, археологические, сакральные объекты и наследие ЮНЕСКО в 17 областях и 3 городах республиканского значения Казахстана."
              )}
            </p>
          </div>

          <div className="rounded-2xl p-5 border" style={{ background: "#FFF8F0", borderColor: "rgba(196,113,79,0.2)" }}>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5" style={{ color: "#1A5F7A" }}>
              <BrainCircuit className="w-3.5 h-3.5" />
              {t("Зерттеу пәні", "Предмет исследования")}
            </h3>
            <p className="text-xs leading-relaxed" style={{ color: "#5C4A35" }}>
              {t(
                "Жасанды интеллект (LLM), семантикалық іздеу және интерактивті GIS карталарды интеграциялау арқылы мәдени мұраны цифрландыру әдістері.",
                "Методы цифровизации культурного наследия с использованием искусственного интеллекта (LLM), семантического поиска и интерактивных GIS-карт."
              )}
            </p>
          </div>
        </div>

        {/* Section 3: Novelty & Scientific Innovations */}
        <div className="rounded-2xl p-6 border space-y-4" style={{ background: "#FFF8F0", borderColor: "rgba(196,113,79,0.2)" }}>
          <h2 className="text-base font-bold flex items-center gap-2" style={{ color: "#2C1F14" }}>
            <CheckCircle2 className="w-4 h-4" style={{ color: "#2D6A4F" }} />
            {t("Ғылыми Жаңашылдығы", "Научная новизна")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                title: t("Билингвалды AI Тарихшы", "Билингвальный AI-историк"),
                desc: t("Қазақ және орыс тілдерінде тарихи контекстті тексерілген фактілермен беретін арнайы жүйелік промпт инжинирингі.", "Специальный системный промпт-инжиниринг, предоставляющий исторический контекст с проверенными фактами на казахском и русском языках."),
              },
              {
                title: t("Интеллектуалды Маршрут Агоритмі", "Алгоритм интеллектуальных маршрутов"),
                desc: t("Қашықтық, уақыт шектеулері және пайдаланушы қызығушылықтары негізінде саяхат тізбегін автоматты есептеу.", "Автоматический расчёт цепочки путешествия на основе расстояний, временных ограничений и интересов пользователя."),
              },
              {
                title: t("Семантикалық Уақыт Лентасы", "Семантическая временная лента"),
                desc: t("13 тарихи дәуір мен нысандар, оқиғалар, тұлғалар арасындағы байланыстарды визуализациялау.", "Визуализация связей между 13 историческими эпохами, объектами, событиями и личностями."),
              },
              {
                title: t("Мультимодальді AI Гид", "Мультимодальный AI-гид"),
                desc: t("Мәтіндік жауап, OpenAI TTS арқылы аудиогид және DALL-E 3 арқылы тарихи реконструкция иллюстраторлары.", "Текстовый ответ, аудиогид через OpenAI TTS и исторические иллюстрации-реконструкции через DALL-E 3."),
              },
            ].map((item, i) => (
              <div key={i} className="p-3.5 rounded-xl border" style={{ background: "rgba(245,239,230,0.6)", borderColor: "rgba(196,113,79,0.12)" }}>
                <p className="text-xs font-bold mb-1" style={{ color: "#1A5F7A" }}>{item.title}</p>
                <p className="text-[11px] leading-relaxed" style={{ color: "#5C4A35" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}