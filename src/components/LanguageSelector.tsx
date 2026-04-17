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
      <div className="flex items-center gap-2 text-white/70 text-sm">
        <Languages size={18} />
        <span>Choose your language</span>
      </div>

      <div className="flex gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect("hi")}
          className="px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 
                     hover:bg-white/20 transition-all duration-300 text-lg font-medium
                     flex flex-col items-center gap-1 min-w-[140px]"
        >
          <span className="text-2xl">हिंदी</span>
          <span className="text-xs text-white/50">Hindi</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect("en")}
          className="px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 
                     hover:bg-white/20 transition-all duration-300 text-lg font-medium
                     flex flex-col items-center gap-1 min-w-[140px]"
        >
          <span className="text-2xl">English</span>
          <span className="text-xs text-white/50">English</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
