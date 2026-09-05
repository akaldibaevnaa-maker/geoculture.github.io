"use client";

import { useParams, useRouter } from 'next/navigation';
import { culturalObjects } from '@/data/objects';
import { useLanguage } from '@/context/LanguageContext';
import { MapPin, ArrowLeft, Play, Square, AudioLines, Route, MessageSquare, Landmark, TreePine, Crown, Building2, Pyramid } from 'lucide-react';
import { useState } from 'react';

const TYPE_CONFIG: Record<string, { icon: React.ElementType; gradient: string; glow: string }> = {
  monument:        { icon: Landmark,  gradient: 'from-sky-900/80 to-sky-700/30',      glow: '#0ea5e9' },
  archaeology:     { icon: Pyramid,   gradient: 'from-orange-900/80 to-orange-700/30', glow: '#f97316' },
  sacred:          { icon: Crown,     gradient: 'from-purple-900/80 to-purple-700/30', glow: '#a855f7' },
  nature:          { icon: TreePine,  gradient: 'from-green-900/80 to-green-700/30',   glow: '#22c55e' },
  person:          { icon: Crown,     gradient: 'from-amber-900/80 to-amber-700/30',   glow: '#f59e0b' },
  historical_city: { icon: Building2, gradient: 'from-teal-900/80 to-teal-700/30',     glow: '#14b8a6' },
};

export default function ObjectPage() {
  const params = useParams();
  const router = useRouter();
  const { lang, t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);

  const objectId = params.id as string;
  const object = culturalObjects.find((o) => o.id === objectId);

  if (!object) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center text-white">
        <h1>{t('Объект табылмады', 'Объект не найден')}</h1>
      </div>
    );
  }

  const handlePlayAudio = () => {
    if (!('speechSynthesis' in window)) {
      alert(t('Браузер дыбыстық синтезді қолдамайды.', 'Ваш браузер не поддерживает синтез речи.'));
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    const textToSpeak = object.audioText ? object.audioText[lang] : object.description[lang];
    const utterance = new SpeechSynthesisUtterance(textToSpeak);

    if (lang === 'kk') {
      const voices = window.speechSynthesis.getVoices();
      const kkVoice = voices.find(v => v.lang.startsWith('kk'));
      if (kkVoice) utterance.voice = kkVoice;
      utterance.lang = 'kk-KZ';
    } else {
      utterance.lang = 'ru-RU';
    }

    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  const typeConfig = TYPE_CONFIG[object.objectType] || TYPE_CONFIG.monument;
  const TypeIcon = typeConfig.icon;

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 max-w-5xl mx-auto text-white">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors">
        <ArrowLeft className="w-5 h-5" />
        <span>{t('Артқа', 'Назад')}</span>
      </button>

      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Hero Illustration */}
          <div
            className={`w-full md:w-1/2 aspect-video md:aspect-square rounded-2xl border border-white/10 flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br ${typeConfig.gradient}`}
            style={{ boxShadow: `0 0 60px -10px ${typeConfig.glow}60` }}
          >
            {/* Decorative rings */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <div className="w-80 h-80 rounded-full border border-white" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-5">
              <div className="w-56 h-56 rounded-full border border-white" />
            </div>

            {/* Main icon */}
            <TypeIcon
              className="w-28 h-28 mb-4 relative z-10 drop-shadow-2xl"
              style={{ color: typeConfig.glow }}
            />

            {/* Object name overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/70 to-transparent z-10">
              <p className="text-white font-bold text-lg leading-tight">{object.name[lang]}</p>
              <p className="text-sm mt-1 font-medium" style={{ color: typeConfig.glow }}>{object.period}</p>
            </div>

            {/* UNESCO badge */}
            {object.unesco && (
              <div className="absolute top-4 right-4 z-10 bg-kaz-gold/20 border border-kaz-gold/50 text-kaz-gold text-xs font-bold px-2.5 py-1 rounded-lg backdrop-blur-sm">
                🏆 UNESCO
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="mb-2 inline-block px-3 py-1 bg-kaz-blue/20 text-kaz-blue text-xs font-bold uppercase rounded-lg border border-kaz-blue/30">
              {object.category[lang]}
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              {object.name[lang]}
            </h1>
            
            <div className="flex items-center gap-2 text-gray-400 mb-6">
              <MapPin className="w-5 h-5" />
              <span className="text-lg">{object.region[lang]}</span>
              <span className="mx-2">•</span>
              <span className="text-kaz-gold">{object.period}</span>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">{t('Қысқаша тарих', 'Краткая история')}</h3>
                <p className="text-gray-300 leading-relaxed text-lg">{object.description[lang]}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-kaz-gold">{t('Тарихи маңызы', 'Историческое значение')}</h3>
                <p className="text-gray-300 leading-relaxed text-lg">{object.historicalSignificance[lang]}</p>
              </div>

              {object.legends && (
                <div className="bg-amber-500/5 p-4 rounded-xl border border-amber-500/15">
                  <h3 className="text-amber-400 font-semibold mb-2">{t('Аңыздар', 'Легенды')}</h3>
                  <p className="text-gray-300 italic leading-relaxed">&ldquo;{object.legends[lang]}&rdquo;</p>
                </div>
              )}

              {object.relatedPersons && object.relatedPersons.length > 0 && (
                <div>
                  <h3 className="text-purple-400 font-semibold mb-2">{t('Байланысты тұлғалар', 'Связанные личности')}</h3>
                  <div className="flex flex-wrap gap-2">
                    {object.relatedPersons.map((person, idx) => (
                      <span key={idx} className="text-xs bg-purple-500/15 text-purple-300 border border-purple-500/20 px-2 py-1 rounded-md">
                        {person}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* AI Actions */}
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
              <button 
                onClick={handlePlayAudio}
                className={`col-span-2 md:col-span-1 flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all ${
                isPlaying ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-kaz-blue/20 text-kaz-blue border-kaz-blue/30 hover:bg-kaz-blue/30'
              }`}>
                {isPlaying ? <Square className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                <span className="text-sm font-semibold">{isPlaying ? t('Тоқтату', 'Остановить') : t('Аудиогид', 'Аудиогид')}</span>
              </button>

              <button
                onClick={() => {
                  window.speechSynthesis.cancel();
                  setIsPlaying(false);
                  const query = encodeURIComponent(object.name[lang]);
                  router.push(`/guide?q=${query}`);
                }}
                className="flex flex-col items-center justify-center gap-2 p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-400/30 text-purple-400 rounded-xl transition-all"
              >
                <MessageSquare className="w-6 h-6" />
                <span className="text-sm font-semibold text-center">{t('AI-мен тарихын білу', 'Узнать у AI')}</span>
              </button>

              <button
                onClick={() => router.push('/routes')}
                className="flex flex-col items-center justify-center gap-2 p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-kaz-gold/30 text-kaz-gold rounded-xl transition-all"
              >
                <Route className="w-6 h-6" />
                <span className="text-sm font-semibold text-center">{t('Маршрут құру', 'Построить маршрут')}</span>
              </button>

              <button className="flex flex-col items-center justify-center gap-2 p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-green-400/30 text-green-400 rounded-xl transition-all">
                <AudioLines className="w-6 h-6" />
                <span className="text-sm font-semibold text-center">{t('AI сипаттама', 'AI описание')}</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
