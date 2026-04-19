import Link from "next/link";
import { ArrowLeft, Mail, MapPin, Clock, Building2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Clarify Path — the team behind Career Clarity AI. Email support, address, and response times for career guidance queries.",
  alternates: { canonical: "https://clarifypath.com/contact" },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen px-4 py-10 md:py-14">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-violet-700 transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          Back to home
        </Link>

        <div className="premium-card p-6 md:p-10">
          <div className="mb-8 pb-6 border-b border-slate-100">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-2">
              Contact Us
            </h1>
            <p className="text-base text-slate-600">
              We&apos;d love to hear from you. Questions, feedback, or refund requests — reach out below.
            </p>
          </div>

          {/* Contact methods grid */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {/* Email */}
            <a
              href="mailto:clarifypathsupport@gmail.com"
              className="group p-5 rounded-xl bg-white border border-slate-200 hover:border-violet-300 hover:shadow-md hover:shadow-violet-100/50 transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center mb-3 group-hover:bg-violet-200 transition-colors">
                <Mail size={20} className="text-violet-700" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">Email Support</h3>
              <p className="text-sm text-slate-600 mb-2 leading-relaxed">
                Best way to reach us. We reply within 24 hours.
              </p>
              <p className="text-sm font-semibold text-violet-700 break-all">
                clarifypathsupport@gmail.com
              </p>
            </a>

            {/* Address */}
            <div className="p-5 rounded-xl bg-white border border-slate-200">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center mb-3">
                <MapPin size={20} className="text-emerald-700" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">Business Address</h3>
              <p className="text-sm text-slate-600 mb-2 leading-relaxed">
                Our registered location for all official correspondence.
              </p>
              <p className="text-sm font-semibold text-slate-800">
                Meerut, Uttar Pradesh, India
              </p>
            </div>

            {/* Response time */}
            <div className="p-5 rounded-xl bg-white border border-slate-200">
              <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center mb-3">
                <Clock size={20} className="text-indigo-700" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">Response Time</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Monday – Saturday, 10:00 AM – 7:00 PM IST.
                We typically respond within 24 business hours.
              </p>
            </div>

            {/* Business */}
            <div className="p-5 rounded-xl bg-white border border-slate-200">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center mb-3">
                <Building2 size={20} className="text-amber-700" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">Business Name</h3>
              <p className="text-sm text-slate-600 mb-2 leading-relaxed">
                Career Clarity AI is operated by:
              </p>
              <p className="text-sm font-semibold text-slate-800">Clarify Path</p>
            </div>
          </div>

          {/* FAQ helper */}
          <div className="p-5 rounded-xl bg-violet-50 border border-violet-200">
            <h3 className="text-sm font-bold text-slate-900 mb-2">
              Looking for something specific?
            </h3>
            <ul className="space-y-1.5 text-sm text-slate-700">
              <li>
                &bull; For <strong>refund requests</strong>, see our{" "}
                <Link href="/refunds" className="text-violet-700 font-semibold underline">
                  Refunds &amp; Cancellations Policy
                </Link>
              </li>
              <li>
                &bull; For <strong>privacy questions</strong>, see our{" "}
                <Link href="/privacy" className="text-violet-700 font-semibold underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                &bull; For <strong>usage terms</strong>, see our{" "}
                <Link href="/terms" className="text-violet-700 font-semibold underline">
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
