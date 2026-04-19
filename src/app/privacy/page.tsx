import PolicyLayout from "@/components/PolicyLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Career Clarity AI",
  description:
    "How Career Clarity AI (operated by Clarify Path) collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <PolicyLayout
      title="Privacy Policy"
      subtitle="We take your privacy seriously. Here's what we collect, why, and how we protect it."
      lastUpdated="19 April 2026"
    >
      <p>
        This Privacy Policy explains how <strong>Clarify Path</strong> (&ldquo;we&rdquo;, &ldquo;our&rdquo;,
        &ldquo;us&rdquo;) collects, uses, stores, and protects the personal information of users
        (&ldquo;you&rdquo;) of <strong>Career Clarity AI</strong>, available at our website. By using our
        service, you agree to the practices described here.
      </p>

      <h2>1. Information We Collect</h2>
      <p>We only collect what is strictly needed to deliver the service:</p>
      <ul>
        <li>
          <strong>Quiz answers:</strong> The responses you provide to the 12-question career assessment.
          These are sent to our AI provider to generate your personalized report.
        </li>
        <li>
          <strong>Email address:</strong> Collected at checkout so that we can email you a copy of your
          report and contact you regarding your purchase.
        </li>
        <li>
          <strong>Payment information:</strong> We do <strong>not</strong> store your card or UPI details.
          All payments are processed directly by <strong>Cashfree Payments</strong>, a secure RBI-approved
          gateway. We only receive a transaction confirmation (order ID, amount, status).
        </li>
        <li>
          <strong>Basic technical data:</strong> Standard web logs such as IP address, browser type, and
          timestamps, collected by our hosting provider (Vercel) for security and performance.
        </li>
      </ul>

      <h2>2. What We Do NOT Collect</h2>
      <ul>
        <li>We do not require you to create an account or a password.</li>
        <li>We do not collect your name, phone number, date of birth, address, or government IDs.</li>
        <li>We do not use invasive analytics or advertising cookies.</li>
        <li>We do not sell your data to anyone — ever.</li>
      </ul>

      <h2>3. How We Use Your Information</h2>
      <p>Your data is used solely to:</p>
      <ul>
        <li>Generate your personalized career report using AI.</li>
        <li>Deliver the report to you on our website and by email.</li>
        <li>Process your payment and issue refunds if requested.</li>
        <li>Respond to your support queries.</li>
        <li>Meet our legal and accounting obligations.</li>
      </ul>

      <h2>4. Third-Party Services We Use</h2>
      <p>We rely on the following trusted providers to deliver the service:</p>
      <ul>
        <li><strong>OpenAI</strong> — processes your quiz answers to generate the AI report. OpenAI&apos;s API does not use API-submitted data to train its models (as of their current policy).</li>
        <li><strong>Cashfree Payments</strong> — processes all payments. Cashfree handles your card/UPI details; we never see them.</li>
        <li><strong>Resend</strong> — delivers your report by email.</li>
        <li><strong>Vercel</strong> — hosts our website and API.</li>
      </ul>
      <p>
        Each of these providers has their own privacy policy, and we only share the minimum data needed
        for each specific task.
      </p>

      <h2>5. Data Retention</h2>
      <ul>
        <li>
          <strong>Quiz answers &amp; generated reports:</strong> Stored locally in your browser only
          (we keep them minimal on our servers, just enough to regenerate the report if needed). You can
          clear this at any time by clearing your browser storage.
        </li>
        <li>
          <strong>Email address:</strong> Retained for as long as needed to deliver your report and honor
          any refund requests.
        </li>
        <li>
          <strong>Payment records:</strong> Retained for up to 8 years to meet Indian tax and accounting
          requirements.
        </li>
      </ul>

      <h2>6. Data Security</h2>
      <p>
        We use industry-standard safeguards to protect your data:
      </p>
      <ul>
        <li>All traffic is encrypted using HTTPS/TLS.</li>
        <li>Payments are PCI-DSS compliant via Cashfree.</li>
        <li>Access to support email and backend systems is limited to authorized team members.</li>
        <li>We use environment-isolated API keys and follow security best practices.</li>
      </ul>
      <p>
        While we take reasonable precautions, no method of transmission over the Internet is 100% secure.
        We cannot guarantee absolute security.
      </p>

      <h2>7. Your Rights</h2>
      <p>You have the right to:</p>
      <ul>
        <li><strong>Access</strong> the personal data we hold about you.</li>
        <li><strong>Correct</strong> any inaccurate information.</li>
        <li><strong>Delete</strong> your data (subject to legal retention requirements).</li>
        <li><strong>Withdraw consent</strong> for future processing.</li>
        <li><strong>Request a copy</strong> of your data in a portable format.</li>
      </ul>
      <p>
        To exercise any of these rights, email us at{" "}
        <a href="mailto:clarifypathsupport@gmail.com">clarifypathsupport@gmail.com</a> from the email used at purchase. We will respond within 30 days.
      </p>

      <h2>8. Cookies</h2>
      <p>
        We use only essential cookies and local storage strictly needed for the service to function
        (e.g., remembering your language choice and quiz progress in your browser). We do not use
        tracking or advertising cookies.
      </p>

      <h2>9. Children&apos;s Privacy</h2>
      <p>
        Our service is intended for users aged 13 and above. We do not knowingly collect data from
        children under 13. If you believe a child has provided us with data, please contact us and we
        will delete it promptly.
      </p>

      <h2>10. International Users</h2>
      <p>
        Our service is hosted and operated from India, and the third-party providers we use may store or
        process data outside India. By using the service, you consent to such cross-border transfers as
        necessary to deliver the service.
      </p>

      <h2>11. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. The &ldquo;Last updated&rdquo; date at the
        top reflects the most recent version. Material changes will be highlighted on our website.
      </p>

      <h2>12. Contact Us</h2>
      <p>
        Questions about this Privacy Policy? Reach out any time:
      </p>
      <ul>
        <li><strong>Email:</strong> <a href="mailto:clarifypathsupport@gmail.com">clarifypathsupport@gmail.com</a></li>
        <li><strong>Business name:</strong> Clarify Path</li>
        <li><strong>Address:</strong> Meerut, Uttar Pradesh, India</li>
      </ul>
    </PolicyLayout>
  );
}
