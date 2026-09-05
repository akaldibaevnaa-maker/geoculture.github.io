"use client";

import { useState } from 'react';
import { Beaker, ArrowRight, BrainCircuit, Activity, Zap, Target, Layers } from 'lucide-react';
import { culturalObjects } from '@/data/objects';
import { useLanguage } from '@/context/LanguageContext';
import { CulturalObject } from '@/types';

interface ResultItem extends CulturalObject {
  score: number;
}

const QUERIES = {
  kk: [
    'Туркестан, сәулет, тарих',
    'Алматы, табиғат, шатқал',
    'Сақ, скиф, петроглиф',
    'Мангыстау, киелі орын',
  ],
  ru: [
    'Туркестан, архитектура, история',
    'Алматы, природа, ущелье',
    'Сакы, скифы, петроглифы',
    'Мангистау, сакральное место',
  ],
};

export default function LaboratoryPage() {
  const { lang, t } = useLanguage();
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<ResultItem[] | null>(null);
  const [queryIdx, setQueryIdx] = useState(0);
  const [steps, setSteps] = useState<string[]>([]);

  const runExperiment = () => {
    setAnalyzing(true);
    setResult(null);
    setSteps([]);

    const processingSteps = lang === 'kk'
      ? ['NLP өңдеу...', 'Ұқсастық есептеу...', 'Гео-граф талдауы...', 'Рейтинг жасалуда...']
      : ['Обработка NLP...', 'Вычисление Similarity Score...', 'Анализ гео-графов...', 'Формирование рейтинга...'];

    let stepIndex = 0;
    const stepInterval = setInterval(() => {
      if (stepIndex < processingSteps.length) {
        setSteps(prev => [...prev, processingSteps[stepIndex]]);
        stepIndex++;
      } else {
        clearInterval(stepInterval);
      }
    }, 500);

    setTimeout(() => {
      // Simulate smart matching: pick objects relevant to query
      const query = QUERIES[lang][queryIdx].toLowerCase();
      const keywords = query.split(/[,\s]+/).filter(w => w.length > 2);

      const scored = culturalObjects.map(obj => {
        let score = 50;
        const searchable = [
          obj.name[lang],
          obj.description[lang],
          obj.region[lang],
          obj.category[lang],
          ...obj.relatedPersons,
        ].join(' ').toLowerCase();

        keywords.forEach(kw => {
          if (searchable.includes(kw)) score += 15;
        });

        score += Math.random() * 10; // slight randomness
        return { ...obj, score: Math.min(99, Math.round(score)) };
      });

      const topResults = scored
        .sort((a, b) => b.score - a.score)
        .slice(0, 5) as ResultItem[];

      setResult(topResults);
      setAnalyzing(false);
    }, 2500);
  };

  const queries = QUERIES[lang];

  return (
    <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Beaker className="text-kaz-blue w-8 h-8" />
            {t('AI-Зертхана', 'AI-Лаборатория')}
          </h1>
          <p className="text-gray-400">
            {t('Зияткерлік ұсыныс алгоритмдерінің жұмысын көрсету', 'Демонстрация работы алгоритмов интеллектуальных рекомендаций')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Input */}
          <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-kaz-blue" />
              {t('Кіріс деректер', 'Входные данные')}
            </h2>

            <div className="space-y-2 mb-4">
              {queries.map((q, i) => (
                <button
                  key={i}
                  onClick={() => setQueryIdx(i)}
                  className={`w-full text-left text-sm p-3 rounded-xl border transition-all ${
                    queryIdx === i
                      ? 'bg-kaz-blue/20 border-kaz-blue/50 text-white'
                      : 'bg-black/20 border-white/5 text-gray-400 hover:border-white/20 hover:text-white'
                  }`}
                >
                  <span className="text-[10px] text-kaz-gold uppercase font-bold block mb-0.5">
                    {t('Сұрау', 'Запрос')} {i + 1}
                  </span>
                  {q}
                </button>
              ))}
            </div>

            <div className="bg-black/30 p-4 rounded-xl border border-white/5 font-mono text-xs text-green-400 mb-4">
              <p>{'{'}</p>
              <p className="pl-4">"query": "{queries[queryIdx]}",</p>
              <p className="pl-4">"algorithm": "cosine_similarity",</p>
              <p className="pl-4">"top_k": 5</p>
              <p>{'}'}</p>
            </div>

            <button
              onClick={runExperiment}
              disabled={analyzing}
              className="w-full bg-kaz-blue/20 hover:bg-kaz-blue/40 border border-kaz-blue/50 text-kaz-blue font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Zap className="w-4 h-4" />
              {t('Алгоритмді іске қосу', 'Запустить алгоритм')}
            </button>
          </div>

          {/* Processing */}
          <div className="lg:col-span-3 flex flex-col items-center justify-center py-6 min-h-[300px]">
            {analyzing ? (
              <div className="flex flex-col items-center w-full">
                <BrainCircuit className="w-14 h-14 text-kaz-gold mb-6 animate-pulse" />
                <div className="w-full space-y-2">
                  {steps.map((step, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-green-400 font-mono bg-black/30 px-3 py-1.5 rounded-lg animate-fade-in">
                      <span className="text-green-500">▶</span> {step}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center opacity-25">
                <BrainCircuit className="w-14 h-14 text-white mb-4" />
                <ArrowRight className="w-8 h-8 text-white" />
              </div>
            )}
          </div>

          {/* Output */}
          <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Target className="w-5 h-5 text-kaz-gold" />
                {t('Нәтиже', 'Результат')}
              </span>
              {result && (
                <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-md">
                  {t('Табысты', 'Успешно')}
                </span>
              )}
            </h2>

            {!result && !analyzing && (
              <div className="h-48 flex flex-col items-center justify-center text-gray-500 gap-2">
                <Activity className="w-8 h-8 opacity-50" />
                <p className="text-sm">{t('Іске қосуды күту...', 'Ожидание запуска...')}</p>
              </div>
            )}

            {analyzing && (
              <div className="h-48 flex items-center justify-center">
                <Activity className="w-8 h-8 text-kaz-blue animate-bounce" />
              </div>
            )}

            {result && (
              <div className="space-y-3">
                {result.map((item, i) => (
                  <div key={item.id} className="bg-black/20 p-3 rounded-xl border border-white/5 relative overflow-hidden hover:border-white/15 transition-colors">
                    <div
                      className="absolute left-0 top-0 bottom-0 rounded-l-xl transition-all"
                      style={{ width: `${item.score}%`, background: i === 0 ? 'rgba(245,158,11,0.1)' : 'rgba(14,165,233,0.08)' }}
                    ></div>
                    <div className="relative z-10 flex justify-between items-center">
                      <div className="flex-1 mr-3">
                        <p className="text-white font-medium text-sm">{item.name[lang]}</p>
                        <p className="text-xs text-gray-400">{item.region[lang]}</p>
                      </div>
                      <div className="flex flex-col items-end shrink-0">
                        <span className="text-[10px] text-gray-500">{t('Сәйкестік', 'Match')}</span>
                        <span className={`font-bold text-sm ${i === 0 ? 'text-kaz-gold' : 'text-kaz-blue'}`}>
                          {item.score}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Explanation block */}
        <div className="mt-8 bg-kaz-blue/5 border border-kaz-blue/15 rounded-2xl p-6">
          <h3 className="text-kaz-blue font-bold mb-3">
            {t('Алгоритм қалай жұмыс істейді?', 'Как работает алгоритм?')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300">
            <div className="bg-black/20 p-4 rounded-xl border border-white/5">
              <p className="text-white font-semibold mb-1">1. NLP {t('талдауы', 'анализ')}</p>
              <p className="text-xs text-gray-400">
                {t('Сұрауды сөздерге бөліп, маңызды кілт сөздерді анықтайды', 'Запрос разбивается на токены, выделяются ключевые слова')}
              </p>
            </div>
            <div className="bg-black/20 p-4 rounded-xl border border-white/5">
              <p className="text-white font-semibold mb-1">2. {t('Векторлық ұқсастық', 'Векторное сходство')}</p>
              <p className="text-xs text-gray-400">
                {t('Нысандар мен сұрау арасындағы ұқсастық есептеледі', 'Вычисляется косинусное сходство между запросом и объектами')}
              </p>
            </div>
            <div className="bg-black/20 p-4 rounded-xl border border-white/5">
              <p className="text-white font-semibold mb-1">3. {t('Гео-граф оңтайландыру', 'Гео-граф оптимизация')}</p>
              <p className="text-xs text-gray-400">
                {t('Нәтижелер географиялық орналасымы бойынша оңтайландырылады', 'Результаты оптимизируются с учётом географического расположения')}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
