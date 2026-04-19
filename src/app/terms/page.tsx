import PolicyLayout from "@/components/PolicyLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Career Clarity AI",
  description:
    "Terms and conditions governing the use of Career Clarity AI, operated by Clarify Path.",
};

export default function TermsPage() {
  return (
    <PolicyLayout
      title="Terms & Conditions"
      subtitle="Please read these terms carefully before using Career Clarity AI."
      lastUpdated="19 April 2026"
    >
      <p>
        Welcome to <strong>Career Clarity AI</strong>, a service operated by <strong>Clarify Path</strong>
        (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;), based in Meerut, Uttar Pradesh, India. By accessing
        or using our website and services, you (&ldquo;user&rdquo;, &ldquo;you&rdquo;) agree to be bound by these
        Terms &amp; Conditions. If you do not agree with any part of these terms, please do not use our service.
      </p>

      <h2>1. About Our Service</h2>
      <p>
        Career Clarity AI is an AI-powered career guidance tool for students and early-career professionals.
        After a short assessment of 12 questions, we generate a personalized career report that includes a
        personality summary, strengths/weaknesses, top career recommendations, careers to avoid, and a
        30-day action plan.
      </p>
      <p>
        <strong>Important:</strong> The report is AI-generated and is intended as a starting point for
        self-reflection. It is <strong>not a substitute for professional career counseling</strong>,
        psychological assessment, or medical advice.
      </p>

      <h2>2. Eligibility</h2>
      <p>
        You must be at least 13 years of age to use this service. By using Career Clarity AI, you represent
        that you meet this requirement. Users under 18 should obtain parental consent before making any
        payments.
      </p>

      <h2>3. Payments &amp; Pricing</h2>
      <ul>
        <li>Our Career Clarity Report is priced at <strong>&#8377;49 INR</strong> per report (inclusive of applicable taxes).</li>
        <li>Payments are processed securely through <strong>Cashfree Payments</strong>, an RBI-approved payment gateway.</li>
        <li>We accept UPI, debit/credit cards, net banking, and popular wallets.</li>
        <li>All transactions are in Indian Rupees (INR).</li>
      </ul>

      <h2>4. Delivery of Service</h2>
      <p>
        Once payment is successfully completed, your full Career Clarity Report becomes available
        immediately on our website and is also sent to the email address you provide. The report is
        digital and delivered instantly; there is no physical shipment.
      </p>

      <h2>5. Refunds &amp; Cancellations</h2>
      <p>
        Because our report is delivered instantly upon payment, refunds are governed by our{" "}
        <a href="/refunds">Refunds &amp; Cancellations Policy</a>. In summary: if you are not satisfied, you
        may request a full refund within <strong>24 hours of payment</strong> by emailing{" "}
        <a href="mailto:clarifypathsupport@gmail.com">clarifypathsupport@gmail.com</a>.
      </p>

      <h2>6. Your Responsibilities</h2>
      <ul>
        <li>Provide accurate and honest answers during the assessment. AI output depends on input quality.</li>
        <li>Provide a valid email address for report delivery.</li>
        <li>Do not attempt to copy, resell, redistribute, or commercially exploit the reports or content.</li>
        <li>Do not attempt to reverse-engineer, scrape, or disrupt the service.</li>
      </ul>

      <h2>7. Intellectual Property</h2>
      <p>
        All website content, branding, questions, report formats, and underlying software are the property
        of Clarify Path. The personalized report generated for you is for your personal, non-commercial
        use only.
      </p>

      <h2>8. Disclaimer &amp; Limitation of Liability</h2>
      <p>
        Career Clarity AI provides information and suggestions based on AI analysis. We do not guarantee
        specific career outcomes, job placement, or income. The report should be used as one input among
        many in your career decisions.
      </p>
      <p>
        To the maximum extent permitted by law, Clarify Path shall not be liable for any indirect,
        incidental, consequential, or punitive damages arising from the use of or inability to use the
        service. Our total liability for any claim shall not exceed the amount you paid us for the
        report in question.
      </p>

      <h2>9. Third-Party Services</h2>
      <p>We rely on trusted third parties to deliver our service, including:</p>
      <ul>
        <li><strong>OpenAI</strong> — for AI-powered analysis of your answers.</li>
        <li><strong>Cashfree Payments</strong> — for processing payments.</li>
        <li><strong>Resend</strong> — for delivering reports by email.</li>
        <li><strong>Vercel</strong> — for hosting our website.</li>
      </ul>
      <p>
        These providers have their own terms and privacy practices, which apply when you use their
        portion of our service.
      </p>

      <h2>10. Account &amp; Data</h2>
      <p>
        We do not require you to create an account. We collect only the minimum information needed to
        deliver the service (your quiz answers and your email). Please review our{" "}
        <a href="/privacy">Privacy Policy</a> for full details.
      </p>

      <h2>11. Changes to These Terms</h2>
      <p>
        We may update these Terms &amp; Conditions from time to time. The &ldquo;Last updated&rdquo; date at
        the top reflects the most recent version. Continued use of the service after an update constitutes
        acceptance of the revised terms.
      </p>

      <h2>12. Governing Law &amp; Jurisdiction</h2>
      <p>
        These terms are governed by the laws of India. Any disputes arising from or related to these terms
        or the use of our service shall be subject to the exclusive jurisdiction of the courts in
        Meerut, Uttar Pradesh, India.
      </p>

      <h2>13. Contact</h2>
      <p>
        If you have any questions about these Terms &amp; Conditions, please contact us at{" "}
        <a href="mailto:clarifypathsupport@gmail.com">clarifypathsupport@gmail.com</a> or visit our{" "}
        <a href="/contact">Contact page</a>.
      </p>

      <div className="callout">
        <p className="mb-0">
          <strong>Summary:</strong> You pay &#8377;49 INR, we generate an instant AI career report.
          You can refund within 24 hours if unsatisfied. Use the advice as guidance, not as a final
          professional recommendation. Be kind, be honest, and reach out anytime at{" "}
          <a href="mailto:clarifypathsupport@gmail.com">clarifypathsupport@gmail.com</a>.
        </p>
      </div>
    </PolicyLayout>
  );
}
