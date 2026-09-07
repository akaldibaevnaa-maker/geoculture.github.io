"use client";

import { useParams, useRouter } from "next/navigation";
import { culturalObjects } from "@/data/objects";
import { useLanguage } from "@/context/LanguageContext";
import { MapPin, ArrowLeft, Volume2, Pause, Route, MessageSquare, Star, Sparkles, BookOpen, Users, Image as ImageIcon } from "lucide-react";
import { useState, useRef } from "react";

export default function ObjectPage() {
  const params = useParams();
  const router = useRouter();
  const { lang, t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [imgError, setImgError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const objectId = params.id as string;
  const object = culturalObjects.find((o) => o.id === objectId);

  if (!object) {
    return (
      <div className="min-h-full p-12 flex flex-col items-center justify-center text-center" style={{ background: "#FAF7F2" }}>
        <h1 className="text-xl font-bold mb-4" style={{ color: "#2C1F14" }}>{t("Нысан табылмады", "Объект не найден")}</h1>
        <button onClick={() => router.push("/map")} className="px-4 py-2 rounded-xl text-xs font-bold text-white" style={{ background: "#1A5F7A" }}>
          {t("Картаға оралу", "Вернуться на карту")}
        </button>
      </div>
    );
  }

  const handlePlayAudio = async () => {
    if (isPlaying) {
      if (audioRef.current) audioRef.current.pause();
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    const textToSpeak = object.audioText ? object.audioText[lang] : `${(object.name[lang] || object.name.kk || "")}. ${object.description[lang]} ${object.historicalSignificance[lang]}`;

    try {
      const res = await fetch("/api/audio-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: textToSpeak, lang }),
      });

      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        audioRef.current = audio;
        audio.onended = () => setIsPlaying(false);
        audio.onerror = () => setIsPlaying(false);
        audio.play();
        setIsPlaying(true);
        return;
      }
    } catch {}

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = "ru-RU";
      utterance.rate = 0.9;
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  return (
    <div className="min-h-full p-6 custom-scrollbar" style={{ background: "#FAF7F2" }}>
      <div className="max-w-4xl mx-auto space-y-6">
        <button onClick={() => router.back()} className="inline-flex items-center gap-2 text-xs font-bold transition-colors" style={{ color: "#8B6914" }}>
          <ArrowLeft className="w-4 h-4" />
          <span>{t("Артқа", "Назад")}</span>
        </button>

        <div className="rounded-2xl p-6 border shadow-sm space-y-6" style={{ background: "#FFF8F0", borderColor: "rgba(196,113,79,0.2)" }}>
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-full md:w-80 h-56 rounded-xl overflow-hidden flex-shrink-0 relative" style={{ background: "#F5EFE6" }}>
              {object.image && !imgError ? (
                <img src={object.image} alt={(object.name[lang] || object.name.kk || "")} onError={() => setImgError(true)} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                  <ImageIcon className="w-10 h-10 opacity-40" style={{ color: "#C4714F" }} />
                  <span className="text-xs" style={{ color: "#A08060" }}>{t("Фото қол жетімсіз", "Фото недоступно")}</span>
                </div>
              )}
              {object.unesco && (
                <span className="absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-bold" style={{ background: "rgba(201,162,39,0.9)", color: "#fff" }}>
                  ★ UNESCO
                </span>
              )}
            </div>

            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded" style={{ background: "rgba(196,113,79,0.12)", color: "#C4714F" }}>
                  {object.category[lang]}
                </span>
                <span className="text-xs font-medium" style={{ color: "#8B6914" }}>{object.period}</span>
              </div>

              <h1 className="text-2xl md:text-3xl font-extrabold" style={{ color: "#2C1F14" }}>{(object.name[lang] || object.name.kk || "")}</h1>

              <div className="flex items-center gap-1.5 text-xs font-medium" style={{ color: "#1A5F7A" }}>
                <MapPin className="w-4 h-4" />
                <span>{object.region[lang]}</span>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <button onClick={handlePlayAudio}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all"
                  style={{ background: isPlaying ? "rgba(196,113,79,0.15)" : "#1A5F7A", color: isPlaying ? "#C4714F" : "#fff" }}>
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  {isPlaying ? t("Тоқтату", "Стоп") : t("▶ Аудиогид", "▶ Аудиогид")}
                </button>

                <button onClick={() => router.push(`/guide?q=${encodeURIComponent((object.name[lang] || object.name.kk || ""))}`)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all"
                  style={{ background: "rgba(139,58,139,0.08)", borderColor: "rgba(139,58,139,0.2)", color: "#8B3A8B" }}>
                  <MessageSquare className="w-3.5 h-3.5" />
                  {t("AI Гидтен сұрау", "Спросить у AI-гида")}
                </button>

                <button onClick={() => router.push("/routes")}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all"
                  style={{ background: "rgba(201,162,39,0.1)", borderColor: "rgba(201,162,39,0.25)", color: "#8B6914" }}>
                  <Route className="w-3.5 h-3.5" />
                  {t("Маршрутқа қосу", "Добавить в маршрут")}
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t" style={{ borderColor: "rgba(196,113,79,0.12)" }}>
            <div>
              <h3 className="text-sm font-bold mb-1.5 flex items-center gap-2" style={{ color: "#1A5F7A" }}>
                <BookOpen className="w-4 h-4" />
                {t("Қысқаша тарих", "Краткая история")}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: "#5C4A35" }}>{object.description[lang]}</p>
            </div>

            <div>
              <h3 className="text-sm font-bold mb-1.5 flex items-center gap-2" style={{ color: "#C9A227" }}>
                <Star className="w-4 h-4" />
                {t("Тарихи маңызы", "Историческое значение")}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: "#5C4A35" }}>{object.historicalSignificance[lang]}</p>
            </div>

            {object.legends && (
              <div className="p-4 rounded-xl" style={{ background: "rgba(201,162,39,0.08)", border: "1px solid rgba(201,162,39,0.2)" }}>
                <h3 className="text-xs font-bold mb-1 flex items-center gap-1.5" style={{ color: "#8B6914" }}>
                  <Sparkles className="w-3.5 h-3.5" />
                  {t("Аңыздар мен жырлар", "Легенды и предания")}
                </h3>
                <p className="text-xs italic leading-relaxed" style={{ color: "#5C4A35" }}>&ldquo;{object.legends[lang]}&rdquo;</p>
              </div>
            )}

            {object.relatedPersons && object.relatedPersons.length > 0 && (
              <div>
                <h3 className="text-xs font-bold mb-2 flex items-center gap-1.5" style={{ color: "#8B3A8B" }}>
                  <Users className="w-3.5 h-3.5" />
                  {t("Байланысты тұлғалар", "Связанные личности")}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {object.relatedPersons.map((p, idx) => (
                    <span key={idx} className="text-[11px] px-2.5 py-1 rounded-lg" style={{ background: "rgba(139,58,139,0.1)", color: "#8B3A8B", border: "1px solid rgba(139,58,139,0.2)" }}>
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

