export const metadata = { title: "Privacy Policy — BoxIQ" };

const LAST_UPDATED = "May 15, 2025";

export default function PrivacyPage() {
  return (
    <main className="flex-1 bg-zinc-950 text-white">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-black mb-2">Privacy Policy</h1>
        <p className="text-zinc-500 text-sm mb-12">Last updated: {LAST_UPDATED}</p>

        <div className="prose prose-invert prose-zinc max-w-none space-y-10 text-zinc-300 leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Introduction</h2>
            <p>
              BoxIQ ("we", "us", or "our") respects your privacy. This Privacy Policy explains how we collect, use, and protect your personal information when you use our Platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Information We Collect</h2>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>
                <strong className="text-white">Account information:</strong> Your name and email address when you register.
              </li>
              <li>
                <strong className="text-white">Payment information:</strong> Payment is processed by Paddle. We do not store your card details. Paddle may share transaction metadata (amount, course purchased) with us.
              </li>
              <li>
                <strong className="text-white">Usage data:</strong> Pages visited, courses viewed, and general activity on the Platform.
              </li>
              <li>
                <strong className="text-white">Device data:</strong> Browser type, IP address, and device information collected automatically.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>To create and manage your account</li>
              <li>To process purchases and grant course access</li>
              <li>To send transactional emails (purchase confirmations, account notices)</li>
              <li>To improve the Platform and resolve technical issues</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Third-Party Services</h2>
            <p>We use the following third-party services that may process your data:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>
                <strong className="text-white">Firebase (Google):</strong> Authentication and session management.
              </li>
              <li>
                <strong className="text-white">Supabase:</strong> Database storage for course and purchase records.
              </li>
              <li>
                <strong className="text-white">Paddle:</strong> Payment processing. Paddle acts as our Merchant of Record and has its own privacy policy.
              </li>
              <li>
                <strong className="text-white">Bunny.net:</strong> Video delivery. Videos are streamed via Bunny Stream and are not publicly accessible.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Data Retention</h2>
            <p>
              We retain your account information for as long as your account is active. Purchase records are retained for legal and accounting purposes. You may request deletion of your account and personal data at any time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Access the personal data we hold about you</li>
              <li>Correct inaccurate personal data</li>
              <li>Request deletion of your personal data</li>
              <li>Withdraw consent where processing is based on consent</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, contact us at{" "}
              <a href="mailto:[your@email.com]" className="text-red-400 hover:text-red-300 underline underline-offset-2">
                [your@email.com]
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">7. Cookies</h2>
            <p>
              We use a single HttpOnly session cookie to maintain your logged-in state. This cookie is essential for the Platform to function and does not track you across other sites. We do not use advertising or analytics cookies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">8. Children's Privacy</h2>
            <p>
              The Platform is not directed at children under the age of 13. We do not knowingly collect personal information from children.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of significant changes by updating the "Last updated" date above.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">10. Contact</h2>
            <p>
              For privacy-related inquiries, contact us at{" "}
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
