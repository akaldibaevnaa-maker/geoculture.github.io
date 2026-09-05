import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { text, lang = "kk", voice = "alloy" } = await req.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey || apiKey === "your-key-here") {
      return NextResponse.json(
        { error: "OPENAI_API_KEY not configured", fallback: true },
        { status: 503 }
      );
    }

    // Choose voice: nova for KK (sounds more natural), onyx for RU
    const selectedVoice = lang === "kk" ? "nova" : (voice || "onyx");

    const response = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "tts-1",
        input: text.slice(0, 4096), // TTS limit
        voice: selectedVoice,
        response_format: "mp3",
        speed: 0.9,
      }),
    });

    if (!response.ok) {
      console.error("TTS error:", await response.text());
      return NextResponse.json({ error: "TTS service error", fallback: true }, { status: 503 });
    }

    const audioBuffer = await response.arrayBuffer();

    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Audio guide error:", error);
    return NextResponse.json({ error: "Server error", fallback: true }, { status: 500 });
  }
}
