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
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-brand-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Logo/Brand */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 mb-6">
            <Sparkles size={16} className="text-accent-400" />
            <span className="text-sm text-white/70">AI-Powered Career Guidance</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
            <span className="gradient-text">Career Clarity</span>
            <br />
            <span className="text-white">AI</span>
          </h1>

          <p className="text-lg md:text-xl text-white/60 max-w-md mx-auto leading-relaxed">
            Answer 12 questions. Get a clear career direction + action plan in 5 minutes.
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10"
        >
          {[
            { icon: Clock, label: "5 Minutes", sublabel: "Quick & Easy" },
            { icon: Brain, label: "AI Analysis", sublabel: "Smart Engine" },
            { icon: Target, label: "Action Plan", sublabel: "30-Day Roadmap" },
            { icon: Shield, label: "No Data Stored", sublabel: "100% Private" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white/5 border border-white/5"
            >
              <item.icon size={20} className="text-brand-300" />
              <span className="text-xs font-medium">{item.label}</span>
              <span className="text-[10px] text-white/40">{item.sublabel}</span>
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
          className="mt-8 text-xs text-white/30"
        >
          Trusted by 1000+ students across India
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
