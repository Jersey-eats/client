"use client";

import { useEffect, useState } from "react";
import { Check, Edit2, Plus, Trash2 } from "lucide-react";
import {
  getCurrentUser,
  updateProfile,
  upsertAddress,
  removeAddress,
} from "@/lib/data/services/auth";
import { MOCK_PARISHES } from "@/lib/data/mock/parishes";
import { parishName } from "@/lib/data/services/parishes";
import { Select } from "@/components/ui/Select";
import { Checkbox } from "@/components/ui/Checkbox";
import { useAuth } from "@/lib/store/auth";
import type { ParishCode, SavedAddress, UserProfile } from "@/lib/data/types";

export function ProfileEditor() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [editing, setEditing] = useState(false);
  const [editingAddress, setEditingAddress] = useState<SavedAddress | null>(null);
  const [draft, setDraft] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    getCurrentUser().then((u) => {
      setUser(u);
      if (u) setDraft({ name: u.name, email: u.email, phone: u.phone ?? "" });
    });
  }, []);

  if (!user) {
    return (
      <div className="rounded-[var(--r-lg)] border border-line bg-white p-6">
        <div className="h-4 w-40 bg-je-off-white rounded animate-pulse" />
      </div>
    );
  }

  const saveProfile = async () => {
    const next = await updateProfile({ name: draft.name, email: draft.email, phone: draft.phone });
    setUser(next);
    useAuth.getState().setUser(next);
    setEditing(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-[var(--r-lg)] border border-line bg-white p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-sans font-bold text-[16px] tracking-[-0.01em]">Personal info</h2>
          {!editing ? (
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="inline-flex items-center gap-1.5 text-[12px] font-medium text-je-grey-mid hover:text-ink"
            >
              <Edit2 className="size-3.5" /> Edit
            </button>
          ) : (
            <button
              type="button"
              onClick={saveProfile}
              className="inline-flex items-center gap-1.5 text-[12px] font-semibold bg-ink text-paper px-3 py-1.5 rounded-full"
            >
              <Check className="size-3.5" /> Save
            </button>
          )}
        </div>
        {!editing ? (
          <dl className="grid gap-4 sm:grid-cols-3 text-[13px]">
            <Kv label="Name" value={user.name} />
            <Kv label="Email" value={user.email} />
            <Kv label="Phone" value={user.phone ?? "—"} />
          </dl>
        ) : (
          <div className="grid gap-3 sm:grid-cols-3">
            <Field label="Name" value={draft.name} onChange={(v) => setDraft({ ...draft, name: v })} />
            <Field label="Email" value={draft.email} onChange={(v) => setDraft({ ...draft, email: v })} />
            <Field label="Phone" value={draft.phone} onChange={(v) => setDraft({ ...draft, phone: v })} />
          </div>
        )}
      </div>

      {/* ADDRESSES */}
      <div className="rounded-[var(--r-lg)] border border-line bg-white p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-sans font-bold text-[16px] tracking-[-0.01em]">Saved addresses</h2>
            <p className="text-[12px] text-je-grey-mid mt-0.5">Used to speed up checkout.</p>
          </div>
          <button
            type="button"
            onClick={() =>
              setEditingAddress({
                id: `a-${Date.now()}`,
                label: "New",
                line1: "",
                parish: "st_helier",
                isDefault: false,
              })
            }
            className="inline-flex items-center gap-1.5 text-[12px] font-semibold bg-ink text-paper px-3 py-1.5 rounded-full"
          >
            <Plus className="size-3.5" /> Add
          </button>
        </div>
        <ul className="flex flex-col gap-2.5">
          {user.addresses.map((a) => (
            <li
              key={a.id}
              className="flex items-start justify-between gap-3 p-4 rounded-[var(--r-md)] border border-line"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <strong className="font-sans font-semibold text-[14px]">{a.label}</strong>
                  {a.isDefault && (
                    <span className="text-[9px] font-semibold uppercase tracking-[0.12em] bg-je-blue text-ink px-1.5 py-0.5 rounded-full">
                      Default
                    </span>
                  )}
                </div>
                <div className="mt-1 text-[13px] text-je-charcoal">
                  {a.line1}
                  {a.line2 ? `, ${a.line2}` : ""} · {parishName(a.parish)}
                  {a.postcode ? ` · ${a.postcode}` : ""}
                </div>
                {a.note && (
                  <div className="mt-1 text-[12px] italic font-serif text-je-grey-mid">
                    “{a.note}”
                  </div>
                )}
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setEditingAddress(a)}
                  className="size-8 rounded-full border border-line inline-flex items-center justify-center hover:border-ink"
                  aria-label="Edit"
                >
                  <Edit2 className="size-3.5" />
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    const next = await removeAddress(a.id);
                    setUser(next);
                    useAuth.getState().setUser(next);
                  }}
                  className="size-8 rounded-full border border-line inline-flex items-center justify-center hover:border-je-coral hover:text-je-coral"
                  aria-label="Remove"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
        {user.addresses.length === 0 && (
          <p className="text-[13px] text-je-grey-mid italic font-serif py-6 text-center">
            No saved addresses yet.
          </p>
        )}
      </div>

      {editingAddress && (
        <AddressEditor
          value={editingAddress}
          onCancel={() => setEditingAddress(null)}
          onSave={async (a) => {
            const next = await upsertAddress(a);
            setUser(next);
            useAuth.getState().setUser(next);
            setEditingAddress(null);
          }}
        />
      )}
    </div>
  );
}

