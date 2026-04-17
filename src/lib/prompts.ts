import { Language, PersonalityTraits, UserAnswer } from "./types";
import { questions } from "./questions";

export function buildAnalysisPrompt(
  answers: UserAnswer[],
  traits: PersonalityTraits,
  language: Language
): string {
  const answersText = answers
    .map((a) => {
      const q = questions.find((q) => q.id === a.questionId);
      if (!q) return "";
      const questionText = q.text[language];
      if (a.openText) {
        return `Q${a.questionId}: ${questionText}\nAnswer: ${a.openText}`;
      }
      const option = q.options?.find((o) => o.id === a.selectedOptionId);
      return `Q${a.questionId}: ${questionText}\nAnswer: ${option?.text[language] || "N/A"}`;
    })
    .join("\n\n");

  const traitSummary = `
Trait Scores (0-33 scale):
- Creative: ${traits.creative}
- Analytical: ${traits.analytical}
- Leader: ${traits.leader}
- Supporter: ${traits.supporter}
- Risk Taker: ${traits.risk_taker}
- Stability Seeker: ${traits.stable}
- Social: ${traits.social}
- Independent: ${traits.independent}
`;

  const langInstruction =
    language === "hi"
      ? "IMPORTANT: Generate the ENTIRE response in Hindi (Devanagari script). Use simple Hindi that a Tier 2/Tier 3 Indian student would understand. You can use common English words for technical terms."
      : "Generate the response in simple, clear English. Keep it relatable for Indian students aged 16-28.";

  return `You are Career Clarity AI — a smart, empathetic career guidance tool designed for young Indians (age 16-28) who are confused about their career direction.

${langInstruction}

Based on the following questionnaire responses and personality trait analysis, generate a comprehensive career clarity report.

USER'S ANSWERS:
${answersText}

PERSONALITY TRAIT ANALYSIS:
${traitSummary}

Generate a JSON response with EXACTLY this structure (all string values in ${language === "hi" ? "Hindi" : "English"}):

{
  "personalitySummary": "A 3-4 sentence warm, personal summary of who this person is. Make it feel like you truly understand them. Reference their specific answers.",
  
  "strengths": ["strength1", "strength2", "strength3", "strength4"],
  
  "weaknesses": ["weakness1", "weakness2", "weakness3"],
  
  "thinkingStyle": "A 2-3 sentence description of how this person thinks and processes information. Be specific and insightful.",
  
  "topCareers": [
    {
      "title": "Career Title 1",
      "whyItFits": "2-3 sentences explaining why this career matches their personality, referencing their specific traits and answers",
      "realWorldContext": "1-2 sentences with a real-world example or context. Mention specific companies, roles, or paths in India."
    },
    {
      "title": "Career Title 2",
      "whyItFits": "...",
      "realWorldContext": "..."
    },
    {
      "title": "Career Title 3",
      "whyItFits": "...",
      "realWorldContext": "..."
    }
  ],
  
  "avoidCareers": [
    {
      "title": "Career to Avoid 1",
      "reason": "2 sentences explaining why this career would NOT suit them, based on their personality traits"
    },
    {
      "title": "Career to Avoid 2",
      "reason": "..."
    }
  ],
  
  "actionPlan": {
    "skillToLearn": "One specific skill they should start learning in the next 30 days, with a specific free resource recommendation",
    "smallProject": "One small project they can build/do in 30 days to test their interest",
    "direction": "A clear 1-2 sentence direction statement — what they should focus on next",
    "weeklyBreakdown": [
      "Week 1: specific action",
      "Week 2: specific action",
      "Week 3: specific action",
      "Week 4: specific action"
    ]
  }
}

IMPORTANT RULES:
1. Be specific and personal — reference their actual answers
2. Career recommendations should be realistic and relevant for India
3. The "avoid careers" section should be honest but not harsh
4. Action plan should be immediately actionable with free resources
5. Keep the tone warm, encouraging, and like a supportive mentor
6. Return ONLY valid JSON, no markdown formatting`;
}
