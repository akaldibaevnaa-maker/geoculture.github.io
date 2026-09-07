"use client";

import { useState, useRef } from "react";
import { CulturalObject } from "@/types";
import { Play, Square, Sparkles, Route, MessageSquare, X, MapPin, Calendar, Star, Users, BookOpen, Volume2, Image as ImageIcon, Loader2, AlertCircle, RefreshCw, Pause } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";

interface ObjectCardProps {
  object: CulturalObject;
  onClose: () => void;
}

const TYPE_BADGE: Record<string, { color: string; bg: string }> = {
  monument:       { color: "#1A5F7A", bg: "rgba(26,95,122,0.12)" },
  archaeology:    { color: "#C4714F", bg: "rgba(196,113,79,0.12)" },
  sacred:         { color: "#8B3A8B", bg: "rgba(139,58,139,0.12)" },
  nature:         { color: "#2D6A4F", bg: "rgba(45,106,79,0.12)" },
  person:         { color: "#C9A227", bg: "rgba(201,162,39,0.12)" },
  historical_city:{ color: "#5C4A35", bg: "rgba(92,74,53,0.12)" },
  mausoleum:      { color: "#1A5F7A", bg: "rgba(26,95,122,0.12)" },
  petroglyphs:    { color: "#C4714F", bg: "rgba(196,113,79,0.12)" },
  museum:         { color: "#2D6A4F", bg: "rgba(45,106,79,0.12)" },
  ancient_city:   { color: "#8B3A8B", bg: "rgba(139,58,139,0.12)" },
  unesco_site:    { color: "#C9A227", bg: "rgba(201,162,39,0.12)" },
};

type AudioState = "idle" | "loading" | "playing" | "paused" | "error";
type IllustrationStyle = "historical" | "artistic" | "archaeological";

