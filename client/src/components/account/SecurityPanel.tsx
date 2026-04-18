"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut, Trash2, ShieldAlert } from "lucide-react";
import { changePassword, deleteAccount, signOut } from "@/lib/data/services/auth";

export function SecurityPanel() {
  const router = useRouter();
  const [pw, setPw] = useState({ current: "", next: "", confirm: "" });
  const [status, setStatus] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pw.next !== pw.confirm) {
      setStatus("New passwords don't match.");
      return;
    }
    if (pw.next.length < 8) {
      setStatus("Use at least 8 characters.");
      return;
    }
    await changePassword(pw.current, pw.next);
    setStatus("Password updated.");
    setPw({ current: "", next: "", confirm: "" });
  };

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={submit} className="rounded-[var(--r-lg)] border border-line bg-white p-5 sm:p-6">
        <h2 className="font-sans font-bold text-[16px] tracking-[-0.01em] mb-4">Change password</h2>
        <div className="grid gap-3">
          <Field label="Current password" type="password" value={pw.current} onChange={(v) => setPw({ ...pw, current: v })} />
          <Field label="New password" type="password" value={pw.next} onChange={(v) => setPw({ ...pw, next: v })} />
          <Field label="Confirm new password" type="password" value={pw.confirm} onChange={(v) => setPw({ ...pw, confirm: v })} />
        </div>
        {status && (
          <p className="mt-3 text-[12px] text-je-blue-navy font-medium">{status}</p>
        )}
        <button
          type="submit"
          className="mt-5 inline-flex rounded-full bg-ink text-paper px-5 py-2.5 text-[13px] font-semibold"
        >
          Update password
        </button>
      </form>

      <div className="rounded-[var(--r-lg)] border border-line bg-white p-5 sm:p-6">
        <h2 className="font-sans font-bold text-[16px] tracking-[-0.01em] mb-4">Session</h2>
        <button
          type="button"
          onClick={async () => {
            await signOut();
            router.push("/");
          }}
          className="inline-flex items-center gap-2 rounded-full border border-ink px-5 py-2.5 text-[13px] font-semibold"
        >
          <LogOut className="size-3.5" />
          Sign out
        </button>
      </div>

      <div className="rounded-[var(--r-lg)] border border-je-coral/40 bg-je-coral/5 p-5 sm:p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="size-8 rounded-full bg-je-coral/20 text-je-coral inline-flex items-center justify-center shrink-0">
            <ShieldAlert className="size-4" />
          </div>
          <div>
            <h2 className="font-sans font-bold text-[16px] tracking-[-0.01em]">Delete account</h2>
            <p className="text-[12px] text-je-grey-mid mt-1 max-w-[520px]">
              This permanently removes your profile, saved addresses and order history.
              Required by GDPR — we'll do it fast, no drama.
            </p>
          </div>
        </div>
        {!confirmDelete ? (
          <button
            type="button"
            onClick={() => setConfirmDelete(true)}
            className="inline-flex items-center gap-2 rounded-full bg-white border border-je-coral text-je-coral px-5 py-2.5 text-[13px] font-semibold"
          >
            <Trash2 className="size-3.5" />
            Delete my account
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setConfirmDelete(false)}
              className="inline-flex rounded-full border border-line px-4 py-2 text-[13px]"
            >
              Keep it
            </button>
            <button
              type="button"
              onClick={async () => {
                await deleteAccount();
                router.push("/");
              }}
              className="inline-flex rounded-full bg-je-coral text-white px-4 py-2 text-[13px] font-semibold"
            >
              Yes, delete permanently
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  type,
  value,
  onChange,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.14em] font-semibold text-je-grey-mid">
        {label}
      </span>
      <input
        type={type ?? "text"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-[var(--r-md)] border border-line bg-white px-3.5 py-3 text-[14px] focus:border-ink outline-none"
      />
    </label>
  );
}
