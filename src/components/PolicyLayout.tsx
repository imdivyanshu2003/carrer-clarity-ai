import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PolicyLayoutProps {
  title: string;
  subtitle?: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export default function PolicyLayout({
  title,
  subtitle,
  lastUpdated,
  children,
}: PolicyLayoutProps) {
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
              {title}
            </h1>
            {subtitle && (
              <p className="text-base text-slate-600">{subtitle}</p>
            )}
            <p className="text-xs text-slate-500 mt-3">
              Last updated: <span className="font-semibold">{lastUpdated}</span>
            </p>
          </div>

          <div className="policy-content space-y-6 text-slate-700 leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
