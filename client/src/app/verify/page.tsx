"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { AuthShell } from "@/components/auth/AuthShell";
import { sendPhoneCode, verifyPhoneCode } from "@/lib/data/services/auth";

export default function VerifyPage() {
  const router = useRouter();
  const [step, setStep] = useState<"phone" | "code">("phone");
  const [phone, setPhone] = useState("+44 ");
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const inputs = useRef<Array<HTMLInputElement | null>>([]);

  const sendCode = async () => {
    await sendPhoneCode(phone);
    setStep("code");
    setTimeout(() => inputs.current[0]?.focus(), 80);
  };

  const submitCode = async () => {
    const joined = code.join("");
    if (joined.length !== 6) return;
    await verifyPhoneCode(joined);
    router.push("/account");
  };

  const updateDigit = (i: number, v: string) => {
    const d = v.replace(/\D/g, "").slice(-1);
    const next = [...code];
    next[i] = d;
    setCode(next);
    if (d && i < 5) inputs.current[i + 1]?.focus();
  };

  return (
    <AuthShell
      kicker={step === "phone" ? "One last step" : "Check your phone"}
      heading={
        step === "phone" ? (
          <>Verify your <span className="font-serif italic font-medium text-je-blue-dark">number.</span></>
        ) : (
          <>Enter the <span className="font-serif italic font-medium text-je-blue-dark">code.</span></>
        )
      }
      sub={
        step === "phone"
          ? "We'll send a 6-digit code so drivers and restaurants can reach you."
          : `We sent a 6-digit code to ${phone}. It expires in 5 minutes.`
      }
      footer={
        <>
          Prefer to do this later?{" "}
          <Link href="/account" className="text-ink font-semibold underline underline-offset-4">Skip for now</Link>
        </>
      }
    >
      {step === "phone" ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendCode();
          }}
          className="flex flex-col gap-3"
        >
          <label className="block">
            <span className="text-[10px] uppercase tracking-[0.14em] font-semibold text-je-grey-mid">Phone</span>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+44 7700 900123"
              className="mt-1 w-full rounded-[var(--r-md)] border border-line bg-white px-3.5 py-3 text-[14px] focus:border-ink outline-none"
            />
          </label>
          <button
            type="submit"
            disabled={phone.length < 8}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-ink text-paper py-3.5 text-[14px] font-medium disabled:opacity-50"
          >
            Send code
          </button>
        </form>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 justify-between">
            {code.map((d, i) => (
              <input
                key={i}
                ref={(el) => {
                  inputs.current[i] = el;
                }}
                value={d}
                onChange={(e) => updateDigit(i, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Backspace" && !d && i > 0) inputs.current[i - 1]?.focus();
                }}
                inputMode="numeric"
                maxLength={1}
                className="size-12 sm:size-14 text-center text-[22px] font-sans font-bold rounded-[var(--r-md)] border border-line bg-white focus:border-ink outline-none"
              />
            ))}
          </div>
          <div className="flex items-center justify-between text-[12px] text-je-grey-mid">
            <button
              type="button"
              onClick={() => setStep("phone")}
              className="hover:text-ink"
            >
              ← Change number
            </button>
            <button
              type="button"
              onClick={sendCode}
              className="hover:text-ink"
            >
              Resend
            </button>
          </div>
          <button
            type="button"
            onClick={submitCode}
            disabled={code.join("").length !== 6}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-ink text-paper py-3.5 text-[14px] font-medium disabled:opacity-50"
          >
            Verify
          </button>
        </div>
      )}
    </AuthShell>
  );
}
