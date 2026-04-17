import jsPDF from "jspdf";
import { CareerReport, Language } from "./types";

export function generateReportPDF(report: CareerReport, language: Language) {
  const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginX = 15;
  const contentWidth = pageWidth - marginX * 2;
  let y = 20;

  const isHindi = language === "hi";

  const t = isHindi
    ? {
        title: "Career Clarity Report",
        subtitle: "AI-Powered Career Guidance",
        personality: "Personality Summary",
        strengths: "Your Strengths",
        weaknesses: "Areas of Improvement",
        thinking: "Thinking Style",
        topCareers: "Top 3 Career Paths",
        whyFits: "Why it fits",
        realWorld: "Real-World Context",
        avoid: "Careers to Avoid",
        reason: "Reason",
        actionPlan: "30-Day Action Plan",
        skill: "Skill to Learn",
        project: "Small Project",
        direction: "Direction",
        weekly: "Weekly Breakdown",
        disclaimer:
          "Disclaimer: AI-based suggestions. Not a substitute for professional counseling.",
        page: "Page",
        of: "of",
      }
    : {
        title: "Career Clarity Report",
        subtitle: "AI-Powered Career Guidance",
        personality: "Personality Summary",
        strengths: "Your Strengths",
        weaknesses: "Areas of Improvement",
        thinking: "Thinking Style",
        topCareers: "Top 3 Career Paths",
        whyFits: "Why it fits",
        realWorld: "Real-World Context",
        avoid: "Careers to Avoid",
        reason: "Reason",
        actionPlan: "30-Day Action Plan",
        skill: "Skill to Learn",
        project: "Small Project",
        direction: "Direction",
        weekly: "Weekly Breakdown",
        disclaimer:
          "Disclaimer: AI-based suggestions. Not a substitute for professional counseling.",
        page: "Page",
        of: "of",
      };

  // Dark theme colors
  const colors = {
    bg: [15, 10, 30] as [number, number, number],
    cardBg: [30, 22, 55] as [number, number, number],
    primary: [167, 139, 250] as [number, number, number],
    primaryLight: [196, 181, 253] as [number, number, number],
    text: [226, 232, 240] as [number, number, number],
    textMuted: [148, 163, 184] as [number, number, number],
    green: [74, 222, 128] as [number, number, number],
    red: [248, 113, 113] as [number, number, number],
    amber: [251, 191, 36] as [number, number, number],
  };

  // Paint dark background on first page
  const paintBackground = () => {
    doc.setFillColor(...colors.bg);
    doc.rect(0, 0, pageWidth, pageHeight, "F");
  };
  paintBackground();

  const addPage = () => {
    doc.addPage();
    paintBackground();
    y = 20;
  };

  const ensureSpace = (needed: number) => {
    if (y + needed > pageHeight - 20) {
      addPage();
    }
  };

  const drawHeading = (text: string, size = 14) => {
    ensureSpace(12);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(size);
    doc.setTextColor(...colors.primaryLight);
    doc.text(text, marginX, y);
    // underline
    doc.setDrawColor(...colors.primary);
    doc.setLineWidth(0.3);
    doc.line(marginX, y + 1.5, marginX + contentWidth, y + 1.5);
    y += 8;
  };

  const drawParagraph = (
    text: string,
    opts: { color?: [number, number, number]; size?: number; bold?: boolean } = {}
  ) => {
    const color = opts.color || colors.text;
    const size = opts.size || 10;
    doc.setFont("helvetica", opts.bold ? "bold" : "normal");
    doc.setFontSize(size);
    doc.setTextColor(...color);
    const lines = doc.splitTextToSize(text, contentWidth);
    for (const line of lines) {
      ensureSpace(6);
      doc.text(line, marginX, y);
      y += size * 0.45 + 1;
    }
    y += 2;
  };

  const drawBullet = (
    text: string,
    bullet = "•",
    bulletColor: [number, number, number] = colors.primary
  ) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const lines = doc.splitTextToSize(text, contentWidth - 6);
    lines.forEach((line: string, i: number) => {
      ensureSpace(6);
      if (i === 0) {
        doc.setTextColor(...bulletColor);
        doc.text(bullet, marginX, y);
      }
      doc.setTextColor(...colors.text);
      doc.text(line, marginX + 6, y);
      y += 5;
    });
    y += 1;
  };

  const drawCard = (
    title: string,
    body: { label: string; value: string }[],
    titleColor: [number, number, number] = colors.primaryLight
  ) => {
    // Measure height
    doc.setFontSize(10);
    let cardHeight = 10; // title
    for (const { label, value } of body) {
      const valueLines = doc.splitTextToSize(value, contentWidth - 10);
      cardHeight += 5 + valueLines.length * 4.5 + 2;
    }
    cardHeight += 4;

    ensureSpace(cardHeight + 4);

    // Card background
    doc.setFillColor(...colors.cardBg);
    doc.roundedRect(marginX, y, contentWidth, cardHeight, 2, 2, "F");

    const cardY0 = y;
    y += 7;

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...titleColor);
    doc.text(title, marginX + 5, y);
    y += 6;

    // Body rows
    for (const { label, value } of body) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(...colors.primary);
      doc.text(label.toUpperCase(), marginX + 5, y);
      y += 4;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(...colors.text);
      const valueLines = doc.splitTextToSize(value, contentWidth - 10);
      for (const line of valueLines) {
        doc.text(line, marginX + 5, y);
        y += 4.5;
      }
      y += 2;
    }

    y = cardY0 + cardHeight + 4;
  };

  // ============ BUILD REPORT ============

  // Title banner
  doc.setFillColor(...colors.primary);
  doc.rect(0, 0, pageWidth, 30, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(255, 255, 255);
  doc.text(t.title, pageWidth / 2, 14, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(t.subtitle, pageWidth / 2, 22, { align: "center" });
  y = 42;

  // Personality Summary
  drawHeading(t.personality);
  drawParagraph(report.personalitySummary, { color: colors.textMuted });

  // Strengths
  drawHeading(t.strengths);
  for (const s of report.strengths) {
    drawBullet(s, "+", colors.green);
  }
  y += 2;

  // Weaknesses
  drawHeading(t.weaknesses);
  for (const w of report.weaknesses) {
    drawBullet(w, "!", colors.amber);
  }
  y += 2;

  // Thinking Style
  drawHeading(t.thinking);
  drawParagraph(report.thinkingStyle, { color: colors.textMuted });

  // Top Careers
  drawHeading(t.topCareers);
  report.topCareers.forEach((career, i) => {
    drawCard(`${i + 1}. ${career.title}`, [
      { label: t.whyFits, value: career.whyItFits },
      { label: t.realWorld, value: career.realWorldContext },
    ]);
  });

  // Avoid Careers
  drawHeading(t.avoid);
  report.avoidCareers.forEach((career) => {
    drawCard(
      career.title,
      [{ label: t.reason, value: career.reason }],
      colors.red
    );
  });

  // Action Plan
  drawHeading(t.actionPlan);
  drawCard("", [
    { label: t.skill, value: report.actionPlan.skillToLearn },
    { label: t.project, value: report.actionPlan.smallProject },
    { label: t.direction, value: report.actionPlan.direction },
  ]);

  // Weekly breakdown
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...colors.primaryLight);
  ensureSpace(8);
  doc.text(t.weekly, marginX, y);
  y += 6;
  report.actionPlan.weeklyBreakdown.forEach((week, i) => {
    drawBullet(week, `${i + 1}.`, colors.primary);
  });

  // Disclaimer at bottom of last page
  y += 6;
  ensureSpace(12);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(8);
  doc.setTextColor(...colors.textMuted);
  const disclaimerLines = doc.splitTextToSize(t.disclaimer, contentWidth);
  for (const line of disclaimerLines) {
    ensureSpace(4);
    doc.text(line, pageWidth / 2, y, { align: "center" });
    y += 4;
  }

  // Page numbers footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...colors.textMuted);
    doc.text(
      `${t.page} ${i} ${t.of} ${pageCount}  |  Career Clarity AI`,
      pageWidth / 2,
      pageHeight - 8,
      { align: "center" }
    );
  }

  doc.save("Career-Clarity-Report.pdf");
}
