"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { MapContainer, TileLayer, Marker, ZoomControl, Popup, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { culturalObjects } from "@/data/objects";
import { KAZAKHSTAN_REGIONS, REPUBLICAN_CITIES } from "@/data/regions";
import L from "leaflet";
import ObjectCard from "./ObjectCard";
import { CulturalObject, SearchSuggestion } from "@/types";
import { useLanguage } from "@/context/LanguageContext";
import { useAppContext } from "@/context/AppContext";
import { Search, X, Filter } from "lucide-react";

// ---- Type styles ----
const TYPE_STYLES: Record<string, { bg: string; border: string; glow: string }> = {
  monument:       { bg: "#1A5F7A", border: "#fff", glow: "#1A5F7A" },
  archaeology:    { bg: "#C4714F", border: "#fff", glow: "#C4714F" },
  sacred:         { bg: "#8B3A8B", border: "#fff", glow: "#8B3A8B" },
  nature:         { bg: "#2D6A4F", border: "#fff", glow: "#2D6A4F" },
  person:         { bg: "#C9A227", border: "#fff", glow: "#C9A227" },
  historical_city:{ bg: "#5C4A35", border: "#fff", glow: "#5C4A35" },
  mausoleum:      { bg: "#1A5F7A", border: "#C9A227", glow: "#1A5F7A" },
  petroglyphs:    { bg: "#C4714F", border: "#fff", glow: "#C4714F" },
  museum:         { bg: "#2D6A4F", border: "#fff", glow: "#2D6A4F" },
  ancient_city:   { bg: "#8B3A8B", border: "#fff", glow: "#8B3A8B" },
  unesco_site:    { bg: "#C9A227", border: "#fff", glow: "#C9A227" },
};

const TYPE_LABELS: Record<string, { kk: string; ru: string }> = {
  monument:       { kk: "Сәулет ескерткіші", ru: "Памятник архитектуры" },
  archaeology:    { kk: "Археология",         ru: "Археология" },
  sacred:         { kk: "Киелі орын",          ru: "Сакральное место" },
  nature:         { kk: "Табиғат",             ru: "Природа" },
  person:         { kk: "Тарихи тұлға",        ru: "Историческая личность" },
  historical_city:{ kk: "Тарихи қала",         ru: "Исторический город" },
  mausoleum:      { kk: "Кесене",              ru: "Мавзолей" },
  petroglyphs:    { kk: "Петроглифтер",        ru: "Петроглифы" },
  museum:         { kk: "Музей",               ru: "Музей" },
  ancient_city:   { kk: "Ежелгі қала",         ru: "Древний город" },
  unesco_site:    { kk: "UNESCO",              ru: "UNESCO" },
};

