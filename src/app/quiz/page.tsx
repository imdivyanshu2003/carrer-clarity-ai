"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { questions } from "@/lib/questions";
import { calculateTraits } from "@/lib/utils";
import { buildAnalysisPrompt } from "@/lib/prompts";
import QuestionCard from "@/components/QuestionCard";
import ProgressBar from "@/components/ProgressBar";
import AnalyzingAnimation from "@/components/AnalyzingAnimation";
import { UserAnswer } from "@/lib/types";

export default function QuizPage() {
  const router = useRouter();
  const {
    language,
    currentQuestion,
    answers,
    isAnalyzing,
    addAnswer,
    goToQuestion,
    setReport,
    setIsAnalyzing,
  } = useApp();

  useEffect(() => {
    if (!language) {
      router.push("/");
    }
  }, [language, router]);

  if (!language) return null;

  const handleAnswer = async (answer: UserAnswer) => {
    addAnswer(answer);

    if (currentQuestion < questions.length - 1) {
      goToQuestion(currentQuestion + 1);
    } else {
      // All questions answered — analyze
      setIsAnalyzing(true);

      const allAnswers = [...answers.filter(a => a.questionId !== answer.questionId), answer];
      const traits = calculateTraits(allAnswers);
      const prompt = buildAnalysisPrompt(allAnswers, traits, language);

      try {
        const response = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt, language }),
        });

        if (!response.ok) throw new Error("Analysis failed");

        const data = await response.json();
        setReport(data.report);
        setIsAnalyzing(false);
        router.push("/payment");
      } catch (error) {
        console.error("Analysis error:", error);
        setIsAnalyzing(false);
        alert(
          language === "hi"
            ? "कुछ गलत हो गया। कृपया दोबारा try करें।"
            : "Something went wrong. Please try again."
        );
      }
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      goToQuestion(currentQuestion - 1);
    } else {
      router.push("/");
    }
  };

  if (isAnalyzing) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <AnalyzingAnimation language={language} />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col px-4 py-8">
      {/* Header */}
      <div className="max-w-lg mx-auto w-full mb-8">
        <div className="flex items-center gap-4 mb-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleBack}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center
                       hover:bg-white/20 transition-colors"
          >
            <ArrowLeft size={18} />
          </motion.button>
          <span className="text-sm text-white/50">
            {language === "hi" ? "Career Clarity AI" : "Career Clarity AI"}
          </span>
        </div>
        <ProgressBar current={currentQuestion} total={questions.length} />
      </div>

      {/* Question */}
      <div className="flex-1 flex items-center justify-center pb-20">
        <QuestionCard
          question={questions[currentQuestion]}
          language={language}
          onAnswer={handleAnswer}
          questionIndex={currentQuestion}
        />
      </div>
    </main>
  );
}
