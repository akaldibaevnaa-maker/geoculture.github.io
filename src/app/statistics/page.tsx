"use client";

import { culturalObjects } from "@/data/objects";
import { useLanguage } from "@/context/LanguageContext";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { BarChart2, Landmark, MapPin, Users, Star, PieChart as PieChartIcon } from "lucide-react";

const COLORS = ["#1A5F7A", "#C9A227", "#C4714F", "#2D6A4F", "#8B3A8B", "#5C4A35", "#2A8FAF"];

export default function StatisticsPage() {
  const { lang, t } = useLanguage();

  const totalObjects = culturalObjects.length;
  const unescoCount = culturalObjects.filter(obj => obj.unesco).length;

  const allPersons = culturalObjects.flatMap(obj => obj.relatedPersons || []);
  const uniquePersons = new Set(allPersons).size;

  const categoryCount: Record<string, number> = {};
  culturalObjects.forEach(obj => {
    if (obj.category && obj.category[lang]) {
      const key = obj.category[lang];
      categoryCount[key] = (categoryCount[key] || 0) + 1;
    }
  });
  const categoryData = Object.keys(categoryCount).map(key => ({
    name: key,
    value: categoryCount[key]
  }));

  const regionCount: Record<string, number> = {};
  culturalObjects.forEach(obj => {
    if (obj.region && obj.region[lang]) {
      const key = obj.region[lang];
      regionCount[key] = (regionCount[key] || 0) + 1;
    }
  });
  const regionData = Object.keys(regionCount).map(key => ({
    name: key.replace(lang === "ru" ? " область" : " облысы", ""),
    count: regionCount[key]
  })).sort((a, b) => b.count - a.count);

  return (
    <div className="min-h-full p-6 custom-scrollbar" style={{ background: "#FAF7F2" }}>
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Header */}
        <div className="text-center md:text-left">
          <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full text-xs font-bold"
            style={{ background: "rgba(196,113,79,0.12)", color: "#C4714F", border: "1px solid rgba(196,113,79,0.2)" }}>
            <BarChart2 className="w-3.5 h-3.5" />
            {t("Аналитикалық Dashboard", "Аналитический Dashboard")}
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold" style={{ color: "#2C1F14" }}>
            {t("GeoCulture AI Статистикасы", "Статистика GeoCulture AI")}
          </h1>
          <p className="text-xs mt-1" style={{ color: "#8B6914" }}>
            {t("Мәдени-тарихи нысандар базасының құрылымы мен аналитикасы", "Структура и аналитика базы данных культурно-исторических объектов")}
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-2xl p-5 border text-center" style={{ background: "#FFF8F0", borderColor: "rgba(196,113,79,0.2)" }}>
            <Landmark className="w-6 h-6 mx-auto mb-2" style={{ color: "#1A5F7A" }} />
            <p className="text-3xl font-extrabold" style={{ color: "#2C1F14" }}>{totalObjects}</p>
            <p className="text-xs mt-1 font-medium" style={{ color: "#8B6914" }}>{t("Барлық нысандар", "Всего объектов")}</p>
          </div>

          <div className="rounded-2xl p-5 border text-center" style={{ background: "#FFF8F0", borderColor: "rgba(201,162,39,0.25)" }}>
            <Star className="w-6 h-6 mx-auto mb-2" style={{ color: "#C9A227" }} />
            <p className="text-3xl font-extrabold" style={{ color: "#2C1F14" }}>{unescoCount}</p>
            <p className="text-xs mt-1 font-medium" style={{ color: "#8B6914" }}>{t("UNESCO мұрасы", "Наследие UNESCO")}</p>
          </div>

          <div className="rounded-2xl p-5 border text-center" style={{ background: "#FFF8F0", borderColor: "rgba(196,113,79,0.2)" }}>
            <MapPin className="w-6 h-6 mx-auto mb-2" style={{ color: "#C4714F" }} />
            <p className="text-3xl font-extrabold" style={{ color: "#2C1F14" }}>{Object.keys(regionCount).length}</p>
            <p className="text-xs mt-1 font-medium" style={{ color: "#8B6914" }}>{t("Қамтылған өңірлер", "Охвачено регионов")}</p>
          </div>

          <div className="rounded-2xl p-5 border text-center" style={{ background: "#FFF8F0", borderColor: "rgba(139,58,139,0.2)" }}>
            <Users className="w-6 h-6 mx-auto mb-2" style={{ color: "#8B3A8B" }} />
            <p className="text-3xl font-extrabold" style={{ color: "#2C1F14" }}>{uniquePersons}</p>
            <p className="text-xs mt-1 font-medium" style={{ color: "#8B6914" }}>{t("Тарихи тұлғалар", "Исторических личностей")}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Categories Pie Chart */}
          <div className="rounded-2xl p-5 border" style={{ background: "#FFF8F0", borderColor: "rgba(196,113,79,0.2)" }}>
            <h2 className="text-base font-bold mb-1 flex items-center gap-2" style={{ color: "#2C1F14" }}>
              <PieChartIcon className="w-4 h-4" style={{ color: "#1A5F7A" }} />
              {t("Санаттар бойынша бөлінуі", "Распределение по категориям")}
            </h2>
            <p className="text-xs mb-4" style={{ color: "#8B6914" }}>
              {t("Тарихи, мәдени және табиғи нысандардың арақатынасы", "Соотношение исторических, культурных и природных объектов")}
            </p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {categoryData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: "#FFF8F0", borderColor: "rgba(196,113,79,0.2)", borderRadius: "10px", color: "#2C1F14" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-3 mt-2">
              {categoryData.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-1.5 text-xs" style={{ color: "#5C4A35" }}>
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span>{entry.name} ({entry.value})</span>
                </div>
              ))}
            </div>
          </div>

          {/* Regions Bar Chart */}
          <div className="rounded-2xl p-5 border" style={{ background: "#FFF8F0", borderColor: "rgba(196,113,79,0.2)" }}>
            <h2 className="text-base font-bold mb-1 flex items-center gap-2" style={{ color: "#2C1F14" }}>
              <BarChart2 className="w-4 h-4" style={{ color: "#C4714F" }} />
              {t("Өңірлер бойынша нысандар саны", "Количество объектов по регионам")}
            </h2>
            <p className="text-xs mb-4" style={{ color: "#8B6914" }}>
              {t("Аймақтардағы тарихи ескерткіштер тығыздығы", "Плотность исторических памятников в регионах")}
            </p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionData.slice(0, 8)} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#8B6914" }} angle={-25} textAnchor="end" />
                  <YAxis tick={{ fontSize: 10, fill: "#8B6914" }} />
                  <Tooltip contentStyle={{ background: "#FFF8F0", borderColor: "rgba(196,113,79,0.2)", borderRadius: "10px", color: "#2C1F14" }} />
                  <Bar dataKey="count" fill="#C4714F" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}