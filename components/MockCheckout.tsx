"use client";

import { useState, useEffect, useRef } from "react";
import { X, Lock, CheckCircle } from "lucide-react";

interface MockCheckoutProps {
  courseId: string;
  courseTitle: string;
  price: number;
  onClose: () => void;
  onSuccess: () => void;
}

type Step = "form" | "processing" | "success";

function formatCardNumber(value: string) {
  return value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 3) return digits.slice(0, 2) + "/" + digits.slice(2);
  return digits;
}

export default function MockCheckout({
  courseId,
  courseTitle,
  price,
  onClose,
  onSuccess,
}: MockCheckoutProps) {
  const [step, setStep] = useState<Step>("form");
  const [card, setCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on backdrop click
  function handleBackdrop(e: React.MouseEvent) {
    if (e.target === overlayRef.current && step !== "processing") onClose();
  }

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && step !== "processing") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step, onClose]);

  function validate() {
    if (card.replace(/\s/g, "").length < 16) return "Enter a valid 16-digit card number.";
    if (expiry.length < 5) return "Enter a valid expiry date.";
    if (cvv.length < 3) return "Enter a valid CVV.";
    if (!name.trim()) return "Enter the name on the card.";
    return null;
  }

  async function handlePay(e: React.FormEvent) {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setError("");
    setStep("processing");

    // Simulate payment processing
    await new Promise((r) => setTimeout(r, 1800));

    // Record purchase in Firestore + localStorage
    const res = await fetch("/api/mock/purchase", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseId }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Purchase failed — please try again.");
      setStep("form");
      return;
    }

    const stored = JSON.parse(localStorage.getItem("mock_purchases") || "[]");
    if (!stored.includes(courseId)) {
      localStorage.setItem("mock_purchases", JSON.stringify([...stored, courseId]));
    }

    setStep("success");
  }

  return (
    <div
      ref={overlayRef}
      onClick={handleBackdrop}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-md bg-zinc-900 rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden">

        {/* Success screen */}
        {step === "success" && (
          <div className="flex flex-col items-center justify-center px-8 py-14 text-center">
            <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-5">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <h2 className="text-2xl font-black text-white mb-2">Payment Successful</h2>
            <p className="text-zinc-400 text-sm mb-1">You now have access to</p>
            <p className="text-white font-semibold mb-8">{courseTitle}</p>
            <button
              onClick={onSuccess}
              className="inline-flex items-center justify-center h-11 px-8 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors duration-150"
            >
              Start Watching
            </button>
          </div>
        )}

        {/* Form + processing */}
        {step !== "success" && (
          <>
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-0.5">Secure Checkout</p>
                <p className="text-white font-bold text-sm truncate max-w-[260px]">{courseTitle}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg font-black text-white">${(price / 100).toFixed(2)}</span>
                <button
                  onClick={onClose}
                  disabled={step === "processing"}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors disabled:opacity-30"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handlePay} className="px-6 py-6 space-y-4">

              {/* Card number */}
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Card Number</label>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="1234 5678 9012 3456"
                  value={card}
                  onChange={(e) => setCard(formatCardNumber(e.target.value))}
                  disabled={step === "processing"}
                  className="w-full h-11 px-4 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-red-500/60 focus:ring-1 focus:ring-red-500/30 transition-colors disabled:opacity-50"
                />
              </div>

              {/* Expiry + CVV */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Expiry</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                    disabled={step === "processing"}
                    className="w-full h-11 px-4 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-red-500/60 focus:ring-1 focus:ring-red-500/30 transition-colors disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">CVV</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="123"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                    disabled={step === "processing"}
                    className="w-full h-11 px-4 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-red-500/60 focus:ring-1 focus:ring-red-500/30 transition-colors disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Name on Card</label>
                <input
                  type="text"
                  placeholder="John Smith"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={step === "processing"}
                  className="w-full h-11 px-4 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-red-500/60 focus:ring-1 focus:ring-red-500/30 transition-colors disabled:opacity-50"
                />
              </div>

              {error && (
                <p className="text-red-400 text-xs">{error}</p>
              )}

              {/* Pay button */}
              <button
                type="submit"
                disabled={step === "processing"}
                className="w-full h-12 bg-red-600 hover:bg-red-700 disabled:bg-red-600/60 text-white font-bold rounded-xl transition-colors duration-150 flex items-center justify-center gap-2 mt-2"
              >
                {step === "processing" ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Processing…
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    Pay ${(price / 100).toFixed(2)}
                  </>
                )}
              </button>

              <p className="text-center text-zinc-600 text-xs flex items-center justify-center gap-1">
                <Lock className="w-3 h-3" />
                Mock checkout — no real payment is taken
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
