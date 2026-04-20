"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, ArrowRight, Clock, Brain, Target, Shield, X, Star, Quote, Lock, BadgeCheck, FileText, Zap, Ban, CheckCircle } from "lucide-react";
import Image from "next/image";
import LanguageSelector from "@/components/LanguageSelector";
import DisclaimerModal from "@/components/DisclaimerModal";
import { useApp } from "@/context/AppContext";
import { Language } from "@/lib/types";

export default function LandingPage() {
  const router = useRouter();
  const { setLanguage } = useApp();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [selectedLang, setSelectedLang] = useState<Language | null>(null);

  const handleLanguageSelect = (lang: Language) => {
    setSelectedLang(lang);
    setShowLanguageModal(false);
    setShowDisclaimer(true);
  };

  const handleAcceptDisclaimer = () => {
    if (selectedLang) {
      setLanguage(selectedLang);
      router.push("/quiz");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-12 sm:py-16 relative">
      <div className="relative z-10 max-w-5xl mx-auto text-center w-full">
        {/* Brand chip */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex justify-center"
        >
          <div className="chip">
            <Image src="/logo_2.png" alt="Career Clarity AI - AI career guidance tool" width={36} height={36} className="w-9 h-9 object-contain" />
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
            <span className="gradient-text">Clear Career Direction</span>
            <br />
            <span className="text-slate-900">in 5 Minutes.</span>
          </h1>
          <p className="text-base md:text-lg text-slate-600 max-w-lg mx-auto leading-relaxed">
            Stop guessing. Answer 12 smart questions and get your personalized career report — with top career matches, personality insights &amp; a 30-day action plan.
          </p>
        </motion.div>

        {/* Features grid */}
        <h2 className="sr-only">Why Choose Career Clarity AI for Career Guidance</h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10 max-w-2xl mx-auto"
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

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col items-center gap-3"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowLanguageModal(true)}
            className="btn-primary text-base px-8 py-4"
          >
            Get Your Career Report
            <ArrowRight size={18} />
          </motion.button>
          <div className="flex flex-col items-center gap-1 mt-1">
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-400 line-through">&#8377;299</span>
              <span className="text-sm font-bold text-violet-700">&#8377;99 only</span>
              <span className="text-[10px] font-semibold bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full">67% OFF</span>
            </div>
            <p className="text-xs text-slate-500">
              Takes 5 minutes &middot; No signup required
            </p>
          </div>
        </motion.div>

        {/* Social proof — avatars + rating */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5"
        >
          {/* Avatar stack */}
          <div className="flex -space-x-2">
            {[
              "bg-gradient-to-br from-violet-400 to-purple-500",
              "bg-gradient-to-br from-pink-400 to-rose-500",
              "bg-gradient-to-br from-amber-400 to-orange-500",
              "bg-gradient-to-br from-emerald-400 to-teal-500",
              "bg-gradient-to-br from-sky-400 to-indigo-500",
            ].map((bg, i) => (
              <div
                key={i}
                className={`w-8 h-8 rounded-full ${bg} border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-sm`}
              >
                {["R", "P", "A", "S", "N"][i]}
              </div>
            ))}
          </div>
          {/* Rating */}
          <div className="flex flex-col items-center sm:items-start">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
              ))}
              <span className="ml-2 text-sm font-bold text-slate-900">4.9</span>
            </div>
            <span className="text-xs text-slate-500">
              from <span className="font-semibold text-slate-700">1,247</span> students
            </span>
          </div>
        </motion.div>

        {/* Testimonials */}
        <h2 className="sr-only">What Students Say About Career Clarity AI</h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12 grid md:grid-cols-3 gap-4 text-left"
        >
          {[
            {
              quote: "Helped me realize I was chasing the wrong career. The action plan actually gave me next steps, not just theory.",
              name: "Rahul S.",
              role: "B.Tech, 3rd year · Delhi",
              initial: "R",
              color: "from-violet-400 to-purple-500",
            },
            {
              quote: "Worth every rupee. I got more clarity in 5 minutes than in months of overthinking. Shared it with my friends too.",
              name: "Priya M.",
              role: "BBA Student · Mumbai",
              initial: "P",
              color: "from-pink-400 to-rose-500",
            },
            {
              quote: "The Hindi option made it easy for my parents to read. The career suggestions actually matched my personality.",
              name: "Ankit K.",
              role: "12th pass · Jaipur",
              initial: "A",
              color: "from-amber-400 to-orange-500",
            },
          ].map((t, i) => (
            <div key={i} className="premium-card p-5 relative">
              <Quote size={22} className="text-violet-200 absolute top-4 right-4" />
              <div className="flex items-center gap-0.5 mb-3">
                {[...Array(5)].map((_, s) => (
                  <Star key={s} size={12} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-slate-700 leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-sm font-bold`}>
                  {t.initial}
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* What You Get — Report Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="mt-14 max-w-2xl mx-auto"
        >
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 text-center">
            What You Get in Your Report
          </h2>
          <p className="text-sm text-slate-500 mb-6 text-center">
            A career counsellor charges &#8377;2,000&ndash;10,000. You get the same clarity for &#8377;99.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { icon: Sparkles, title: "Personality Insights", desc: "AI-analyzed summary of your thinking style, strengths & work preferences", color: "text-violet-600", bg: "bg-violet-50" },
              { icon: FileText, title: "Top 3 Career Matches", desc: "Personalized career paths with real-world reasoning & salary context", color: "text-indigo-600", bg: "bg-indigo-50" },
              { icon: Ban, title: "Careers to Avoid", desc: "Paths that don't match your personality — and exactly why", color: "text-rose-600", bg: "bg-rose-50" },
              { icon: Zap, title: "30-Day Action Plan", desc: "Weekly breakdown: skill to learn, project to build, steps to take", color: "text-amber-600", bg: "bg-amber-50" },
            ].map((item, i) => (
              <div key={i} className="soft-card p-4 flex items-start gap-3 text-left">
                <div className={`w-10 h-10 rounded-lg ${item.bg} flex items-center justify-center shrink-0`}>
                  <item.icon size={18} className={item.color} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">{item.title}</div>
                  <div className="text-xs text-slate-500 leading-relaxed">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <CheckCircle size={16} className="text-emerald-600" />
              <span className="text-sm font-semibold text-emerald-800">Risk-Free Guarantee</span>
            </div>
            <p className="text-xs text-emerald-700">
              Not satisfied? Get a 100% refund within 24 hours. No questions asked.
            </p>
          </div>
        </motion.div>

        {/* Trust badges row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-600"
        >
          <div className="flex items-center gap-1.5">
            <Lock size={13} className="text-emerald-600" />
            <span className="font-medium">SSL Secured</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-slate-300" />
          <div className="flex items-center gap-1.5">
            <Shield size={13} className="text-violet-600" />
            <span className="font-medium">100% Private</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-slate-300" />
          <div className="flex items-center gap-1.5">
            <BadgeCheck size={13} className="text-indigo-600" />
            <span className="font-medium">Cashfree Verified</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-slate-300" />
          <div className="flex items-center gap-1.5">
            <Sparkles size={13} className="text-fuchsia-600" />
            <span className="font-medium">GPT-4 Powered</span>
          </div>
        </motion.div>
      </div>

      {/* SEO Content Section — crawlable by Google */}
      <section className="max-w-3xl mx-auto mt-20 px-4 text-left">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          AI-Powered Career Guidance for Indian Students
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          Career Clarity AI by Clarify Path is India&apos;s smartest career guidance tool for students and
          young professionals. Whether you&apos;re in 10th, 12th, college, or just starting out — our
          AI-powered career assessment helps you find the right career path in just 5 minutes.
        </p>
        <h3 className="text-lg font-semibold text-slate-800 mb-2">How It Works</h3>
        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          Answer 12 carefully designed questions about your personality, interests, and thinking style.
          Our AI engine (powered by GPT-4) analyzes your responses and generates a personalized career
          report — including your personality summary, top 3 career matches with reasoning, careers to
          avoid, and a detailed 30-day action plan to get started.
        </p>
        <h3 className="text-lg font-semibold text-slate-800 mb-2">Why Students Trust Us</h3>
        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          Over 2,400 students across India have used Career Clarity AI for career guidance. Available in
          both Hindi and English, our assessment is quick, private, and affordable at just ₹99. No
          signup required — start your career test now and get instant results.
        </p>
        <h3 className="text-lg font-semibold text-slate-800 mb-2">What You Get</h3>
        <ul className="text-sm text-slate-600 leading-relaxed mb-4 list-disc list-inside space-y-1">
          <li>Detailed personality summary based on AI analysis</li>
          <li>Top 3 career recommendations with real-world context</li>
          <li>Careers to avoid and why they don&apos;t match your profile</li>
          <li>30-day action plan with weekly breakdown</li>
          <li>Report delivered instantly + sent to your email</li>
        </ul>
        <h3 className="text-lg font-semibold text-slate-800 mb-2">Best Career Guidance After 10th, 12th & College</h3>
        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          Confused about what to do after 12th? Not sure which career options are best for Science,
          Commerce, or Arts students? Career Clarity AI is the best career guidance website in India
          for students who want clear, personalized career direction — not generic advice. Our AI career
          aptitude test analyzes your unique personality and gives you career options that actually
          match who you are. Whether you&apos;re looking for career counselling online, a free career quiz,
          or a psychometric career test — Clarify Path has you covered.
        </p>
        <h3 className="text-lg font-semibold text-slate-800 mb-2">Frequently Asked Questions</h3>
        <p className="text-sm text-slate-600 leading-relaxed mb-2">
          <strong>Which career is best for me?</strong> That depends on your personality, not your marks.
          Take our 5-minute AI career assessment to find your ideal career path based on your strengths and thinking style.
        </p>
        <p className="text-sm text-slate-600 leading-relaxed mb-2">
          <strong>How much does career counselling cost?</strong> Traditional career counsellors charge
          ₹2,000–10,000 per session. Career Clarity AI gives you a detailed, AI-powered career report for just ₹99.
        </p>
        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          <strong>Is this career test available in Hindi?</strong> Yes! Career Clarity AI supports both
          Hindi and English. Choose your preferred language before starting the assessment.
        </p>
      </section>

      {/* Language Selection Modal */}
      <AnimatePresence>
        {showLanguageModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowLanguageModal(false)}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-8 max-w-md w-full border border-slate-200 shadow-2xl relative"
            >
              <button
                onClick={() => setShowLanguageModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>

              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-slate-900 mb-1">
                  Let&apos;s get started
                </h2>
                <p className="text-sm text-slate-500">
                  Which language would you prefer?
                </p>
              </div>

              <LanguageSelector onSelect={handleLanguageSelect} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
