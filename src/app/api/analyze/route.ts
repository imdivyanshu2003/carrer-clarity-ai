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
      return NextResponse.json({
        report: getDemoReport(language),
      });
    }

    if (!process.env.OPENAI_API_KEY) {
      // Return a demo report if no API key is configured
      return NextResponse.json({
        report: getDemoReport(language),
      });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are Career Clarity AI. Return ONLY valid JSON. No markdown, no code blocks, no extra text.",
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
      console.error("No content in OpenAI response, using demo report");
      return NextResponse.json({
        report: getDemoReport(language),
      });
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
      // Fallback to demo report if parsing fails
      report = getDemoReport(language);
    }

    return NextResponse.json({ report });
  } catch (error) {
    console.error("Analysis error:", error);
    // Always fallback to demo report — never show error to user
    return NextResponse.json({
      report: getDemoReport(language),
    });
  }
}

function getDemoReport(language: string) {
  if (language === "hi") {
    return {
      personalitySummary:
        "आप एक creative और independent सोच वाले इंसान हैं। आपमें नई चीज़ें try करने की हिम्मत है और आप अपने तरीके से problems solve करना पसंद करते हैं। आपकी curiosity और adaptability आपकी सबसे बड़ी ताकत है।",
      strengths: [
        "Creative thinking और नए ideas generate करना",
        "Independent काम करने की क्षमता",
        "नई चीज़ें जल्दी सीखने की ability",
        "Risk लेने और adapt करने की हिम्मत",
      ],
      weaknesses: [
        "कभी-कभी overthinking की आदत",
        "Structured environments में uncomfortable feel करना",
        "Long-term planning में patience की कमी",
      ],
      thinkingStyle:
        "आप primarily intuitive तरीके से सोचते हैं — gut feeling पर भरोसा करते हैं और creative solutions ढूंढते हैं। आप pattern recognition में अच्छे हैं लेकिन detailed analysis से बोर हो सकते हैं।",
      topCareers: [
        {
          title: "Content Creator / Digital Marketing",
          whyItFits:
            "आपकी creative thinking और independent काम करने की preference इस field के लिए perfect है। आप ideas generate करने में अच्छे हैं।",
          realWorldContext:
            "India में digital marketing industry तेज़ी से बढ़ रही है। YouTube, Instagram creators अच्छी income generate कर रहे हैं। Freelancing platforms जैसे Fiverr और Upwork पर भी opportunities हैं।",
        },
        {
          title: "UX/UI Designer",
          whyItFits:
            "आपकी creativity और problem-solving approach design field के लिए ideal है। आप users के perspective से सोच सकते हैं।",
          realWorldContext:
            "Companies जैसे Swiggy, Zomato, Razorpay actively UX designers hire कर रही हैं। Average salary ₹6-15 LPA है। Figma और design tools free में सीख सकते हैं।",
        },
        {
          title: "Startup Founder / Entrepreneur",
          whyItFits:
            "आपमें risk लेने की हिम्मत और creative solutions ढूंढने की ability है — दोनों entrepreneurship के लिए ज़रूरी हैं।",
          realWorldContext:
            "India का startup ecosystem booming है। Y Combinator, 100x.VC जैसे investors early-stage startups को fund कर रहे हैं। शुरुआत small side project से करें।",
        },
      ],
      avoidCareers: [
        {
          title: "Government Job / Banking",
          reason:
            "Highly structured और repetitive work आपकी creative personality के लिए frustrating हो सकता है। आप independent काम पसंद करते हैं जबकि ये roles बहुत hierarchical हैं।",
        },
        {
          title: "Accounting / Auditing",
          reason:
            "Detail-oriented और rule-based काम आपकी intuitive thinking style से match नहीं करता। आप bigger picture पर focus करते हैं।",
        },
      ],
      actionPlan: {
        skillToLearn:
          "Figma सीखें (UI Design) — YouTube पर 'Figma Tutorial Hindi' search करें। Free course: Coursera पर Google UX Design Certificate",
        smallProject:
          "अपनी पसंदीदा app का redesign करें (Figma में) और LinkedIn पर post करें",
        direction:
          "अगले 30 दिन में design basics सीखें और एक portfolio project बनाएं। फिर freelance projects लें।",
        weeklyBreakdown: [
          "Week 1: Figma basics सीखें, 2-3 tutorial videos complete करें",
          "Week 2: एक app का redesign शुरू करें, UI components बनाएं",
          "Week 3: Project complete करें, LinkedIn profile optimize करें",
          "Week 4: Portfolio बनाएं, 2-3 freelance platforms पर profile बनाएं",
        ],
      },
    };
  }

  return {
    personalitySummary:
      "You are a creative and independent thinker with a natural inclination towards innovation. You have the courage to try new things and prefer solving problems your own way. Your curiosity and adaptability are your greatest assets.",
    strengths: [
      "Creative thinking and generating new ideas",
      "Ability to work independently",
      "Quick learning ability for new concepts",
      "Courage to take risks and adapt",
    ],
    weaknesses: [
      "Tendency to overthink sometimes",
      "Feeling uncomfortable in highly structured environments",
      "Lack of patience in long-term planning",
    ],
    thinkingStyle:
      "You think primarily in an intuitive way — trusting your gut feeling and looking for creative solutions. You excel at pattern recognition but may get bored with detailed analysis.",
    topCareers: [
      {
        title: "Content Creator / Digital Marketing",
        whyItFits:
          "Your creative thinking and preference for independent work make this field a perfect match. You're naturally good at generating ideas and communicating them.",
        realWorldContext:
          "The digital marketing industry in India is growing rapidly. YouTube and Instagram creators are generating solid income. Platforms like Fiverr and Upwork also offer freelancing opportunities.",
      },
      {
        title: "UX/UI Designer",
        whyItFits:
          "Your creativity and problem-solving approach are ideal for the design field. You can naturally think from the user's perspective.",
        realWorldContext:
          "Companies like Swiggy, Zomato, and Razorpay are actively hiring UX designers. Average salary is ₹6-15 LPA. You can learn Figma and design tools for free.",
      },
      {
        title: "Startup Founder / Entrepreneur",
        whyItFits:
          "Your courage to take risks and ability to find creative solutions are both essential for entrepreneurship.",
        realWorldContext:
          "India's startup ecosystem is booming. Investors like Y Combinator and 100x.VC are funding early-stage startups. Start with a small side project.",
      },
    ],
    avoidCareers: [
      {
        title: "Government Job / Banking",
        reason:
          "Highly structured and repetitive work could be frustrating for your creative personality. You prefer independence, while these roles are very hierarchical.",
      },
      {
        title: "Accounting / Auditing",
        reason:
          "Detail-oriented, rule-based work doesn't match your intuitive thinking style. You tend to focus on the bigger picture.",
      },
    ],
    actionPlan: {
      skillToLearn:
        "Learn Figma (UI Design) — search 'Figma Tutorial for Beginners' on YouTube. Free course: Google UX Design Certificate on Coursera",
      smallProject:
        "Redesign your favorite app in Figma and post it on LinkedIn",
      direction:
        "In the next 30 days, learn design basics and build one portfolio project. Then start taking freelance projects.",
      weeklyBreakdown: [
        "Week 1: Learn Figma basics, complete 2-3 tutorial videos",
        "Week 2: Start redesigning an app, create UI components",
        "Week 3: Complete the project, optimize your LinkedIn profile",
        "Week 4: Build your portfolio, create profiles on 2-3 freelance platforms",
      ],
    },
  };
}
