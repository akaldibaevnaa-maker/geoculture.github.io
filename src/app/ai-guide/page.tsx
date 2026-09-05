"use client";

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Bot, Send, User, Sparkles } from 'lucide-react';

export default function AIGuidePage() {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: t('Сәлем! Мен GeoCulture AI көмекшісімін. Қазақстанның тарихы мен мәдениеті туралы кез келген сұрақ қоя аласыз.', 'Привет! Я ассистент GeoCulture AI. Вы можете задать мне любой вопрос об истории и культуре Казахстана.') }
  ]);
  const [input, setInput] = useState('');

  const quickCommands = [
    t('Қожа Ахмет Ясауи тарихын айт', 'Расскажи историю Ходжи Ахмеда Ясави'),
    t('Қызықты деректер', 'Интересные факты'),
    t('Оқушыға түсіндір', 'Объясни школьнику'),
    t('Тарихи маңызын талда', 'Проанализируй историческое значение')
  ];

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', text }]);
    setInput('');
    
    // Mock AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: t('Бұл жасанды интеллекттің демо-жауабы. Болашақта бұл жерде нақты AI (мысалы, OpenAI немесе басқа LLM) интеграцияланады. Мен сіздің "' + text + '" деген сұрағыңызға тарихи деректер негізінде жауап беремін.', 
                 'Это демо-ответ искусственного интеллекта. В будущем здесь будет интегрирован реальный AI (например, OpenAI или другая LLM). Я отвечу на ваш запрос "' + text + '" на основе исторических данных.')
      }]);
    }, 1000);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] pt-20 pb-6 px-4 max-w-4xl mx-auto flex flex-col">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center p-3 bg-kaz-blue/20 text-kaz-blue rounded-full mb-4">
          <Bot className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">GeoCulture AI Assistant</h1>
        <p className="text-gray-400">{t('Тарихты жасанды интеллект арқылы зертте', 'Исследуй историю с помощью искусственного интеллекта')}</p>
      </div>

      <div className="flex-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl flex flex-col overflow-hidden shadow-2xl">
        {/* Chat window */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-kaz-gold' : 'bg-kaz-blue'}`}>
                {msg.role === 'user' ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
              </div>
              <div className={`max-w-[80%] rounded-2xl p-4 ${
                msg.role === 'user' 
                  ? 'bg-kaz-gold/20 border border-kaz-gold/30 text-white rounded-tr-none' 
                  : 'bg-white/10 border border-white/10 text-gray-200 rounded-tl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Commands */}
        <div className="px-6 py-3 border-t border-white/10 bg-white/5 overflow-x-auto flex gap-2 whitespace-nowrap custom-scrollbar">
          {quickCommands.map((cmd, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(cmd)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-gray-300 hover:text-white transition-colors"
            >
              <Sparkles className="w-3 h-3 text-kaz-gold" />
              {cmd}
            </button>
          ))}
        </div>

        {/* Input area */}
        <div className="p-4 border-t border-white/10 bg-[#0a1628]">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('Сұрағыңызды жазыңыз...', 'Напишите ваш вопрос...')}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-kaz-blue transition-colors"
            />
            <button 
              type="submit"
              disabled={!input.trim()}
              className="bg-kaz-blue hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-5 py-3 rounded-xl transition-colors flex items-center justify-center"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
