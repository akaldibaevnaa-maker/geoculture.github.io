"use client";

import { useLanguage } from '@/context/LanguageContext';
import { Globe, Map, BrainCircuit } from 'lucide-react';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 max-w-3xl mx-auto text-white">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          {t('Жоба туралы', 'О проекте')}
        </h1>
        <p className="text-gray-400 text-lg">GeoCulture AI</p>
      </div>

      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-xl space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-kaz-blue mb-3">{t('Идея', 'Идея')}</h2>
          <p className="text-gray-300 leading-relaxed">
            {t(
              'GeoCulture AI — бұл Қазақстанның тарихи, мәдени, археологиялық және туристік нысандары көрсетілген интерактивті зияткерлік карта. Платформа 9–11 сынып оқушыларына арналған ғылыми жоба ретінде әзірленуде.',
              'GeoCulture AI — это интерактивная интеллектуальная карта Казахстана, на которой отображаются исторические, культурные, археологические и туристические объекты. Платформа разрабатывается как научный проект для учащихся 9–11 классов.'
            )}
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-kaz-gold mb-3 flex items-center gap-2">
            <Globe className="w-5 h-5" />
            {t('Технологиялар', 'Технологии')}
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li>Next.js, React, Tailwind CSS</li>
            <li>Leaflet, OpenStreetMap</li>
            <li>Generative AI & Text-to-Speech</li>
            <li>{t('Мок деректер және заманауи дизайн', 'Mock-данные и современный дизайн')}</li>
          </ul>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-purple-400 mb-3 flex items-center gap-2">
            <BrainCircuit className="w-5 h-5" />
            {t('Жасанды интеллект', 'Искусственный интеллект')}
          </h2>
          <p className="text-gray-300 leading-relaxed">
            {t(
              'Жүйедегі жасанды интеллект тарихты түсіндіре алады, аудиогид жасайды, виртуалды экскурсия мәтінін құрады және пайдаланушының қызығушылығына сай маршруттар ұсынады.',
              'Искусственный интеллект в системе может рассказывать историю, создавать аудиогиды, формировать тексты виртуальных экскурсий и предлагать маршруты на основе интересов пользователя.'
            )}
          </p>
        </div>

      </div>
    </div>
  );
}
