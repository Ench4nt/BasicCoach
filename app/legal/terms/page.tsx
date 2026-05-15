export const metadata = { title: "Terms of Use — BoxIQ" };

const LAST_UPDATED = "May 15, 2025";

export default function TermsPage() {
  return (
    <main className="flex-1 bg-zinc-950 text-white">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-black mb-2">Terms of Use</h1>
        <p className="text-zinc-500 text-sm mb-12">Last updated: {LAST_UPDATED}</p>

        <div className="prose prose-invert prose-zinc max-w-none space-y-10 text-zinc-300 leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using BoxIQ ("the Platform"), you agree to be bound by these Terms of Use. If you do not agree, please do not use the Platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Account Registration</h2>
            <p>
              You must create an account to purchase and access courses. You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account. You must provide accurate information during registration.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Purchased Content License</h2>
            <p>
              Upon completing a purchase, BoxIQ grants you a non-exclusive, non-transferable, personal license to access and view the purchased course content for your own non-commercial use. You may not share, redistribute, resell, broadcast, or reproduce any course content in any form.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Prohibited Uses</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Share your account credentials with others</li>
              <li>Download, record, or screen-capture video content</li>
              <li>Use the Platform for any unlawful purpose</li>
              <li>Attempt to reverse-engineer or circumvent any access controls</li>
              <li>Resell or sublicense course content to third parties</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Intellectual Property</h2>
            <p>
              All course content, videos, text, graphics, and branding on the Platform are the intellectual property of BoxIQ or its licensors. Nothing in these Terms grants you ownership of any content.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">6. Payments</h2>
            <p>
              All payments are processed securely by Paddle, our Merchant of Record. By purchasing a course, you agree to Paddle's terms and conditions. Prices are listed in USD and are subject to change without notice for future purchases.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">7. Refunds</h2>
            <p>
              We offer a 14-day money-back guarantee on all course purchases. See our{" "}
              <a href="/legal/refund" className="text-red-400 hover:text-red-300 underline underline-offset-2">
                Refund Policy
              </a>{" "}
              for details.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">8. Disclaimers</h2>
            <p>
              Boxing involves physical activity and inherent risk of injury. BoxIQ courses are for educational purposes only. Always consult a qualified professional before starting any physical training program. BoxIQ is not liable for any injury resulting from the application of techniques shown in course videos.
            </p>
            <p className="mt-3">
              The Platform is provided "as is" without warranties of any kind. BoxIQ does not warrant that the Platform will be uninterrupted or error-free.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">9. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, BoxIQ shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Platform or course content.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">10. Changes to Terms</h2>
            <p>
              We may update these Terms from time to time. Continued use of the Platform after changes constitutes acceptance of the revised Terms. We will update the "Last updated" date above when changes are made.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">11. Governing Law</h2>
            <p>
              These Terms are governed by the laws of the State of Israel, without regard to conflict of law principles.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">12. Contact</h2>
            <p>
              For questions about these Terms, contact us at{" "}
              <a href="mailto:[your@email.com]" className="text-red-400 hover:text-red-300 underline underline-offset-2">
                [your@email.com]
              </a>
              .
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
