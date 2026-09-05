"use client";

import { culturalObjects } from '@/data/objects';
import { useLanguage } from '@/context/LanguageContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#00B0C7', '#F2C94C', '#8B5CF6', '#EC4899', '#10B981', '#F97316', '#3B82F6'];

export default function StatisticsPage() {
  const { lang, t } = useLanguage();

  const totalObjects = culturalObjects.length;
  const unescoCount = culturalObjects.filter(obj => obj.unesco).length;

  // Count unique related persons across all objects
  const allPersons = culturalObjects.flatMap(obj => obj.relatedPersons);
  const uniquePersons = new Set(allPersons).size;

  // Calculate category distribution using localized key
  const categoryCount: Record<string, number> = {};
  culturalObjects.forEach(obj => {
    const key = obj.category[lang];
    categoryCount[key] = (categoryCount[key] || 0) + 1;
  });
  const categoryData = Object.keys(categoryCount).map(key => ({
    name: key,
    value: categoryCount[key]
  }));

  // Calculate region distribution using localized key
  const regionCount: Record<string, number> = {};
  culturalObjects.forEach(obj => {
    const key = obj.region[lang];
    regionCount[key] = (regionCount[key] || 0) + 1;
  });
  const regionData = Object.keys(regionCount).map(key => ({
    name: key.replace(lang === 'ru' ? ' область' : ' облысы', ''),
    count: regionCount[key]
  })).sort((a, b) => b.count - a.count);

  // Calculate object type distribution
  const typeCount: Record<string, number> = {};
  culturalObjects.forEach(obj => {
    typeCount[obj.objectType] = (typeCount[obj.objectType] || 0) + 1;
  });

  const TYPE_LABELS: Record<string, { kk: string; ru: string }> = {
    monument:       { kk: 'Сәулет ескерткіші', ru: 'Памятник архитектуры' },
    archaeology:    { kk: 'Археология',         ru: 'Археология' },
    sacred:         { kk: 'Киелі орын',          ru: 'Сакральное место' },
    nature:         { kk: 'Табиғат',             ru: 'Природа' },
    person:         { kk: 'Тарихи тұлға',        ru: 'Историческая личность' },
    historical_city:{ kk: 'Көне қала',           ru: 'Исторический город' },
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">
            {t('Аналитикалық Dashboard', 'Аналитический Dashboard')}
          </h1>
          <p className="text-gray-400 text-sm">
            {t('GeoCulture AI деректер базасының статистикасы', 'Статистика базы данных GeoCulture AI')}
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:border-kaz-blue/30 transition-colors">
            <p className="text-gray-400 text-sm mb-2">{t('Барлық нысандар', 'Всего объектов')}</p>
            <p className="text-4xl font-bold text-white">{totalObjects}</p>
            <p className="text-xs text-kaz-blue mt-1">{t('базада', 'в базе')}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:border-kaz-gold/30 transition-colors">
            <p className="text-gray-400 text-sm mb-2">UNESCO</p>
            <p className="text-4xl font-bold text-kaz-gold">{unescoCount}</p>
            <p className="text-xs text-kaz-gold/70 mt-1">{t('дүниежүзілік мұра', 'Всемирное наследие')}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:border-kaz-blue/30 transition-colors">
            <p className="text-gray-400 text-sm mb-2">{t('Өңірлер', 'Регионов')}</p>
            <p className="text-4xl font-bold text-kaz-blue">{Object.keys(regionCount).length}</p>
            <p className="text-xs text-kaz-blue/70 mt-1">{t('қамтылған', 'охвачено')}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:border-purple-400/30 transition-colors">
            <p className="text-gray-400 text-sm mb-2">{t('Тарихи тұлғалар', 'Историч. личности')}</p>
            <p className="text-4xl font-bold text-purple-400">{uniquePersons}</p>
            <p className="text-xs text-purple-400/70 mt-1">{t('байланысты', 'связаны')}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Categories Pie Chart */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <h2 className="text-lg font-bold text-white mb-6">
              {t('Санаттар бойынша бөлу', 'Распределение по категориям')}
            </h2>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${value}`}
                    labelLine={false}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', color: '#fff', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-2">
              {categoryData.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-2 text-xs text-gray-300">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                  <span>{entry.name} <span className="text-gray-500">({entry.value})</span></span>
                </div>
              ))}
            </div>
          </div>

          {/* Regions Bar Chart */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <h2 className="text-lg font-bold text-white mb-6">
              {t('Өңірлер бойынша нысандар', 'Объекты по регионам')}
            </h2>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={regionData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 50 }}
                >
                  <XAxis
                    dataKey="name"
                    stroke="#64748B"
                    fontSize={10}
                    angle={-35}
                    textAnchor="end"
                    interval={0}
                  />
                  <YAxis stroke="#64748B" fontSize={12} allowDecimals={false} />
                  <Tooltip
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', color: '#fff', borderRadius: '8px' }}
                  />
                  <Bar dataKey="count" fill="#00B0C7" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Object Types Distribution */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
          <h2 className="text-lg font-bold text-white mb-6">
            {t('Нысан түрлері бойынша', 'По типам объектов')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Object.entries(typeCount).map(([type, count], idx) => (
              <div key={type} className="text-center p-4 bg-black/20 border border-white/5 rounded-xl hover:border-white/20 transition-colors">
                <div
                  className="text-3xl font-bold mb-1"
                  style={{ color: COLORS[idx % COLORS.length] }}
                >
                  {count}
                </div>
                <div className="text-xs text-gray-400 leading-tight">
                  {TYPE_LABELS[type]?.[lang] || type}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
