"use client";

import { motion } from "framer-motion";
import { ShieldCheck, X } from "lucide-react";
import { Language } from "@/lib/types";

interface DisclaimerModalProps {
  language: Language;
  onAccept: () => void;
  onClose: () => void;
}

const content = {
  en: {
    title: "Before we start",
    points: [
      "This is an AI-based career guidance tool, not a definitive prediction.",
      "Results are suggestions based on your answers — use them as a starting point.",
      "We do NOT store any of your personal data. Your session is temporary.",
      "This tool is not a substitute for professional career counseling.",
    ],
    accept: "I understand, let's go!",
    back: "Go back",
  },
  hi: {
    title: "शुरू करने से पहले",
    points: [
      "यह एक AI-based career guidance tool है, कोई exact prediction नहीं।",
      "Results आपके answers के आधार पर suggestions हैं — इन्हें एक starting point की तरह use करें।",
      "हम आपका कोई personal data store नहीं करते। आपका session temporary है।",
      "यह tool professional career counseling की जगह नहीं ले सकता।",
    ],
    accept: "समझ गया/गई, चलो शुरू करें!",
    back: "वापस जाओ",
  },
};

export default function DisclaimerModal({
  language,
  onAccept,
  onClose,
}: DisclaimerModalProps) {
  const t = content[language];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gradient-to-br from-brand-800 to-indigo-900 rounded-2xl p-6 max-w-md w-full
                   border border-white/10 shadow-2xl"
      >
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <ShieldCheck size={22} className="text-brand-300" />
            <h3 className="text-lg font-semibold">{t.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white/70 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <ul className="space-y-3 mb-6">
          {t.points.map((point, i) => (
            <li key={i} className="flex gap-3 text-sm text-white/70">
              <span className="text-brand-400 mt-0.5 shrink-0">&#10003;</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-white/10 text-white/60 
                       hover:bg-white/5 transition-all text-sm"
          >
            {t.back}
          </button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onAccept}
            className="flex-1 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 
                       transition-all text-sm font-medium"
          >
            {t.accept}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
