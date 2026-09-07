"use client";

import { useLanguage } from "@/context/LanguageContext";
import { BookOpen, Landmark, BrainCircuit, GraduationCap, Target, CheckCircle2, Sparkles, Compass, Users } from "lucide-react";

export default function ResearchPage() {
  const { lang, t } = useLanguage();

  return (
    <div className="min-h-full p-6 custom-scrollbar" style={{ background: "#FAF7F2" }}>
      <div className="max-w-4xl mx-auto space-y-6 pb-12">

        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full text-xs font-bold"
            style={{ background: "rgba(201,162,39,0.12)", color: "#8B6914", border: "1px solid rgba(201,162,39,0.25)" }}>
            <GraduationCap className="w-3.5 h-3.5" style={{ color: "#C4714F" }} />
            {t("Білім контуры (Edu Mode) & Ғылым", "Образовательный контур (Edu Mode) & Наука", "Educational Contour (Edu Mode) & Science")}
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold" style={{ color: "#2C1F14" }}>
            {t("GeoCulture AI: Мектептерге арналған Дидактикалық Әдістеме", "GeoCulture AI: Дидактическая методика для школ", "GeoCulture AI: Didactic Methodology for Schools")}
          </h1>
          <p className="text-xs max-w-2xl mx-auto mt-1" style={{ color: "#8B6914" }}>
            {t(
              "«Қазақстан тарихы» мен «География» пәндері бойынша интерактивті сабақтар, виртуалды квестік кейстер мен мектеп зерттеулері",
              "Интерактивные уроки, виртуальные кейсы и школьные исследования по предметам «История Казахстана» и «География»",
              "Interactive lessons, virtual cases, and school research for 'History of Kazakhstan' & 'Geography' subjects"
            )}
          </p>
        </div>

        {/* Edu Mode Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl p-5 border" style={{ background: "#FFF8F0", borderColor: "rgba(26,95,122,0.2)" }}>
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-4 h-4" style={{ color: "#1A5F7A" }} />
              <h3 className="text-sm font-bold" style={{ color: "#1A5F7A" }}>
                {t("1. «Қазақстан тарихы» пәні", "1. Предмет «История Казахстана»", "1. 'History of Kazakhstan' Subject")}
              </h3>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "#5C4A35" }}>
              {t(
                "Сақ, Ғұн, Түркі қағандығы және Қазақ хандығы кезеңдеріндегі нысандарды интерактивті картада зерделеу, аңыздарды AI гидпен талдау.",
                "Изучение объектов эпох саков, гуннов, Тюркского каганата и Казахского ханства на интерактивной карте, анализ легенд с AI-гидом.",
                "Exploring Saka, Hun, Turkic Khaganate, and Kazakh Khanate sites on an interactive map, analyzing legends with AI guide."
              )}
            </p>
          </div>

          <div className="rounded-2xl p-5 border" style={{ background: "#FFF8F0", borderColor: "rgba(201,162,39,0.25)" }}>
            <div className="flex items-center gap-2 mb-2">
              <Compass className="w-4 h-4" style={{ color: "#C9A227" }} />
              <h3 className="text-sm font-bold" style={{ color: "#8B6914" }}>
                {t("2. «География» пәні", "2. Предмет «География»", "2. 'Geography' Subject")}
              </h3>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "#5C4A35" }}>
              {t(
                "Қазақстанның 20 өңірінің топографиясын, ландшафтын, сакралды географиясы мен туристік кластерлерін GIS карта арқылы картаға түсіру.",
                "Картографирование топографии, ландшафтов, сакральной географии и туристских кластеров 20 регионов Казахстана через GIS-карту.",
                "Mapping topography, landscapes, sacred geography, and tourism clusters across Kazakhstan's 20 regions via GIS map."
              )}
            </p>
          </div>
        </div>

        {/* Section: National Relevance */}
        <div className="rounded-2xl p-6 border space-y-3" style={{ background: "#FFF8F0", borderColor: "rgba(196,113,79,0.2)" }}>
          <h2 className="text-base font-bold flex items-center gap-2" style={{ color: "#1A5F7A" }}>
            <Target className="w-4 h-4" style={{ color: "#C4714F" }} />
            {t("Өзектілігі мен Ұлттық Масштаб", "Актуальность и Национальный масштабирование", "Relevance & National Scale")}
          </h2>
          <p className="text-xs leading-relaxed" style={{ color: "#5C4A35" }}>
            {t(
              "GeoCulture AI платформасы Қазақстанның 20 өңіріндегі 500-ден астам мәдени-тарихи нысандар мен аңыздарды бірыңғай цифрлық стандартқа біріктіреді. Оқушылар мен мұғалімдер үшін сабақ кезінде зерттеу жүргізуге, квесттер тапсыруға және жеке саяхат маршруттарын жоспарлауға толық мүмкіндік береді.",
              "Платформа GeoCulture AI объединяет более 500 историко-культурных объектов и легенд из 20 регионов Казахстана в единый цифровой стандарт. Оснащает учащихся и учителей инструментами для проведения исследований во время уроков, прохождения квестов и планирования путешествий.",
              "GeoCulture AI integrates over 500 cultural heritage sites and legends across all 20 regions of Kazakhstan into a unified digital ecosystem, equipping students and teachers with interactive tools for lessons, quizzes, and travel planning."
            )}
          </p>
        </div>

        {/* Scientific Novelty Grid */}
        <div className="rounded-2xl p-6 border space-y-4" style={{ background: "#FFF8F0", borderColor: "rgba(196,113,79,0.2)" }}>
          <h2 className="text-base font-bold flex items-center gap-2" style={{ color: "#2C1F14" }}>
            <CheckCircle2 className="w-4 h-4" style={{ color: "#2D6A4F" }} />
            {t("Платформаның Ғылыми Жаңашылдығы", "Научная новизна платформы", "Scientific Innovation of Platform")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                title: t("Үш тілді AI Гид (KZ / RU / EN)", "Трёхязычный AI-Гид (KZ / RU / EN)", "Trilingual AI Guide (KZ / RU / EN)"),
                desc: t("Қазақ, орыс және ағылшын тілдерінде тарихи контекстті тексерілген фактілермен беретін жүйелік промпт инжинирингі.", "Системный промпт-инжиниринг, предоставляющий исторический контекст с проверенными фактами на казахском, русском и английском языках.", "System prompt engineering providing verified historical facts across Kazakh, Russian, and English."),
              },
              {
                title: t("Халықтық Мұра Краудсорсингі", "Краудсорсинг «Народное наследие»", "Crowdsourced Heritage Bank"),
                desc: t("Әрбір өңір тұрғыны мен оқушыға жергілікті аңыз немесе сакралды орынды модерация арқылы ұлттық банкке қосу мүмкіндігі.", "Возможность для каждого жителя и учащегося предложить местную легенду или сакральный объект в национальный банк данных.", "Capability for citizens and students to submit local legends and sacred sites to the national database through moderation."),
              },
              {
                title: t("Интеллектуалды Маршрут Алгоритмі", "Алгоритм интеллектуальных маршрутов", "Smart Route Algorithm"),
                desc: t("20 өңір бойынша қашықтық пен саяхат уақытын Leaflet Polyline арқылы автоматты есептеу.", "Автоматический расчёт расстояний и времени путешествия по 20 регионам с помощью Leaflet Polyline.", "Automatic calculation of distances and travel times across 20 regions using Leaflet Polyline."),
              },
              {
                title: t("13 Тарихи Дәуір Семантикасы", "Семантика 13 исторических эпох", "Semantics of 13 Eras"),
                desc: t("Ежелгі дәуірден тәуелсіздікке дейінгі оқиғалар, тұлғалар және ескерткіштер байланысы.", "Связи между событиями, личностями и памятниками от древности до независимости.", "Relationships between events, personalities, and monuments from antiquity to independence."),
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