"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Clock, Brain, Target, Shield } from "lucide-react";
import LanguageSelector from "@/components/LanguageSelector";
import DisclaimerModal from "@/components/DisclaimerModal";
import { useApp } from "@/context/AppContext";
import { Language } from "@/lib/types";

export default function LandingPage() {
  const router = useRouter();
  const { setLanguage } = useApp();
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [selectedLang, setSelectedLang] = useState<Language | null>(null);

  const handleLanguageSelect = (lang: Language) => {
    setSelectedLang(lang);
    setShowDisclaimer(true);
  };

  const handleAcceptDisclaimer = () => {
    if (selectedLang) {
      setLanguage(selectedLang);
      router.push("/quiz");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative">
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Brand chip */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex justify-center"
        >
          <div className="chip">
            <Sparkles size={14} className="text-violet-600" />
            <span>AI-Powered Career Guidance</span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight mb-5">
            <span className="gradient-text">Career Clarity</span>
            <br />
            <span className="text-slate-900">in 5 minutes.</span>
          </h1>
          <p className="text-base md:text-lg text-slate-600 max-w-lg mx-auto leading-relaxed">
            Answer 12 smart questions. Get a personalized career direction with a 30-day action plan — powered by AI.
          </p>
        </motion.div>

        {/* Features grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10"
        >
          {[
            { icon: Clock, label: "5 Minutes", sublabel: "Quick & Easy", color: "text-violet-600", bg: "bg-violet-50" },
            { icon: Brain, label: "AI Analysis", sublabel: "Smart Engine", color: "text-fuchsia-600", bg: "bg-fuchsia-50" },
            { icon: Target, label: "Action Plan", sublabel: "30-Day Roadmap", color: "text-indigo-600", bg: "bg-indigo-50" },
            { icon: Shield, label: "100% Private", sublabel: "No Data Stored", color: "text-emerald-600", bg: "bg-emerald-50" },
          ].map((item, i) => (
            <div
              key={i}
              className="soft-card flex flex-col items-center gap-2 p-4"
            >
              <div className={`w-10 h-10 rounded-lg ${item.bg} flex items-center justify-center`}>
                <item.icon size={18} className={item.color} />
              </div>
              <span className="text-xs font-semibold text-slate-900">{item.label}</span>
              <span className="text-[10px] text-slate-500">{item.sublabel}</span>
            </div>
          ))}
        </motion.div>

        {/* Language Selection */}
        <LanguageSelector onSelect={handleLanguageSelect} />

        {/* Social proof */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-10 text-xs text-slate-500"
        >
          Trusted by <span className="font-semibold text-slate-700">1000+ students</span> across India
        </motion.p>
      </div>

      {/* Disclaimer Modal */}
      {showDisclaimer && selectedLang && (
        <DisclaimerModal
          language={selectedLang}
          onAccept={handleAcceptDisclaimer}
          onClose={() => setShowDisclaimer(false)}
        />
      )}
    </main>
  );
}