const createCustomIcon = (objectType: string, isSelected = false) => {
  const s = TYPE_STYLES[objectType] || TYPE_STYLES.monument;
  const size = isSelected ? 28 : 22;
  return L.divIcon({
    className: "custom-leaflet-icon",
    html: `<div style="
      background: ${s.bg};
      width: ${size}px; height: ${size}px;
      border-radius: 50%;
      border: ${isSelected ? "3px" : "2.5px"} solid ${isSelected ? "#C9A227" : s.border};
      box-shadow: 0 0 ${isSelected ? "20px" : "10px"} ${s.glow}99, 0 2px 6px #00000030;
      cursor: pointer; transition: transform 0.15s;
    "></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
};

// ---- FlyTo controller ----
function MapFlyTo({ coords, zoom }: { coords: [number, number] | null; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.flyTo(coords, zoom, { duration: 1.2 });
    }
  }, [coords, zoom, map]);
  return null;
}

// ---- Build search suggestions ----
function buildSuggestions(lang: "kk" | "ru"): SearchSuggestion[] {
  const suggestions: SearchSuggestion[] = [];

  REPUBLICAN_CITIES.forEach(c => {
    suggestions.push({ type: "city", label: c.name[lang], coordinates: c.center, zoom: c.zoom });
  });

  KAZAKHSTAN_REGIONS.forEach(r => {
    suggestions.push({ type: "region", label: r.name[lang], coordinates: r.center, zoom: r.zoom });
    r.cities.forEach(city => {
      suggestions.push({ type: "city", label: city.name[lang], coordinates: city.coordinates as [number, number], zoom: 11 });
    });
  });

  culturalObjects.forEach(obj => {
    suggestions.push({ type: "object", label: obj.name[lang], coordinates: obj.coordinates, zoom: 13, objectId: obj.id });
  });

  return suggestions;
}

export default function MapComponent() {
  const { lang, t } = useLanguage();
  const { setSelectedObject } = useAppContext();
  const [activeObject, setActiveObject] = useState<CulturalObject | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [flyTarget, setFlyTarget] = useState<{ coords: [number, number]; zoom: number } | null>(null);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // New: Active data layers
  const [activeLayers, setActiveLayers] = useState<string[]>(['heritage', 'folklore', 'persons', 'nature', 'silk_road']);
  
  const searchRef = useRef<HTMLDivElement>(null);

  const allSuggestions = useRef<SearchSuggestion[]>([]);
  useEffect(() => {
    allSuggestions.current = buildSuggestions(lang === 'kk' ? 'kk' : 'ru');
  }, [lang]);

  const center: [number, number] = [48.0196, 66.9237];

  const types = Array.from(new Set(culturalObjects.map(o => o.objectType)));

  const toggleLayer = (layer: string) => {
    setActiveLayers(prev => 
      prev.includes(layer) ? prev.filter(l => l !== layer) : [...prev, layer]
    );
  };

  const getObjectLayer = (objType: string): string => {
    if (["monument", "archaeology", "historical_city", "ancient_city", "museum", "mausoleum"].includes(objType)) return "heritage";
    if (["sacred", "petroglyphs"].includes(objType)) return "folklore";
    if (["person"].includes(objType)) return "persons";
    if (["nature"].includes(objType)) return "nature";
    return "heritage"; // fallback
  };

  const [timeValue, setTimeValue] = useState<number>(100);

  const getYearFromValue = (val: number) => {
    if (val === 100) return 9999;
    if (val < 25) return -2000 + (val / 25) * 3100; // up to 1100
    if (val < 50) return 1100 + ((val - 25) / 25) * 400; // up to 1500
    if (val < 75) return 1500 + ((val - 50) / 25) * 400; // up to 1900
    return 1900 + ((val - 75) / 25) * 126; // up to 2026
  };

  const getObjectYear = (obj: CulturalObject) => {
    const p = obj.period.toLowerCase();
    if (p.includes("миллион")) return -1000000;
    if (p.includes("б.з.д") || p.includes("до н.э") || p.includes("мыңжылдық") || p.includes("ежелден")) return -5000;
    if (p.includes("xix") || p.includes("19-") || p.includes("18")) return 1850;
    if (p.includes("xviii") || p.includes("18-")) return 1750;
    if (p.includes("xvii") || p.includes("17-")) return 1650;
    if (p.includes("xvi") || p.includes("16-")) return 1550;
    if (p.includes("xv") || p.includes("xiv") || p.includes("14") || p.includes("1390") || p.includes("13-")) return 1450;
    if (p.includes("xiii")) return 1250;
    if (p.includes("xii") || p.includes("xi") || p.includes("11-") || p.includes("12-")) return 1150;
    if (p.includes("x") || p.includes("ix") || p.includes("viii") || p.includes("vii") || p.includes("872")) return 900;
    if (p.includes("199") || p.includes("20") || p.includes("қазіргі") || p.includes("современ")) return 1995;
    return 1900; // fallback
  };

  const getEraLabel = (val: number) => {
    if (val === 100) return { kk: "Барлық ғасырлар", ru: "Все века", en: "All centuries" };
    const y = getYearFromValue(val);
    if (y < 0) return { kk: "Б.з.д. дәуір (Ежелгі)", ru: "До н.э. (Древность)", en: "BC (Ancient Era)" };
    if (y < 1200) return { kk: "Ерте орта ғасырлар", ru: "Раннее Средневековье", en: "Early Middle Ages" };
    if (y < 1600) return { kk: "Алтын Орда & Қазақ хандығы", ru: "Золотая Орда и Казахское ханство", en: "Golden Horde & Kazakh Khanate" };
    if (y < 1900) return { kk: "XVIII - XIX ғасырлар", ru: "XVIII - XIX века", en: "18th - 19th Centuries" };
    return { kk: "ХХ ғасыр - Қазіргі заман", ru: "ХХ век - Современность", en: "20th Century - Present" };
  };

  const filteredObjects = culturalObjects.filter(obj => {
    const query = searchQuery.toLowerCase();
    const nameStr = (obj.name && obj.name[lang]) || "";
    const regionStr = (obj.region && obj.region[lang]) || "";
    const catStr = (obj.category && obj.category[lang]) || "";
    const matchesSearch =
      !query ||
      nameStr.toLowerCase().includes(query) ||
      regionStr.toLowerCase().includes(query) ||
      catStr.toLowerCase().includes(query);
      
    const matchesType = !filterType || obj.objectType === filterType;
    const matchesLayer = activeLayers.includes(getObjectLayer(obj.objectType));
    const matchesTime = getObjectYear(obj) <= getYearFromValue(timeValue);
    
    return matchesSearch && matchesType && matchesLayer && matchesTime;
  });

  const handleSearchInput = (val: string) => {
    setSearchQuery(val);
    if (val.length >= 2) {
      const q = val.toLowerCase();
      const found = allSuggestions.current
        .filter(s => s.label.toLowerCase().includes(q))
        .slice(0, 8);
      setSuggestions(found);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = useCallback((s: SearchSuggestion) => {
    setSearchQuery(s.label);
    setShowSuggestions(false);
    setFlyTarget({ coords: s.coordinates, zoom: s.zoom });
    if (s.objectId) {
      const obj = culturalObjects.find(o => o.id === s.objectId);
      if (obj) {
        setActiveObject(obj);
        setSelectedObject(obj);
      }
    }
  }, [setSelectedObject]);

  const handleObjectClick = (obj: CulturalObject) => {
    setActiveObject(obj);
    setSelectedObject(obj);
  };

  const handleClose = () => {
    setActiveObject(null);
    setSelectedObject(null);
  };

  // Close suggestions on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const suggestionTypeIcon = (type: string) => {
    if (type === "region") return "🗺️";
    if (type === "city") return "🏙️";
    return "📍";
  };

  return (
    <div className="w-full h-full relative">
      <MapContainer center={center} zoom={5} className="w-full h-full z-0" zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="bottomright" />

        {flyTarget && <MapFlyTo coords={flyTarget.coords} zoom={flyTarget.zoom} />}

        {filteredObjects.map((obj) => (
          <Marker
            key={obj.id}
            position={obj.coordinates}
            icon={createCustomIcon(obj.objectType, activeObject?.id === obj.id)}
            eventHandlers={{ click: () => handleObjectClick(obj) }}
          >
            <Popup>
              <div style={{ background: "#FFF8F0", color: "#2C1F14", padding: "6px 10px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, minWidth: 120 }}>
                {obj.name[lang]}
                <div style={{ color: "#8B6914", fontSize: "11px", fontWeight: 400, marginTop: 2 }}>{obj.region[lang]}</div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Search + Filter Panel */}
      <div className="absolute top-4 left-4 z-10 shadow-xl" style={{ width: "300px" }}>
        <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,248,240,0.97)", border: "1px solid rgba(196,113,79,0.2)" }}>
          {/* Header */}
          <div className="px-4 py-3 flex items-center justify-between border-b" style={{ borderColor: "rgba(196,113,79,0.12)" }}>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#C4714F" }}></span>
              <span className="text-sm font-bold" style={{ color: "#2C1F14" }}>GeoCulture AI</span>
            </div>
            <div className="flex items-center gap-2">
              {/* Spatial Audio Toggle */}
              <button 
                className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-lg transition-colors border tooltip"
                title={t("Кеңістіктік дыбыс (Слойға байланысты)", "Пространственный звук (Зависит от слоя)")}
                style={{ background: "rgba(45,106,79,0.1)", color: "#2D6A4F", borderColor: "rgba(45,106,79,0.2)" }}
              >
                🔊 {t("Дыбыс", "Звук")}
              </button>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg transition-colors"
                style={{ background: showFilters ? "rgba(196,113,79,0.15)" : "transparent", color: "#C4714F" }}
              >
                <Filter className="w-3 h-3" />
                {t("Сүзгі", "Фильтр")}
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="p-3" ref={searchRef}>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4" style={{ color: "#8B6914" }} />
              <input
                type="text"
                placeholder={t("Облыс, қала, нысан іздеу...", "Поиск области, города, объекта...")}
                value={searchQuery}
                onChange={(e) => handleSearchInput(e.target.value)}
                onFocus={() => searchQuery.length >= 2 && setShowSuggestions(true)}
                className="w-full pl-9 pr-8 py-2 text-sm rounded-xl focus:outline-none transition-colors"
                style={{ background: "rgba(196,113,79,0.07)", border: "1px solid rgba(196,113,79,0.2)", color: "#2C1F14" }}
              />
              {searchQuery && (
                <button onClick={() => { setSearchQuery(""); setShowSuggestions(false); }} className="absolute right-2 top-2.5">
                  <X className="w-4 h-4" style={{ color: "#8B6914" }} />
                </button>
              )}
            </div>

            {/* Autocomplete dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="mt-1 rounded-xl overflow-hidden shadow-lg" style={{ background: "#FFF8F0", border: "1px solid rgba(196,113,79,0.2)", maxHeight: "260px", overflowY: "auto" }}>
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectSuggestion(s)}
                    className="w-full text-left px-3 py-2 text-sm flex items-center gap-2 hover:bg-orange-50 transition-colors"
                    style={{ color: "#2C1F14", borderBottom: i < suggestions.length - 1 ? "1px solid rgba(196,113,79,0.08)" : "none" }}
                  >
                    <span>{suggestionTypeIcon(s.type)}</span>
                    <span className="truncate">{s.label}</span>
                    <span className="ml-auto text-[10px]" style={{ color: "#A08060" }}>
                      {s.type === "region" ? t("облыс", "область") : s.type === "city" ? t("қала", "город") : t("нысан", "объект")}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Filters & Layers (collapsible) */}
          {showFilters && (
            <div className="px-3 pb-3 space-y-3 border-t" style={{ borderColor: "rgba(196,113,79,0.1)" }}>
              {/* Layers Section */}
              <div className="pt-2">
                <p className="text-[10px] font-bold uppercase mb-2 tracking-wider" style={{ color: "#A08060" }}>
                  {t("Деректер қабаттары", "Слои данных")}
                </p>
                <div className="grid grid-cols-1 gap-1.5">
                  <button 
                    onClick={() => toggleLayer('heritage')}
                    className={`flex items-center justify-between px-2 py-1.5 rounded-lg border transition-colors ${activeLayers.includes('heritage') ? 'bg-orange-50 border-orange-200' : 'bg-white border-gray-100 opacity-60'}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[13px]">🏛️</span>
                      <span className="text-xs font-semibold text-[#2C1F14]">{t("Тарихи мұра", "Наследие")}</span>
                    </div>
                    <div className="w-3 h-3 rounded-sm bg-[#C4714F]"></div>
                  </button>
                  <button 
                    onClick={() => toggleLayer('folklore')}
                    className={`flex items-center justify-between px-2 py-1.5 rounded-lg border transition-colors ${activeLayers.includes('folklore') ? 'bg-purple-50 border-purple-200' : 'bg-white border-gray-100 opacity-60'}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[13px]">🐉</span>
                      <span className="text-xs font-semibold text-[#2C1F14]">{t("Фольклор", "Фольклор")}</span>
                    </div>
                    <div className="w-3 h-3 rounded-sm bg-[#8B3A8B]"></div>
                  </button>
                  <button 
                    onClick={() => toggleLayer('persons')}
                    className={`flex items-center justify-between px-2 py-1.5 rounded-lg border transition-colors ${activeLayers.includes('persons') ? 'bg-yellow-50 border-yellow-200' : 'bg-white border-gray-100 opacity-60'}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[13px]">👤</span>
                      <span className="text-xs font-semibold text-[#2C1F14]">{t("Тұлғалар", "Личности")}</span>
                    </div>
                    <div className="w-3 h-3 rounded-sm bg-[#C9A227]"></div>
                  </button>
                  <button 
                    onClick={() => toggleLayer('silk_road')}
                    className={`flex items-center justify-between px-2 py-1.5 rounded-lg border transition-colors ${activeLayers.includes('silk_road') ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-100 opacity-60'}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[13px]">🐪</span>
                      <span className="text-xs font-semibold text-[#2C1F14]">{t("Жібек жолы", "Шелковый путь")}</span>
                    </div>
                    <div className="w-3 h-3 rounded-sm bg-[#1A5F7A]"></div>
                  </button>
                  <button 
                    onClick={() => toggleLayer('nature')}
                    className={`flex items-center justify-between px-2 py-1.5 rounded-lg border transition-colors ${activeLayers.includes('nature') ? 'bg-green-50 border-green-200' : 'bg-white border-gray-100 opacity-60'}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[13px]">🏔️</span>
                      <span className="text-xs font-semibold text-[#2C1F14]">{t("Табиғат", "Природа")}</span>
                    </div>
                    <div className="w-3 h-3 rounded-sm bg-[#2D6A4F]"></div>
                  </button>
                </div>
              </div>

              {/* Classic Type Filter */}
              <div className="pt-2 border-t" style={{ borderColor: "rgba(196,113,79,0.1)" }}>
                <p className="text-[10px] font-bold uppercase mb-2 tracking-wider" style={{ color: "#A08060" }}>
                  {t("Нысан түрі", "Тип объекта")}
                </p>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full py-2 px-3 text-sm rounded-xl focus:outline-none"
                  style={{ background: "rgba(196,113,79,0.07)", border: "1px solid rgba(196,113,79,0.2)", color: "#2C1F14" }}
                >
                  <option value="">{t("Барлық түрлер", "Все типы", "All Types")}</option>
                  {types.map(type => (
                    <option key={type} value={type}>{(TYPE_LABELS[type] as any)?.[lang] || TYPE_LABELS[type]?.kk || type}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Object count */}
          <div className="px-4 py-2 border-t text-[11px]" style={{ borderColor: "rgba(196,113,79,0.1)", color: "#A08060" }}>
            <span style={{ color: "#C4714F", fontWeight: 700 }}>{filteredObjects.length}</span>
            {t(" нысан табылды", " объектов найдено")}
          </div>
        </div>
      </div>

      {/* Time Slider (Машина времени) */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 w-[90%] max-w-2xl">
        <div className="bg-white/95 backdrop-blur-sm border border-orange-200 shadow-xl rounded-2xl px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">⏳</span>
              <h3 className="text-sm font-bold text-[#1e3a8a]">
                {t("Уақыт машинасы", "Машина времени")}
              </h3>
            </div>
            <div className="text-xs font-semibold px-2 py-1 bg-orange-100 text-orange-800 rounded-md">
              {getEraLabel(timeValue)[lang as 'kk'|'ru'|'en']}
            </div>
          </div>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={timeValue}
            onChange={(e) => setTimeValue(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#C4714F]"
          />
          <div className="flex justify-between text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-wide">
            <span>{t("Б.з.д.", "До н.э.")}</span>
            <span>XI ғ.</span>
            <span>XV ғ.</span>
            <span>XIX ғ.</span>
            <span>{t("Қазіргі", "Наше время")}</span>
          </div>
        </div>
      </div>

      {/* Object Details Card */}
      {activeObject && (
        <ObjectCard object={activeObject} onClose={handleClose} />
      )}
    </div>
  );
}