function AddressEditor({
  value,
  onCancel,
  onSave,
}: {
  value: SavedAddress;
  onCancel: () => void;
  onSave: (a: SavedAddress) => void;
}) {
  const [draft, setDraft] = useState(value);
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative w-full sm:max-w-[520px] bg-[var(--modal-bg)] rounded-t-[28px] sm:rounded-[var(--r-lg)] shadow-2xl border border-line">
        <div className="p-5 sm:p-6 border-b border-line">
          <h3 className="font-sans font-bold text-[18px] tracking-[-0.015em]">
            {value.line1 ? "Edit address" : "New address"}
          </h3>
        </div>
        <div className="p-5 sm:p-6 grid gap-3 sm:grid-cols-2">
          <Field label="Label" value={draft.label} onChange={(v) => setDraft({ ...draft, label: v })} />
          <label className="block">
            <span className="text-[10px] uppercase tracking-[0.14em] font-semibold text-je-grey-mid">Parish</span>
            <Select
              value={draft.parish}
              onChange={(v) => setDraft({ ...draft, parish: v as ParishCode })}
              options={MOCK_PARISHES.map((p) => ({ value: p.code, label: p.name }))}
              wrapperClassName="mt-1"
              aria-label="Parish"
            />
          </label>
          <Field label="Address" value={draft.line1} onChange={(v) => setDraft({ ...draft, line1: v })} className="sm:col-span-2" />
          <Field label="Postcode" value={draft.postcode ?? ""} onChange={(v) => setDraft({ ...draft, postcode: v })} />
          <Field label="Note" value={draft.note ?? ""} onChange={(v) => setDraft({ ...draft, note: v })} />
          <div className="sm:col-span-2">
            <Checkbox
              checked={draft.isDefault}
              onChange={(e) => setDraft({ ...draft, isDefault: e.target.checked })}
              label="Set as default"
            />
          </div>
        </div>
        <div className="p-5 sm:p-6 border-t border-line flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex rounded-full border border-line px-4 py-2 text-[13px]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onSave(draft)}
            className="inline-flex rounded-full bg-ink text-paper px-4 py-2 text-[13px] font-semibold"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

function Kv({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-[0.14em] font-semibold text-je-grey-mid">{label}</dt>
      <dd className="mt-1 text-[13px] text-ink">{value}</dd>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  className,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  className?: string;
}) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="text-[10px] uppercase tracking-[0.14em] font-semibold text-je-grey-mid">
        {label}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-[var(--r-md)] border border-line bg-white px-3.5 py-3 text-[14px] focus:border-ink outline-none"
      />
    </label>
  );
}
