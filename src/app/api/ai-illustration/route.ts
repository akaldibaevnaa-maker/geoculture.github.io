import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { objectName, style = "historical", lang = "kk" } = await req.json();

    if (!objectName) {
      return NextResponse.json({ error: "No object name provided" }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey || apiKey === "your-key-here") {
      return NextResponse.json(
        { error: "OPENAI_API_KEY not configured", fallback: true },
        { status: 503 }
      );
    }

    const stylePrompts: Record<string, string> = {
      historical: `A detailed historical reconstruction painting of "${objectName}" in Kazakhstan, showing how it might have looked in its prime. High quality digital art, realistic, warm tones, archaeological accuracy. No text or labels.`,
      artistic: `An artistic illustration of "${objectName}" in Kazakhstan, beautiful painterly style, warm sunset light, cultural heritage atmosphere. No text.`,
      archaeological: `An archaeological site reconstruction illustration of "${objectName}" in Kazakhstan, showing the excavation site and ancient structures, professional rendering. No text.`,
    };

    const prompt = stylePrompts[style] || stylePrompts.historical;

    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt,
        n: 1,
        size: "1024x1024",
        quality: "standard",
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      console.error("DALL-E error:", err);
      return NextResponse.json({ error: "Image generation failed", fallback: true }, { status: 503 });
    }

    const data = await response.json();
    const imageUrl = data.data?.[0]?.url;

    if (!imageUrl) {
      return NextResponse.json({ error: "No image returned", fallback: true }, { status: 503 });
    }

    const disclaimer = lang === "kk"
      ? "Бұл кескін жасанды интеллект арқылы жасалған көркем/болжамды реконструкция. Ол түпнұсқа тарихи фотосурет емес."
      : "Изображение является художественной/предположительной реконструкцией, созданной искусственным интеллектом, и не является исторической фотографией.";

    return NextResponse.json({ imageUrl, disclaimer });
  } catch (error) {
    console.error("Illustration error:", error);
    return NextResponse.json({ error: "Server error", fallback: true }, { status: 500 });
  }
}
