"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { culturalObjects } from "@/data/objects";
import { HISTORICAL_PERIODS } from "@/data/periods";
import { Clock, ChevronRight, Users, Calendar, Swords, Star } from "lucide-react";
import Link from "next/link";

export default function TimelinePage() {
  const { lang, t } = useLanguage();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedPeriod = HISTORICAL_PERIODS.find(p => p.id === selectedId) || null;

  const relatedObjects = selectedPeriod
    ? selectedPeriod.relatedObjectIds.length > 0
      ? culturalObjects.filter(o => selectedPeriod.relatedObjectIds.includes(o.id))
      : culturalObjects.filter(o => {
          const desc = o.description[lang].toLowerCase() + o.historicalSignificance[lang].toLowerCase();
          const keywords = selectedPeriod.title[lang].toLowerCase().split(" ").filter(w => w.length > 3);
          return keywords.some(kw => desc.includes(kw));
        }).slice(0, 4)
    : [];

  return (
    <div className="min-h-full" style={{ background: "#FAF7F2" }}>
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full text-xs font-bold"
            style={{ background: "rgba(201,162,39,0.12)", border: "1px solid rgba(201,162,39,0.25)", color: "#8B6914" }}>
            <Clock className="w-3.5 h-3.5" />
            {t("Тарихи лента", "Историческая лента")}
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3" style={{ color: "#2C1F14" }}>
            {t("Қазақстан тарихы", "История Казахстана")}
          </h1>
          <p className="text-sm max-w-xl mx-auto" style={{ color: "#8B6914" }}>
            {t("Ежелгі дәуірден тәуелсіздікке дейінгі тарихты зерттеңіз", "Исследуйте историю от древности до независимости")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Timeline list */}
          <div className="lg:col-span-1">
            <div className="relative border-l-2 ml-3 space-y-1 pb-4" style={{ borderColor: "rgba(196,113,79,0.2)" }}>
              {HISTORICAL_PERIODS.map((period, idx) => {
                const isSelected = selectedId === period.id;
                return (
                  <div key={period.id} className="relative pl-6">
                    <div
                      className="absolute -left-[9px] top-4 w-4 h-4 rounded-full border-2 transition-all"
                      style={{
                        background: isSelected ? period.color : "#FFF8F0",
                        borderColor: period.color,
                        boxShadow: isSelected ? `0 0 10px ${period.color}80` : "none",
                      }}
                    />
                    <button
                      onClick={() => setSelectedId(isSelected ? null : period.id)}
                      className="w-full text-left p-3 rounded-xl transition-all"
                      style={{
                        background: isSelected ? `${period.color}12` : "transparent",
                        border: `1px solid ${isSelected ? period.color + "40" : "transparent"}`,
                      }}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-xs font-bold leading-tight" style={{ color: isSelected ? period.color : "#2C1F14" }}>
                            {period.title[lang]}
                          </p>
                          <p className="text-[10px] mt-0.5" style={{ color: "#A08060" }}>{period.years}</p>
                        </div>
                        <ChevronRight
                          className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 transition-transform"
                          style={{ color: period.color, transform: isSelected ? "rotate(90deg)" : "none" }}
                        />
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Period details */}
          <div className="lg:col-span-2">
            {!selectedPeriod && (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center rounded-2xl"
                style={{ border: "2px dashed rgba(196,113,79,0.2)", background: "rgba(255,248,240,0.5)" }}>
                <Clock className="w-12 h-12 mb-3 opacity-25" style={{ color: "#C4714F" }} />
                <p className="text-sm font-medium" style={{ color: "#8B6914" }}>
                  {t("Дәуірді таңдаңыз", "Выберите период")}
                </p>
                <p className="text-xs mt-1" style={{ color: "#A08060" }}>
                  {t("Тарихи ақпарат осында көрсетіледі", "Историческая информация появится здесь")}
                </p>
              </div>
            )}

            {selectedPeriod && (
              <div className="rounded-2xl overflow-hidden animate-fade-in-down" style={{ background: "#FFF8F0", border: "1px solid rgba(196,113,79,0.18)" }}>

                {/* Period header */}
                <div className="p-5 border-b" style={{
                  borderColor: "rgba(196,113,79,0.12)",
                  background: `linear-gradient(135deg, ${selectedPeriod.color}10 0%, transparent 100%)`
                }}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 rounded-full" style={{ background: selectedPeriod.color }} />
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: selectedPeriod.color }}>
                      {selectedPeriod.years}
                    </span>
                  </div>
                  <h2 className="text-2xl font-extrabold mb-2" style={{ color: "#2C1F14" }}>
                    {selectedPeriod.title[lang]}
                  </h2>
                  <p className="text-sm leading-relaxed" style={{ color: "#5C4A35" }}>
                    {selectedPeriod.description[lang]}
                  </p>
                </div>

                <div className="p-5 space-y-5">

                  {/* Key events */}
                  {selectedPeriod.events.length > 0 && (
                    <div>
                      <h3 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: "#2C1F14" }}>
                        <Swords className="w-4 h-4" style={{ color: selectedPeriod.color }} />
                        {t("Негізгі оқиғалар", "Ключевые события")}
                      </h3>
                      <div className="space-y-2">
                        {selectedPeriod.events.map((event, i) => (
                          <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-xl" style={{ background: `${selectedPeriod.color}08`, border: `1px solid ${selectedPeriod.color}18` }}>
                            <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: selectedPeriod.color }} />
                            <span className="text-xs leading-relaxed" style={{ color: "#5C4A35" }}>{event[lang]}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Historical persons */}
                  {selectedPeriod.persons.length > 0 && (
                    <div>
                      <h3 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: "#2C1F14" }}>
                        <Users className="w-4 h-4" style={{ color: "#8B3A8B" }} />
                        {t("Тарихи тұлғалар", "Исторические личности")}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedPeriod.persons.map((person, i) => (
                          <span key={i} className="text-xs px-2.5 py-1 rounded-lg font-medium"
                            style={{ background: "rgba(139,58,139,0.1)", color: "#8B3A8B", border: "1px solid rgba(139,58,139,0.2)" }}>
                            {person}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Related cultural objects */}
                  {relatedObjects.length > 0 && (
                    <div>
                      <h3 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: "#2C1F14" }}>
                        <Star className="w-4 h-4" style={{ color: "#C9A227" }} />
                        {t("Байланысты тарихи нысандар", "Связанные исторические объекты")}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {relatedObjects.map(obj => (
                          <Link key={obj.id} href={`/objects/${obj.id}`}
                            className="p-3 rounded-xl block transition-all hover:shadow-md"
                            style={{ background: "rgba(245,239,230,0.8)", border: "1px solid rgba(196,113,79,0.15)" }}>
                            <p className="text-xs font-bold mb-0.5" style={{ color: "#2C1F14" }}>{obj.name[lang]}</p>
                            <p className="text-[10px]" style={{ color: "#8B6914" }}>{obj.period}</p>
                            <p className="text-[11px] mt-1 line-clamp-2" style={{ color: "#5C4A35" }}>{obj.description[lang]}</p>
                            {obj.unesco && <span className="inline-block mt-1.5 text-[9px] px-1.5 py-0.5 rounded font-bold" style={{ background: "rgba(201,162,39,0.15)", color: "#8B6914" }}>UNESCO</span>}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Timeline navigation */}
                  <div className="flex justify-between items-center pt-2 border-t" style={{ borderColor: "rgba(196,113,79,0.1)" }}>
                    {(() => {
                      const idx = HISTORICAL_PERIODS.findIndex(p => p.id === selectedPeriod.id);
                      const prev = idx > 0 ? HISTORICAL_PERIODS[idx - 1] : null;
                      const next = idx < HISTORICAL_PERIODS.length - 1 ? HISTORICAL_PERIODS[idx + 1] : null;
                      return (
                        <>
                          {prev ? (
                            <button onClick={() => setSelectedId(prev.id)} className="flex items-center gap-1 text-xs transition-colors"
                              style={{ color: "#8B6914" }}>
                              ← {prev.title[lang]}
                            </button>
                          ) : <div />}
                          {next ? (
                            <button onClick={() => setSelectedId(next.id)} className="flex items-center gap-1 text-xs transition-colors"
                              style={{ color: "#8B6914" }}>
                              {next.title[lang]} →
                            </button>
                          ) : <div />}
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
