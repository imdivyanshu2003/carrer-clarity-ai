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
            className="text-xl md:text-2xl font-semibold leading-relaxed mb-2"
          >
            {question.text[language]}
          </motion.h2>
          {question.subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-sm text-white/50"
            >
              {question.subtitle[language]}
            </motion.p>
          )}
        </div>

        {question.type === "mcq" && question.options && (
          <div className="space-y-3">
            {question.options.map((option, i) => (
              <motion.button
                key={option.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.08 }}
                onClick={() => handleOptionClick(option.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-300
                  ${
                    selected === option.id
                      ? "bg-brand-500/30 border-brand-400 scale-[1.02]"
                      : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium shrink-0
                    ${
                      selected === option.id
                        ? "bg-brand-500 text-white"
                        : "bg-white/10 text-white/60"
                    }`}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-sm md:text-base">
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
              className="w-full h-32 p-4 rounded-xl bg-white/5 border border-white/10 
                         text-white placeholder-white/30 resize-none focus:outline-none 
                         focus:border-brand-400 transition-colors"
              maxLength={500}
            />
            <div className="flex justify-between items-center">
              <span className="text-xs text-white/40">
                {openText.length}/500
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmit}
                disabled={!openText.trim()}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-500 
                           hover:bg-brand-600 disabled:opacity-40 disabled:cursor-not-allowed
                           transition-all font-medium"
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
