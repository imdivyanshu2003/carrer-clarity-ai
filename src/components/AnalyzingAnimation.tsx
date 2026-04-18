"use client";

import { motion } from "framer-motion";
import { Brain } from "lucide-react";
import { Language } from "@/lib/types";

interface AnalyzingAnimationProps {
  language: Language;
}

const messages = {
  en: [
    "Understanding your personality...",
    "Analyzing your thinking pattern...",
    "Finding the best career matches...",
    "Building your action plan...",
  ],
  hi: [
    "आपकी personality समझ रहे हैं...",
    "आपका thinking pattern analyze कर रहे हैं...",
    "सबसे अच्छे career matches ढूंढ रहे हैं...",
    "आपका action plan बना रहे हैं...",
  ],
};

export default function AnalyzingAnimation({ language }: AnalyzingAnimationProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="w-24 h-24 rounded-3xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-xl shadow-violet-300/40"
      >
        <Brain size={44} className="text-white" />
      </motion.div>

      <div className="text-center space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
          {language === "hi"
            ? "AI आपकी report तैयार कर रहा है..."
            : "AI is preparing your report..."}
        </h2>

        <div className="space-y-2">
          {messages[language].map((msg, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 1.5, duration: 0.5 }}
              className="text-sm text-slate-500"
            >
              {msg}
            </motion.p>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            className="w-2.5 h-2.5 rounded-full bg-violet-500"
          />
        ))}
      </div>
    </div>
  );
}
