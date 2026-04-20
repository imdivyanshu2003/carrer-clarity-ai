import PolicyLayout from "@/components/PolicyLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refunds & Cancellations",
  description:
    "Refund and cancellation policy for Career Clarity AI career reports. 24-hour full refund window, no questions asked. ₹99 one-time payment.",
  alternates: { canonical: "https://clarifypath.com/refunds" },
};

export default function RefundsPage() {
  return (
    <PolicyLayout
      title="Refunds & Cancellations"
      subtitle="We want you to be happy with your purchase. Here's how refunds work."
      lastUpdated="19 April 2026"
    >
      <div className="callout">
        <p className="mb-0">
          <strong>Quick summary:</strong> Not happy with your report? Email us at{" "}
          <a href="mailto:clarifypathsupport@gmail.com">clarifypathsupport@gmail.com</a> within{" "}
          <strong>24 hours of payment</strong> and we will issue a <strong>full refund of &#8377;99</strong> —
          no questions asked.
        </p>
      </div>

      <h2>1. Our Product</h2>
      <p>
        Career Clarity AI sells a single digital product: a personalized, AI-generated Career Clarity
        Report priced at <strong>&#8377;99 INR</strong>. The report is delivered instantly upon successful
        payment.
      </p>

      <h2>2. Cancellations</h2>
      <p>
        Because the report is generated and delivered immediately after payment, there is no &ldquo;order
        pending&rdquo; stage to cancel. If you would like to cancel, please treat this as a refund request
        and follow the process in Section 4 below.
      </p>

      <h2>3. Refund Eligibility</h2>
      <p>You are eligible for a <strong>full refund of &#8377;99</strong> if:</p>
      <ul>
        <li>You request the refund within <strong>24 hours</strong> of the original payment.</li>
        <li>The payment was successfully charged to your account (we cannot refund transactions that did not go through).</li>
        <li>The refund is requested from the same email address used during purchase (or you can confirm the payment reference).</li>
      </ul>

      <p><strong>No refund will be issued</strong> in the following cases:</p>
      <ul>
        <li>More than 24 hours have passed since the payment.</li>
        <li>The refund request is fraudulent, abusive, or made in bad faith (e.g., repeated refund requests after multiple purchases).</li>
        <li>You violated our <a href="/terms">Terms &amp; Conditions</a> (for example, by attempting to resell the report).</li>
      </ul>

      <h2>4. How to Request a Refund</h2>
      <ol>
        <li>
          Send an email to{" "}
          <a href="mailto:clarifypathsupport@gmail.com">clarifypathsupport@gmail.com</a> from the email
          address used at checkout.
        </li>
        <li>
          Use the subject line: <strong>&ldquo;Refund Request — Career Clarity AI&rdquo;</strong>.
        </li>
        <li>
          Include in the body: (a) the email used at purchase, (b) the approximate date/time of payment,
          and (c) a brief reason (optional, but helps us improve).
        </li>
      </ol>

      <h2>5. Processing Time</h2>
      <p>
        Once your refund is approved, we initiate the refund through Cashfree Payments. The amount is
        credited back to your original payment method (UPI, card, wallet, etc.).
      </p>
      <ul>
        <li><strong>Approval:</strong> Usually within 24 business hours of your email.</li>
        <li><strong>Credit to your account:</strong> Typically 5–7 business days, depending on your bank or payment provider.</li>
      </ul>
      <p>
        We will send you a confirmation email once the refund has been initiated.
      </p>

      <h2>6. Failed or Duplicate Payments</h2>
      <p>
        If you were charged but did not receive a report, or if you were charged more than once for the
        same order, please email us immediately at{" "}
        <a href="mailto:clarifypathsupport@gmail.com">clarifypathsupport@gmail.com</a> with your payment
        reference. We will either deliver the missing report or issue a full refund of the duplicate
        charge.
      </p>

      <h2>7. Chargebacks</h2>
      <p>
        If you believe a charge was made in error, we kindly ask you to contact us first at{" "}
        <a href="mailto:clarifypathsupport@gmail.com">clarifypathsupport@gmail.com</a> before filing a
        chargeback with your bank. In almost all cases we can resolve the issue directly and faster.
      </p>

      <h2>8. Changes to This Policy</h2>
      <p>
        We may update this Refunds &amp; Cancellations Policy from time to time. The &ldquo;Last
        updated&rdquo; date at the top will always reflect the current version. The refund terms that
        apply to your purchase are the terms that were in effect at the time of your purchase.
      </p>

      <h2>9. Contact</h2>
      <p>
        For any refund or cancellation question, reach us at:
      </p>
      <ul>
        <li><strong>Email:</strong> <a href="mailto:clarifypathsupport@gmail.com">clarifypathsupport@gmail.com</a></li>
        <li><strong>Business name:</strong> Clarify Path</li>
        <li><strong>Address:</strong> Meerut, Uttar Pradesh, India</li>
      </ul>
    </PolicyLayout>
  );
}
