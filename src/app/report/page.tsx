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
import Image from "next/image";
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
      <div className="sticky top-0 z-40 bg-gradient-to-b from-slate-50/95 via-slate-50/80 to-transparent backdrop-blur-md pb-4 no-print">
        <div className="max-w-2xl mx-auto flex flex-col gap-2 pt-2">
          {/* Email status banner */}
          {userEmail && (
            <div className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-medium border ${
              emailSent ? "bg-emerald-50 text-emerald-700 border-emerald-200" : emailSending ? "bg-violet-50 text-violet-700 border-violet-200" : "bg-slate-50 text-slate-600 border-slate-200"
            }`}>
              {emailSending ? (
                <>
                  <div className="w-3 h-3 border-2 border-violet-300 border-t-violet-600 rounded-full animate-spin" />
                  {language === "hi" ? `${userEmail} पर report भेज रहे हैं...` : `Sending report to ${userEmail}...`}
                </>
              ) : emailSent ? (
                <>
                  <CheckCircle size={13} />
                  {language === "hi" ? `Report ${userEmail} पर भेज दी गई!` : `Report sent to ${userEmail}!`}
                </>
              ) : (
                <>
                  <Mail size={13} />
                  <button onClick={sendReportEmail} className="underline hover:text-violet-700">
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
              className="btn-primary flex-1 !py-3 !text-sm"
            >
              <Download size={16} />
              {t.download}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleShareReport}
              className="btn-secondary flex-1 !py-3 !text-sm"
            >
              <Share2 size={16} />
              {t.share}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Report Content */}
      <div ref={reportRef} className="max-w-2xl mx-auto space-y-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-6"
        >
          <div className="chip mb-4">
            <Image src="/logo.png" alt="Logo" width={20} height={20} className="w-5 h-5 object-contain" />
            <span>Career Clarity AI</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">{t.title}</h1>
        </motion.div>

        {/* Personality Summary */}
        <ReportSection
          icon={Brain}
          title={t.personality}
          delay={0.1}
          accent="violet"
        >
          <p className="text-slate-700 leading-relaxed">
            {report.personalitySummary}
          </p>
        </ReportSection>

        {/* Strengths & Weaknesses */}
        <div className="grid md:grid-cols-2 gap-5">
          <ReportSection icon={TrendingUp} title={t.strengths} delay={0.2} accent="emerald">
            <ul className="space-y-2.5">
              {report.strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700 leading-relaxed">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-xs font-bold shrink-0 mt-0.5">+</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </ReportSection>

          <ReportSection icon={AlertTriangle} title={t.weaknesses} delay={0.25} accent="amber">
            <ul className="space-y-2.5">
              {report.weaknesses.map((w, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700 leading-relaxed">
                  <span className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 text-xs font-bold shrink-0 mt-0.5">!</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </ReportSection>
        </div>

        {/* Thinking Style */}
        <ReportSection icon={Brain} title={t.thinking} delay={0.3} accent="indigo">
          <p className="text-slate-700 leading-relaxed">
            {report.thinkingStyle}
          </p>
        </ReportSection>

        {/* Top 3 Careers */}
        <ReportSection icon={Target} title={t.topCareers} delay={0.35} accent="violet">
          <div className="space-y-3">
            {report.topCareers.map((career, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-gradient-to-br from-violet-50 to-white border border-violet-100"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center text-sm font-bold text-white shadow-md shadow-violet-200">
                    {i + 1}
                  </span>
                  <h4 className="font-bold text-lg text-slate-900">{career.title}</h4>
                </div>
                <div className="ml-0 space-y-3">
                  <div>
                    <p className="text-[10px] font-bold text-violet-700 uppercase tracking-wider mb-1">{t.whyFits}</p>
                    <p className="text-sm text-slate-700 leading-relaxed">{career.whyItFits}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider mb-1">{t.realWorld}</p>
                    <p className="text-sm text-slate-700 leading-relaxed">{career.realWorldContext}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ReportSection>

        {/* Avoid Careers */}
        <ReportSection icon={AlertTriangle} title={t.avoid} delay={0.4} accent="rose">
          <div className="space-y-2.5">
            {report.avoidCareers.map((career, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-rose-50 border border-rose-100 border-l-4 border-l-rose-400"
              >
                <h4 className="font-bold text-rose-900 mb-1">{career.title}</h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  <span className="text-xs font-bold text-rose-600">{t.reason}:</span>{" "}
                  {career.reason}
                </p>
              </div>
            ))}
          </div>
        </ReportSection>

        {/* Action Plan */}
        <ReportSection icon={Zap} title={t.actionPlan} delay={0.45} accent="amber">
          <div className="space-y-5">
            <div className="grid gap-2.5">
              <ActionItem label={t.skill} value={report.actionPlan.skillToLearn} color="violet" />
              <ActionItem label={t.project} value={report.actionPlan.smallProject} color="amber" />
              <ActionItem label={t.direction} value={report.actionPlan.direction} color="emerald" />
            </div>

            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-3">
                {t.weekly}
              </p>
              <div className="space-y-2">
                {report.actionPlan.weeklyBreakdown.map((week, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100"
                  >
                    <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
                      {i + 1}
                    </span>
                    <p className="text-sm text-slate-700 leading-relaxed">{week}</p>
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
          className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100"
        >
          <Shield size={16} className="text-slate-400 mt-0.5 shrink-0" />
          <p className="text-xs text-slate-500 leading-relaxed">{t.disclaimer}</p>
        </motion.div>

        {/* Start Over */}
        <div className="text-center pt-4 no-print">
          <button
            onClick={handleStartOver}
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-violet-700 transition-colors"
          >
            <RotateCcw size={14} />
            {t.startOver}
          </button>
        </div>
      </div>
    </main>
  );
}

const accentMap: Record<string, string> = {
  violet: "bg-violet-100 text-violet-700",
  emerald: "bg-emerald-100 text-emerald-700",
  amber: "bg-amber-100 text-amber-700",
  rose: "bg-rose-100 text-rose-700",
  indigo: "bg-indigo-100 text-indigo-700",
};

function ReportSection({
  icon: Icon,
  title,
  delay = 0,
  accent = "violet",
  children,
}: {
  icon: any;
  title: string;
  delay?: number;
  accent?: string;
  children: React.ReactNode;
}) {
  const accentClasses = accentMap[accent] || accentMap.violet;
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="premium-card p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${accentClasses}`}>
          <Icon size={18} />
        </div>
        <h3 className="font-bold text-slate-900 text-base">{title}</h3>
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
  const colorMap: Record<string, { bg: string; label: string; border: string }> = {
    violet: { bg: "bg-violet-50", label: "text-violet-700", border: "border-violet-100" },
    amber: { bg: "bg-amber-50", label: "text-amber-700", border: "border-amber-100" },
    emerald: { bg: "bg-emerald-50", label: "text-emerald-700", border: "border-emerald-100" },
  };
  const c = colorMap[color] || colorMap.violet;

  return (
    <div className={`p-3 rounded-xl border ${c.bg} ${c.border}`}>
      <p className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${c.label}`}>{label}</p>
      <p className="text-sm text-slate-800 leading-relaxed">{value}</p>
    </div>
  );
}
