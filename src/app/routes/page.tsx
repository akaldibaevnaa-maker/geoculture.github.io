"use client";

import { useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { Route, MapPin, Clock, Heart, Car, Sparkles, Navigation, ChevronDown } from "lucide-react";
import { culturalObjects } from "@/data/objects";
import { KAZAKHSTAN_REGIONS, REPUBLICAN_CITIES } from "@/data/regions";
import { useLanguage } from "@/context/LanguageContext";
import { CulturalObject } from "@/types";

// Dynamic import for map (SSR-safe)
const RouteMap = dynamic(() => import("@/components/RouteMap"), { ssr: false, loading: () => (
  <div className="h-full flex items-center justify-center rounded-2xl" style={{ background: "#F5EFE6", border: "1px solid rgba(196,113,79,0.15)" }}>
    <div className="text-center">
      <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin mx-auto mb-2" style={{ borderColor: "#C4714F" }} />
      <p className="text-xs" style={{ color: "#8B6914" }}>Карта жүктелуде...</p>
    </div>
  </div>
)});

const ALL_REGIONS = [
  ...REPUBLICAN_CITIES.map(c => ({ id: c.id, name: c.name, cities: c.cities, center: c.center as [number, number] })),
  ...KAZAKHSTAN_REGIONS.map(r => ({ id: r.id, name: r.name, cities: r.cities, center: r.center as [number, number] })),
];

const DURATIONS = [
  { kk: "2 сағат", ru: "2 часа", hours: 2 },
  { kk: "5 сағат", ru: "5 часов", hours: 5 },
  { kk: "1 күн", ru: "1 день", hours: 8 },
  { kk: "2 күн", ru: "2 дня", hours: 16 },
  { kk: "3 күн", ru: "3 дня", hours: 24 },
];

const INTERESTS = [
  { kk: "Тарих және сәулет", ru: "История и архитектура", types: ["monument", "historical_city", "mausoleum"] },
  { kk: "Археология және петроглифтер", ru: "Археология и петроглифы", types: ["archaeology", "petroglyphs", "ancient_city"] },
  { kk: "Киелі орындар мен аңыздар", ru: "Сакральные места и легенды", types: ["sacred", "person"] },
  { kk: "Табиғат және экология", ru: "Природа и экология", types: ["nature"] },
  { kk: "ЮНЕСКО нысандары", ru: "Объекты ЮНЕСКО", types: ["unesco_site", "monument", "archaeology"] },
  { kk: "Барлығы", ru: "Всё", types: [] },
];

const TRANSPORT = [
  { kk: "Автомобиль", ru: "Автомобиль" },
  { kk: "Жаяу", ru: "Пешком" },
  { kk: "Аралас", ru: "Смешанный" },
];

interface RoutePoint {
  order: number;
  object: CulturalObject;
  distanceFromPrev: string;
  travelTime: string;
  visitDuration: string;
}

interface GeneratedRouteData {
  points: RoutePoint[];
  totalDistance: string;
  totalTime: string;
  reason: string;
  regionCenter: [number, number];
}

function calcDistance(a: [number, number], b: [number, number]) {
  const R = 6371;
  const dLat = ((b[0] - a[0]) * Math.PI) / 180;
  const dLon = ((b[1] - a[1]) * Math.PI) / 180;
  const x = Math.sin(dLat / 2) ** 2 + Math.cos((a[0] * Math.PI) / 180) * Math.cos((b[0] * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x)));
}

