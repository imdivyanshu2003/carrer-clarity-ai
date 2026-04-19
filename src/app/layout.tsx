import type { Metadata } from "next";
import { AppProvider } from "@/context/AppContext";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Career Clarity AI — Find Your Perfect Career in 5 Minutes",
  description:
    "Answer 12 smart questions and get a personalized career direction + 30-day action plan powered by AI.",
  keywords: ["career guidance", "career test", "AI career advisor", "career clarity"],
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
