"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthShell } from "@/components/auth/AuthShell";
import { SocialButtons } from "@/components/auth/SocialButtons";
import { register } from "@/lib/data/services/auth";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    await register(name, email, password);
    router.push("/verify");
  };

  return (
    <AuthShell
      kicker="Join Jersey Eats"
      heading={<>Let's get you <span className="font-serif italic font-medium text-je-blue-dark">set up.</span></>}
      sub="30 seconds, then we'll show you what's being cooked near you tonight."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="text-ink font-semibold underline underline-offset-4">Sign in</Link>
        </>
      }
    >
      <SocialButtons redirect="/verify" />

      <div className="my-6 flex items-center gap-3 text-[10px] tracking-[0.2em] uppercase text-je-grey-mid">
        <span className="flex-1 h-px bg-line" />
        or email
        <span className="flex-1 h-px bg-line" />
      </div>

      <form onSubmit={submit} className="flex flex-col gap-3">
        <Labelled label="Full name" value={name} onChange={setName} placeholder="Sam Le Brun" />
        <Labelled label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.je" />
        <Labelled label="Password" type="password" value={password} onChange={setPassword} placeholder="Minimum 8 characters" />
        <button
          type="submit"
          disabled={busy || !name || !email || password.length < 8}
          className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-ink text-paper py-3.5 text-[14px] font-medium disabled:opacity-50"
        >
          {busy ? "Creating…" : "Create account"}
        </button>
        <p className="text-[11px] text-je-grey-mid text-center mt-2">
          By continuing you agree to our Terms &amp; Privacy policy.
        </p>
      </form>
    </AuthShell>
  );
}

function Labelled({
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
