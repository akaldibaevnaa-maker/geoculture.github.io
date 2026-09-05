"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { Send, Bot, User, Sparkles, Volume2, Square, RefreshCw, AlertCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAppContext } from "@/context/AppContext";
import { culturalObjects } from "@/data/objects";
import { useSearchParams } from "next/navigation";
import { ChatMessage, AiMode } from "@/types";

const MODES: Record<AiMode, { kk: string; ru: string }> = {
  student:    { kk: "Оқушы",      ru: "Школьник" },
  tourist:    { kk: "Турист",     ru: "Турист" },
  researcher: { kk: "Зерттеуші", ru: "Исследователь" },
};

// Local fallback (when no API key)
function generateLocalResponse(userText: string, lang: "kk" | "ru"): string {
  const text = userText.toLowerCase();
  const obj = culturalObjects.find(o =>
    o.name.kk.toLowerCase().split(" ").some(w => w.length > 3 && text.includes(w)) ||
    o.name.ru.toLowerCase().split(" ").some(w => w.length > 3 && text.includes(w)) ||
    o.relatedPersons.some(p => text.includes(p.toLowerCase().split(" ")[0]))
  );
  if (obj) {
    return lang === "kk"
      ? `📍 **${obj.name.kk}**\n\n${obj.description.kk}\n\n⭐ ${obj.historicalSignificance.kk}${obj.legends ? `\n\n✨ ${obj.legends.kk}` : ""}`
      : `📍 **${obj.name.ru}**\n\n${obj.description.ru}\n\n⭐ ${obj.historicalSignificance.ru}${obj.legends ? `\n\n✨ ${obj.legends.ru}` : ""}`;
  }
  if (text.includes("юнеско") || text.includes("unesco")) {
    const unescoObjs = culturalObjects.filter(o => o.unesco);
    const names = unescoObjs.map(o => o.name[lang]).join(", ");
    return lang === "kk"
      ? `🏆 Қазақстанда ${unescoObjs.length} ЮНЕСКО объектісі бар: **${names}**.`
      : `🏆 В Казахстане ${unescoObjs.length} объекта ЮНЕСКО: **${names}**.`;
  }
  return lang === "kk"
    ? "Сұрағыңыз қабылданды. Толық жауап алу үшін OPENAI_API_KEY конфигурациясын орнатыңыз. Нақтырақ сұрақ қойсаңыз, базадан ақпарат тауып беремін!"
    : "Запрос принят. Для полных ответов настройте OPENAI_API_KEY. Задайте более конкретный вопрос — я найду информацию из базы данных!";
}

