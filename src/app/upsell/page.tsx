"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Brain,
  Target,
  Ban,
  Zap,
  ArrowRight,
  Shield,
  CheckCircle,
  Clock,
  Sparkles,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { trackInitiateCheckout, trackPurchase } from "@/lib/meta-pixel";

declare global {
  interface Window {
    Cashfree: any;
  }
}

export default function UpsellPage() {
  const router = useRouter();
  const {
    language,
    report,
    isPaid,
    isUpgraded,
    answers,
    userEmail,
    setIsUpgraded,
    setPremiumReport,
    setIsAnalyzing,
  } = useApp();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (!language || !report) {
      router.push("/");
      return;
    }
    if (!isPaid) {
      router.push("/payment");
      return;
    }
    if (isUpgraded) {
      router.push("/report");
    }
  }, [language, report, isPaid, isUpgraded, router]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  if (!language || !report || !isPaid) return null;

  const generatePremiumReport = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch("/api/analyze-premium", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          basicReport: report,
          answers,
          language,
        }),
      });

      const data = await response.json();
      if (response.ok && data.premiumReport) {
        setPremiumReport(data.premiumReport);
        setIsUpgraded(true);
        router.push("/report");
      } else {
        alert(
          language === "hi"
            ? "Premium report generate करने में error हुआ। कृपया दोबारा try करें।"
            : "Error generating premium report. Please try again."
        );
      }
    } catch (error) {
      console.error("Premium report error:", error);
      alert(
        language === "hi"
          ? "कुछ problem हुई। कृपया दोबारा try करें।"
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUpgrade = async () => {
    setIsProcessing(true);

    try {
      const orderRes = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: 199,
          email: userEmail,
        }),
      });

      if (!orderRes.ok) throw new Error("Order creation failed");
      const orderData = await orderRes.json();

      if (!window.Cashfree) throw new Error("Cashfree SDK not loaded");

      const mode =
        process.env.NEXT_PUBLIC_CASHFREE_MODE === "production"
          ? "production"
          : "sandbox";

      const cashfree = window.Cashfree({ mode });
      trackInitiateCheckout(199);
      const result = await cashfree.checkout({
        paymentSessionId: orderData.paymentSessionId,
        redirectTarget: "_modal",
      });

      if (result.error) {
        console.error("Cashfree checkout error:", result.error);
        setIsProcessing(false);
        alert(
          language === "hi"
            ? "Payment cancel हुआ। कृपया दोबारा try करें।"
            : "Payment was cancelled. Please try again."
        );
        return;
      }

      const verifyRes = await fetch("/api/payment/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: orderData.orderId }),
      });

      const verifyData = await verifyRes.json();

      if (verifyRes.ok && verifyData.verified) {
        setIsProcessing(false);
        trackPurchase(199);
        await generatePremiumReport();
      } else {
        alert(
          language === "hi"
            ? "Payment verification fail हुआ। कृपया दोबारा try करें।"
            : "Payment verification failed. Please try again."
        );
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("Upgrade payment error:", error);
      setIsProcessing(false);
      alert(
        language === "hi"
          ? "Payment में कोई problem हुई। कृपया दोबारा try करें।"
          : "There was a payment issue. Please try again."
      );
    }
  };

  const handleDecline = () => {
    router.push("/report");
  };

  const t = language === "hi" ? {
    headline: "रुकिए… आपकी Report तैयार है, लेकिन यह ज़रूरी है",
    subheadline: "आप अपनी career direction देखने वाले हैं… लेकिन ज़्यादातर लोग यहाँ एक गलती करते हैं।",
    pain: "Direction मिलना अच्छा है… लेकिन बिना clear plan के, ज़्यादातर लोग फिर से confused हो जाते हैं।",
    offerIntro: "तो अपनी report देखने से पहले, यह unlock करें:",
    offerTitle: "Deep Career Clarity Upgrade",
    benefits: [
      { icon: Brain, title: "Detailed Personality Breakdown", desc: "अपनी strengths को गहराई से समझें" },
      { icon: Target, title: "Exact Skill Roadmap", desc: "Step-by-step कौन सी skills सीखें" },
      { icon: Sparkles, title: "Personalized Career Strategy", desc: "आपकी thinking style के basis पर आगे कैसे बढ़ें" },
      { icon: Ban, title: "Mistakes You Must Avoid", desc: "महीनों/सालों की गलत direction से बचें" },
    ],
    originalPrice: "₹499",
    price: "₹199",
    priceLabel: "सिर्फ आज",
    cta: "हाँ, मेरी Report Upgrade करें",
    decline: "नहीं धन्यवाद, basic report से continue करें",
    oneTime: "यह one-time offer है",
    noAgain: "यह page दोबारा नहीं दिखेगा",
    mostUpgrade: "ज़्यादातर users value देखने के बाद upgrade करते हैं",
    generating: "Premium Report Generate हो रही है...",
    secure: "Secure payment via Cashfree",
  } : {
    headline: "Wait… Your Report Is Ready, But This Is Important",
    subheadline: "You're about to see your career direction… But most people make a mistake here.",
    pain: "Getting direction is good… But without a clear plan, most people stay confused again.",
    offerIntro: "So before you see your report, unlock this:",
    offerTitle: "Deep Career Clarity Upgrade",
    benefits: [
      { icon: Brain, title: "Detailed Personality Breakdown", desc: "Understand your strengths deeply" },
      { icon: Target, title: "Exact Skill Roadmap", desc: "What skills to learn step-by-step" },
      { icon: Sparkles, title: "Personalized Career Strategy", desc: "How to move forward based on your thinking" },
      { icon: Ban, title: "Mistakes You Must Avoid", desc: "Save months/years of wrong direction" },
    ],
    originalPrice: "₹499",
    price: "₹199",
    priceLabel: "Today Only",
    cta: "Yes, Upgrade My Report",
    decline: "No thanks, I'll continue with basic report",
    oneTime: "One-time offer",
    noAgain: "You won't see this again",
    mostUpgrade: "Most users upgrade after seeing value",
    generating: "Generating your Premium Report...",
    secure: "Secure payment via Cashfree",
  };

  if (isGenerating) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-200"
          >
            <Sparkles size={28} className="text-white" />
          </motion.div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">{t.generating}</h2>
          <p className="text-sm text-slate-500">
            {language === "hi" ? "AI आपकी deep analysis कर रहा है..." : "AI is doing a deep analysis of your profile..."}
          </p>
          <div className="mt-4 w-48 mx-auto h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-violet-500 to-purple-600 rounded-full"
              animate={{ width: ["0%", "100%"] }}
              transition={{ duration: 12, ease: "linear" }}
            />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full"
      >
        {/* Urgency banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-2 mb-3 px-4 py-2 rounded-full bg-amber-50 border border-amber-200"
        >
          <Clock size={14} className="text-amber-700" />
          <span className="text-xs text-amber-800 font-semibold">{t.oneTime} &mdash; {t.noAgain}</span>
        </motion.div>

        <div className="premium-card p-8 text-center mb-4">
          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-2xl font-extrabold text-slate-900 mb-2 leading-tight">{t.headline}</h1>
            <p className="text-sm text-slate-500 leading-relaxed mb-6">{t.subheadline}</p>
          </motion.div>

          {/* Pain */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-4 rounded-xl bg-rose-50 border border-rose-200 mb-6"
          >
            <p className="text-sm text-rose-800 font-medium leading-relaxed">{t.pain}</p>
          </motion.div>

          {/* Offer intro */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-sm text-slate-600 mb-2">{t.offerIntro}</p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 text-white text-sm font-bold mb-6">
              <Sparkles size={14} />
              {t.offerTitle}
            </div>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-3 text-left mb-6"
          >
            {t.benefits.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-9 h-9 rounded-lg bg-violet-100 flex items-center justify-center shrink-0">
                  <item.icon size={16} className="text-violet-600" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">{item.title}</div>
                  <div className="text-xs text-slate-500">{item.desc}</div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Price */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-6"
          >
            <div className="flex items-baseline justify-center gap-2 mb-1">
              <span className="text-lg text-slate-400 line-through font-semibold">{t.originalPrice}</span>
              <span className="text-4xl font-extrabold text-slate-900">{t.price}</span>
            </div>
            <span className="inline-block text-[11px] font-bold bg-rose-100 text-rose-700 px-3 py-1 rounded-full">
              {t.priceLabel}
            </span>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleUpgrade}
              disabled={isProcessing}
              className="btn-primary w-full py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed mb-3"
            >
              {isProcessing ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Processing...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  {t.cta}
                  <ArrowRight size={18} />
                </span>
              )}
            </motion.button>

            <div className="flex items-center justify-center gap-2 text-xs text-slate-500 mb-4">
              <Shield size={12} />
              <span>{t.secure}</span>
            </div>

            <p className="text-xs text-emerald-600 font-medium mb-6">{t.mostUpgrade}</p>
          </motion.div>

          {/* Decline */}
          <button
            onClick={handleDecline}
            className="text-xs text-slate-400 hover:text-slate-600 transition-colors underline"
          >
            {t.decline}
          </button>
        </div>
      </motion.div>
    </main>
  );
}
