"use client";

import { ArrowRight, BrainCircuit, Database, Map as MapIcon, Mic, Route, FileText, Globe, Users, BookOpen } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function ResearchPage() {
  const { lang, t } = useLanguage();

  return (
    <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
      <div className="max-w-4xl mx-auto space-y-10 pb-20">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-3">
            {t('Ғылыми зерттеу', 'Научное исследование')}
          </h1>
          <p className="text-gray-400">
            {t('GeoCulture AI жобасының теориялық негіздемесі', 'Теоретическое обоснование проекта GeoCulture AI')}
          </p>
        </div>

        {/* Research Problem */}
        <section className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
          <h2 className="text-xl font-bold text-kaz-blue mb-4 flex items-center gap-3">
            <span className="w-9 h-9 rounded-full bg-kaz-blue/20 flex items-center justify-center text-kaz-blue font-bold shrink-0">1</span>
            {t('Зерттеу мәселесі', 'Проблема исследования')}
          </h2>
          <p className="text-gray-300 leading-relaxed">
            {t(
              'Мәдени-тарихи ақпарат жиі әр түрлі дереккөздерге шашыраңқы орналасқан және нысандардың географиялық орнымен тікелей байланысты емес. Бұл оқушылар мен туристер үшін тарихи мұраны тұтас қабылдауды қиындатады.',
              'Культурно-историческая информация часто распределена между различными источниками и недостаточно связана с географическим расположением объектов. Это затрудняет целостное восприятие исторического наследия школьниками и туристами.'
            )}
          </p>
        </section>

        {/* Research Question & Hypothesis */}
        <div className="grid md:grid-cols-2 gap-6">
          <section className="bg-gradient-to-br from-purple-500/10 to-transparent backdrop-blur-md rounded-2xl p-7 border border-purple-500/20">
            <h2 className="text-lg font-bold text-purple-400 mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              {t('Зерттеу сұрағы', 'Исследовательский вопрос')}
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm">
              {t(
                'GIS технологиялары мен генеративті жасанды интеллекттің бірігуі Қазақстанның мәдени мұрасын зерттеудің қолжетімділігі мен тиімділігін қалай арттыра алады?',
                'Как объединение GIS-технологий и генеративного искусственного интеллекта может повысить доступность и эффективность изучения культурного наследия Казахстана?'
              )}
            </p>
          </section>

          <section className="bg-gradient-to-br from-kaz-gold/10 to-transparent backdrop-blur-md rounded-2xl p-7 border border-kaz-gold/20">
            <h2 className="text-lg font-bold text-kaz-gold mb-3 flex items-center gap-2">
              <BrainCircuit className="w-5 h-5" />
              {t('Гипотеза', 'Гипотеза')}
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm">
              {t(
                'Интерактивті картаны, құрылымдық деректерді және AI-құралдарды біріктіру мәдени мұраны зерттеу мен насихаттаудың тиімді үлгісін жасауға мүмкіндік береді.',
                'Объединение интерактивной карты, структурированных данных и AI-инструментов позволит создать более эффективную модель изучения и популяризации культурного наследия.'
              )}
            </p>
          </section>
        </div>

        {/* Research Stages */}
        <section className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-9 h-9 rounded-full bg-kaz-blue/20 flex items-center justify-center text-kaz-blue font-bold shrink-0">2</span>
            {t('Зерттеу кезеңдері', 'Этапы исследования')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              {
                kk: 'Қазақстанның мәдени-тарихи нысандарын талдау',
                ru: 'Анализ культурно-исторических объектов Казахстана'
              },
              {
                kk: 'Географиялық деректерді жинау және құрылымдау',
                ru: 'Сбор и структурирование географических данных'
              },
              {
                kk: 'Нысандар базасын (database) жасау',
                ru: 'Создание базы данных объектов'
              },
              {
                kk: 'Интерактивті GIS карта жасау (Leaflet.js)',
                ru: 'Разработка интерактивной GIS-карты (Leaflet.js)'
              },
              {
                kk: 'Жасанды интеллект жасанды интеллект құралдарын біріктіру',
                ru: 'Интеграция инструментов искусственного интеллекта'
              },
              {
                kk: 'Аудиогид және маршрут функцияларын жасау',
                ru: 'Создание функций аудиогида и маршрутов'
              },
              {
                kk: 'Прототипті тестілеу және бағалау',
                ru: 'Тестирование и оценка прототипа'
              },
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3 bg-black/20 p-3 rounded-xl border border-white/5">
                <span className="w-6 h-6 rounded-full bg-kaz-blue/30 flex items-center justify-center text-kaz-blue text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
                <p className="text-gray-300 text-sm">{step[lang]}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Architecture */}
        <section>
          <h2 className="text-xl font-bold text-white mb-8 text-center">
            {t('Жобаның технологиялық схемасы', 'Технологическая схема проекта')}
          </h2>

          <div className="flex flex-col items-center max-w-lg mx-auto">
            <div className="w-full flex items-center justify-center p-4 bg-white/5 border border-white/10 rounded-xl mb-3 hover:border-blue-400/30 transition-colors">
              <Database className="w-6 h-6 text-blue-400 mr-3 shrink-0" />
              <span className="font-medium">
                {t('Географиялық деректер & Нысандар базасы', 'Географические данные & База объектов')}
              </span>
            </div>

            <ArrowRight className="w-5 h-5 text-gray-500 mb-3 rotate-90" />

            <div className="w-full flex items-center justify-center p-4 bg-white/5 border border-white/10 rounded-xl mb-3 hover:border-green-400/30 transition-colors">
              <MapIcon className="w-6 h-6 text-green-400 mr-3 shrink-0" />
              <span className="font-medium">GIS (Geographic Information System)</span>
            </div>

            <ArrowRight className="w-5 h-5 text-gray-500 mb-3 rotate-90" />

            <div className="w-full flex items-center justify-center p-5 bg-kaz-blue/20 border border-kaz-blue/40 rounded-xl mb-3 shadow-[0_0_30px_rgba(0,176,199,0.2)]">
              <BrainCircuit className="w-8 h-8 text-kaz-blue mr-3 shrink-0" />
              <span className="font-bold text-xl text-kaz-blue">GeoCulture AI</span>
            </div>

            <ArrowRight className="w-5 h-5 text-gray-500 mb-3 rotate-90" />

            <div className="w-full grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center text-center p-4 bg-white/5 border border-white/10 rounded-xl hover:border-purple-400/30 transition-colors">
                <Mic className="w-5 h-5 text-purple-400 mb-2" />
                <span className="text-sm">{t('Аудиогид & Анықтамалар', 'Аудиогид и справки')}</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-white/5 border border-white/10 rounded-xl hover:border-kaz-gold/30 transition-colors">
                <Route className="w-5 h-5 text-kaz-gold mb-2" />
                <span className="text-sm">AI-{t('Маршруттар', 'Маршруты')}</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-white/5 border border-white/10 rounded-xl hover:border-kaz-blue/30 transition-colors">
                <Globe className="w-5 h-5 text-kaz-blue mb-2" />
                <span className="text-sm">{t('Интерактивті карта', 'Интерактивная карта')}</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-white/5 border border-white/10 rounded-xl hover:border-green-400/30 transition-colors">
                <Users className="w-5 h-5 text-green-400 mb-2" />
                <span className="text-sm">{t('Білім беру & Туризм', 'Образование и туризм')}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Methodology */}
        <section className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="w-9 h-9 rounded-full bg-kaz-blue/20 flex items-center justify-center text-kaz-blue font-bold shrink-0">3</span>
            {t('Зерттеу әдістемесі', 'Методология исследования')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { kk: 'Дереккөздерді талдау', ru: 'Анализ источников', icon: FileText },
              { kk: 'Геоақпараттық картографиялау', ru: 'ГИС-картографирование', icon: MapIcon },
              { kk: 'Кеңістіктік деректерді өңдеу', ru: 'Обработка пространственных данных', icon: Database },
              { kk: 'Бағдарламалау (Next.js, TypeScript)', ru: 'Программирование (Next.js, TypeScript)', icon: BrainCircuit },
              { kk: 'Жүйелерді салыстырмалы талдау', ru: 'Сравнительный анализ систем', icon: Globe },
              { kk: 'Эксперименталды тестілеу', ru: 'Экспериментальное тестирование', icon: Route },
            ].map((method, i) => {
              const Icon = method.icon;
              return (
                <div key={i} className="bg-black/20 p-3 rounded-xl border border-white/5 flex items-start gap-2">
                  <Icon className="w-4 h-4 text-kaz-blue mt-0.5 shrink-0" />
                  <p className="text-gray-300 text-xs leading-relaxed">{method[lang]}</p>
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}
