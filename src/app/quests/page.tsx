"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Trophy, Star, MapPin, Award, CheckCircle2, XCircle, ArrowRight, PlayCircle, ShieldAlert } from "lucide-react";
import Link from "next/link";

// --- Квест сұрақтарының базасы ---
const QUESTS_DATA = {
  1: {
    difficulty: { kk: "Жеңіл", ru: "Легкий" },
    color: "green",
    questions: [
      {
        question: { kk: "«Алтын адам» қай қорғаннан табылды?", ru: "В каком кургане был найден «Золотой человек»?" },
        options: { kk: ["Отырар", "Есік", "Берел", "Таңбалы"], ru: ["Отрар", "Иссык", "Берель", "Тамгалы"] },
        correctAnswerIndex: 1
      },
      {
        question: { kk: "Әлемде алғаш рет жылқыны қолға үйреткен мәдениет?", ru: "Какая культура первой в мире одомашнила лошадь?" },
        options: { kk: ["Андронов", "Отырар", "Ботай", "Сақ"], ru: ["Андроновская", "Отрарская", "Ботайская", "Сакская"] },
        correctAnswerIndex: 2
      },
      {
        question: { kk: "Сақтардың парсы патшасы Кирді жеңген қаһарман патшайымы?", ru: "Героическая царица саков, победившая персидского царя Кира?" },
        options: { kk: ["Бопай", "Томирис", "Зарина", "Айша бибі"], ru: ["Бопай", "Томирис", "Зарина", "Айша-биби"] },
        correctAnswerIndex: 1
      },
      {
        question: { kk: "Алматы облысындағы әйгілі жартас суреттері (петроглифтер) қалай аталады?", ru: "Как называются знаменитые наскальные рисунки (петроглифы) в Алматинской области?" },
        options: { kk: ["Таңбалы", "Бекет ата", "Отырар", "Сарайшық"], ru: ["Тамгалы", "Бекет-ата", "Отрар", "Сарайшык"] },
        correctAnswerIndex: 0
      },
      {
        question: { kk: "Ежелгі ғұн мемлекетінің негізін қалаушы кім?", ru: "Кто является основателем древнего государства гуннов?" },
        options: { kk: ["Аттила", "Шыңғыс хан", "Бумын", "Мөде шаньюй"], ru: ["Аттила", "Чингисхан", "Бумын", "Модэ шаньюй"] },
        correctAnswerIndex: 3
      }
    ]
  },
  2: {
    difficulty: { kk: "Орташа", ru: "Средний" },
    color: "blue",
    questions: [
      {
        question: { kk: "Қожа Ахмет Ясауи кесенесі қай қалада орналасқан?", ru: "В каком городе находится мавзолей Ходжи Ахмеда Ясави?" },
        options: { kk: ["Тараз", "Сайрам", "Түркістан", "Алматы"], ru: ["Тараз", "Сайрам", "Туркестан", "Алматы"] },
        correctAnswerIndex: 2
      },
      {
        question: { kk: "Әл-Фараби дүниеге келген әйгілі ортағасырлық қала?", ru: "Знаменитый средневековый город, где родился Аль-Фараби?" },
        options: { kk: ["Отырар", "Сығанақ", "Сауран", "Тараз"], ru: ["Отрар", "Сыганак", "Сауран", "Тараз"] },
        correctAnswerIndex: 0
      },
      {
        question: { kk: "960 жылы Ислам дінін мемлекеттік дін ретінде қабылдаған мемлекет?", ru: "Государство, принявшее ислам в качестве государственной религии в 960 году?" },
        options: { kk: ["Түркі қағанаты", "Қарахан мемлекеті", "Алтын Орда", "Қыпшақ хандығы"], ru: ["Тюркский каганат", "Государство Караханидов", "Золотая Орда", "Кипчакское ханство"] },
        correctAnswerIndex: 1
      },
      {
        question: { kk: "«Құтты білік» дастанының авторы кім?", ru: "Кто автор поэмы «Кутадгу Билиг» (Благодатное знание)?" },
        options: { kk: ["Махмұд Қашқари", "Әл-Фараби", "Жүсіп Баласағұн", "Ахмет Ясауи"], ru: ["Махмуд Кашгари", "Аль-Фараби", "Юсуф Баласагуни", "Ахмед Ясави"] },
        correctAnswerIndex: 2
      },
      {
        question: { kk: "Алтын Орда мемлекетінің негізін қалаған хан?", ru: "Хан, основавший государство Золотая Орда?" },
        options: { kk: ["Шыңғыс хан", "Жошы хан", "Бату (Батый) хан", "Тоқтамыс хан"], ru: ["Чингисхан", "Джучи хан", "Бату (Батый) хан", "Тохтамыш хан"] },
        correctAnswerIndex: 2
      }
    ]
  },
  3: {
    difficulty: { kk: "Қиын", ru: "Сложный" },
    color: "red",
    questions: [
      {
        question: { kk: "Қазақ хандығы қай жылы құрылды?", ru: "В каком году было образовано Казахское ханство?" },
        options: { kk: ["1220 ж.", "1465 ж.", "1511 ж.", "1731 ж."], ru: ["1220 г.", "1465 г.", "1511 г.", "1731 г."] },
        correctAnswerIndex: 1
      },
      {
        question: { kk: "«Жеті жарғы» заңдар жинағын қабылдаған қазақ ханы?", ru: "Казахский хан, принявший свод законов «Жеты Жаргы»?" },
        options: { kk: ["Қасым хан", "Есім хан", "Тәуке хан", "Абылай хан"], ru: ["Касым хан", "Есим хан", "Тауке хан", "Абылай хан"] },
        correctAnswerIndex: 2
      },
      {
        question: { kk: "1723-1727 жылдардағы жоңғар шапқыншылығы тарихта қалай аталды?", ru: "Как в истории названо джунгарское нашествие 1723-1727 годов?" },
        options: { kk: ["Ұлы көш", "Ақтабан шұбырынды", "Желтоқсан", "Зұлмат жылдар"], ru: ["Великая кочевка", "Актабан шубырынды (Годы великого бедствия)", "Желтоксан", "Темные годы"] },
        correctAnswerIndex: 1
      },
      {
        question: { kk: "1837-1847 жж. Ресейге қарсы ұлт-азаттық көтерілісті бастаған хан?", ru: "Хан, возглавивший национально-освободительное восстание против России в 1837-1847 гг.?" },
        options: { kk: ["Сырым Датұлы", "Махамбет", "Кенесары хан", "Исатай"], ru: ["Сырым Датов", "Махамбет", "Кенесары хан", "Исатай"] },
        correctAnswerIndex: 2
      },
      {
        question: { kk: "Абай Құнанбайұлының әйгілі философиялық шығармасы қалай аталады?", ru: "Как называется знаменитое философское произведение Абая Кунанбаева?" },
        options: { kk: ["Қара сөздер", "Құтты білік", "Диуани лұғат", "Жеті жарғы"], ru: ["Слова назидания", "Кутадгу Билиг", "Дивани лугат", "Жеты Жаргы"] },
        correctAnswerIndex: 0
      }
    ]
  }
};

