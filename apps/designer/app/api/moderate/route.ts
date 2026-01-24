// app/api/moderate/route.ts
import { NextResponse } from "next/server";

// Simple keyword-based moderation as fallback
const bannedWords = [
 "fuck", "fucking", "fucker", "f*ck", "shit", "shitting", "bitch", "bitches",
  "asshole", "ass", "bastard", "dick", "pussy", "cunt", "motherfucker", "mf",
  "son of a bitch", "cock", "vagina", "porn", "p0rn", "hentai", "nude",
  "retard", "idiot", "stupid", "slut", "whore", "piss", "bollocks",

  "đm", "dkm", "dkmm", "đcm", "dcmm", "đmm", "vcl", "vkl", "vcln", "vcc", 
  "cặc", "cc", "lồn", "cl", "clgt", "đéo", "đéo", "để ý", "chó đẻ", "khốn nạn",
  "mẹ mày", "mẹ m", "con đĩ", "đĩ lồn", "ngu lồn", "hãm lồn", "xạo lồn", "xl",
  "đâm bang", "đâm thuê", "chém mướn", "tổ sư", "tổ cha", "mày", "tao", "đm",
  "phò", "cave", "đồ chó", "ngu như chó", "óc chó", "bú cu", "vú", "đít", "mông"
];

function containsBannedWords(text: string): boolean {
  const lowerText = text.toLowerCase();
  return bannedWords.some(word => lowerText.includes(word));
}

export async function POST(req: Request) {
  try {
    const { content } = await req.json();

    if (!content) {
      return NextResponse.json({ error: "Nội dung không được để trống" }, { status: 400 });
    }

    // Use simple keyword moderation instead of OpenAI (due to rate limits)
    if (containsBannedWords(content)) {
      return NextResponse.json({
        isSafe: false,
        message: "Content that violates community standards",
        categories: ["inappropriate-language"],
      });
    }

    // If OpenAI key is available and not rate limited, try to use it
    if (process.env.OPENAI_API_KEY && process.env.USE_OPENAI_MODERATION === "true") {
      try {
        const response = await fetch("https://api.openai.com/v1/moderations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          body: JSON.stringify({ input: content }),
        });

        if (response.ok) {
          const data = await response.json();
          const result = data.results?.[0];

          if (result && result.flagged) {
            const violatedCategories = Object.keys(result.categories).filter(
              (key) => result.categories[key] === true
            );

            return NextResponse.json({
              isSafe: false,
              message: "Content that violates community standards",
              categories: violatedCategories,
            });
          }
        }
      } catch (openaiError) {
        console.warn("OpenAI moderation failed, using fallback:", openaiError);
      }
    }

    // Nếu an toàn
    return NextResponse.json({ isSafe: true });

  } catch (error) {
    console.error("Moderation Error:", error);

    // Fallback: Nếu OpenAI API lỗi, tạm thời cho phép nội dung đi qua
    // Trong production, bạn nên xử lý tốt hơn
    console.warn("Using fallback moderation - allowing content");
    return NextResponse.json({ isSafe: true, fallback: true });
  }
}