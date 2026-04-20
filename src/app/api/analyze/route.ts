import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  let language = "en";

  try {
    const body = await request.json();
    language = body.language || "en";
    const prompt = body.prompt;

    if (!prompt) {
      return NextResponse.json(
        { error: "No prompt provided" },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "AI service is not configured. Please try again later." },
        { status: 503 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are Career Clarity AI — a smart, empathetic career mentor for young Indians. Generate specific, personal career reports that reference the user's actual answers. Be warm but direct. Include real Indian companies, roles, and context. Return ONLY valid JSON. No markdown, no code blocks, no extra text.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      console.error("No content in OpenAI response");
      return NextResponse.json(
        { error: "AI did not return a valid response. Please try again." },
        { status: 500 }
      );
    }

    // Parse JSON from the response
    let report;
    try {
      // Try to extract JSON if wrapped in code blocks
      const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
      const jsonStr = jsonMatch ? jsonMatch[1].trim() : content.trim();
      report = JSON.parse(jsonStr);
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      console.error("Raw content:", content);
      return NextResponse.json(
        { error: "Failed to parse AI response. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ report });
  } catch (error: any) {
    console.error("Analysis error:", error?.message || error);
    const isQuotaError = error?.status === 429 || error?.code === "insufficient_quota";
    return NextResponse.json(
      { error: isQuotaError
          ? "Our AI service is temporarily unavailable. Please try again later."
          : "Analysis failed. Please try again."
      },
      { status: isQuotaError ? 503 : 500 }
    );
  }
}
