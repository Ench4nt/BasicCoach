export const metadata = { title: "Refund Policy — BoxIQ" };

const LAST_UPDATED = "May 15, 2025";

export default function RefundPage() {
  return (
    <main className="flex-1 bg-zinc-950 text-white">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-black mb-2">Refund Policy</h1>
        <p className="text-zinc-500 text-sm mb-12">Last updated: {LAST_UPDATED}</p>

        <div className="prose prose-invert prose-zinc max-w-none space-y-10 text-zinc-300 leading-relaxed">

          {/* Highlight card */}
          <div className="rounded-2xl border border-red-500/30 bg-red-500/8 px-6 py-5">
            <p className="text-white font-semibold text-lg mb-1">14-Day Money-Back Guarantee</p>
            <p className="text-zinc-300 text-sm leading-relaxed">
              If you're not satisfied with your purchase for any reason, contact us within 14 days of your purchase date for a full refund. No questions asked.
            </p>
          </div>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">Eligibility</h2>
            <p>You are eligible for a full refund if:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Your refund request is made within 14 days of the original purchase date.</li>
              <li>The request is made by the account holder who made the purchase.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">How to Request a Refund</h2>
            <p>
              Email us at{" "}
              <a href="mailto:[your@email.com]" className="text-red-400 hover:text-red-300 underline underline-offset-2">
                [your@email.com]
              </a>{" "}
              with the subject line <strong className="text-white">"Refund Request"</strong> and include:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>The email address associated with your BoxIQ account</li>
              <li>The name of the course you purchased</li>
              <li>Your order/transaction ID (found in your purchase confirmation email)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">Processing Time</h2>
            <p>
              Refunds are processed within 5–10 business days of approval. Depending on your payment method and bank, it may take additional time for the funds to appear in your account. Refunds are issued to the original payment method used at the time of purchase.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">After a Refund</h2>
            <p>
              Once a refund is issued, your access to the refunded course will be revoked. If you purchased multiple courses and request a partial refund, access to the specific refunded course will be removed while other purchases remain active.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">Exceptions</h2>
            <p>
              Refund requests made after 14 days of purchase are not eligible for a refund. We reserve the right to decline refund requests from accounts found to have violated our{" "}
              <a href="/legal/terms" className="text-red-400 hover:text-red-300 underline underline-offset-2">
                Terms of Use
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">Contact</h2>
            <p>
              For refund-related questions, reach us at{" "}
              <a href="mailto:[your@email.com]" className="text-red-400 hover:text-red-300 underline underline-offset-2">
                [your@email.com]
              </a>
              . We aim to respond within 1 business day.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