export default function ObjectCard({ object, onClose }: ObjectCardProps) {
  const { lang, t } = useLanguage();
  const router = useRouter();
  const badge = TYPE_BADGE[object.objectType] || TYPE_BADGE.monument;

  // Audio state
  const [audioState, setAudioState] = useState<AudioState>("idle");
  const [audioProgress, setAudioProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // AI History state
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyText, setHistoryText] = useState<string | null>(null);
  const [historyError, setHistoryError] = useState(false);

  // AI Illustration state
  const [showIllPanel, setShowIllPanel] = useState(false);
  const [illStyle, setIllStyle] = useState<IllustrationStyle>("historical");
  const [illLoading, setIllLoading] = useState(false);
  const [illUrl, setIllUrl] = useState<string | null>(null);
  const [illDisclaimer, setIllDisclaimer] = useState("");
  const [illError, setIllError] = useState(false);

  // Image error fallback
  const [imgError, setImgError] = useState(false);

  // AI Avatar state
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  const getAudioText = () => {
    if (object.audioText) return object.audioText[lang];
    return `${object.name[lang]}. ${object.description[lang]} ${object.historicalSignificance[lang]}`;
  };

  const handlePlayAudio = async () => {
    if (audioState === "playing") {
      // Pause
      if (audioRef.current) {
        audioRef.current.pause();
        setAudioState("paused");
      } else {
        window.speechSynthesis.pause();
        setAudioState("paused");
      }
      return;
    }
    if (audioState === "paused") {
      if (audioRef.current) {
        audioRef.current.play();
        setAudioState("playing");
      } else {
        window.speechSynthesis.resume();
        setAudioState("playing");
      }
      return;
    }

    // Fresh start
    setAudioState("loading");
    const text = getAudioText();

    try {
      const res = await fetch("/api/audio-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, lang }),
      });

      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        audioRef.current = audio;
        audio.ontimeupdate = () => setAudioProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0);
        audio.onended = () => { setAudioState("idle"); setAudioProgress(0); };
        audio.onerror = () => { setAudioState("error"); };
        audio.play();
        setAudioState("playing");
      } else {
        // Fallback to browser TTS
        useBrowserTTS(text || getAudioText());
      }
    } catch {
      useBrowserTTS(getAudioText());
    }
  };

  const useBrowserTTS = (text: string) => {
    if (!("speechSynthesis" in window)) { setAudioState("error"); return; }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === "kk" ? "ru-RU" : "ru-RU";
    utterance.rate = 0.88;
    utterance.onend = () => { setAudioState("idle"); setAudioProgress(0); };
    utterance.onerror = () => setAudioState("error");
    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setAudioState("playing");
  };

  const handleStopAudio = () => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0; audioRef.current = null; }
    window.speechSynthesis.cancel();
    setAudioState("idle");
    setAudioProgress(0);
  };

  const handleAIHistory = async () => {
    if (historyText) { setHistoryText(null); return; }
    setHistoryLoading(true);
    setHistoryError(false);
    try {
      const prompt = lang === "kk"
        ? `"${object.name.kk}" нысаны туралы толық тарихи ақпарат бер: орналасқан жері, дәуірі, ашылу тарихы, сипаттамасы, тарихи маңызы, археологиялық маңызы, қызықты деректер, қазіргі жағдайы, дереккөздер.`
        : `Расскажи подробную историческую информацию об объекте "${object.name.ru}": местоположение, эпоха, история открытия, характеристика, историческое значение, археологическое значение, интересные факты, современное состояние, источники.`;

      const res = await fetch("/api/ai-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: prompt, lang, objectContext: object.name[lang] }),
      });
      const data = await res.json();
      setHistoryText(data.reply || t("Ақпарат алу мүмкін болмады.", "Не удалось получить информацию."));
    } catch {
      setHistoryError(true);
    } finally {
      setHistoryLoading(false);
    }
  };

  const handleGenerateIllustration = async () => {
    setIllLoading(true);
    setIllError(false);
    setIllUrl(null);
    try {
      const res = await fetch("/api/ai-illustration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ objectName: object.name[lang], style: illStyle, lang }),
      });
      const data = await res.json();
      if (data.imageUrl) {
        setIllUrl(data.imageUrl);
        setIllDisclaimer(data.disclaimer || "");
      } else {
        setIllError(true);
      }
    } catch {
      setIllError(true);
    } finally {
      setIllLoading(false);
    }
  };

  const handleGoToGuide = () => {
    handleStopAudio();
    const nameText = object.name ? (object.name[lang] || object.name.kk || "") : "";
    const query = encodeURIComponent(nameText);
    router.push(`/guide?q=${query}`);
  };

  return (
    <div className="absolute top-4 right-4 z-[1000] w-[400px] max-h-[92vh] rounded-2xl flex flex-col overflow-hidden animate-fade-in-down shadow-2xl"
      style={{ background: "#FFF8F0", border: "1px solid rgba(196,113,79,0.25)" }}>

      {/* Header */}
      <div className="p-4 border-b flex justify-between items-start"
        style={{ borderColor: "rgba(196,113,79,0.15)", background: `linear-gradient(135deg, ${badge.bg} 0%, transparent 100%)` }}>
        <div className="flex-1 mr-3">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md"
              style={{ color: badge.color, background: badge.bg, border: `1px solid ${badge.color}30` }}>
              {object.category[lang]}
            </span>
            {object.unesco && (
              <span className="text-[10px] px-1.5 py-0.5 rounded font-bold"
                style={{ background: "rgba(201,162,39,0.2)", color: "#8B6914", border: "1px solid rgba(201,162,39,0.3)" }}>UNESCO</span>
            )}
          </div>
          <h2 className="text-base font-bold leading-tight" style={{ color: "#2C1F14" }}>{object.name[lang]}</h2>
          <div className="flex items-center gap-1 text-xs mt-1" style={{ color: "#8B6914" }}>
            <MapPin className="w-3 h-3" style={{ color: badge.color }} />
            {object.region[lang]}
          </div>
        </div>
        <button onClick={() => { handleStopAudio(); onClose(); }}
          className="p-1.5 rounded-lg transition-colors hover:bg-red-50"
          style={{ color: "#8B6914" }}>
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">

        {/* Object Image */}
        <div className="relative" style={{ height: "160px", background: "#F5EFE6" }}>
          {object.image && !imgError ? (
            <img src={object.image} alt={object.name[lang]}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: badge.bg }}>
                <ImageIcon className="w-7 h-7" style={{ color: badge.color }} />
              </div>
              <span className="text-xs" style={{ color: "#A08060" }}>{t("Фото қол жетімсіз", "Фото недоступно")}</span>
            </div>
          )}
        </div>

        <div className="p-4 space-y-4">
          {/* Period */}
          <div className="flex items-center gap-2 text-xs" style={{ color: "#8B6914" }}>
            <Calendar className="w-3.5 h-3.5 flex-shrink-0" style={{ color: badge.color }} />
            <span>{object.period}</span>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs font-bold mb-1.5 flex items-center gap-2" style={{ color: badge.color }}>
              <BookOpen className="w-3.5 h-3.5" />
              {t("Қысқаша тарих", "Краткая история")}
            </h3>
            <p className="text-xs leading-relaxed" style={{ color: "#5C4A35" }}>{object.description[lang]}</p>
          </div>

          {/* Historical Significance */}
          <div>
            <h3 className="text-xs font-bold mb-1.5 flex items-center gap-2" style={{ color: "#C9A227" }}>
              <Star className="w-3.5 h-3.5" />
              {t("Тарихи маңызы", "Историческое значение")}
            </h3>
            <p className="text-xs leading-relaxed" style={{ color: "#5C4A35" }}>{object.historicalSignificance[lang]}</p>
          </div>

          {/* Related persons */}
          {object.relatedPersons && object.relatedPersons.length > 0 && (
            <div>
              <h3 className="text-xs font-bold mb-2 flex items-center gap-2" style={{ color: "#8B3A8B" }}>
                <Users className="w-3.5 h-3.5" />
                {t("Байланысты тұлғалар", "Связанные личности")}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {object.relatedPersons.map((person, idx) => (
                  <span key={idx} className="text-[10px] px-2 py-1 rounded-md" style={{ background: "rgba(139,58,139,0.1)", color: "#8B3A8B", border: "1px solid rgba(139,58,139,0.2)" }}>
                    {person}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Legends */}
          {object.legends && (
            <div className="p-3 rounded-xl" style={{ background: "rgba(201,162,39,0.08)", border: "1px solid rgba(201,162,39,0.2)" }}>
              <h3 className="text-xs font-bold mb-1.5 flex items-center gap-2" style={{ color: "#8B6914" }}>
                <Sparkles className="w-3.5 h-3.5" />
                {t("Аңыздар мен жырлар", "Легенды и предания")}
              </h3>
              <p className="text-[11px] italic leading-relaxed" style={{ color: "#5C4A35" }}>&ldquo;{object.legends[lang]}&rdquo;</p>
            </div>
          )}

          {/* AI History result */}
          {(historyLoading || historyText || historyError) && (
            <div className="p-3 rounded-xl" style={{ background: "rgba(26,95,122,0.06)", border: "1px solid rgba(26,95,122,0.15)" }}>
              {historyLoading && (
                <div className="flex items-center gap-2 text-xs" style={{ color: "#1A5F7A" }}>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  {t("AI тарихты дайындауда...", "AI готовит историю...")}
                </div>
              )}
              {historyError && (
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-3.5 h-3.5" style={{ color: "#C4714F" }} />
                  <span className="text-xs" style={{ color: "#C4714F" }}>{t("Қате. Қайта көріңіз.", "Ошибка. Повторите.")}</span>
                  <button onClick={handleAIHistory} className="ml-auto text-[10px] flex items-center gap-1" style={{ color: "#1A5F7A" }}>
                    <RefreshCw className="w-3 h-3" />{t("Қайта", "Повтор")}
                  </button>
                </div>
              )}
              {historyText && (
                <div>
                  <p className="text-[11px] leading-relaxed whitespace-pre-wrap" style={{ color: "#2C1F14" }}>{historyText}</p>
                </div>
              )}
            </div>
          )}

          {/* AI Illustration Panel */}
          {showIllPanel && (
            <div className="p-3 rounded-xl space-y-3" style={{ background: "rgba(201,162,39,0.06)", border: "1px solid rgba(201,162,39,0.18)" }}>
              <div className="flex gap-1">
                {(["historical", "artistic", "archaeological"] as IllustrationStyle[]).map(s => (
                  <button key={s} onClick={() => setIllStyle(s)}
                    className="flex-1 text-[10px] py-1 rounded-lg font-medium transition-all"
                    style={{ background: illStyle === s ? "#C9A227" : "rgba(201,162,39,0.1)", color: illStyle === s ? "#fff" : "#8B6914", border: "1px solid rgba(201,162,39,0.2)" }}>
                    {s === "historical" ? t("Тарихи", "Историческая") : s === "artistic" ? t("Көркем", "Художественная") : t("Археол.", "Археол.")}
                  </button>
                ))}
              </div>
              <button onClick={handleGenerateIllustration} disabled={illLoading}
                className="w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all"
                style={{ background: "#C9A227", color: "#fff", opacity: illLoading ? 0.7 : 1 }}>
                {illLoading ? <><Loader2 className="w-3.5 h-3.5 animate-spin" />{t("Жасалуда...", "Создаётся...")}</> : <><Sparkles className="w-3.5 h-3.5" />{t("Жасау", "Создать")}</>}
              </button>
              {illError && <p className="text-[10px] text-center" style={{ color: "#C4714F" }}>{t("Қате. OPENAI_API_KEY қажет.", "Ошибка. Требуется OPENAI_API_KEY.")}</p>}
              {illUrl && (
                <div>
                  <img src={illUrl} alt={object.name[lang]} className="w-full rounded-xl" />
                  {illDisclaimer && <p className="text-[9px] mt-2 text-center italic" style={{ color: "#A08060" }}>{illDisclaimer}</p>}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 border-t space-y-2" style={{ borderColor: "rgba(196,113,79,0.12)", background: "rgba(255,250,245,0.95)" }}>

        {/* Audio Guide */}
        <div>
          <div className="flex gap-2 mb-1.5">
            <button onClick={handlePlayAudio} disabled={audioState === "loading"}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all"
              style={{
                background: audioState === "playing" ? "rgba(196,113,79,0.15)" : "rgba(26,95,122,0.12)",
                color: audioState === "playing" ? "#C4714F" : "#1A5F7A",
                border: `1px solid ${audioState === "playing" ? "rgba(196,113,79,0.3)" : "rgba(26,95,122,0.25)"}`,
              }}>
              {audioState === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> :
               audioState === "playing" ? <Pause className="w-4 h-4" /> :
               audioState === "paused" ? <Play className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              {audioState === "loading" ? t("Жүктелуде...", "Загрузка...") :
               audioState === "playing" ? t("Тоқтату", "Пауза") :
               audioState === "paused" ? t("Жалғастыру", "Продолжить") : t("▶ Аудиогид", "▶ Аудиогид")}
            </button>
            {(audioState === "playing" || audioState === "paused") && (
              <button onClick={handleStopAudio} className="px-3 py-2.5 rounded-xl text-xs transition-all"
                style={{ background: "rgba(196,113,79,0.1)", color: "#C4714F", border: "1px solid rgba(196,113,79,0.2)" }}>
                <Square className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          {/* Progress bar */}
          {(audioState === "playing" || audioState === "paused") && (
            <div className="w-full h-1 rounded-full" style={{ background: "rgba(196,113,79,0.15)" }}>
              <div className="h-full rounded-full transition-all" style={{ width: `${audioProgress}%`, background: "#C4714F" }} />
            </div>
          )}
          {audioState === "error" && (
            <p className="text-[10px] mt-1" style={{ color: "#C4714F" }}>{t("Аудио қол жетімсіз", "Аудио недоступно")}</p>
          )}
        </div>

        <div className="grid grid-cols-3 gap-2">
          <button onClick={handleAIHistory} disabled={historyLoading}
            className="flex flex-col items-center gap-1 py-2.5 rounded-xl transition-all text-center"
            style={{ background: historyText ? "rgba(26,95,122,0.15)" : "rgba(26,95,122,0.08)", border: "1px solid rgba(26,95,122,0.2)", color: "#1A5F7A" }}>
            {historyLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <BookOpen className="w-4 h-4" />}
            <span className="text-[9px] leading-tight">{t("AI тарихы", "AI история")}</span>
          </button>

          <button onClick={handleGoToGuide}
            className="flex flex-col items-center gap-1 py-2.5 rounded-xl transition-all"
            style={{ background: "rgba(139,58,139,0.08)", border: "1px solid rgba(139,58,139,0.2)", color: "#8B3A8B" }}>
            <MessageSquare className="w-4 h-4" />
            <span className="text-[9px] leading-tight">{t("AI сұрақ", "AI вопрос")}</span>
          </button>

          {object.objectType === 'person' ? (
            <button onClick={() => setShowAvatarModal(true)}
              className="flex flex-col items-center gap-1 py-2.5 rounded-xl transition-all hover:bg-yellow-100"
              style={{ background: "rgba(201,162,39,0.2)", border: "1px solid rgba(201,162,39,0.4)", color: "#8B6914" }}>
              <Users className="w-4 h-4" />
              <span className="text-[9px] leading-tight font-bold">{t("AI Аватар", "AI Аватар")}</span>
            </button>
          ) : (
            <button onClick={() => setShowIllPanel(!showIllPanel)}
              className="flex flex-col items-center gap-1 py-2.5 rounded-xl transition-all"
              style={{ background: showIllPanel ? "rgba(201,162,39,0.2)" : "rgba(201,162,39,0.08)", border: "1px solid rgba(201,162,39,0.25)", color: "#8B6914" }}>
              <Sparkles className="w-4 h-4" />
              <span className="text-[9px] leading-tight">{t("AI сурет", "AI рисунок")}</span>
            </button>
          )}
        </div>

        {/* Route button */}
        <button onClick={() => { handleStopAudio(); router.push("/routes"); }}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all"
          style={{ background: "rgba(201,162,39,0.1)", border: "1px solid rgba(201,162,39,0.25)", color: "#8B6914" }}>
          <Route className="w-4 h-4" />
          {t("Маршрут құру", "Построить маршрут")}
        </button>
      </div>

      {/* AI Avatar Modal */}
      {showAvatarModal && (
        <div className="fixed inset-0 bg-black/60 z-[2000] flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative border border-yellow-200">
            {/* Close */}
            <button 
              onClick={() => setShowAvatarModal(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white/30 backdrop-blur-md rounded-full text-gray-800 hover:bg-white/50 z-10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            {/* 3D Simulation view */}
            <div className="h-64 bg-gradient-to-b from-blue-900 via-indigo-900 to-black relative flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
              {/* Fake 3D Avatar (pulsing glowing circle for now as placeholder) */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-yellow-400/20 border border-yellow-400/50 shadow-[0_0_40px_rgba(250,204,21,0.4)] flex items-center justify-center mb-4">
                  <Users className="w-10 h-10 text-yellow-300 animate-pulse" />
                </div>
                <div className="text-yellow-100 font-bold tracking-wider text-sm uppercase">{object.name[lang]}</div>
                <div className="text-blue-200 text-[10px] mt-1">{t("Жасанды интеллект моделі қосылды", "ИИ-модель подключена")}</div>
              </div>

              {/* Fake audio waves */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-end gap-1 h-8">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="w-1 bg-yellow-400/60 rounded-t-sm" style={{ 
                    height: `${Math.random() * 100}%`,
                    animation: `pulse-height ${0.5 + Math.random()}s infinite alternate`
                  }}></div>
                ))}
              </div>
            </div>

            {/* Chat interface */}
            <div className="p-4 bg-gray-50 flex flex-col gap-3 h-48">
              <div className="flex-1 bg-white rounded-xl p-3 border border-gray-100 shadow-sm overflow-y-auto text-sm text-gray-700">
                <p className="mb-2"><span className="font-bold text-blue-600">AI {object.name[lang]}:</span> {lang === 'kk' ? "Сәлеметсіз бе! Мен тарих парақтарынан сөйлеп тұрмын. Маған сұрақ қойыңыз." : "Здравствуйте! Я говорю со страниц истории. Задайте мне вопрос."}</p>
              </div>
              
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder={t("Сұрақ қою...", "Задать вопрос...")}
                  className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-400 text-sm"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white w-10 h-10 flex items-center justify-center rounded-xl transition-colors">
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <style jsx>{`
              @keyframes pulse-height {
                0% { height: 20%; }
                100% { height: 100%; }
              }
            `}</style>
          </div>
        </div>
      )}
    </div>
  );
}
