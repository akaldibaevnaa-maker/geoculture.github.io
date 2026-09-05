import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `Ты — GeoCulture AI Guide, научно-образовательный AI-помощник для изучения культурно-исторического наследия Казахстана.

Правила:
1. Если пользователь пишет на казахском — отвечай ТОЛЬКО на казахском, грамотно и естественно.
2. Если пользователь пишет на русском — отвечай ТОЛЬКО на русском.
3. Ты специализируешься на: истории Казахстана, географии, культуре, исторических памятниках, археологии, туризме, городах, регионах, исторических личностях, традициях.
4. Структурируй ответы с заголовками и разделами.
5. Чётко отличай проверенные исторические факты от интерпретаций. Используй пометки: [Тексерілген дерек] / [Проверенный факт] и [AI түсіндірмесі] / [Интерпретация].
6. Если информации недостаточно — честно скажи об этом, не придумывай даты и события.
7. Для исторических объектов используй структуру: Краткая история → Период → Историческое значение → Интересные факты → Текущее состояние → Источники.
8. Отвечай развёрнуто и информативно, не ограничивайся 2-3 предложениями.`;

function getLocalFallback(message: string, lang: string): string {
  const text = message.toLowerCase();
  if (text.includes("ясауи") || text.includes("яссауи")) {
    return lang === "kk"
      ? "**Қожа Ахмет Ясауи кесенесі** — Түркістан қаласындағы ЮНЕСКО Дүниежүзілік мұрасы. XIV ғасырда Тимур бұйрығымен салынған. Ясауи 1093–1166 жылдарда өмір сүрген суфи ақын, «Диуани Хикмет» жинағының авторы. Кесенені зерттеу үшін картаға өтіп, «Ясауи» іздеңіз."
      : "**Мавзолей Ходжи Ахмеда Ясави** — объект Всемирного наследия ЮНЕСКО в городе Туркестан. Построен по приказу Тимура в XIV веке. Ясави (1093–1166) — суфийский поэт, автор сборника «Диуани Хикмет». Перейдите на карту и найдите «Ясауи» для подробной информации.";
  }
  return lang === "kk"
    ? "Сұрағыңыз қабылданды. Толық жауап алу үшін OpenAI API кілтін .env файлына қосыңыз. Қазіргі уақытта базалық ақпарат ғана қол жетімді."
    : "Ваш запрос принят. Для получения полных ответов добавьте ключ OpenAI API в файл .env. В данный момент доступна только базовая информация.";
}

export async function POST(req: NextRequest) {
  try {
    const { message, history = [], lang = "kk", objectContext } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "No message provided" }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    // Fallback if no API key
    if (!apiKey || apiKey === "your-key-here") {
      const fallback = getLocalFallback(message, lang);
      return NextResponse.json({
        reply: fallback,
        source: "local",
      });
    }

    const contextNote = objectContext
      ? `\n\nТекущий контекст: пользователь выбрал объект "${objectContext}" на карте.`
      : "";

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
      const errData = await response.json().catch(() => ({}));
      console.error("OpenAI error:", errData);
      return NextResponse.json({
        reply: getLocalFallback(message, lang),
        source: "local_fallback",
      });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || getLocalFallback(message, lang);

    return NextResponse.json({ reply, source: "openai" });
  } catch (error) {
    console.error("AI guide error:", error);
    return NextResponse.json(
      { reply: "Қызмет уақытша қолжетімсіз. Кейінірек қайталаңыз. / Сервис временно недоступен. Попробуйте позже.", source: "error" },
      { status: 200 }
    );
  }
}
