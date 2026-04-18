"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Download,
  Share2,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Zap,
  Brain,
  Target,
  ChevronRight,
  RotateCcw,
  Shield,
  Mail,
  CheckCircle,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { CareerReport, Language } from "@/lib/types";

export default function ReportPage() {
  const router = useRouter();
  const { language, report, isPaid, userEmail, reset } = useApp();
  const reportRef = useRef<HTMLDivElement>(null);
  const [emailSent, setEmailSent] = useState(false);
  const [emailSending, setEmailSending] = useState(false);

  useEffect(() => {
    if (!language || !report) {
      router.push("/");
      return;
    }
    if (!isPaid) {
      router.push("/payment");
    }
  }, [language, report, isPaid, router]);

  // Auto-send report via email on page load
  useEffect(() => {
    if (language && report && isPaid && userEmail && !emailSent) {
      sendReportEmail();
    }
  }, [language, report, isPaid, userEmail]);

  const sendReportEmail = async () => {
    if (!userEmail || emailSending) return;
    setEmailSending(true);
    try {
      await fetch("/api/send-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, report, language }),
      });
      setEmailSent(true);
    } catch (error) {
      console.error("Email send failed:", error);
    } finally {
      setEmailSending(false);
    }
  };

  if (!language || !report || !isPaid) return null;

  const handleDownloadPDF = async () => {
    const { generateReportPDF } = await import("@/lib/pdfGenerator");
    generateReportPDF(report, language);
  };

  const buildReportSummary = () => {
    if (language === "hi") {
      return (
        `*Career Clarity AI Report*\n\n` +
        `*Personality:* ${report.personalitySummary}\n\n` +
        `*Strengths:*\n${report.strengths.map((s) => `\u2705 ${s}`).join("\n")}\n\n` +
        `*Weaknesses:*\n${report.weaknesses.map((w) => `\u26A0\uFE0F ${w}`).join("\n")}\n\n` +
        `*Thinking Style:* ${report.thinkingStyle}\n\n` +
        `*Top 3 Careers:*\n${report.topCareers.map((c, i) => `${i + 1}. *${c.title}*\n   ${c.whyItFits}`).join("\n\n")}\n\n` +
        `*Avoid Careers:*\n${report.avoidCareers.map((c) => `\u274C *${c.title}* - ${c.reason}`).join("\n")}\n\n` +
        `*30-Day Action Plan:*\n` +
        `Skill: ${report.actionPlan.skillToLearn}\n` +
        `Project: ${report.actionPlan.smallProject}\n` +
        `Direction: ${report.actionPlan.direction}\n\n` +
        `${report.actionPlan.weeklyBreakdown.join("\n")}\n\n` +
        `---\n_Career Clarity AI \u2014 AI-based suggestions_`
      );
    }
    return (
      `*Career Clarity AI Report*\n\n` +
      `*Personality:* ${report.personalitySummary}\n\n` +
      `*Strengths:*\n${report.strengths.map((s) => `\u2705 ${s}`).join("\n")}\n\n` +
      `*Weaknesses:*\n${report.weaknesses.map((w) => `\u26A0\uFE0F ${w}`).join("\n")}\n\n` +
      `*Thinking Style:* ${report.thinkingStyle}\n\n` +
      `*Top 3 Careers:*\n${report.topCareers.map((c, i) => `${i + 1}. *${c.title}*\n   ${c.whyItFits}`).join("\n\n")}\n\n` +
      `*Avoid Careers:*\n${report.avoidCareers.map((c) => `\u274C *${c.title}* - ${c.reason}`).join("\n")}\n\n` +
      `*30-Day Action Plan:*\n` +
      `Skill: ${report.actionPlan.skillToLearn}\n` +
      `Project: ${report.actionPlan.smallProject}\n` +
      `Direction: ${report.actionPlan.direction}\n\n` +
      `${report.actionPlan.weeklyBreakdown.join("\n")}\n\n` +
      `---\n_Career Clarity AI \u2014 AI-based suggestions_`
    );
  };


  // Share report with friends/others
  const handleShareReport = () => {
    const summary = buildReportSummary();
    const url = `https://wa.me/?text=${encodeURIComponent(summary)}`;
    window.open(url, "_blank");
  };

  const handleStartOver = () => {
    reset();
    router.push("/");
  };

  const t = language === "hi"
    ? {
        title: "आपकी Career Clarity Report",
        personality: "Personality Summary",
        strengths: "आपकी Strengths",
        weaknesses: "Areas of Improvement",
        thinking: "Thinking Style",
        topCareers: "Top 3 Career Paths",
        whyFits: "यह आपके लिए क्यों सही है",
        realWorld: "Real-World Context",
        avoid: "इन Careers से बचें",
        reason: "कारण",
        actionPlan: "30-Day Action Plan",
        skill: "सीखने की Skill",
        project: "छोटा Project",
        direction: "Direction",
        weekly: "Weekly Breakdown",
        download: "PDF Download करें",
        share: "दोस्तों को Share करें",
        startOver: "दोबारा शुरू करें",
        disclaimer: "Disclaimer: यह AI-based suggestions हैं। ये professional career counseling की जगह नहीं ले सकतीं। इन्हें एक starting point की तरह use करें।",
      }
    : {
        title: "Your Career Clarity Report",
        personality: "Personality Summary",
        strengths: "Your Strengths",
        weaknesses: "Areas of Improvement",
        thinking: "Thinking Style",
        topCareers: "Top 3 Career Paths",
        whyFits: "Why it fits you",
        realWorld: "Real-World Context",
        avoid: "Careers to Avoid",
        reason: "Reason",
        actionPlan: "30-Day Action Plan",
        skill: "Skill to Learn",
        project: "Small Project",
        direction: "Direction",
        weekly: "Weekly Breakdown",
        download: "Download PDF",
        share: "Share with Friends",
        startOver: "Start Over",
        disclaimer: "Disclaimer: These are AI-based suggestions. They are not a substitute for professional career counseling. Use them as a starting point.",
      };

  return (
    <main className="min-h-screen px-4 py-8 pb-32">
      {/* Action buttons - sticky top */}
      <div className="sticky top-0 z-40 bg-gradient-to-b from-brand-700/90 to-transparent backdrop-blur-sm pb-4 no-print">
        <div className="max-w-2xl mx-auto flex flex-col gap-2">
          {/* Email status banner */}
          {userEmail && (
            <div className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs ${
              emailSent ? "bg-green-500/10 text-green-300" : emailSending ? "bg-brand-500/10 text-brand-300" : "bg-white/5 text-white/40"
            }`}>
              {emailSending ? (
                <>
                  <div className="w-3 h-3 border-2 border-brand-300/30 border-t-brand-300 rounded-full animate-spin" />
                  {language === "hi" ? `${userEmail} पर report भेज रहे हैं...` : `Sending report to ${userEmail}...`}
                </>
              ) : emailSent ? (
                <>
                  <CheckCircle size={12} />
                  {language === "hi" ? `Report ${userEmail} पर भेज दी गई!` : `Report sent to ${userEmail}!`}
                </>
              ) : (
                <>
                  <Mail size={12} />
                  <button onClick={sendReportEmail} className="underline hover:text-white/60">
                    {language === "hi" ? `${userEmail} पर report भेजें` : `Send report to ${userEmail}`}
                  </button>
                </>
              )}
            </div>
          )}

          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDownloadPDF}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/10 
                         hover:bg-white/20 transition-all text-sm font-medium border border-white/10"
            >
              <Download size={16} />
              {t.download}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleShareReport}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/10 
                         hover:bg-white/20 transition-all text-sm font-medium border border-white/10"
            >
              <Share2 size={16} />
              {t.share}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Report Content */}
      <div ref={reportRef} className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/20 border border-brand-500/30 mb-4">
            <Sparkles size={14} className="text-brand-300" />
            <span className="text-xs text-brand-200">Career Clarity AI</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">{t.title}</h1>
        </motion.div>

        {/* Personality Summary */}
        <ReportSection
          icon={Brain}
          title={t.personality}
          delay={0.1}
        >
          <p className="text-white/70 leading-relaxed">
            {report.personalitySummary}
          </p>
        </ReportSection>

        {/* Strengths & Weaknesses */}
        <div className="grid md:grid-cols-2 gap-4">
          <ReportSection icon={TrendingUp} title={t.strengths} delay={0.2}>
            <ul className="space-y-2">
              {report.strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                  <span className="text-green-400 mt-0.5 shrink-0">+</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </ReportSection>

          <ReportSection icon={AlertTriangle} title={t.weaknesses} delay={0.25}>
            <ul className="space-y-2">
              {report.weaknesses.map((w, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                  <span className="text-amber-400 mt-0.5 shrink-0">!</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </ReportSection>
        </div>

        {/* Thinking Style */}
        <ReportSection icon={Brain} title={t.thinking} delay={0.3}>
          <p className="text-white/70 leading-relaxed">
            {report.thinkingStyle}
          </p>
        </ReportSection>

        {/* Top 3 Careers */}
        <ReportSection icon={Target} title={t.topCareers} delay={0.35}>
          <div className="space-y-4">
            {report.topCareers.map((career, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-white/5 border border-white/10"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-8 h-8 rounded-full bg-brand-500/30 flex items-center justify-center text-sm font-bold text-brand-300">
                    {i + 1}
                  </span>
                  <h4 className="font-semibold text-lg">{career.title}</h4>
                </div>
                <div className="ml-11 space-y-2">
                  <div>
                    <p className="text-xs text-brand-300 mb-1">{t.whyFits}</p>
                    <p className="text-sm text-white/60">{career.whyItFits}</p>
                  </div>
                  <div>
                    <p className="text-xs text-accent-400 mb-1">{t.realWorld}</p>
                    <p className="text-sm text-white/60">{career.realWorldContext}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ReportSection>

        {/* Avoid Careers */}
        <ReportSection icon={AlertTriangle} title={t.avoid} delay={0.4}>
          <div className="space-y-3">
            {report.avoidCareers.map((career, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-red-500/5 border border-red-500/10"
              >
                <h4 className="font-medium text-red-300 mb-1">{career.title}</h4>
                <p className="text-sm text-white/50">
                  <span className="text-xs text-red-400">{t.reason}:</span>{" "}
                  {career.reason}
                </p>
              </div>
            ))}
          </div>
        </ReportSection>

        {/* Action Plan */}
        <ReportSection icon={Zap} title={t.actionPlan} delay={0.45}>
          <div className="space-y-4">
            <div className="grid gap-3">
              <ActionItem label={t.skill} value={report.actionPlan.skillToLearn} color="brand" />
              <ActionItem label={t.project} value={report.actionPlan.smallProject} color="accent" />
              <ActionItem label={t.direction} value={report.actionPlan.direction} color="green" />
            </div>

            <div>
              <p className="text-xs text-white/40 uppercase tracking-wider mb-3">
                {t.weekly}
              </p>
              <div className="space-y-2">
                {report.actionPlan.weeklyBreakdown.map((week, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-lg bg-white/5"
                  >
                    <span className="w-6 h-6 rounded-full bg-brand-500/20 flex items-center justify-center text-xs text-brand-300 shrink-0">
                      {i + 1}
                    </span>
                    <p className="text-sm text-white/60">{week}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ReportSection>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-start gap-2 p-4 rounded-xl bg-white/5 border border-white/5"
        >
          <Shield size={16} className="text-white/30 mt-0.5 shrink-0" />
          <p className="text-xs text-white/30 leading-relaxed">{t.disclaimer}</p>
        </motion.div>

        {/* Start Over */}
        <div className="text-center pt-4 no-print">
          <button
            onClick={handleStartOver}
            className="inline-flex items-center gap-2 text-sm text-white/30 hover:text-white/50 transition-colors"
          >
            <RotateCcw size={14} />
            {t.startOver}
          </button>
        </div>
      </div>
    </main>
  );
}

function ReportSection({
  icon: Icon,
  title,
  delay = 0,
  children,
}: {
  icon: any;
  title: string;
  delay?: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="glass-card p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <Icon size={18} className="text-brand-300" />
        <h3 className="font-semibold">{title}</h3>
      </div>
      {children}
    </motion.div>
  );
}

function ActionItem({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  const colorMap: Record<string, string> = {
    brand: "bg-brand-500/10 border-brand-500/20 text-brand-300",
    accent: "bg-accent-500/10 border-accent-500/20 text-accent-300",
    green: "bg-green-500/10 border-green-500/20 text-green-300",
  };

  return (
    <div className={`p-3 rounded-xl border ${colorMap[color] || colorMap.brand}`}>
      <p className="text-xs opacity-60 mb-1">{label}</p>
      <p className="text-sm text-white/70">{value}</p>
    </div>
  );
}
