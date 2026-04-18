"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, CheckCircle, Sparkles, FileText, Ban, Zap, Shield, Mail } from "lucide-react";
import { useApp } from "@/context/AppContext";

declare global {
  interface Window {
    Cashfree: any;
  }
}

export default function PaymentPage() {
  const router = useRouter();
  const { language, report, isPaid, setIsPaid, userEmail, setUserEmail } = useApp();
  const [isProcessing, setIsProcessing] = useState(false);
  const [emailInput, setEmailInput] = useState(userEmail || "");
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    if (!language || !report) {
      router.push("/");
      return;
    }
    if (isPaid) {
      router.push("/report");
    }
  }, [language, report, isPaid, router]);

  useEffect(() => {
    // Load Cashfree SDK
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

  if (!language || !report) return null;

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  };

  const validateInputs = () => {
    if (!validateEmail(emailInput)) {
      setEmailError(
        language === "hi"
          ? "कृपया सही Email ID डालें"
          : "Please enter a valid email address"
      );
      return false;
    }
    setEmailError("");
    return true;
  };

  const saveUserDetails = () => {
    setUserEmail(emailInput.trim());
  };

  const handlePayment = async () => {
    if (!validateInputs()) return;
    saveUserDetails();
    setIsProcessing(true);

    try {
      // Create Cashfree order
      const orderRes = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: 49,
          email: emailInput.trim(),
        }),
      });

      if (!orderRes.ok) throw new Error("Order creation failed");

      const orderData = await orderRes.json();

      if (!window.Cashfree) {
        throw new Error("Cashfree SDK not loaded");
      }

      const mode =
        process.env.NEXT_PUBLIC_CASHFREE_MODE === "production"
          ? "production"
          : "sandbox";

      const cashfree = window.Cashfree({ mode });

      const checkoutOptions = {
        paymentSessionId: orderData.paymentSessionId,
        redirectTarget: "_modal",
      };

      const result = await cashfree.checkout(checkoutOptions);

      if (result.error) {
        console.error("Cashfree checkout error:", result.error);
        setIsProcessing(false);
        alert(
          language === "hi"
            ? "Payment cancel हुआ या fail हुआ। कृपया दोबारा try करें।"
            : "Payment was cancelled or failed. Please try again."
        );
        return;
      }

      // Verify payment on server
      const verifyRes = await fetch("/api/payment/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: orderData.orderId }),
      });

      const verifyData = await verifyRes.json();

      if (verifyRes.ok && verifyData.verified) {
        setIsPaid(true);
        router.push("/report");
      } else {
        alert(
          language === "hi"
            ? "Payment verification failed। कृपया दोबारा try करें।"
            : "Payment verification failed. Please try again."
        );
      }
      setIsProcessing(false);
    } catch (error) {
      console.error("Payment error:", error);
      setIsProcessing(false);
      alert(
        language === "hi"
          ? "Payment में कोई problem हुई। कृपया दोबारा try करें।"
          : "There was a payment issue. Please try again."
      );
    }
  };

  // For demo/testing — skip payment
  const handleDemoAccess = () => {
    if (!validateInputs()) return;
    saveUserDetails();
    setIsPaid(true);
    router.push("/report");
  };

  const t = language === "hi" ? {
    ready: "आपकी Report तैयार है!",
    subtitle: "AI ने आपकी personality analyze करके एक detailed career guidance report बनाई है",
    includes: "Report में शामिल है:",
    personality: "Personality Summary",
    careers: "Top 3 Career Paths",
    avoid: "Careers to Avoid",
    action: "30-Day Action Plan",
    unlock: "Report Unlock करें",
    price: "₹49 में",
    secure: "Secure payment via Cashfree",
    disclaimer: "AI-based suggestions — professional counseling की जगह नहीं",
    demo: "Demo Access (Testing)",
    emailLabel: "आपकी Email ID",
    emailPlaceholder: "जैसे: name@gmail.com",
    emailHint: "Report इस email पर भेजी जाएगी",
  } : {
    ready: "Your Report is Ready!",
    subtitle: "AI has analyzed your personality and created a detailed career guidance report",
    includes: "Your report includes:",
    personality: "Personality Summary",
    careers: "Top 3 Career Paths",
    avoid: "Careers to Avoid",
    action: "30-Day Action Plan",
    unlock: "Unlock Your Report",
    price: "for ₹49",
    secure: "Secure payment via Cashfree",
    disclaimer: "AI-based suggestions — not a substitute for professional counseling",
    demo: "Demo Access (Testing)",
    emailLabel: "Your Email ID",
    emailPlaceholder: "e.g. name@gmail.com",
    emailHint: "Report will be delivered to this email",
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        {/* Report Ready Card */}
        <div className="glass-card p-8 text-center mb-4">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center"
          >
            <CheckCircle size={32} className="text-green-400" />
          </motion.div>

          <h1 className="text-2xl font-bold mb-2">{t.ready}</h1>
          <p className="text-sm text-white/50 mb-8">{t.subtitle}</p>

          {/* What's included */}
          <div className="text-left space-y-3 mb-8">
            <p className="text-xs text-white/40 uppercase tracking-wider mb-3">
              {t.includes}
            </p>
            {[
              { icon: Sparkles, label: t.personality },
              { icon: FileText, label: t.careers },
              { icon: Ban, label: t.avoid },
              { icon: Zap, label: t.action },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-500/20 flex items-center justify-center shrink-0">
                  <item.icon size={16} className="text-brand-300" />
                </div>
                <span className="text-sm">{item.label}</span>
                <Lock size={12} className="text-white/20 ml-auto" />
              </div>
            ))}
          </div>

          {/* Email Input (Required) */}
          <div className="text-left mb-6">
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
              <Mail size={14} className="text-brand-300" />
              {t.emailLabel} <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              value={emailInput}
              onChange={(e) => {
                setEmailInput(e.target.value);
                setEmailError("");
              }}
              placeholder={t.emailPlaceholder}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 
                         text-white placeholder-white/30 focus:outline-none focus:border-brand-400 
                         transition-colors text-sm"
            />
            {emailError && (
              <p className="text-xs text-red-400 mt-1">{emailError}</p>
            )}
            <p className="text-xs text-white/30 mt-1.5">{t.emailHint}</p>
          </div>

          {/* Payment Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 
                       hover:from-brand-600 hover:to-brand-700 transition-all font-semibold
                       text-lg disabled:opacity-50 disabled:cursor-not-allowed mb-3"
          >
            {isProcessing ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {language === "hi" ? "Processing..." : "Processing..."}
              </span>
            ) : (
              <span>
                {t.unlock} — {t.price}
              </span>
            )}
          </motion.button>

          <div className="flex items-center justify-center gap-2 text-xs text-white/30">
            <Shield size={12} />
            <span>{t.secure}</span>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-white/25 mb-4">{t.disclaimer}</p>

        {/* Demo button for testing */}
        <button
          onClick={handleDemoAccess}
          className="w-full py-2 text-xs text-white/20 hover:text-white/40 transition-colors"
        >
          {t.demo}
        </button>
      </motion.div>
    </main>
  );
}