function GuideContent() {
  const { lang, t } = useLanguage();
  const { selectedObject } = useAppContext();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<AiMode>("tourist");
  const [isTyping, setIsTyping] = useState(false);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [errorId, setErrorId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const getWelcomeText = (language: "kk" | "ru") => language === "kk"
    ? `Сәлеметсіз бе! 👋 Мен — GeoCulture AI Guide.\n\nҚазақстанның тарихи нысандары, мәдениеті, тарихы туралы сұраңыз.\n\n• 📚 Оқушы режимі — қарапайым тілмен\n• 🗺️ Турист режимі — практикалық ұсыныстармен\n• 🔬 Зерттеуші — ғылыми деректермен${selectedObject ? `\n\n📍 Ағымдағы нысан: **${selectedObject.name.kk}**` : ""}`
    : `Здравствуйте! 👋 Я — GeoCulture AI Guide.\n\nСпрашивайте об исторических объектах, культуре и истории Казахстана.\n\n• 📚 Режим Школьник — простым языком\n• 🗺️ Турист — с практическими советами\n• 🔬 Исследователь — с научными данными${selectedObject ? `\n\n📍 Текущий объект: **${selectedObject.name.ru}**` : ""}`;

  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "1", sender: "ai", text: getWelcomeText("kk"), timestamp: Date.now() }
  ]);
  const [input, setInput] = useState("");

  useEffect(() => {
    setMessages(prev => [
      { id: "1", sender: "ai", text: getWelcomeText(lang), timestamp: Date.now() },
      ...prev.slice(1)
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  // Handle URL ?q= param
  useEffect(() => {
    const q = searchParams.get("q");
    if (q) {
      const decoded = decodeURIComponent(q);
      setTimeout(() => sendMessage(decoded), 400);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = { id: Date.now().toString(), sender: "user", text, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    setErrorId(null);

    try {
      const res = await fetch("/api/ai-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: messages.slice(-10),
          lang,
          objectContext: selectedObject ? selectedObject.name[lang] : undefined,
        }),
      });

      const data = await res.json();
      const aiText = data.reply || generateLocalResponse(text, lang);
      const aiMsg: ChatMessage = { id: (Date.now() + 1).toString(), sender: "ai", text: aiText, timestamp: Date.now() };
      setMessages(prev => [...prev, aiMsg]);
    } catch {
      // Fallback
      const fallback = generateLocalResponse(text, lang);
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), sender: "ai", text: fallback, timestamp: Date.now() }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSpeak = (text: string, msgId: string) => {
    if (!("speechSynthesis" in window)) return;
    if (playingId === msgId) {
      window.speechSynthesis.cancel();
      setPlayingId(null);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(
      text.replace(/\*\*/g, "").replace(/[📚🗺️🔬🎧🏆👤✨⭐📍]/g, "")
    );
    utterance.lang = "ru-RU";
    utterance.rate = 0.9;
    utterance.onend = () => setPlayingId(null);
    utterance.onerror = () => setPlayingId(null);
    window.speechSynthesis.speak(utterance);
    setPlayingId(msgId);
  };

  const quickPrompts = lang === "kk"
    ? ["Ясауи кесенесі туралы айт", "ЮНЕСКО объектілері қайсылар?", "Алтын адам кім?", "Абай туралы айт", "Таңбалы петроглифтері", "Қорқыт ата кім?", "Сығанақ қалашығы"]
    : ["Расскажи про мавзолей Ясави", "Объекты ЮНЕСКО в Казахстане", "Кто такой Золотой человек?", "Расскажи про Абая", "Петроглифы Тамгалы", "Кто такой Коркыт Ата?", "Город Сыгнак"];

  return (
    <div className="flex-1 flex flex-col h-full" style={{ background: "#FAF7F2" }}>
      {/* Header */}
      <div className="px-5 py-4 border-b flex justify-between items-center" style={{ borderColor: "rgba(196,113,79,0.15)", background: "rgba(255,248,240,0.9)" }}>
        <div>
          <h1 className="text-lg font-bold flex items-center gap-2" style={{ color: "#2C1F14" }}>
            <Bot className="w-5 h-5" style={{ color: "#1A5F7A" }} />
            GeoCulture AI Guide
          </h1>
          <p className="text-xs mt-0.5" style={{ color: "#8B6914" }}>
            {t("Тарихи нысандар бойынша жеке гидіңіз", "Ваш персональный гид по историческим объектам")}
            {selectedObject && <span className="ml-2 px-1.5 py-0.5 rounded text-[10px]" style={{ background: "rgba(196,113,79,0.1)", color: "#C4714F" }}>
              📍 {selectedObject.name[lang]}
            </span>}
          </p>
        </div>
        <div className="flex gap-1 p-1 rounded-xl" style={{ background: "rgba(196,113,79,0.08)", border: "1px solid rgba(196,113,79,0.15)" }}>
          {(Object.entries(MODES) as [AiMode, { kk: string; ru: string }][]).map(([key, label]) => (
            <button key={key} onClick={() => setMode(key)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={{ background: mode === key ? "#1A5F7A" : "transparent", color: mode === key ? "#fff" : "#8B6914" }}>
              {label[lang]}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Prompts */}
      <div className="px-4 py-2 flex gap-2 overflow-x-auto custom-scrollbar border-b" style={{ borderColor: "rgba(196,113,79,0.08)" }}>
        {quickPrompts.map((prompt, i) => (
          <button key={i} onClick={() => sendMessage(prompt)}
            className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full transition-all whitespace-nowrap"
            style={{ background: "rgba(201,162,39,0.1)", border: "1px solid rgba(201,162,39,0.25)", color: "#8B6914" }}>
            {prompt}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 max-w-3xl ${msg.sender === "user" ? "ml-auto flex-row-reverse" : ""}`}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{
              background: msg.sender === "user" ? "#C9A227" : "#1A5F7A",
            }}>
              {msg.sender === "user" ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
            </div>
            <div className={`p-3.5 rounded-2xl relative group max-w-[85%]`} style={{
              background: msg.sender === "user" ? "rgba(201,162,39,0.12)" : "#FFF8F0",
              border: msg.sender === "user" ? "1px solid rgba(201,162,39,0.25)" : "1px solid rgba(196,113,79,0.15)",
            }}>
              {msg.sender === "ai" && (
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider" style={{ color: "#1A5F7A" }}>
                    <Sparkles className="w-3 h-3" />
                    AI · {MODES[mode][lang]}
                  </div>
                  <button onClick={() => handleSpeak(msg.text, msg.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity ml-3"
                    style={{ color: "#8B6914" }}>
                    {playingId === msg.id ? <Square className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                  </button>
                </div>
              )}
              <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: "#2C1F14" }}>{msg.text}</p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3 max-w-3xl">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#1A5F7A" }}>
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="px-4 py-3 rounded-2xl flex items-center gap-2" style={{ background: "#FFF8F0", border: "1px solid rgba(196,113,79,0.15)" }}>
              <span className="text-xs" style={{ color: "#8B6914" }}>{t("AI жауап дайындауда", "AI готовит ответ")}</span>
              {[0, 0.2, 0.4].map((d, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: "#C4714F", animationDelay: `${d}s` }} />
              ))}
            </div>
          </div>
        )}

        {errorId && (
          <div className="flex items-center gap-2 p-3 rounded-xl" style={{ background: "rgba(196,113,79,0.08)", border: "1px solid rgba(196,113,79,0.2)" }}>
            <AlertCircle className="w-4 h-4" style={{ color: "#C4714F" }} />
            <span className="text-xs" style={{ color: "#C4714F" }}>{t("Қате орын алды", "Произошла ошибка")}</span>
            <button onClick={() => { if (input) sendMessage(input); }} className="ml-auto flex items-center gap-1 text-xs" style={{ color: "#1A5F7A" }}>
              <RefreshCw className="w-3 h-3" />{t("Қайта", "Повтор")}
            </button>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t" style={{ borderColor: "rgba(196,113,79,0.12)", background: "rgba(255,248,240,0.95)" }}>
        <div className="max-w-4xl mx-auto relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage(input)}
            placeholder={t("Ясауи, Алтын адам, Абай туралы сұраңыз...", "Спросите про Ясави, Золотого человека, Абая...")}
            className="w-full py-3.5 pl-4 pr-14 rounded-xl text-sm focus:outline-none transition-colors"
            style={{ background: "#FFF8F0", border: "1px solid rgba(196,113,79,0.25)", color: "#2C1F14" }}
          />
          <button onClick={() => sendMessage(input)} disabled={!input.trim() || isTyping}
            className="absolute right-2 top-2 p-2 rounded-lg transition-all"
            style={{ background: input.trim() ? "#1A5F7A" : "rgba(26,95,122,0.2)", color: "#fff" }}>
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function GuidePage() {
  return (
    <Suspense fallback={<div className="flex-1 flex items-center justify-center" style={{ color: "#8B6914" }}>Жүктелуде...</div>}>
      <GuideContent />
    </Suspense>
  );
}
