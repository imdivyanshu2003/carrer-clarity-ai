"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Question, Language, UserAnswer } from "@/lib/types";

interface QuestionCardProps {
  question: Question;
  language: Language;
  onAnswer: (answer: UserAnswer) => void;
  questionIndex: number;
}

export default function QuestionCard({
  question,
  language,
  onAnswer,
  questionIndex,
}: QuestionCardProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [openText, setOpenText] = useState("");

  const handleSubmit = () => {
    if (question.type === "open") {
      if (openText.trim()) {
        onAnswer({ questionId: question.id, openText: openText.trim() });
        setOpenText("");
      }
    } else if (selected) {
      onAnswer({ questionId: question.id, selectedOptionId: selected });
      setSelected(null);
    }
  };

  const handleOptionClick = (optionId: string) => {
    setSelected(optionId);
    setTimeout(() => {
      onAnswer({ questionId: question.id, selectedOptionId: optionId });
      setSelected(null);
    }, 400);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg mx-auto"
      >
        <div className="mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl font-bold text-slate-900 leading-relaxed mb-2"
          >
            {question.text[language]}
          </motion.h2>
          {question.subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-sm text-slate-500"
            >
              {question.subtitle[language]}
            </motion.p>
          )}
        </div>

        {question.type === "mcq" && question.options && (
          <div className="space-y-2.5">
            {question.options.map((option, i) => (
              <motion.button
                key={option.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.08 }}
                onClick={() => handleOptionClick(option.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200
                  ${
                    selected === option.id
                      ? "bg-violet-50 border-violet-400 ring-2 ring-violet-200 scale-[1.01]"
                      : "bg-white border-slate-200 hover:border-violet-300 hover:shadow-md hover:shadow-violet-100/50"
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 transition-colors
                    ${
                      selected === option.id
                        ? "bg-violet-600 text-white"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-sm md:text-base text-slate-800 font-medium">
                    {option.text[language]}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        )}

        {question.type === "open" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <textarea
              value={openText}
              onChange={(e) => setOpenText(e.target.value)}
              placeholder={
                language === "hi"
                  ? "यहां अपना जवाब लिखें..."
                  : "Type your answer here..."
              }
              className="w-full h-32 p-4 rounded-xl bg-white border border-slate-200
                         text-slate-900 placeholder-slate-400 resize-none focus:outline-none 
                         focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
              maxLength={500}
            />
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400">
                {openText.length}/500
              </span>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleSubmit}
                disabled={!openText.trim()}
                className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {language === "hi" ? "आगे बढ़ें" : "Continue"}
                <ChevronRight size={18} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
