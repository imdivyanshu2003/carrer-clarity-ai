import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Career Guidance Tips & Insights",
  description:
    "Read expert career guidance articles for Indian students. Tips on choosing the right career after 10th, 12th & college. AI-powered career advice by Clarify Path.",
  alternates: { canonical: "https://clarifypath.com/blog" },
  keywords: [
    "career guidance blog",
    "career tips for students India",
    "career advice blog",
    "career options India",
    "career after 12th blog",
    "student career planning tips",
    "AI career guidance blog",
  ],
};

const posts = [
  {
    slug: "best-career-options-after-12th",
    title: "Best Career Options After 12th in India (2026 Guide)",
    description:
      "Confused about what to do after 12th? Here are the top career options for Science, Commerce & Arts students in India — with salary, scope & action steps.",
    date: "20 April 2026",
    readTime: "8 min read",
    tags: ["Career After 12th", "Career Options"],
  },
  {
    slug: "how-to-choose-right-career",
    title: "How to Choose the Right Career Path — A Complete Student Guide",
    description:
      "Step-by-step guide to choosing a career that matches your personality, interests & strengths. Stop following the crowd — find YOUR ideal path.",
    date: "20 April 2026",
    readTime: "7 min read",
    tags: ["Career Guidance", "Students"],
  },
  {
    slug: "ai-career-guidance-future",
    title: "AI Career Guidance: How Technology is Changing Career Counselling in India",
    description:
      "Why AI-powered career assessments are replacing traditional counsellors. How tools like Career Clarity AI give better, faster & cheaper career advice.",
    date: "20 April 2026",
    readTime: "6 min read",
    tags: ["AI", "Career Counselling"],
  },
];

export default function BlogPage() {
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

        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-2">
            Career Guidance Blog
          </h1>
          <p className="text-base text-slate-600">
            Expert tips, guides & insights to help Indian students choose the right career path.
          </p>
        </div>

        <div className="space-y-5">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <article className="premium-card p-6 hover:border-violet-300 transition-all duration-200 group cursor-pointer">
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="chip text-[11px] px-2.5 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-2 group-hover:text-violet-700 transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">
                  {post.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar size={12} />
                      {post.date}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock size={12} />
                      {post.readTime}
                    </span>
                  </div>
                  <span className="text-xs font-medium text-violet-600 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read more <ArrowRight size={12} />
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
