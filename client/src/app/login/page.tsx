"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthShell } from "@/components/auth/AuthShell";
import { SocialButtons } from "@/components/auth/SocialButtons";
import { signInWithEmail } from "@/lib/data/services/auth";
import { useAuth } from "@/lib/store/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const user = await signInWithEmail(email, password);
    useAuth.getState().setUser(user);
    router.push("/account");
  };

  return (
    <AuthShell
      kicker="Welcome back"
      heading={<>Good to <span className="font-serif italic font-medium text-je-blue-dark">see you.</span></>}
      sub="Sign in to reuse saved addresses, payment methods and your order history."
      footer={
        <>
          New to Jersey Eats?{" "}
          <Link href="/register" className="text-ink font-semibold underline underline-offset-4">
            Create an account
          </Link>
        </>
      }
    >
      <SocialButtons redirect="/account" />

      <div className="my-8 flex items-center gap-3 text-[10px] tracking-[0.2em] uppercase text-je-grey-mid">
        <span className="flex-1 h-px bg-line" />
        or email
        <span className="flex-1 h-px bg-line" />
      </div>

      <form onSubmit={submit} className="flex flex-col gap-3">
        <LabelledInput label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.je" />
        <LabelledInput label="Password" type="password" value={password} onChange={setPassword} placeholder="••••••••" />
        <div className="flex justify-end -mt-1">
          <Link href="#" className="text-[12px] text-je-grey-mid hover:text-ink">Forgot Password?</Link>
        </div>
        <button
          type="submit"
          disabled={busy || !email || !password}
          className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-ink text-paper py-3.5 text-[14px] font-medium disabled:opacity-50"
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </AuthShell>
  );
}

function LabelledInput({
  label, type, value, onChange, placeholder,
}: {
  label: string; type?: string; value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.14em] font-semibold text-je-grey-mid">{label}</span>
      <input
        type={type ?? "text"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full rounded-[var(--r-md)] border border-line bg-white px-3.5 py-3 text-[14px] focus:border-ink outline-none"
      />
    </label>
  );
}
