import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Sparkles,
  FileText,
  Ban,
  Zap,
  Mail,
  Shield,
  Clock,
  BadgeCheck,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing & Products | Career Clarity AI",
  description:
    "Career Clarity AI Report — ₹49 INR. One-time payment, instant AI-generated career guidance with a 30-day action plan.",
};

export default function PricingPage() {
  const features = [
    { icon: Sparkles, label: "Personality Summary", desc: "AI-analysed profile based on your answers" },
    { icon: FileText, label: "Top 3 Career Matches", desc: "Personalised career paths with reasoning" },
    { icon: Ban, label: "Careers to Avoid", desc: "Roles that don't match your profile + why" },
    { icon: Zap, label: "30-Day Action Plan", desc: "Skill to learn, a project to build, weekly breakdown" },
    { icon: Mail, label: "Email Delivery", desc: "Full report sent to your inbox" },
    { icon: BadgeCheck, label: "Downloadable PDF", desc: "Keep a copy, share with parents or mentors" },
  ];

  return (
    <main className="min-h-screen px-4 py-10 md:py-14">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-violet-700 transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          Back to home
        </Link>

        {/* Header */}
        <div className="text-center mb-10">
          <div className="chip mb-4 mx-auto">
            <Sparkles size={14} className="text-violet-600" />
            <span>Pricing &amp; Products</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-3">
            Simple, honest pricing.
          </h1>
          <p className="text-base md:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
            One product. One price. One-time payment. No subscriptions, no hidden fees.
          </p>
        </div>

        {/* Pricing card */}
        <div className="premium-card p-6 md:p-10 max-w-2xl mx-auto relative overflow-hidden">
          {/* Subtle gradient bg accent */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-violet-100 rounded-full blur-3xl opacity-40 -z-0" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">
                  Career Clarity Report
                </h2>
                <p className="text-sm text-slate-600">
                  AI-powered personalised career guidance
                </p>
              </div>
              <div className="chip !bg-emerald-50 !text-emerald-700 !border-emerald-200">
                <BadgeCheck size={14} />
                <span>Most Popular</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-slate-100">
              <span className="text-5xl md:text-6xl font-extrabold text-slate-900">
                &#8377;49
              </span>
              <span className="text-lg font-semibold text-slate-500">INR</span>
              <span className="text-sm text-slate-500 ml-2">
                /one-time &middot; incl. taxes
              </span>
            </div>

            {/* Features */}
            <div className="space-y-3 mb-8">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                What&apos;s included
              </p>
              {features.map((f, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center shrink-0 mt-0.5">
                    <f.icon size={15} className="text-violet-700" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">{f.label}</div>
                    <div className="text-xs text-slate-500 leading-relaxed">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="/"
              className="btn-primary w-full !py-4 text-base"
            >
              Start Free Assessment
              <ArrowRight size={18} />
            </Link>
            <p className="text-center text-xs text-slate-500 mt-3">
              Take the 5-minute assessment first. Pay only when you want to unlock the full report.
            </p>
          </div>
        </div>

        {/* Trust row */}
        <div className="mt-8 grid sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
          <div className="soft-card p-4 flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
              <Clock size={16} className="text-emerald-700" />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900">Instant delivery</div>
              <div className="text-xs text-slate-500">Unlocks immediately after payment</div>
            </div>
          </div>
          <div className="soft-card p-4 flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-violet-100 flex items-center justify-center shrink-0">
              <Shield size={16} className="text-violet-700" />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900">24-hr refund</div>
              <div className="text-xs text-slate-500">Full refund, no questions asked</div>
            </div>
          </div>
          <div className="soft-card p-4 flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0">
              <BadgeCheck size={16} className="text-indigo-700" />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900">Secure payment</div>
              <div className="text-xs text-slate-500">Powered by Cashfree (RBI-approved)</div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-12 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-5 text-center">
            Frequently asked questions
          </h2>
          <div className="space-y-3">
            {[
              {
                q: "Is this a subscription?",
                a: "No. It's a one-time payment of ₹49 INR for a single personalised report. We will never charge you again.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept UPI, debit/credit cards, net banking, and popular Indian wallets — all securely processed by Cashfree Payments.",
              },
              {
                q: "Will I get an invoice?",
                a: "Yes, Cashfree sends a payment receipt to your email automatically. If you need a GST invoice, email us at clarifypathsupport@gmail.com.",
              },
              {
                q: "What if I'm not satisfied?",
                a: "Email us within 24 hours of payment at clarifypathsupport@gmail.com for a full refund. No questions asked. See our Refunds Policy for details.",
              },
              {
                q: "Is my data private?",
                a: "Yes. We don't store your card details (Cashfree handles that) and we only use your quiz answers to generate your report. Read our Privacy Policy for full details.",
              },
            ].map((item, i) => (
              <div key={i} className="soft-card p-5">
                <div className="flex items-start gap-3 mb-1.5">
                  <Check size={16} className="text-violet-600 mt-1 shrink-0" />
                  <h3 className="text-sm font-bold text-slate-900">{item.q}</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed pl-7">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
