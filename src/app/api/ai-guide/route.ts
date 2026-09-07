import { NextRequest, NextResponse } from "next/server";
import { culturalObjects } from "@/data/objects";
import { CulturalObject } from "@/types";

function extractKeywords(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[.,!?\"'()[\]{}]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 3);
}

function findRelevantObjects(message: string): CulturalObject[] {
  const keywords = extractKeywords(message);
  
  if (keywords.length === 0) return [];

  const scoredObjects = culturalObjects.map((obj) => {
    let score = 0;
    const searchableText = [
      obj.name.kk, obj.name.ru,
      obj.description.kk, obj.description.ru,
      obj.region.kk, obj.region.ru,
      obj.category.kk, obj.category.ru,
      ...(obj.relatedPersons || [])
    ].join(" ").toLowerCase();

    keywords.forEach((kw) => {
      if (searchableText.includes(kw)) score += 10;
      // Exact match boosts score
      if (obj.name.kk.toLowerCase().includes(kw) || obj.name.ru.toLowerCase().includes(kw)) score += 20;
    });

    return { obj, score };
  });

  return scoredObjects
    .filter((so) => so.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((so) => so.obj)
    .slice(0, 3); // top 3 max
}

const ENCYCLOPEDIA: Record<string, { kk: string, ru: string }> = {
  "абай": {
    kk: "### Абай Құнанбайұлы (1845-1904)\n\nҰлы ақын, ағартушы, қазақ жазба әдебиетінің негізін қалаушы, философ, композитор. Оның шығармаларында қазақ халқының әлеуметтік, қоғамдық, моральдық мәселелері көтерілген. Ең басты шығармасы — «Қара сөздер» (45 қара сөзден тұратын философиялық трактат).",
    ru: "### Абай Кунанбаев (1845-1904)\n\nВеликий поэт, просветитель, основоположник казахской письменной литературы, философ, композитор. В его произведениях поднимаются социальные, общественные и моральные проблемы казахского народа. Главное произведение — «Слова назидания»."
  },
  "алтын адам": {
    kk: "### Алтын адам (Иссык обасы)\n\n1969 жылы Есік қорғанынан табылған сақ жауынгерінің мүрдесі. Ол б.з.д. V—IV ғасырларға жатады. Киімі 4 мыңнан астам алтын әшекейлерден тұрады. Бұл жаңалық Қазақстанның ежелгі тарихы мен сақ дәуіріндегі мәдениеттің жоғары деңгейін көрсетеді.",
    ru: "### Золотой человек (Иссыкский курган)\n\nОстанки сакского воина, найденные в 1969 году в Иссыкском кургане (V-IV вв. до н.э.). Его одежда состоит из более чем 4 тысяч золотых украшений. Эта находка демонстрирует высокий уровень культуры сакской эпохи."
  },
  "юнеско": {
    kk: "### ЮНЕСКО нысандары\n\nҚазақстанда ЮНЕСКО-ның Дүниежүзілік мұра тізіміне енген бірнеше нысан бар:\n1. Қожа Ахмет Ясауи кесенесі (2003)\n2. Таңбалы археологиялық ландшафтының петроглифтері (2004)\n3. Сарыарқа — Солтүстік Қазақстан даласы мен көлдері (2008)\n4. Жібек жолы: Тянь-Шань дәлізі (2014)\n5. Батыс Тянь-Шань (2016).",
    ru: "### Объекты ЮНЕСКО\n\nВ Казахстане несколько объектов включены в список Всемирного наследия ЮНЕСКО:\n1. Мавзолей Ходжи Ахмеда Ясави (2003)\n2. Петроглифы археологического ландшафта Тамгалы (2004)\n3. Сарыарка — Степи и озера Северного Казахстана (2008)\n4. Шелковый путь: сеть маршрутов Тянь-Шанского коридора (2014)\n5. Западный Тянь-Шань (2016)."
  },
  "сақтар": {
    kk: "### Сақтар\n\nБ.з.д. 1 мыңжылдықта Қазақстан мен Орта Азия аумағын мекендеген ежелгі көшпелі тайпалар. Олар скифтерге туыстас болған. Сақтар туралы мәліметтер парсы патшаларының жазбаларында (мысалы, Бехистун жазуы) және грек тарихшысы Геродоттың еңбектерінде кездеседі.",
    ru: "### Саки\n\nДревние кочевые племена, населявшие территорию Казахстана и Средней Азии в 1 тысячелетии до н.э. Были родственны скифам. Сведения о саках встречаются в надписях персидских царей (например, Бехистунская надпись) и трудах греческого историка Геродота."
  },
  "қазақ хандығы": {
    kk: "### Қазақ хандығы (1465 ж.)\n\n1465 жылы Керей мен Жәнібек хандардың бастауымен Шу және Талас өзендерінің бойында құрылған. Қазақ хандығының құрылуы қазақ халқының ұлт ретінде қалыптасуының негізгі кезеңі болды. Ол Қасым, Хақназар, Тәуекел, Есім, Тәуке хандардың тұсында гүлденді.",
    ru: "### Казахское ханство (1465 г.)\n\nОсновано в 1465 году ханами Кереем и Жанибеком в долинах рек Чу и Талас. Образование Казахского ханства стало ключевым этапом в формировании казахской нации. Расцвет пришелся на правление ханов Касыма, Хакназара, Тауекеля, Есима, Тауке."
  },
  "отырар": {
    kk: "### Отырар (Фараб)\n\nҰлы Жібек жолындағы ең ірі ортағасырлық қалалардың бірі. Ол Әбу Насыр әл-Фарабидің туған жері ретінде белгілі. 1219 жылы Шыңғыс хан әскерінің шабуылына ұшырап, 6 ай бойы қаһармандықпен қорғанған.",
    ru: "### Отрар (Фараб)\n\nОдин из крупнейших средневековых городов на Великом Шелковом пути. Известен как родина выдающегося мыслителя Абу Насра аль-Фараби. В 1219 году подвергся осаде войсками Чингисхана и героически оборонялся 6 месяцев."
  },
  "таңбалы": {
    kk: "### Таңбалы петроглифтері\n\nАлматы облысында орналасқан археологиялық ландшафт. Мұнда қола дәуірінен бастап түрік қағанатына дейінгі кезеңді қамтитын 5000-нан астам жартастағы суреттер (петроглифтер) бар. 2004 жылы ЮНЕСКО тізіміне енген.",
    ru: "### Петроглифы Тамгалы\n\nАрхеологический ландшафт в Алматинской области. Здесь находится более 5000 наскальных рисунков (петроглифов), охватывающих период от бронзового века до тюркского каганата. В 2004 году включен в список ЮНЕСКО."
  }
};

function generateLocalSmartResponse(message: string, lang: string, objectContext?: string): string {
  const isKk = lang === "kk";
  
  // 1. Check Encyclopedia Dictionary first for general knowledge
  const lowerMsg = message.toLowerCase();
  for (const [key, content] of Object.entries(ENCYCLOPEDIA)) {
    if (lowerMsg.includes(key)) {
      return content[isKk ? 'kk' : 'ru'];
    }
  }

  // 2. Check Database Objects
  const relevantObjects = findRelevantObjects(message + (objectContext ? ` ${objectContext}` : ""));

  if (relevantObjects.length === 0) {
    return isKk
      ? "Кешіріңіз, менде бұл сұраққа қатысты нақты ақпарат жоқ. Басқа тарихи нысан, тұлға немесе орын туралы сұрап көріңіз (мысалы, Ясауи, Отырар, Алтын адам, Абай, Таңбалы)."
      : "Извините, у меня нет точной информации по этому запросу. Попробуйте спросить о другом историческом объекте, личности или месте (например, Ясави, Отрар, Золотой человек, Абай, Тамгалы).";
  }

  const obj = relevantObjects[0];
  
  let response = `### ${obj.name[lang as keyof typeof obj.name]}\n\n`;
  
  response += `**📍 ${isKk ? 'Өңір' : 'Регион'}:** ${obj.region[lang as keyof typeof obj.region]}\n`;
  response += `**🕰 ${isKk ? 'Кезең' : 'Период'}:** ${obj.period}\n`;
  response += `**🏛 ${isKk ? 'Санат' : 'Категория'}:** ${obj.category[lang as keyof typeof obj.category]}\n\n`;
  
  response += `#### 📖 ${isKk ? 'Сипаттама' : 'Описание'}\n${obj.description[lang as keyof typeof obj.description]}\n\n`;
  
  if (obj.historicalSignificance) {
    response += `#### 🏛 ${isKk ? 'Тарихи маңызы' : 'Историческое значение'}\n${obj.historicalSignificance[lang as keyof typeof obj.historicalSignificance]}\n\n`;
  }
  
  if (obj.relatedPersons && obj.relatedPersons.length > 0) {
    response += `#### 👤 ${isKk ? 'Байланысты тұлғалар' : 'Связанные личности'}\n${obj.relatedPersons.join(', ')}\n\n`;
  }
  
  if (obj.legends) {
    response += `#### ✨ ${isKk ? 'Аңыздар мен мифтер' : 'Легенды и мифы'}\n${obj.legends[lang as keyof typeof obj.legends]}\n\n`;
  }
  
  if (obj.unesco) {
    response += `*🏆 ${isKk ? 'Бұл нысан ЮНЕСКО Дүниежүзілік мұра тізіміне енген!' : 'Этот объект включен в список Всемирного наследия ЮНЕСКО!'}*\n\n`;
  }

  if (relevantObjects.length > 1) {
    response += `---\n*${isKk ? 'Сондай-ақ сізге мыналар қызық болуы мүмкін:' : 'Также вам может быть интересно:'}* ${relevantObjects.slice(1).map(o => o.name[lang as keyof typeof o.name]).join(', ')}.`;
  }

  return response;
}

export async function POST(req: NextRequest) {
  let requestMessage = "";
  let requestLang = "kk";
  let requestContext = "";

  try {
    const { message, history = [], lang = "kk", objectContext, clientApiKey } = await req.json();
    requestMessage = message;
    requestLang = lang;
    requestContext = objectContext;

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "No message provided" }, { status: 400 });
    }

    const apiKey = clientApiKey || process.env.OPENAI_API_KEY;

    if (!apiKey || apiKey === "your-key-here") {
      const reply = generateLocalSmartResponse(message, lang, objectContext);
      await new Promise(resolve => setTimeout(resolve, 800));
      return NextResponse.json({ reply, source: "local_smart" });
    }

    const contextNote = objectContext
      ? `\n\nТекущий контекст: пользователь выбрал объект "${objectContext}" на карте.`
      : "";
      
    const SYSTEM_PROMPT = `Ты — GeoCulture AI Guide, научно-образовательный AI-помощник для изучения культурно-исторического наследия Казахстана.
Правила:
1. Если пользователь пишет на казахском — отвечай ТОЛЬКО на казахском, грамотно и естественно.
2. Если пользователь пишет на русском — отвечай ТОЛЬКО на русском.
3. Ты специализируешься на: истории Казахстана, географии, культуре, исторических памятниках, археологии, туризме, городах, регионах, исторических личностях, традициях.
4. Структурируй ответы с заголовками и разделами.
5. Чётко отличай проверенные исторические факты от интерпретаций. Используй пометки: [Тексерілген дерек] / [Проверенный факт] и [AI түсіндірмесі] / [Интерпретация].
6. Если информации недостаточно — честно скажи об этом, не придумывай даты и события.
7. Для исторических объектов используй структуру: Краткая история -> Период -> Историческое значение -> Интересные факты -> Текущее состояние -> Источники.
8. Отвечай развёрнуто и информативно, не ограничивайся 2-3 предложениями.`;

    const messages = [
      { role: "system", content: SYSTEM_PROMPT + contextNote },
      ...history.slice(-8).map((m: { sender: string; text: string }) => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.text,
      })),
      { role: "user", content: message },
    ];

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages,
        max_tokens: 1500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      console.error("OpenAI error response:", await response.text());
      return NextResponse.json({
        reply: generateLocalSmartResponse(message, lang, objectContext),
        source: "local_smart",
      });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || generateLocalSmartResponse(message, lang, objectContext);

    return NextResponse.json({ reply, source: "openai" });
  } catch (error) {
    console.error("AI guide error:", error);
    // Fallback to offline DB if network or parsing fails
    const fallbackReply = requestMessage ? generateLocalSmartResponse(requestMessage, requestLang, requestContext) : "Кешіріңіз, қате кетті.";
    return NextResponse.json(
      { reply: fallbackReply, source: "local_fallback" },
      { status: 200 }
    );
  }
}