export default function RoutesPage() {
  const { lang, t } = useLanguage();
  const [isGenerating, setIsGenerating] = useState(false);
  const [route, setRoute] = useState<GeneratedRouteData | null>(null);
  const [regionId, setRegionId] = useState(ALL_REGIONS[0].id);
  const [cityFilter, setCityFilter] = useState("");
  const [duration, setDuration] = useState(DURATIONS[2].kk);
  const [interest, setInterest] = useState(INTERESTS[0].kk);
  const [transport, setTransport] = useState(TRANSPORT[0].kk);
  const [aiPrompt, setAiPrompt] = useState("");

  const selectedRegionData = ALL_REGIONS.find(r => r.id === regionId) || ALL_REGIONS[0];

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setRoute(null);

    setTimeout(() => {
      const selectedRegion = ALL_REGIONS.find(r => r.id === regionId) || ALL_REGIONS[0];
      const selectedInterest = INTERESTS.find(i => i.kk === interest) || INTERESTS[0];
      const selectedDuration = DURATIONS.find(d => d.kk === duration) || DURATIONS[2];

      // Filter objects by region (approximate by coordinates proximity)
      const [rLat, rLon] = selectedRegion.center;
      let regionObjs = culturalObjects.filter(o => {
        const d = calcDistance([rLat, rLon], o.coordinates);
        return d < 350;
      });

      if (regionObjs.length < 2) regionObjs = culturalObjects;

      // Filter by interest types
      let filtered = selectedInterest.types.length > 0
        ? regionObjs.filter(o => selectedInterest.types.includes(o.objectType))
        : regionObjs;

      if (filtered.length < 2) filtered = regionObjs;

      // UNESCO filter
      if (interest.includes("ЮНЕСКО") || interest.includes("UNESCO")) {
        const unescoFilt = regionObjs.filter(o => o.unesco);
        if (unescoFilt.length > 0) filtered = unescoFilt;
      }

      // Limit count by duration
      const maxObj = selectedDuration.hours <= 2 ? 2 : selectedDuration.hours <= 5 ? 3 : selectedDuration.hours <= 8 ? 4 : 5;
      const chosen = filtered.slice(0, maxObj);

      // Build route points
      let totalDist = 0;
      const points: RoutePoint[] = chosen.map((obj, i) => {
        const prev = i > 0 ? chosen[i - 1].coordinates : selectedRegion.center as [number, number];
        const dist = calcDistance(prev, obj.coordinates);
        totalDist += dist;
        const travelMin = transport === TRANSPORT[0].kk ? Math.round((dist / 80) * 60) : Math.round((dist / 5) * 60);
        const visitMin = selectedDuration.hours <= 2 ? 30 : selectedDuration.hours <= 5 ? 60 : 90;
        return {
          order: i + 1,
          object: obj,
          distanceFromPrev: i === 0 ? t("Бастапқы нүкте", "Начальная точка") : `${dist} км`,
          travelTime: i === 0 ? "—" : travelMin < 60 ? `${travelMin} ${t("мин", "мин")}` : `${Math.floor(travelMin / 60)} ${t("сағ", "ч")} ${travelMin % 60} ${t("мин", "мин")}`,
          visitDuration: `${visitMin} ${t("мин", "мин")}`,
        };
      });

      const reason = lang === "kk"
        ? `${aiPrompt ? `Сіздің сұранысыңыз ("${aiPrompt}") бойынша ` : ''}${selectedRegion.name.kk} аймағы бойынша ${chosen.length} нысанды қамтитын маршрут жасалды. Таңдалған қызығушылық: ${interest}. Болжалды жалпы қашықтық: ${totalDist} км.`
        : `${aiPrompt ? `По вашему запросу ("${aiPrompt}") ` : ''}Построен маршрут по ${selectedRegion.name.ru}: ${chosen.length} объектов. Интересы: ${INTERESTS.find(i => i.kk === interest)?.ru || interest}. Общее расстояние: ~${totalDist} км.`;

      setRoute({
        points,
        totalDistance: `~${totalDist} км`,
        totalTime: selectedDuration[lang as "kk" | "ru"] || selectedDuration.kk,
        reason,
        regionCenter: selectedRegion.center as [number, number],
      });

      setIsGenerating(false);
    }, 1800);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 custom-scrollbar" style={{ background: "#FAF7F2" }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Form */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl p-5" style={{ background: "#FFF8F0", border: "1px solid rgba(196,113,79,0.2)" }}>
            <h1 className="text-xl font-bold mb-1 flex items-center gap-2" style={{ color: "#2C1F14" }}>
              <Route className="w-5 h-5" style={{ color: "#C9A227" }} />
              {t("Маршрут құру", "Создать маршрут")}
            </h1>
            <p className="text-xs mb-5" style={{ color: "#8B6914" }}>
              {t("GeoCulture AI арқылы жеке саяхатыңызды жоспарлаңыз", "Спланируйте персональное путешествие с AI")}
            </p>

            <form onSubmit={handleGenerate} className="space-y-4">
              {/* AI Prompt */}
              <div>
                <label className="block text-xs font-semibold mb-1.5 flex items-center gap-1 text-[#1A5F7A]">
                  <Sparkles className="w-3.5 h-3.5" />
                  {t("Еркін AI-сұраныс (міндетті емес)", "Свободный AI-запрос (необязательно)")}
                </label>
                <textarea 
                  value={aiPrompt}
                  onChange={e => setAiPrompt(e.target.value)}
                  placeholder={t("Мысалы: 'Отбасылық 2 күндік демалыс, тарихи орындар мен табиғат...'", "Например: 'Семейная поездка на 2 дня, интересны древние крепости и природа...'")}
                  className="w-full py-2.5 px-3 text-sm rounded-xl focus:outline-none resize-none h-20"
                  style={{ background: "rgba(26,95,122,0.06)", border: "1px dashed rgba(26,95,122,0.3)", color: "#2C1F14" }}
                />
              </div>

              {/* Separator */}
              <div className="flex items-center gap-2 my-2">
                <div className="h-px bg-[#8B6914] opacity-20 flex-1"></div>
                <span className="text-[10px] font-medium text-[#8B6914] uppercase tracking-wider">{t("Немесе баптаулар", "Или настройки")}</span>
                <div className="h-px bg-[#8B6914] opacity-20 flex-1"></div>
              </div>

              {/* Region */}
              <div>
                <label className="block text-xs font-semibold mb-1.5 flex items-center gap-1" style={{ color: "#5C4A35" }}>
                  <MapPin className="w-3.5 h-3.5" style={{ color: "#C4714F" }} />
                  {t("Өңір / Аймақ", "Регион / Область")}
                </label>
                <div className="relative">
                  <select value={regionId} onChange={e => { setRegionId(e.target.value); setCityFilter(""); }}
                    className="w-full py-2.5 pl-3 pr-8 text-sm rounded-xl focus:outline-none appearance-none"
                    style={{ background: "rgba(196,113,79,0.06)", border: "1px solid rgba(196,113,79,0.2)", color: "#2C1F14" }}>
                    <optgroup label={t("Республикалық маңызды қалалар", "Города республиканского значения", "Republican Significance Cities")}>
                      {REPUBLICAN_CITIES.map(c => <option key={c.id} value={c.id}>{(c.name as any)[lang] || c.name.kk}</option>)}
                    </optgroup>
                    <optgroup label={t("Облыстар", "Области", "Regions")}>
                      {KAZAKHSTAN_REGIONS.map(r => <option key={r.id} value={r.id}>{(r.name as any)[lang] || r.name.kk}</option>)}
                    </optgroup>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-3 w-4 h-4 pointer-events-none" style={{ color: "#8B6914" }} />
                </div>
              </div>

              {/* City within region */}
              {selectedRegionData.cities.length > 1 && (
                <div>
                  <label className="block text-xs font-semibold mb-1.5 flex items-center gap-1" style={{ color: "#5C4A35" }}>
                    <MapPin className="w-3.5 h-3.5" style={{ color: "#C9A227" }} />
                    {t("Қала / Аудан", "Город / Район", "City / District")}
                  </label>
                  <div className="relative">
                    <select value={cityFilter} onChange={e => setCityFilter(e.target.value)}
                      className="w-full py-2.5 pl-3 pr-8 text-sm rounded-xl focus:outline-none appearance-none"
                      style={{ background: "rgba(196,113,79,0.06)", border: "1px solid rgba(196,113,79,0.2)", color: "#2C1F14" }}>
                      <option value="">{t("Барлық қалалар", "Все города", "All Cities")}</option>
                      {selectedRegionData.cities.map((c, i) => (
                        <option key={i} value={c.name.kk}>{(c.name as any)[lang] || c.name.kk}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2.5 top-3 w-4 h-4 pointer-events-none" style={{ color: "#8B6914" }} />
                  </div>
                </div>
              )}

              {/* Interests */}
              <div>
                <label className="block text-xs font-semibold mb-1.5 flex items-center gap-1" style={{ color: "#5C4A35" }}>
                  <Heart className="w-3.5 h-3.5" style={{ color: "#C4714F" }} />
                  {t("Қызығушылықтар", "Интересы")}
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {INTERESTS.map(i => (
                    <button key={i.kk} type="button" onClick={() => setInterest(i.kk)}
                      className="py-1.5 px-2 rounded-lg text-[11px] font-medium text-left transition-all"
                      style={{
                        background: interest === i.kk ? "rgba(196,113,79,0.15)" : "rgba(196,113,79,0.05)",
                        border: `1px solid ${interest === i.kk ? "#C4714F" : "rgba(196,113,79,0.15)"}`,
                        color: interest === i.kk ? "#C4714F" : "#8B6914",
                        fontWeight: interest === i.kk ? 700 : 400,
                      }}>
                      {i[lang as "kk" | "ru"]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-xs font-semibold mb-1.5 flex items-center gap-1" style={{ color: "#5C4A35" }}>
                  <Clock className="w-3.5 h-3.5" style={{ color: "#C9A227" }} />
                  {t("Ұзақтық", "Продолжительность")}
                </label>
                <div className="flex gap-1.5 flex-wrap">
                  {DURATIONS.map(d => (
                    <button key={d.kk} type="button" onClick={() => setDuration(d.kk)}
                      className="py-1.5 px-3 rounded-lg text-[11px] font-medium transition-all"
                      style={{ background: duration === d.kk ? "#1A5F7A" : "rgba(26,95,122,0.08)", color: duration === d.kk ? "#fff" : "#1A5F7A", border: `1px solid ${duration === d.kk ? "#1A5F7A" : "rgba(26,95,122,0.2)"}` }}>
                      {d[lang as "kk" | "ru"]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Transport */}
              <div>
                <label className="block text-xs font-semibold mb-1.5 flex items-center gap-1" style={{ color: "#5C4A35" }}>
                  <Car className="w-3.5 h-3.5" style={{ color: "#C4714F" }} />
                  {t("Көлік", "Транспорт")}
                </label>
                <div className="flex gap-1.5">
                  {TRANSPORT.map(tr => (
                    <button key={tr.kk} type="button" onClick={() => setTransport(tr.kk)}
                      className="flex-1 py-1.5 rounded-lg text-[11px] font-medium transition-all"
                      style={{ background: transport === tr.kk ? "rgba(201,162,39,0.2)" : "rgba(201,162,39,0.06)", color: transport === tr.kk ? "#8B6914" : "#8B6914", border: `1px solid ${transport === tr.kk ? "#C9A227" : "rgba(201,162,39,0.2)"}`, fontWeight: transport === tr.kk ? 700 : 400 }}>
                      {tr[lang as "kk" | "ru"]}
                    </button>
                  ))}
                </div>
              </div>

              <button type="submit" disabled={isGenerating}
                className="w-full mt-2 py-3 px-4 rounded-xl font-bold text-sm flex justify-center items-center gap-2 transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #1A5F7A 0%, #2980b9 100%)", color: "#fff", opacity: isGenerating ? 0.7 : 1 }}>
                {isGenerating ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <><Sparkles className="w-4 h-4" />{t("AI-Генерациялау", "AI-Генерация")}</>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Results + Map */}
        <div className="lg:col-span-2 space-y-4">
          {/* Map */}
          <div style={{ height: "360px" }}>
            <Suspense fallback={null}>
              <RouteMap
                points={route?.points || []}
                center={route?.regionCenter || [48.0196, 66.9237]}
                isLoading={isGenerating}
              />
            </Suspense>
          </div>

          {/* Route details */}
          {!route && !isGenerating && (
            <div className="min-h-[200px] rounded-2xl flex flex-col items-center justify-center" style={{ border: "2px dashed rgba(196,113,79,0.2)", background: "rgba(255,248,240,0.5)" }}>
              <Navigation className="w-12 h-12 mb-3 opacity-30" style={{ color: "#C4714F" }} />
              <p className="text-sm font-medium" style={{ color: "#8B6914" }}>{t("Маршрут алу үшін форманы толтырыңыз", "Заполните форму для построения маршрута")}</p>
            </div>
          )}

          {isGenerating && (
            <div className="min-h-[200px] rounded-2xl flex flex-col items-center justify-center" style={{ background: "rgba(255,248,240,0.8)", border: "1px solid rgba(196,113,79,0.15)" }}>
              <div className="w-12 h-12 relative mb-4">
                <div className="absolute inset-0 border-3 border-t-transparent rounded-full animate-spin" style={{ border: "3px solid #C4714F", borderTopColor: "transparent" }} />
              </div>
              <p className="text-sm font-medium animate-pulse" style={{ color: "#C4714F" }}>{t("GeoCulture AI маршрут есептеуде...", "GeoCulture AI строит маршрут...")}</p>
            </div>
          )}

          {route && (
            <div className="rounded-2xl p-5 animate-fade-in-down" style={{ background: "#FFF8F0", border: "1px solid rgba(196,113,79,0.2)" }}>
              <div className="flex justify-between items-start mb-4 pb-4 border-b" style={{ borderColor: "rgba(196,113,79,0.12)" }}>
                <div className="flex-1 mr-3">
                  <h2 className="text-lg font-bold flex items-center gap-2 mb-1" style={{ color: "#2C1F14" }}>
                    {t("Жеке маршрутыңыз", "Ваш маршрут")}
                    <span className="text-[10px] px-1.5 py-0.5 rounded font-bold" style={{ background: "rgba(26,95,122,0.12)", color: "#1A5F7A" }}>AI</span>
                  </h2>
                  <p className="text-xs italic" style={{ color: "#8B6914" }}>{route.reason}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-base font-bold" style={{ color: "#C9A227" }}>{route.totalTime}</p>
                  <p className="text-xs" style={{ color: "#8B6914" }}>{route.totalDistance}</p>
                </div>
              </div>

              <div className="relative border-l-2 ml-3 space-y-4 pb-2" style={{ borderColor: "rgba(196,113,79,0.25)" }}>
                {route.points.map((point, i) => (
                  <div key={point.object.id} className="relative pl-6">
                    <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
                      style={{ background: i === 0 ? "#2D6A4F" : i === route.points.length - 1 ? "#C4714F" : "#1A5F7A" }}>
                      {i + 1}
                    </div>
                    <div className="p-3.5 rounded-xl" style={{ background: "rgba(245,239,230,0.7)", border: "1px solid rgba(196,113,79,0.12)" }}>
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider mb-0.5" style={{ color: "#C9A227" }}>
                            {i === 0 ? t("Бастапқы нүкте", "Начальная точка") : i === route.points.length - 1 ? t("Финиш", "Финиш") : `${t("Қадам", "Шаг")} ${i + 1}`}
                          </p>
                          <h3 className="text-sm font-bold" style={{ color: "#2C1F14" }}>{point.object.name[lang]}</h3>
                        </div>
                        <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: "rgba(196,113,79,0.1)", color: "#C4714F" }}>{point.object.category[lang]}</span>
                      </div>
                      <p className="text-xs mb-2 line-clamp-2" style={{ color: "#5C4A35" }}>{point.object.description[lang]}</p>
                      <div className="flex gap-3 text-[10px]" style={{ color: "#A08060" }}>
                        {i > 0 && <span>📏 {point.distanceFromPrev}</span>}
                        {i > 0 && <span>🚗 {point.travelTime}</span>}
                        <span>⏱ {point.visitDuration}</span>
                        {point.object.unesco && <span className="font-bold" style={{ color: "#C9A227" }}>★ UNESCO</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t flex gap-2" style={{ borderColor: "rgba(196,113,79,0.12)" }}>
                <button onClick={() => setRoute(null)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-medium transition-colors"
                  style={{ background: "rgba(196,113,79,0.08)", color: "#C4714F", border: "1px solid rgba(196,113,79,0.2)" }}>
                  {t("Жаңа маршрут", "Новый маршрут")}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
