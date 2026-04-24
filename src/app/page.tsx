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

  const startNow = () => setShowLanguageModal(true);

  // One-click start — no modals, straight to quiz
  const startInLanguage = (lang: Language) => {
    setLanguage(lang);
    router.push("/quiz");
  };

  return (
    <main className="min-h-screen flex flex-col items-center relative">

      {/* ═══════════ 1. HERO SECTION ═══════════ */}
      <section className="w-full px-4 pt-12 sm:pt-16 pb-16 text-center">
        <div className="max-w-4xl mx-auto">
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

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight mb-5">
              <span className="gradient-text">Get Clear Career Direction</span>
              <br />
              <span className="text-slate-900">in Just 5 Minutes</span>
            </h1>
            <p className="text-base md:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed mb-8">
              Answer 12 simple questions and get a personalized AI report with your best career path, strengths, and next steps.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center gap-3"
          >
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => startInLanguage("en")}
                className="btn-primary text-base px-8 py-4"
              >
                Start Free Quiz
                <ArrowRight size={18} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => startInLanguage("hi")}
                className="btn-primary text-base px-8 py-4 bg-white text-slate-900 border-2 border-slate-900 hover:bg-slate-50"
                style={{ background: "white", color: "#0f172a" }}
              >
                हिंदी में शुरू करें
                <ArrowRight size={18} />
              </motion.button>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-3 text-xs text-slate-600">
              <span className="flex items-center gap-1"><CheckCircle size={13} className="text-emerald-500" /> Quiz is 100% FREE</span>
              <span className="flex items-center gap-1"><CheckCircle size={13} className="text-emerald-500" /> Takes 5 minutes</span>
              <span className="flex items-center gap-1"><CheckCircle size={13} className="text-emerald-500" /> No signup needed</span>
            </div>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5"
          >
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
            <div className="flex flex-col items-center sm:items-start">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                ))}
                <span className="ml-2 text-sm font-bold text-slate-900">4.9</span>
              </div>
              <span className="text-xs text-slate-500">
                from <span className="font-semibold text-slate-700">2,400+</span> students
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ 2. PROBLEM SECTION ═══════════ */}
      <section className="w-full px-4 py-14 bg-white/60">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
              Why Are You Still Confused About Your Career?
            </h2>
            <div className="grid sm:grid-cols-3 gap-4 mt-8 text-left">
              {[
                { emoji: "👥", text: "You follow what others say", sub: "Parents, friends, relatives — everyone has an opinion except you." },
                { emoji: "📈", text: "You choose based on trends", sub: "Engineering because it's 'safe'. MBA because everyone does it." },
                { emoji: "🧠", text: "You don't understand your own thinking", sub: "You've never analyzed how you actually think, decide, or work." },
              ].map((item, i) => (
                <div key={i} className="soft-card p-5">
                  <div className="text-2xl mb-3">{item.emoji}</div>
                  <div className="text-sm font-bold text-slate-900 mb-1">{item.text}</div>
                  <div className="text-xs text-slate-500 leading-relaxed">{item.sub}</div>
                </div>
              ))}
            </div>
            <div className="mt-8 p-4 rounded-xl bg-rose-50 border border-rose-200">
              <p className="text-sm font-semibold text-rose-800">
                Result: Confusion, wrong decisions, wasted years.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ 3. SOLUTION SECTION ═══════════ */}
      <section className="w-full px-4 py-14">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
              Now Get Clarity &mdash; Not Guesswork
            </h2>
            <p className="text-base text-slate-600 max-w-xl mx-auto leading-relaxed mb-8">
              Our AI analyzes how you think, decide, and work &mdash; and gives you a clear career direction that actually fits <strong>you</strong>.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
              {[
                { icon: Clock, label: "5 Minutes", sublabel: "Quick & Easy", color: "text-violet-600", bg: "bg-violet-50" },
                { icon: Brain, label: "AI Analysis", sublabel: "GPT-4 Powered", color: "text-fuchsia-600", bg: "bg-fuchsia-50" },
                { icon: Target, label: "Action Plan", sublabel: "30-Day Roadmap", color: "text-indigo-600", bg: "bg-indigo-50" },
                { icon: Shield, label: "100% Private", sublabel: "No Data Stored", color: "text-emerald-600", bg: "bg-emerald-50" },
              ].map((item, i) => (
                <div key={i} className="soft-card flex flex-col items-center gap-2 p-4">
                  <div className={`w-10 h-10 rounded-lg ${item.bg} flex items-center justify-center`}>
                    <item.icon size={18} className={item.color} />
                  </div>
                  <span className="text-xs font-semibold text-slate-900">{item.label}</span>
                  <span className="text-[10px] text-slate-500">{item.sublabel}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ 4. WHAT YOU GET ═══════════ */}
      <section className="w-full px-4 py-14 bg-white/60">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-8 text-center">
              What You&apos;ll Get in Your Report
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: Sparkles, title: "Your Personality Breakdown", desc: "Understand how you think, decide, and work best", color: "text-violet-600", bg: "bg-violet-50" },
                { icon: FileText, title: "Top 3 Career Paths", desc: "Clear suggestions based on your natural strengths", color: "text-indigo-600", bg: "bg-indigo-50" },
                { icon: Ban, title: "Careers You Should Avoid", desc: "Avoid wasting years in the wrong direction", color: "text-rose-600", bg: "bg-rose-50" },
                { icon: Zap, title: "30-Day Action Plan", desc: "Exact next steps to start immediately", color: "text-amber-600", bg: "bg-amber-50" },
              ].map((item, i) => (
                <div key={i} className="premium-card p-5 flex items-start gap-4 text-left">
                  <div className={`w-11 h-11 rounded-xl ${item.bg} flex items-center justify-center shrink-0`}>
                    <item.icon size={20} className={item.color} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900 mb-0.5">{item.title}</div>
                    <div className="text-xs text-slate-500 leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ 5. SAMPLE PREVIEW ═══════════ */}
      <section className="w-full px-4 py-14">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">
              See What Your Report Looks Like
            </h2>
            <p className="text-sm text-slate-500 mb-8">
              Simple, clear, and actionable &mdash; no confusing jargon.
            </p>
            <div className="premium-card p-2 sm:p-4 overflow-hidden">
              <Image
                src="/career_clarity_ai_report.png"
                alt="Career Clarity AI Report Preview - sample career guidance report"
                width={800}
                height={500}
                className="w-full h-auto rounded-xl"
                priority
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ 6. PRICING SECTION ═══════════ */}
      <section className="w-full px-4 py-14 bg-white/60">
        <div className="max-w-md mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6">
              Get Your Career Clarity Today
            </h2>
            <div className="premium-card p-8">
              <div className="flex items-baseline justify-center gap-2 mb-4">
                <span className="text-xl text-slate-400 line-through font-semibold">&#8377;299</span>
                <span className="text-5xl font-extrabold text-slate-900">&#8377;99</span>
                <span className="text-sm font-semibold text-slate-500">only</span>
              </div>
              <span className="inline-block text-[11px] font-bold bg-rose-100 text-rose-700 px-3 py-1 rounded-full mb-6">67% OFF &mdash; Limited Time</span>
              <div className="space-y-2.5 text-left mb-6">
                {[
                  "Full AI Career Report",
                  "Personalized Insights",
                  "Career Direction + Matches",
                  "30-Day Action Plan",
                  "Email Delivery",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-sm text-slate-700">
                    <CheckCircle size={16} className="text-emerald-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => startInLanguage("en")}
                className="btn-primary w-full py-4 text-base"
              >
                Start Free Quiz Now
                <ArrowRight size={18} />
              </motion.button>
              <p className="text-xs text-slate-500 mt-3">Instant result after payment &middot; No signup needed</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ 7. RISK REVERSAL ═══════════ */}
      <section className="w-full px-4 py-10">
        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-center">
              <p className="text-sm text-amber-900 leading-relaxed">
                <strong>This is not a prediction of your future</strong> &mdash; it&apos;s a direction based on your thinking style. Use it to make better decisions. If it doesn&apos;t help you, don&apos;t use it. No pressure.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ 8. TRUST SECTION ═══════════ */}
      <section className="w-full px-4 py-10 bg-white/60">
        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
              {[
                { icon: Shield, label: "No data stored", color: "text-emerald-600" },
                { icon: Lock, label: "Private & secure", color: "text-violet-600" },
                { icon: Zap, label: "Instant access", color: "text-amber-600" },
                { icon: BadgeCheck, label: "Cashfree verified", color: "text-indigo-600" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-slate-700">
                  <item.icon size={16} className={item.color} />
                  <span className="font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ 9. TESTIMONIALS ═══════════ */}
      <section className="w-full px-4 py-14">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="sr-only">What Students Say About Career Clarity AI</h2>
            <div className="grid md:grid-cols-3 gap-4 text-left">
              {[
                {
                  quote: "Helped me realize I was chasing the wrong career. The action plan actually gave me next steps, not just theory.",
                  name: "Rahul S.",
                  role: "B.Tech, 3rd year \u00b7 Delhi",
                  initial: "R",
                  color: "from-violet-400 to-purple-500",
                },
                {
                  quote: "Worth every rupee. I got more clarity in 5 minutes than in months of overthinking. Shared it with my friends too.",
                  name: "Priya M.",
                  role: "BBA Student \u00b7 Mumbai",
                  initial: "P",
                  color: "from-pink-400 to-rose-500",
                },
                {
                  quote: "The Hindi option made it easy for my parents to read. The career suggestions actually matched my personality.",
                  name: "Ankit K.",
                  role: "12th pass \u00b7 Jaipur",
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
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ 10. FINAL CTA ═══════════ */}
      <section className="w-full px-4 py-16 bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
              Stop Overthinking. Start Understanding Yourself.
            </h2>
            <p className="text-sm text-slate-600 mb-6">Takes less than 5 minutes. Instant result after payment.</p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => startInLanguage("en")}
              className="btn-primary text-base px-8 py-4"
            >
              Start Free Quiz &rarr; Get Clarity
              <ArrowRight size={18} />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ SEO CONTENT (crawlable) ═══════════ */}
      <section className="max-w-3xl mx-auto mt-16 px-4 text-left pb-8">
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
        <h3 className="text-lg font-semibold text-slate-800 mb-2">Best Career Guidance After 10th, 12th &amp; College</h3>
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
