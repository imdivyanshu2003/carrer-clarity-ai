"use client";

import { motion } from "framer-motion";
import { Languages } from "lucide-react";
import { Language } from "@/lib/types";

interface LanguageSelectorProps {
  onSelect: (lang: Language) => void;
}

export default function LanguageSelector({ onSelect }: LanguageSelectorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center gap-6"
    >
      <div className="flex items-center gap-2 text-slate-600 text-sm">
        <Languages size={16} />
        <span>Choose your language to begin</span>
      </div>

      <div className="flex gap-3">
        <motion.button
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onSelect("hi")}
          className="px-8 py-5 rounded-2xl bg-white border border-slate-200
                     hover:border-violet-300 hover:shadow-lg hover:shadow-violet-100
                     transition-all duration-200
                     flex flex-col items-center gap-1 min-w-[150px] group"
        >
          <span className="text-2xl font-bold text-slate-900 group-hover:text-violet-700">हिंदी</span>
          <span className="text-xs text-slate-500">Hindi</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onSelect("en")}
          className="px-8 py-5 rounded-2xl bg-white border border-slate-200
                     hover:border-violet-300 hover:shadow-lg hover:shadow-violet-100
                     transition-all duration-200
                     flex flex-col items-center gap-1 min-w-[150px] group"
        >
          <span className="text-2xl font-bold text-slate-900 group-hover:text-violet-700">English</span>
          <span className="text-xs text-slate-500">English</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