export default function QuestsPage() {
  const { lang, t } = useLanguage();
  
  const [level, setLevel] = useState(5);
  const [xp, setXp] = useState(1250);
  
  const [activeQuest, setActiveQuest] = useState<1 | 2 | 3 | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleStartQuest = (id: 1 | 2 | 3) => {
    setActiveQuest(id);
    setCurrentQuestionIdx(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  const currentLang: 'kk' | 'ru' = lang === 'kk' ? 'kk' : 'ru';

  const currentQuestions = activeQuest ? QUESTS_DATA[activeQuest].questions : [];
  const currentQ = currentQuestions[currentQuestionIdx];

  const handleAnswer = (index: number) => {
    if (isAnswered || !currentQ) return;
    setSelectedAnswer(index);
    setIsAnswered(true);
    
    if (index === currentQ.correctAnswerIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIdx < currentQuestions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
      // Pass if they got at least 3 out of 5 correct
      const finalScore = score + (selectedAnswer === currentQ.correctAnswerIndex ? 1 : 0);
      if (finalScore >= 3) {
        const reward = activeQuest === 1 ? 300 : activeQuest === 2 ? 500 : 800; // Harder quests give more XP
        setXp(prev => prev + reward);
        if (xp + reward >= 2000) {
          setLevel(prev => prev + 1);
          setXp(prev => (prev + reward) - 2000);
        }
      }
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 custom-scrollbar" style={{ background: "#FAF7F2" }}>
      <div className="max-w-7xl mx-auto space-y-8 animate-fade-in-down">
        
        {/* Header Section */}
        <div className="text-center space-y-4 pt-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 mb-2 border-4 border-white shadow-lg">
            <Trophy className="w-8 h-8 text-[#C4714F]" />
          </div>
          <h1 className="text-3xl font-extrabold text-[#1e3a8a]">
            {t("Гео-Квесттер мен Ойындар", "Гео-Квесты и Игры")}
          </h1>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto">
            {t(
              "Қазақстанның тарихи орындарын зерттей отырып, сұрақтарға жауап беріңіз, ұпайлар жинаңыз және деңгейіңізді көтеріңіз.",
              "Отвечайте на вопросы, исследуя исторические места Казахстана, зарабатывайте очки и повышайте свой уровень."
            )}
          </p>
        </div>

        {/* User Progress Panel */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-orange-100 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full -z-0 opacity-50"></div>
          
          <div className="flex items-center gap-4 relative z-10">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden border-2 border-[#1A5F7A]">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Explorer${level}`} alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-1 rounded-full border-2 border-white transition-all transform hover:scale-110">
                {t("Ур.", "Ур.")} {level}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#2C1F14]">{t("Жас Зерттеуші", "Юный Исследователь")}</h3>
              <p className="text-xs text-orange-600 font-semibold">{xp} XP / 2000 XP</p>
            </div>
          </div>
          
          <div className="flex-1 w-full max-w-md relative z-10">
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
              <div className="h-full bg-gradient-to-r from-orange-400 to-[#1A5F7A] transition-all duration-1000 ease-out" style={{ width: `${Math.min((xp / 2000) * 100, 100)}%` }}></div>
            </div>
            <p className="text-[10px] text-gray-400 text-right mt-1">{t(`Келесі деңгейге ${Math.max(2000 - xp, 0)} XP қалды`, `До следующего уровня ${Math.max(2000 - xp, 0)} XP`)}</p>
          </div>
          
          <div className="flex gap-2 relative z-10">
            <div className="w-10 h-10 rounded-full bg-yellow-50 border border-yellow-200 flex items-center justify-center text-lg shadow-sm" title="Алғашқы қадам">🥇</div>
            <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-lg shadow-sm" title="Отырар қорғаушысы">🛡️</div>
            {level >= 6 ? (
              <div className="w-10 h-10 rounded-full bg-green-50 border border-green-200 flex items-center justify-center text-lg shadow-sm animate-bounce" title="Жаңа Жетістік">🏆</div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center opacity-50 text-lg">🔒</div>
            )}
          </div>
        </div>

        {/* Quest Game Interface */}
        {activeQuest !== null && currentQ ? (
          <div className="bg-white rounded-3xl p-6 md:p-10 shadow-lg border-2 border-blue-100 relative animate-fade-in-down">
            <button onClick={() => setActiveQuest(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-transform hover:scale-110">
              <XCircle className="w-8 h-8" />
            </button>
            
            {!showResult ? (
              <div className="max-w-3xl mx-auto mt-4">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm font-bold text-blue-600">{t("Сұрақ", "Вопрос")} {currentQuestionIdx + 1} / {currentQuestions.length}</span>
                  <div className="flex gap-2">
                    {currentQuestions.map((_, idx) => (
                      <div key={idx} className={`w-8 h-2 rounded-full transition-all ${idx === currentQuestionIdx ? 'bg-blue-600 scale-110' : idx < currentQuestionIdx ? 'bg-blue-300' : 'bg-gray-200'}`} />
                    ))}
                  </div>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a8a] mb-8 text-center leading-tight">
                  {currentQ.question[currentLang]}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {currentQ.options[currentLang].map((opt, idx) => {
                    let btnClass = "bg-gray-50 border-gray-200 text-gray-700 hover:bg-blue-50 hover:border-blue-300";
                    if (isAnswered) {
                      if (idx === currentQ.correctAnswerIndex) btnClass = "bg-green-100 border-green-500 text-green-800 shadow-[0_0_15px_rgba(34,197,94,0.3)]";
                      else if (idx === selectedAnswer) btnClass = "bg-red-100 border-red-500 text-red-800";
                      else btnClass = "bg-gray-50 border-gray-200 text-gray-400 opacity-50";
                    } else if (idx === selectedAnswer) {
                      btnClass = "bg-blue-100 border-blue-500 text-blue-800";
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        disabled={isAnswered}
                        className={`p-5 rounded-xl border-2 font-bold text-lg transition-all text-left flex items-center justify-between ${btnClass}`}
                      >
                        {opt}
                        {isAnswered && idx === currentQ.correctAnswerIndex && <CheckCircle2 className="w-6 h-6 text-green-600" />}
                        {isAnswered && idx === selectedAnswer && idx !== currentQ.correctAnswerIndex && <XCircle className="w-6 h-6 text-red-600" />}
                      </button>
                    );
                  })}
                </div>
                
                {isAnswered && (
                  <div className="flex justify-end animate-fade-in-down">
                    <button onClick={handleNext} className="px-8 py-4 bg-[#1A5F7A] text-white rounded-xl font-bold text-lg hover:bg-[#124255] transition-colors flex items-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1">
                      {currentQuestionIdx === currentQuestions.length - 1 ? t("Нәтижені көру", "Посмотреть результат") : t("Келесі сұрақ", "Следующий вопрос")} <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-10 animate-fade-in-down">
                {score >= 3 ? (
                  <div className="w-28 h-28 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6 border-4 border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.4)]">
                    <Trophy className="w-14 h-14 text-green-600" />
                  </div>
                ) : (
                  <div className="w-28 h-28 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6 border-4 border-gray-300">
                    <XCircle className="w-14 h-14 text-gray-400" />
                  </div>
                )}
                
                <h2 className="text-4xl font-extrabold text-[#1e3a8a] mb-3">{t("Квест Аяқталды!", "Квест Завершен!")}</h2>
                <p className="text-xl text-gray-600 mb-8">
                  {t("Сіздің нәтижеңіз:", "Ваш результат:")} <span className="font-black text-[#C4714F] text-2xl">{score} / {currentQuestions.length}</span>
                </p>
                
                {score >= 3 ? (
                  <div className="inline-block bg-gradient-to-r from-yellow-100 to-orange-100 border border-yellow-300 text-yellow-900 px-6 py-3 rounded-xl font-black text-lg mb-8 animate-bounce shadow-md">
                    +{activeQuest === 1 ? 300 : activeQuest === 2 ? 500 : 800} XP {t("Сыйақы берілді!", "Награда получена!")}
                  </div>
                ) : (
                  <div className="inline-block bg-gray-100 text-gray-600 px-6 py-3 rounded-xl font-bold mb-8">
                    {t("Жеңіске жету үшін кемінде 3 сұраққа дұрыс жауап беру қажет. Қайта бақ сынап көріңіз!", "Для победы нужно ответить минимум на 3 вопроса. Попробуйте еще раз!")}
                  </div>
                )}
                
                <div className="mt-4">
                  <button onClick={() => setActiveQuest(null)} className="px-10 py-4 bg-[#1e3a8a] text-white rounded-xl font-bold text-lg hover:bg-blue-900 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1">
                    {t("Квесттер тізіміне оралу", "Вернуться к списку")}
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="relative z-10">
            <h2 className="text-xl font-bold text-[#1e3a8a] mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-[#C4714F]" />
              {t("Қолжетімді Квесттер", "Доступные Квесты")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Quest 1 - Easy */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border-2 border-green-100 group hover:shadow-lg hover:border-green-300 transition-all transform hover:-translate-y-1 relative">
                <div className="h-36 bg-[url('https://images.unsplash.com/photo-1682687982501-1e5898cb8f4b?q=80&w=600')] bg-cover bg-center relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                  <div className="absolute top-3 right-3">
                    <span className="text-[10px] font-black px-3 py-1.5 rounded-full bg-green-500 text-white uppercase tracking-wider shadow-md">
                      {QUESTS_DATA[1].difficulty[currentLang]}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-4">
                    <span className="text-[10px] font-bold px-2 py-1 rounded bg-black/50 backdrop-blur-md text-white border border-white/20">5 {t("сұрақ", "вопросов")}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#2C1F14] mb-2">{t("Ежелгі Қазақстан", "Древний Казахстан")}</h3>
                  <p className="text-xs text-gray-500 mb-6 line-clamp-2 min-h-[32px]">
                    {t("Сақтар, ғұндар және ежелгі петроглифтер туралы базалық біліміңізді тексеріңіз.", "Проверьте свои базовые знания о саках, гуннах и древних петроглифах.")}
                  </p>
                  <button onClick={() => handleStartQuest(1)} className="w-full flex items-center justify-center gap-2 py-3 bg-green-50 hover:bg-green-100 text-green-700 text-sm font-bold rounded-xl transition-colors border-2 border-green-200">
                    <PlayCircle className="w-5 h-5" /> {t("Ойнау (300 XP)", "Играть (300 XP)")}
                  </button>
                </div>
              </div>

              {/* Quest 2 - Medium */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border-2 border-blue-100 group hover:shadow-lg hover:border-blue-300 transition-all transform hover:-translate-y-1 relative">
                <div className="h-36 bg-[url('https://images.unsplash.com/photo-1542401886-65d6c61db217?q=80&w=600')] bg-cover bg-center relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                  <div className="absolute top-3 right-3">
                    <span className="text-[10px] font-black px-3 py-1.5 rounded-full bg-blue-500 text-white uppercase tracking-wider shadow-md">
                      {QUESTS_DATA[2].difficulty[currentLang]}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-4">
                    <span className="text-[10px] font-bold px-2 py-1 rounded bg-black/50 backdrop-blur-md text-white border border-white/20">5 {t("сұрақ", "вопросов")}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#2C1F14] mb-2">{t("Орта ғасырлар", "Средневековье")}</h3>
                  <p className="text-xs text-gray-500 mb-6 line-clamp-2 min-h-[32px]">
                    {t("Ұлы Жібек жолындағы қалалар мен ортағасырлық хандықтар туралы сұрақтар.", "Вопросы о городах Великого Шелкового пути и средневековых ханствах.")}
                  </p>
                  <button onClick={() => handleStartQuest(2)} className="w-full flex items-center justify-center gap-2 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-bold rounded-xl transition-colors border-2 border-blue-200">
                    <PlayCircle className="w-5 h-5" /> {t("Ойнау (500 XP)", "Играть (500 XP)")}
                  </button>
                </div>
              </div>

              {/* Quest 3 - Hard */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border-2 border-red-100 group hover:shadow-lg hover:border-red-300 transition-all transform hover:-translate-y-1 relative">
                <div className="h-36 bg-[url('https://images.unsplash.com/photo-1582216664988-cb940e53a948?q=80&w=600')] bg-cover bg-center relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                  <div className="absolute top-3 right-3">
                    <span className="text-[10px] font-black px-3 py-1.5 rounded-full bg-red-600 text-white uppercase tracking-wider shadow-md flex items-center gap-1">
                      <ShieldAlert className="w-3 h-3" /> {QUESTS_DATA[3].difficulty[currentLang]}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-4">
                    <span className="text-[10px] font-bold px-2 py-1 rounded bg-black/50 backdrop-blur-md text-white border border-white/20">5 {t("сұрақ", "вопросов")}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#2C1F14] mb-2">{t("Қазақ Хандығы", "Казахское Ханство")}</h3>
                  <p className="text-xs text-gray-500 mb-6 line-clamp-2 min-h-[32px]">
                    {t("Қазақ хандығының құрылуы, заңдары мен ұлт-азаттық күрестер туралы күрделі тест.", "Сложный тест об образовании Казахского ханства, законах и восстаниях.")}
                  </p>
                  <button onClick={() => handleStartQuest(3)} className="w-full flex items-center justify-center gap-2 py-3 bg-red-50 hover:bg-red-100 text-red-700 text-sm font-bold rounded-xl transition-colors border-2 border-red-200">
                    <PlayCircle className="w-5 h-5" /> {t("Ойнау (800 XP)", "Играть (800 XP)")}
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
