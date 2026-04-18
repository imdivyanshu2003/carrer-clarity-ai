import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const { email, report, language } = await request.json();

    if (!email || !report) {
      return NextResponse.json(
        { error: "Email and report are required" },
        { status: 400 }
      );
    }

    if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
      console.log("SMTP not configured — skipping email send to:", email);
      return NextResponse.json({
        success: true,
        demo: true,
        message: "Email delivery not configured (demo mode)",
      });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const isHindi = language === "hi";

    const htmlContent = buildEmailHTML(report, isHindi);

    await transporter.sendMail({
      from: `"Career Clarity AI" <${process.env.SMTP_EMAIL}>`,
      to: email,
      subject: isHindi
        ? "आपकी Career Clarity Report तैयार है!"
        : "Your Career Clarity Report is Ready!",
      html: htmlContent,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Email send error:", error?.message || error);
    console.error("Email error code:", error?.code);
    console.error("Email error response:", error?.response);
    return NextResponse.json(
      { error: "Failed to send email", details: error?.message || "Unknown error" },
      { status: 500 }
    );
  }
}

function buildEmailHTML(report: any, isHindi: boolean): string {
  const t = isHindi
    ? {
        title: "आपकी Career Clarity Report",
        personality: "Personality Summary",
        strengths: "आपकी Strengths",
        weaknesses: "Areas of Improvement",
        thinking: "Thinking Style",
        topCareers: "Top 3 Career Paths",
        whyFits: "यह आपके लिए क्यों सही है",
        realWorld: "Real-World Context",
        avoid: "इन Careers से बचें",
        reason: "कारण",
        actionPlan: "30-Day Action Plan",
        skill: "सीखने की Skill",
        project: "छोटा Project",
        direction: "Direction",
        weekly: "Weekly Breakdown",
        disclaimer:
          "Disclaimer: यह AI-based suggestions हैं। ये professional career counseling की जगह नहीं ले सकतीं।",
      }
    : {
        title: "Your Career Clarity Report",
        personality: "Personality Summary",
        strengths: "Your Strengths",
        weaknesses: "Areas of Improvement",
        thinking: "Thinking Style",
        topCareers: "Top 3 Career Paths",
        whyFits: "Why it fits you",
        realWorld: "Real-World Context",
        avoid: "Careers to Avoid",
        reason: "Reason",
        actionPlan: "30-Day Action Plan",
        skill: "Skill to Learn",
        project: "Small Project",
        direction: "Direction",
        weekly: "Weekly Breakdown",
        disclaimer:
          "Disclaimer: These are AI-based suggestions. They are not a substitute for professional career counseling.",
      };

  // Email-safe inline styles (email clients strip external/class-based CSS)
  const s = {
    body: "margin:0;padding:0;background-color:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;color:#1f2937;",
    wrapper: "width:100%;background-color:#f3f4f6;padding:24px 12px;",
    container: "max-width:600px;margin:0 auto;background-color:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;",
    header: "background:linear-gradient(135deg,#7c3aed 0%,#a78bfa 100%);padding:32px 24px;text-align:center;color:#ffffff;",
    headerTitle: "margin:0;font-size:24px;font-weight:700;color:#ffffff;",
    headerSubtitle: "margin:8px 0 0 0;font-size:13px;color:#ede9fe;",
    content: "padding:24px;",
    section: "margin-bottom:24px;",
    sectionTitle: "color:#6d28d9;font-size:16px;font-weight:700;margin:0 0 12px 0;padding-bottom:8px;border-bottom:2px solid #ede9fe;",
    paragraph: "color:#374151;font-size:14px;line-height:1.6;margin:0;",
    listItem: "color:#374151;font-size:14px;padding:6px 0;line-height:1.5;",
    careerCard: "background-color:#f9fafb;border:1px solid #e5e7eb;border-left:4px solid #7c3aed;border-radius:8px;padding:16px;margin-bottom:12px;",
    careerTitle: "color:#111827;font-size:16px;font-weight:700;margin:0 0 10px 0;",
    careerLabel: "color:#7c3aed;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;font-weight:600;margin-top:8px;",
    careerText: "color:#4b5563;font-size:13px;line-height:1.5;margin:4px 0 0 0;",
    avoidCard: "background-color:#fef2f2;border:1px solid #fecaca;border-left:4px solid #ef4444;border-radius:8px;padding:14px;margin-bottom:10px;",
    avoidTitle: "color:#b91c1c;font-size:15px;font-weight:700;margin:0 0 4px 0;",
    avoidReason: "color:#4b5563;font-size:13px;line-height:1.5;margin:0;",
    actionItem: "background-color:#faf5ff;border:1px solid #e9d5ff;border-radius:8px;padding:12px;margin-bottom:8px;",
    actionLabel: "color:#7c3aed;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;font-weight:600;margin:0 0 4px 0;",
    actionValue: "color:#1f2937;font-size:14px;line-height:1.5;margin:0;",
    weekItem: "background-color:#f9fafb;border-left:3px solid #a78bfa;border-radius:4px;padding:10px 12px;margin-bottom:6px;color:#374151;font-size:13px;line-height:1.5;",
    disclaimer: "text-align:center;color:#6b7280;font-size:11px;padding:20px 24px;border-top:1px solid #e5e7eb;margin-top:8px;background-color:#f9fafb;",
    footer: "text-align:center;color:#9ca3af;font-size:11px;padding:12px;background-color:#f9fafb;",
  };

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${t.title}</title>
</head>
<body style="${s.body}">
  <div style="${s.wrapper}">
    <div style="${s.container}">
      <div style="${s.header}">
        <h1 style="${s.headerTitle}">${t.title}</h1>
        <p style="${s.headerSubtitle}">Career Clarity AI &mdash; AI-Powered Career Guidance</p>
      </div>

      <div style="${s.content}">

        <div style="${s.section}">
          <h2 style="${s.sectionTitle}">${t.personality}</h2>
          <p style="${s.paragraph}">${report.personalitySummary}</p>
        </div>

        <div style="${s.section}">
          <h2 style="${s.sectionTitle}">${t.strengths}</h2>
          ${report.strengths
            .map((st: string) => `<div style="${s.listItem}"><span style="color:#10b981;font-weight:700;">&#10003;</span> ${st}</div>`)
            .join("")}
        </div>

        <div style="${s.section}">
          <h2 style="${s.sectionTitle}">${t.weaknesses}</h2>
          ${report.weaknesses
            .map((w: string) => `<div style="${s.listItem}"><span style="color:#f59e0b;font-weight:700;">&#9888;</span> ${w}</div>`)
            .join("")}
        </div>

        <div style="${s.section}">
          <h2 style="${s.sectionTitle}">${t.thinking}</h2>
          <p style="${s.paragraph}">${report.thinkingStyle}</p>
        </div>

        <div style="${s.section}">
          <h2 style="${s.sectionTitle}">${t.topCareers}</h2>
          ${report.topCareers
            .map(
              (c: any, i: number) => `
            <div style="${s.careerCard}">
              <h3 style="${s.careerTitle}">${i + 1}. ${c.title}</h3>
              <div style="${s.careerLabel}">${t.whyFits}</div>
              <p style="${s.careerText}">${c.whyItFits}</p>
              <div style="${s.careerLabel}">${t.realWorld}</div>
              <p style="${s.careerText}">${c.realWorldContext}</p>
            </div>`
            )
            .join("")}
        </div>

        <div style="${s.section}">
          <h2 style="${s.sectionTitle}">${t.avoid}</h2>
          ${report.avoidCareers
            .map(
              (c: any) => `
            <div style="${s.avoidCard}">
              <div style="${s.avoidTitle}">${c.title}</div>
              <p style="${s.avoidReason}"><strong>${t.reason}:</strong> ${c.reason}</p>
            </div>`
            )
            .join("")}
        </div>

        <div style="${s.section}">
          <h2 style="${s.sectionTitle}">${t.actionPlan}</h2>
          <div style="${s.actionItem}">
            <div style="${s.actionLabel}">${t.skill}</div>
            <p style="${s.actionValue}">${report.actionPlan.skillToLearn}</p>
          </div>
          <div style="${s.actionItem}">
            <div style="${s.actionLabel}">${t.project}</div>
            <p style="${s.actionValue}">${report.actionPlan.smallProject}</p>
          </div>
          <div style="${s.actionItem}">
            <div style="${s.actionLabel}">${t.direction}</div>
            <p style="${s.actionValue}">${report.actionPlan.direction}</p>
          </div>
          <div style="margin-top:16px;">
            <div style="${s.actionLabel};margin-bottom:8px;">${t.weekly}</div>
            ${report.actionPlan.weeklyBreakdown
              .map((w: string, i: number) => `<div style="${s.weekItem}"><strong>${i + 1}.</strong> ${w}</div>`)
              .join("")}
          </div>
        </div>

      </div>

      <div style="${s.disclaimer}">${t.disclaimer}</div>
      <div style="${s.footer}">Career Clarity AI &copy; ${new Date().getFullYear()}</div>
    </div>
  </div>
</body>
</html>`;
}
