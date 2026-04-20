import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { buildPremiumPrompt } from "@/lib/prompts";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { basicReport, answers, language } = await request.json();

    if (!basicReport || !answers) {
      return NextResponse.json(
        { error: "Missing report or answers data" },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "AI service is not configured. Please try again later." },
        { status: 503 }
      );
    }

    const prompt = buildPremiumPrompt(basicReport, answers, language || "en");

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are Career Clarity AI Premium — a world-class career strategist who has mentored 10,000+ Indian students. You generate DEEP, hyper-detailed, brutally specific premium career reports that feel like a ₹10,000 personal consultation. Every sentence must be specific to THIS person — no generic advice. Include real company names, real platform names, real YouTube channel names, real course names. The user paid extra for this — make every word count. Return ONLY valid JSON. No markdown, no code blocks, no extra text.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.75,
      max_tokens: 4500,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      return NextResponse.json(
        { error: "AI did not return a valid response. Please try again." },
        { status: 500 }
      );
    }

    let premiumReport;
    try {
      const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
      const jsonStr = jsonMatch ? jsonMatch[1].trim() : content.trim();
      premiumReport = JSON.parse(jsonStr);
    } catch (parseError) {
      console.error("Premium report JSON parse error:", parseError);
      console.error("Raw content:", content);
      return NextResponse.json(
        { error: "Failed to parse premium report. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ premiumReport });
  } catch (error: any) {
    console.error("Premium analysis error:", error?.message || error);
    const isQuotaError =
      error?.status === 429 || error?.code === "insufficient_quota";
    return NextResponse.json(
      {
        error: isQuotaError
          ? "AI service temporarily unavailable. Please try again later."
          : "Premium analysis failed. Please try again.",
      },
      { status: isQuotaError ? 503 : 500 }
    );
  }
}
