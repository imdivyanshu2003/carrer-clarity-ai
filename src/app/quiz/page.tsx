"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Lock, AlertTriangle } from "lucide-react";
import Image from "next/image";
import { useApp } from "@/context/AppContext";
import { questions } from "@/lib/questions";
import { calculateTraits } from "@/lib/utils";
import { buildAnalysisPrompt } from "@/lib/prompts";
import QuestionCard from "@/components/QuestionCard";
import ProgressBar from "@/components/ProgressBar";
import AnalyzingAnimation from "@/components/AnalyzingAnimation";
import { UserAnswer } from "@/lib/types";
import { trackLead } from "@/lib/meta-pixel";

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
  const [serviceError, setServiceError] = useState("");

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

        const data = await response.json();

        if (!response.ok) {
          setIsAnalyzing(false);
          setServiceError(
            data.error ||
            (language === "hi"
              ? "सेवा अस्थायी रूप से अनुपलब्ध है। कृपया बाद में पुनः प्रयास करें।"
              : "Service temporarily unavailable. Please try again later.")
          );
          return;
        }

        setReport(data.report);
        setIsAnalyzing(false);
        trackLead();
        router.push("/payment");
      } catch (error) {
        console.error("Analysis error:", error);
        setIsAnalyzing(false);
        setServiceError(
          language === "hi"
            ? "सेवा अस्थायी रूप से अनुपलब्ध है। कृपया बाद में पुनः प्रयास करें।"
            : "Service temporarily unavailable. Please try again later."
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

  if (serviceError) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="premium-card p-8 max-w-md w-full text-center">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle size={28} className="text-amber-500" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">
            {language === "hi" ? "सेवा अनुपलब्ध" : "Service Unavailable"}
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-6">{serviceError}</p>
          <button
            onClick={() => { setServiceError(""); router.push("/"); }}
            className="btn-primary w-full py-3 text-sm font-semibold"
          >
            {language === "hi" ? "होम पर वापस जाएं" : "Go Back Home"}
          </button>
        </div>
      </main>
    );
  }

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
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBack}
            className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center
                       hover:border-violet-300 hover:shadow-md hover:shadow-violet-100/50 text-slate-600 hover:text-violet-700 transition-all"
          >
            <ArrowLeft size={18} />
          </motion.button>
          <div className="flex items-center gap-2">
            <Image src="/logo_2.png" alt="Logo" width={40} height={40} className="w-10 h-10 object-contain" />
            <span className="text-sm font-semibold text-slate-700">
              Career Clarity <span className="gradient-text">AI</span>
            </span>
          </div>
          <div className="ml-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-semibold text-emerald-700">
            <Lock size={10} />
            <span>Private</span>
          </div>
        </div>
        <ProgressBar current={currentQuestion} total={questions.length} />
      </div>

      {/* Question */}
      <div className="flex-1 flex items-center justify-center pb-20">
        <div className="premium-card p-6 md:p-8 w-full max-w-lg">
          <QuestionCard
            question={questions[currentQuestion]}
            language={language}
            onAnswer={handleAnswer}
            questionIndex={currentQuestion}
          />
        </div>
      </div>
    </main>
  );
}
