import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white/70 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <Image src="/logo_2.png" alt="Career Clarity AI" width={44} height={44} className="w-11 h-11 object-contain" />
              <span className="text-base font-bold text-slate-900">
                Career Clarity <span className="gradient-text">AI</span>
              </span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed max-w-sm mb-3">
              India&apos;s smartest AI career guidance tool. Take a quick career assessment,
              discover your ideal career path, and get a personalized 30-day action plan
              — all in 5 minutes. Trusted by 2,400+ students.
            </p>
            <p className="text-xs text-slate-500">
              A product by <span className="font-semibold text-slate-700">Clarify Path</span>
            </p>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Policies
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-sm text-slate-600 hover:text-violet-700 transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-slate-600 hover:text-violet-700 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/refunds" className="text-sm text-slate-600 hover:text-violet-700 transition-colors">
                  Refunds &amp; Cancellations
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Company
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/pricing" className="text-sm text-slate-600 hover:text-violet-700 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-slate-600 hover:text-violet-700 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <a
                  href="mailto:clarifypathsupport@gmail.com"
                  className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-violet-700 transition-colors break-all"
                >
                  <Mail size={12} />
                  Email Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-6 border-t border-slate-200 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>&copy; {year} Clarify Path. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin size={12} />
            <span>Meerut, Uttar Pradesh, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
