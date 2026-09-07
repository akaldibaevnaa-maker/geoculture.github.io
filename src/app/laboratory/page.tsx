"use client";

import { useState } from "react";
import { Beaker, ArrowRight, BrainCircuit, Activity, Sparkles, Target, Search, CheckCircle2 } from "lucide-react";
import { culturalObjects } from "@/data/objects";
import { useLanguage } from "@/context/LanguageContext";
import { CulturalObject } from "@/types";

interface ResultItem extends CulturalObject {
  score: number;
}

const SAMPLE_QUERIES = {
  kk: [
    "Түркістан кесенелері мен софылық мәдениет",
    "Сақ дәуірінің алтын ескерткіштері мен обалары",
    "ЮНЕСКО тізіміндегі жартас суреттері",
    "Жібек жолы бойындағы ежелгі қалалар",
  ],
  ru: [
    "Мавзолеи Туркестана и суфийская культура",
    "Золотые памятники и курганы сакской эпохи",
    "Наскальные рисунки из списка ЮНЕСКО",
    "Древние города вдоль Великого шёлкового пути",
  ],
};

export default function LaboratoryPage() {
  const { lang, t } = useLanguage();
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<ResultItem[] | null>(null);
  const [customQuery, setCustomQuery] = useState("");
  const [steps, setSteps] = useState<string[]>([]);

  const runExperiment = (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    setAnalyzing(true);
    setResult(null);
    setSteps([]);

    const stepsList = lang === "kk" ? [
      "Сұранысты векторлық талдау...",
      "Семантикалық графпен салыстыру...",
      "Тарихи дәуірлер мен санаттар бойынша салмақтау...",
      "Ұсынылатын нысандарды рейтингтеу...",
    ] : [
      "Векторный анализ запроса...",
      "Сопоставление с семантическим графом...",
      "Взвешивание по эпохам и категориям...",
      "Ранжирование рекомендуемых объектов...",
    ];

    stepsList.forEach((step, idx) => {
      setTimeout(() => {
        setSteps(prev => [...prev, step]);
      }, (idx + 1) * 350);
    });

    setTimeout(() => {
      const q = searchQuery.toLowerCase();
      const scored = culturalObjects.map(obj => {
        let score = 60;
        const text = `${obj.name[lang]} ${obj.description[lang]} ${obj.historicalSignificance[lang]} ${obj.period} ${obj.category[lang]}`.toLowerCase();
        q.split(" ").forEach(word => {
          if (word.length > 3 && text.includes(word)) score += 12;
        });
        if (obj.unesco) score += 8;
        return { ...obj, score: Math.min(score, 99) };
      }).sort((a, b) => b.score - a.score).slice(0, 3);

      setResult(scored);
      setAnalyzing(false);
    }, 1800);
  };

  return (
    <div className="min-h-full p-6 custom-scrollbar" style={{ background: "#FAF7F2" }}>
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full text-xs font-bold"
            style={{ background: "rgba(26,95,122,0.12)", color: "#1A5F7A", border: "1px solid rgba(26,95,122,0.2)" }}>
            <Beaker className="w-3.5 h-3.5" />
            {t("AI Зертханасы", "AI Лаборатория")}
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold" style={{ color: "#2C1F14" }}>
            {t("Семантикалық іздеу & Ұсыныс гипотезасы", "Семантический поиск & Рекомендательные гипотезы")}
          </h1>
          <p className="text-xs max-w-xl mx-auto mt-1" style={{ color: "#8B6914" }}>
            {t("Жасанды интеллект арқылы мәдени-тарихи нысандар арасындағы жасырын байланыстарды іздеу зертханасы", "Лаборатория поиска скрытых связей между историческими объектами с помощью AI")}
          </p>
        </div>

        {/* Experiment Input */}
        <div className="rounded-2xl p-6 border space-y-4 shadow-sm" style={{ background: "#FFF8F0", borderColor: "rgba(196,113,79,0.2)" }}>
          <h2 className="text-sm font-bold flex items-center gap-2" style={{ color: "#2C1F14" }}>
            <BrainCircuit className="w-4 h-4" style={{ color: "#1A5F7A" }} />
            {t("Гипотезаны енгізіңіз немесе үлгіні таңдаңыз", "Введите гипотезу или выберите пример")}
          </h2>

          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-4 h-4" style={{ color: "#8B6914" }} />
              <input
                type="text"
                value={customQuery}
                onChange={e => setCustomQuery(e.target.value)}
                onKeyDown={e => e.key === "Enter" && runExperiment(customQuery)}
                placeholder={t("Сұранысты жазыңыз...", "Введите запрос...")}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl text-xs focus:outline-none"
                style={{ background: "#FFF8F0", border: "1px solid rgba(196,113,79,0.25)", color: "#2C1F14" }}
              />
            </div>
            <button onClick={() => runExperiment(customQuery)} disabled={analyzing || !customQuery.trim()}
              className="px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all"
              style={{ background: "#1A5F7A", color: "#fff", opacity: analyzing || !customQuery.trim() ? 0.6 : 1 }}>
              {t("Талдау", "Анализировать")}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Preset Prompts */}
          <div className="space-y-1.5 pt-2">
            <p className="text-[11px] font-semibold" style={{ color: "#8B6914" }}>{t("Дайын үлгілер:", "Готовые примеры:")}</p>
            <div className="flex flex-wrap gap-2">
              {(SAMPLE_QUERIES[lang === "kk" ? "kk" : "ru"] || SAMPLE_QUERIES.kk).map((q: string, i: number) => (
                <button key={i} onClick={() => { setCustomQuery(q); runExperiment(q); }}
                  className="text-xs px-3 py-1.5 rounded-lg text-left transition-all"
                  style={{ background: "rgba(201,162,39,0.1)", border: "1px solid rgba(201,162,39,0.25)", color: "#8B6914" }}>
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Experiment Steps Log */}
        {steps.length > 0 && (
          <div className="rounded-2xl p-5 border space-y-2" style={{ background: "rgba(26,95,122,0.06)", borderColor: "rgba(26,95,122,0.18)" }}>
            <h3 className="text-xs font-bold flex items-center gap-2" style={{ color: "#1A5F7A" }}>
              <Activity className="w-3.5 h-3.5" />
              {t("Алгоритмнің қадамдары", "Шаги алгоритма")}
            </h3>
            <div className="space-y-1.5">
              {steps.map((step, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs" style={{ color: "#2C1F14" }}>
                  <CheckCircle2 className="w-3.5 h-3.5" style={{ color: "#2D6A4F" }} />
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-3 animate-fade-in">
            <h3 className="text-sm font-bold flex items-center gap-2" style={{ color: "#2C1F14" }}>
              <Sparkles className="w-4 h-4" style={{ color: "#C9A227" }} />
              {t("AI Ұсыныстар нәтижесі", "Результаты AI-рекомендаций")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {result.map(item => (
                <div key={item.id} className="rounded-xl p-4 border flex flex-col justify-between"
                  style={{ background: "#FFF8F0", borderColor: "rgba(196,113,79,0.2)" }}>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded" style={{ background: "rgba(26,95,122,0.12)", color: "#1A5F7A" }}>
                        {t("Сәйкестік", "Совпадение")} {item.score}%
                      </span>
                      {item.unesco && <span className="text-[9px] font-bold" style={{ color: "#C9A227" }}>UNESCO</span>}
                    </div>
                    <h4 className="text-xs font-bold mb-1" style={{ color: "#2C1F14" }}>{item.name[lang]}</h4>
                    <p className="text-[11px] line-clamp-2" style={{ color: "#5C4A35" }}>{item.description[lang]}</p>
                  </div>
                  <div className="mt-3 pt-2 border-t text-[10px] flex justify-between" style={{ borderColor: "rgba(196,113,79,0.1)", color: "#8B6914" }}>
                    <span>📍 {item.region[lang]}</span>
                    <span>⏳ {item.period}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}