import type { Metadata } from "next";
import { AppProvider } from "@/context/AppContext";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://clarifypath.com"),
  title: {
    default: "Career Clarity AI — Clear Career Direction in 5 Minutes",
    template: "%s | Career Clarity AI",
  },
  description:
    "Take a free 12-question AI career assessment and get a personalized career report — top career matches, personality summary, strengths & a 30-day action plan. Best career guidance tool for students after 10th, 12th & college. Only ₹99.",
  keywords: [
    "career clarity",
    "career guidance",
    "career guidance for students",
    "AI career advisor",
    "career test",
    "career assessment",
    "clarify career",
    "career counselling online",
    "career path finder",
    "best career for me",
    "career clarity AI",
    "clarify path",
    "career guidance India",
    "career report AI",
    "personality career test",
    "student career guidance",
    "career direction",
    "30 day career plan",
    "career options after 12th",
    "best career options after 12th",
    "career options after 10th",
    "what to do after 12th",
    "career quiz",
    "career aptitude test",
    "career counselling for students",
    "career assessment test",
    "which career is best for me",
    "career options after graduation",
    "career guidance after 12th",
    "free career test",
    "online career counselling India",
    "AI career test",
    "career personality test",
    "career guidance for college students",
    "career options for science students",
    "career options for commerce students",
    "career options for arts students",
    "best career guidance website India",
    "psychometric career test",
    "career confusion",
    "how to choose a career",
    "career planning for students",
  ],
  authors: [{ name: "Clarify Path", url: "https://clarifypath.com" }],
  creator: "Clarify Path",
  publisher: "Clarify Path",
  alternates: {
    canonical: "https://clarifypath.com",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://clarifypath.com",
    siteName: "Career Clarity AI",
    title: "Career Clarity AI — Find Your Perfect Career Path in 5 Minutes",
    description:
      "AI-powered career guidance for Indian students. Answer 12 smart questions, get a personalized career report with top career matches & a 30-day action plan. Only ₹99.",
    images: [
      {
        url: "https://clarifypath.com/logo_2.png",
        width: 512,
        height: 512,
        alt: "Career Clarity AI — AI-powered career guidance for Indian students",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Career Clarity AI — Find Your Perfect Career in 5 Minutes",
    description:
      "AI-powered career guidance for Indian students. 12 questions → Personalized career report + 30-day action plan. Only ₹99.",
    images: ["https://clarifypath.com/logo_2.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "IpG_1DRylMwfFrcfTUQaqRG54chFsNH0TGnh791KORw",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="icon" href="/logo_1.png" type="image/png" sizes="any" />
        <link rel="apple-touch-icon" href="/logo_1.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#7c3aed" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  name: "Clarify Path",
                  url: "https://clarifypath.com",
                  logo: "https://clarifypath.com/logo_2.png",
                  email: "clarifypathsupport@gmail.com",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Meerut",
                    addressRegion: "Uttar Pradesh",
                    addressCountry: "IN",
                  },
                },
                {
                  "@type": "WebApplication",
                  name: "Career Clarity AI",
                  url: "https://clarifypath.com",
                  applicationCategory: "EducationalApplication",
                  operatingSystem: "All",
                  description:
                    "AI-powered career guidance tool for Indian students. Take a 12-question assessment and get a personalized career report with top career matches, strengths, weaknesses & a 30-day action plan.",
                  offers: {
                    "@type": "Offer",
                    price: "99",
                    priceCurrency: "INR",
                    availability: "https://schema.org/InStock",
                  },
                  aggregateRating: {
                    "@type": "AggregateRating",
                    ratingValue: "4.8",
                    ratingCount: "2400",
                    bestRating: "5",
                  },
                },
                {
                  "@type": "WebSite",
                  name: "Career Clarity AI",
                  alternateName: ["Clarify Path", "Career Clarity"],
                  url: "https://clarifypath.com",
                },
                {
                  "@type": "FAQPage",
                  mainEntity: [
                    {
                      "@type": "Question",
                      name: "What is Career Clarity AI?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Career Clarity AI is an AI-powered career guidance tool that helps Indian students find their ideal career path through a quick 12-question personality assessment. You get a detailed report with top 3 career matches, strengths, weaknesses, and a 30-day action plan.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "How much does Career Clarity AI cost?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "The Career Clarity AI report costs just ₹99 INR — a one-time payment with no subscriptions or hidden fees. You get instant access to your full personalized career report.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "Is Career Clarity AI available in Hindi?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Yes! Career Clarity AI supports both Hindi and English. You can choose your preferred language before starting the assessment.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "How does Career Clarity AI work?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "You answer 12 carefully designed questions about your personality, interests, and thinking style. Our AI engine analyzes your responses and generates a personalized career report with top 3 career matches, careers to avoid, and a 30-day action plan.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "Is Career Clarity AI good for students after 10th or 12th?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Absolutely! Career Clarity AI is specifically designed for Indian students — whether you are in 10th, 12th, college, or just starting your career. The assessment takes only 5 minutes and gives you actionable career guidance.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "Can I get a refund if I am not satisfied?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Yes, we offer a full refund within 24 hours of purchase, no questions asked. Simply email clarifypathsupport@gmail.com with your purchase details.",
                      },
                    },
                  ],
                },
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen text-slate-900 antialiased flex flex-col">
        <AppProvider>
          <div className="flex-1">{children}</div>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
