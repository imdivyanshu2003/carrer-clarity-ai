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
      className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-2xl p-7 max-w-md w-full
                   border border-slate-200 shadow-2xl"
      >
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center">
              <ShieldCheck size={20} className="text-violet-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">{t.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <ul className="space-y-3 mb-7">
          {t.points.map((point, i) => (
            <li key={i} className="flex gap-3 text-sm text-slate-600 leading-relaxed">
              <span className="w-5 h-5 rounded-full bg-violet-100 flex items-center justify-center text-violet-700 text-[10px] font-bold shrink-0 mt-0.5">
                &#10003;
              </span>
              <span>{point}</span>
            </li>
          ))}
        </ul>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="btn-secondary flex-1"
          >
            {t.back}
          </button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onAccept}
            className="btn-primary flex-1"
          >
            {t.accept}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
