import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";

interface BlogLayoutProps {
  title: string;
  description: string;
  date: string;
  readTime: string;
  author?: string;
  children: React.ReactNode;
}

export default function BlogLayout({
  title,
  description,
  date,
  readTime,
  author = "Career Clarity AI Team",
  children,
}: BlogLayoutProps) {
  return (
    <main className="min-h-screen px-4 py-10 md:py-14">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-violet-700 transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          All articles
        </Link>

        <article className="premium-card p-6 md:p-10">
          <header className="mb-8 pb-6 border-b border-slate-100">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-3 leading-tight">
              {title}
            </h1>
            <p className="text-base text-slate-600 leading-relaxed mb-4">
              {description}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <User size={13} />
                {author}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={13} />
                {date}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock size={13} />
                {readTime}
              </span>
            </div>
          </header>

          <div className="policy-content space-y-6 text-slate-700 leading-relaxed">
            {children}
          </div>

          {/* CTA */}
          <div className="mt-10 p-6 rounded-2xl bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200/60 text-center">
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Ready to Find Your Perfect Career?
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              Take our AI-powered career assessment — 12 questions, 5 minutes, personalized results.
            </p>
            <Link
              href="/"
              className="btn-primary text-sm px-6 py-3"
            >
              Start Free Assessment →
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}
