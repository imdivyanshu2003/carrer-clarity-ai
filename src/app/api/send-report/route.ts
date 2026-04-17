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

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #0f0a1e; color: #e2e8f0; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; }
    .header { text-align: center; padding: 30px 0; }
    .header h1 { color: #a78bfa; font-size: 24px; margin: 0; }
    .header p { color: #64748b; font-size: 12px; margin-top: 8px; }
    .section { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 20px; margin-bottom: 16px; }
    .section h2 { color: #c4b5fd; font-size: 16px; margin: 0 0 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 8px; }
    .section p { color: #94a3b8; font-size: 14px; line-height: 1.6; margin: 0; }
    .list-item { color: #94a3b8; font-size: 14px; padding: 4px 0; }
    .career-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 16px; margin-bottom: 12px; }
    .career-title { color: #e2e8f0; font-size: 16px; font-weight: 600; margin-bottom: 8px; }
    .career-label { color: #a78bfa; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; }
    .career-text { color: #94a3b8; font-size: 13px; margin-top: 4px; }
    .avoid-card { background: rgba(239,68,68,0.05); border: 1px solid rgba(239,68,68,0.15); border-radius: 8px; padding: 16px; margin-bottom: 12px; }
    .avoid-title { color: #fca5a5; font-size: 15px; font-weight: 600; }
    .avoid-reason { color: #94a3b8; font-size: 13px; margin-top: 4px; }
    .action-item { background: rgba(139,92,246,0.08); border: 1px solid rgba(139,92,246,0.2); border-radius: 8px; padding: 12px; margin-bottom: 8px; }
    .action-label { color: #c4b5fd; font-size: 11px; text-transform: uppercase; }
    .action-value { color: #e2e8f0; font-size: 13px; margin-top: 4px; }
    .week-item { background: rgba(255,255,255,0.03); border-radius: 6px; padding: 10px; margin-bottom: 6px; color: #94a3b8; font-size: 13px; }
    .disclaimer { text-align: center; color: #475569; font-size: 11px; padding: 20px 0; border-top: 1px solid rgba(255,255,255,0.05); margin-top: 20px; }
    .footer { text-align: center; color: #334155; font-size: 11px; padding: 10px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${t.title}</h1>
      <p>Career Clarity AI</p>
    </div>

    <div class="section">
      <h2>${t.personality}</h2>
      <p>${report.personalitySummary}</p>
    </div>

    <div class="section">
      <h2>${t.strengths}</h2>
      ${report.strengths.map((s: string) => `<div class="list-item">&#10003; ${s}</div>`).join("")}
    </div>

    <div class="section">
      <h2>${t.weaknesses}</h2>
      ${report.weaknesses.map((w: string) => `<div class="list-item">&#9888; ${w}</div>`).join("")}
    </div>

    <div class="section">
      <h2>${t.thinking}</h2>
      <p>${report.thinkingStyle}</p>
    </div>

    <div class="section">
      <h2>${t.topCareers}</h2>
      ${report.topCareers
        .map(
          (c: any, i: number) => `
        <div class="career-card">
          <div class="career-title">${i + 1}. ${c.title}</div>
          <div class="career-label">${t.whyFits}</div>
          <div class="career-text">${c.whyItFits}</div>
          <div class="career-label" style="margin-top:8px">${t.realWorld}</div>
          <div class="career-text">${c.realWorldContext}</div>
        </div>
      `
        )
        .join("")}
    </div>

    <div class="section">
      <h2>${t.avoid}</h2>
      ${report.avoidCareers
        .map(
          (c: any) => `
        <div class="avoid-card">
          <div class="avoid-title">${c.title}</div>
          <div class="avoid-reason">${t.reason}: ${c.reason}</div>
        </div>
      `
        )
        .join("")}
    </div>

    <div class="section">
      <h2>${t.actionPlan}</h2>
      <div class="action-item">
        <div class="action-label">${t.skill}</div>
        <div class="action-value">${report.actionPlan.skillToLearn}</div>
      </div>
      <div class="action-item">
        <div class="action-label">${t.project}</div>
        <div class="action-value">${report.actionPlan.smallProject}</div>
      </div>
      <div class="action-item">
        <div class="action-label">${t.direction}</div>
        <div class="action-value">${report.actionPlan.direction}</div>
      </div>
      <div style="margin-top:12px">
        <div class="action-label" style="margin-bottom:8px">${t.weekly}</div>
        ${report.actionPlan.weeklyBreakdown
          .map((w: string, i: number) => `<div class="week-item">${i + 1}. ${w}</div>`)
          .join("")}
      </div>
    </div>

    <div class="disclaimer">${t.disclaimer}</div>
    <div class="footer">Career Clarity AI &copy; ${new Date().getFullYear()}</div>
  </div>
</body>
</html>
  `;
}
