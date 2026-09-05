"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Map, AudioLines, Route, BookOpen, FlaskConical, BarChart3, Home } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const navItems = [
  { name: { kk: 'Карта', ru: 'Карта' }, href: '/app/map', icon: Map },
  { name: { kk: 'GeoCulture AI (ChatGPT)', ru: 'GeoCulture AI (ChatGPT)' }, href: '/app/guide', icon: AudioLines },
  { name: { kk: 'Маршруттар', ru: 'Маршруты' }, href: '/app/routes', icon: Route },
  { name: { kk: 'Зерттеу', ru: 'Исследование' }, href: '/app/research', icon: BookOpen },
  { name: { kk: 'AI-зертхана', ru: 'AI-лаборатория' }, href: '/app/laboratory', icon: FlaskConical },
  { name: { kk: 'Статистика', ru: 'Статистика' }, href: '/app/statistics', icon: BarChart3 },
];

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { lang, setLang, t } = useLanguage();

  return (
    <div className="flex h-screen bg-deep-blue text-white overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 flex flex-col z-20 shadow-2xl">
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-kaz-blue to-blue-600 flex items-center justify-center shadow-lg group-hover:shadow-kaz-blue/50 transition-all">
              <span className="font-bold text-xl">G</span>
            </div>
            <div className="flex-1">
              <h1 className="font-bold text-lg leading-tight">GeoCulture <span className="text-transparent bg-clip-text bg-gradient-to-r from-kaz-blue to-kaz-gold">AI</span></h1>
              <div className="flex justify-between items-center mt-1">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Меню</p>
                <div className="flex gap-1">
                  <button 
                    onClick={() => setLang('kk')}
                    className={`text-[9px] px-1.5 py-0.5 rounded transition-all ${lang === 'kk' ? 'bg-kaz-gold text-deep-blue font-bold' : 'text-gray-500 hover:text-white'}`}
                  >
                    ҚАЗ
                  </button>
                  <button 
                    onClick={() => setLang('ru')}
                    className={`text-[9px] px-1.5 py-0.5 rounded transition-all ${lang === 'ru' ? 'bg-kaz-gold text-deep-blue font-bold' : 'text-gray-500 hover:text-white'}`}
                  >
                    РУС
                  </button>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative ${
                  isActive 
                    ? 'bg-gradient-to-r from-kaz-blue/20 to-transparent text-white font-medium border-l-2 border-kaz-blue' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-kaz-blue' : ''}`} />
                <span className="text-sm">{lang === 'kk' ? item.name.kk : item.name.ru}</span>
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-white/10">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all">
            <Home className="w-5 h-5" />
            <span className="font-medium text-sm">{t('Басты бетке', 'На главную')}</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 relative flex flex-col h-screen overflow-hidden">
        {children}
      </main>
    </div>
  );
}
