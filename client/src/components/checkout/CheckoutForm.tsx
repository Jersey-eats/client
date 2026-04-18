"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Apple, CreditCard, Smartphone, Check, MapPin, Mail, Phone, FileText } from "lucide-react";
import { useBasket } from "@/lib/store/basket";
import { MOCK_PARISHES } from "@/lib/data/mock/parishes";
import { parishName } from "@/lib/data/services/parishes";
import { getCurrentUser } from "@/lib/data/services/auth";
import { placeOrder } from "@/lib/data/services/orders";
import { formatPrice } from "@/lib/utils";
import type { ParishCode, SavedAddress, UserProfile } from "@/lib/data/types";

type Payment = "apple_pay" | "google_pay" | "card";

export function CheckoutForm() {
  const router = useRouter();
  const lines = useBasket((s) => s.lines);
  const subtotal = useBasket((s) => s.subtotalPence());
  const clear = useBasket((s) => s.clear);

  const [user, setUser] = useState<UserProfile | null>(null);
  useEffect(() => {
    getCurrentUser().then(setUser);
  }, []);

  const [mode, setMode] = useState<"saved" | "manual">("saved");
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [manual, setManual] = useState<SavedAddress>({
    id: "m",
    label: "Delivery",
    line1: "",
    parish: "st_helier",
    postcode: "",
    note: "",
    isDefault: false,
  });
  const [contact, setContact] = useState({ phone: "", email: "" });
  const [payment, setPayment] = useState<Payment>("apple_pay");
  const [placing, setPlacing] = useState(false);

  useEffect(() => {
    if (user) {
      const def = user.addresses.find((a) => a.isDefault) ?? user.addresses[0];
      if (def) {
        setSelectedAddressId(def.id);
        setMode("saved");
      }
      setContact({ phone: user.phone ?? "", email: user.email });
    } else {
      setMode("manual");
    }
  }, [user]);

  const address: { line1: string; line2?: string; parish: ParishCode; postcode?: string; note?: string } | null =
    useMemo(() => {
      if (mode === "saved") {
        const a = user?.addresses.find((x) => x.id === selectedAddressId);
        if (!a) return null;
        return { line1: a.line1, line2: a.line2, parish: a.parish, postcode: a.postcode, note: a.note };
      }
      if (!manual.line1.trim()) return null;
      return { line1: manual.line1, parish: manual.parish, postcode: manual.postcode, note: manual.note };
    }, [mode, manual, user, selectedAddressId]);

  const deliveryFeePence = 250; // display-only; backend derives from delivery_zones
  const gstPence = Math.round(subtotal * 0.05);
  const totalPence = subtotal + deliveryFeePence + gstPence;

  const canPlace =
    lines.length > 0 &&
    address != null &&
    contact.phone.trim().length > 4 &&
    contact.email.includes("@") &&
    !placing;

  const handlePlace = async () => {
    if (!canPlace || !address) return;
    setPlacing(true);
    const order = await placeOrder({
      restaurantId: lines[0].restaurantId,
      restaurantName: lines[0].restaurantName,
      restaurantSlug: lines[0].restaurantSlug,
      lines,
      subtotalPence: subtotal,
      deliveryFeePence,
      gstPence,
      totalPence,
      paymentMethod: payment,
      deliveryAddress: address,
      contact,
    });
    clear();
    router.push(`/order/${order.id}`);
  };

  if (lines.length === 0) {
    return (
      <div className="py-20 text-center">
        <div className="size-16 mx-auto rounded-full bg-je-blue/15 inline-flex items-center justify-center text-2xl">🐄</div>
        <h2 className="mt-5 font-sans font-bold text-[22px] tracking-[-0.02em]">
          Nothing to check out — <span className="font-serif italic text-je-blue-dark">yet.</span>
        </h2>
        <Link
          href="/r"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-ink text-paper px-5 py-2.5 text-[13px] font-medium"
        >
          Browse restaurants →
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_380px] items-start">
      <div className="flex flex-col gap-7">
        {!user && (
          <section className="rounded-[var(--r-lg)] border border-line bg-mist p-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-[10px] font-semibold tracking-[0.18em] uppercase text-je-blue-navy">Faster next time</div>
              <div className="mt-1 text-[14px]">
                Sign in to reuse saved addresses and payment.
              </div>
            </div>
            <div className="flex gap-2">
              <Link href="/login" className="inline-flex rounded-full border border-ink px-4 py-2 text-[12px] font-medium">Sign in</Link>
              <Link href="/register" className="inline-flex rounded-full bg-ink text-paper px-4 py-2 text-[12px] font-medium">Register</Link>
            </div>
          </section>
        )}

        <Section title="Delivery address" icon={<MapPin className="size-4" />}>
          {user && user.addresses.length > 0 && (
            <div className="flex gap-1.5 rounded-full border border-line bg-white self-start p-1 mb-4">
              <button
                type="button"
                onClick={() => setMode("saved")}
                className={`px-3.5 py-1.5 text-[12px] font-semibold rounded-full ${mode === "saved" ? "bg-ink text-paper" : "text-ink"}`}
              >
                Saved
              </button>
              <button
                type="button"
                onClick={() => setMode("manual")}
                className={`px-3.5 py-1.5 text-[12px] font-semibold rounded-full ${mode === "manual" ? "bg-ink text-paper" : "text-ink"}`}
              >
                New address
              </button>
            </div>
          )}

          {mode === "saved" && user ? (
            <ul className="flex flex-col gap-2.5">
              {user.addresses.map((a) => {
                const active = selectedAddressId === a.id;
                return (
                  <li key={a.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedAddressId(a.id)}
                      className={`w-full text-left p-4 rounded-[var(--r-md)] border flex gap-3 items-start ${
                        active ? "border-ink bg-ink text-paper" : "border-line bg-white hover:border-ink"
                      }`}
                    >
                      <span
                        className={`size-4 shrink-0 mt-0.5 rounded-full border-[1.5px] inline-flex items-center justify-center ${
                          active ? "border-paper bg-je-blue text-ink" : "border-line"
                        }`}
                      >
                        {active && <Check className="size-2.5" strokeWidth={3} />}
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="flex items-center gap-2">
                          <strong className="font-sans font-semibold text-[14px]">{a.label}</strong>
                          {a.isDefault && (
                            <span className="text-[9px] font-semibold uppercase tracking-[0.12em] opacity-70">Default</span>
                          )}
                        </span>
                        <span className={`mt-1 block text-[13px] ${active ? "text-paper/80" : "text-je-charcoal"}`}>
                          {a.line1}
                          {a.line2 ? `, ${a.line2}` : ""} · {parishName(a.parish)}
                          {a.postcode ? ` · ${a.postcode}` : ""}
                        </span>
                        {a.note && (
                          <span className={`mt-1 block text-[12px] italic font-serif ${active ? "text-paper/70" : "text-je-grey-mid"}`}>
                            “{a.note}”
                          </span>
                        )}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              <Field
                label="Address"
                className="sm:col-span-2"
                value={manual.line1}
                onChange={(v) => setManual({ ...manual, line1: v })}
                placeholder="Flat 3, La Grande Route de St Martin"
              />
              <div>
                <label className="text-[10px] uppercase tracking-[0.14em] font-semibold text-je-grey-mid">Parish</label>
                <select
                  value={manual.parish}
                  onChange={(e) => setManual({ ...manual, parish: e.target.value as ParishCode })}
                  className="mt-1 w-full rounded-[var(--r-md)] border border-line bg-white px-3.5 py-3 text-[14px] focus:border-ink outline-none"
                >
                  {MOCK_PARISHES.map((p) => (
                    <option key={p.code} value={p.code}>{p.name}</option>
                  ))}
                </select>
              </div>
              <Field
                label="Postcode (optional)"
                value={manual.postcode ?? ""}
                onChange={(v) => setManual({ ...manual, postcode: v })}
                placeholder="JE2 3RR"
              />
              <Field
                label="Note for the driver"
                className="sm:col-span-2"
                value={manual.note ?? ""}
                onChange={(v) => setManual({ ...manual, note: v })}
                placeholder="Ring doorbell twice, blue door on the left."
                hint="Optional"
                icon={<FileText className="size-3.5 text-je-grey-mid" />}
              />
            </div>
          )}
        </Section>

        <Section title="Contact details" icon={<Phone className="size-4" />}>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field
              label="Phone"
              value={contact.phone}
              onChange={(v) => setContact((c) => ({ ...c, phone: v }))}
              placeholder="+44 7700 900123"
              icon={<Phone className="size-3.5 text-je-grey-mid" />}
            />
            <Field
              label="Email"
              value={contact.email}
              onChange={(v) => setContact((c) => ({ ...c, email: v }))}
              placeholder="you@example.je"
              icon={<Mail className="size-3.5 text-je-grey-mid" />}
              inputType="email"
            />
          </div>
        </Section>

        <Section title="Payment" icon={<CreditCard className="size-4" />}>
          <div className="grid gap-2.5 sm:grid-cols-3">
            <PaymentTile
              active={payment === "apple_pay"}
              onClick={() => setPayment("apple_pay")}
              icon={<Apple className="size-5" />}
              name="Apple Pay"
              hint="Face ID / Touch ID"
            />
            <PaymentTile
              active={payment === "google_pay"}
              onClick={() => setPayment("google_pay")}
              icon={<Smartphone className="size-5" />}
              name="Google Pay"
              hint="Device biometrics"
            />
            <PaymentTile
              active={payment === "card"}
              onClick={() => setPayment("card")}
              icon={<CreditCard className="size-5" />}
              name="Card"
              hint="Visa, Mastercard, Amex"
            />
          </div>
          <p className="mt-3 text-[11px] text-je-grey-mid">
            Secure payment processed by Encoded. We never store your card details.
          </p>
        </Section>
      </div>

      {/* ORDER SUMMARY */}
      <aside className="lg:sticky lg:top-[80px]">
        <div className="rounded-[var(--r-lg)] border border-line bg-white p-5">
          <div className="text-[10px] font-semibold tracking-[0.18em] uppercase text-je-blue-navy">Order summary</div>
          <h2 className="mt-1.5 font-sans font-bold text-[18px] tracking-[-0.01em]">
            {lines[0]?.restaurantName}
          </h2>
          <ul className="mt-4 flex flex-col gap-3 pb-4 border-b border-line">
            {lines.map((l) => (
              <li key={l.lineId} className="flex gap-3 text-[13px]">
                <span className="text-je-grey-mid tabular-nums w-5 shrink-0">{l.quantity}×</span>
                <span className="flex-1 min-w-0">
                  <span className="block">{l.itemName}</span>
                  {l.modifierSelections.length > 0 && (
                    <span className="block text-[11px] text-je-grey-mid">
                      {l.modifierSelections.map((m) => m.optionName).join(" · ")}
                    </span>
                  )}
                </span>
                <span className="tabular-nums font-semibold shrink-0">{formatPrice(l.totalPence)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-1.5 text-[13px]">
            <Row label="Subtotal" value={formatPrice(subtotal)} />
            <Row label="Delivery" value={formatPrice(deliveryFeePence)} />
            <Row label="GST (5%)" value={formatPrice(gstPence)} />
          </dl>
          <div className="mt-4 pt-4 border-t border-line flex items-baseline justify-between">
            <span className="font-sans font-semibold text-[13px] uppercase tracking-[0.12em] text-je-grey-mid">Total</span>
            <span className="font-sans font-extrabold text-[22px] tabular-nums">{formatPrice(totalPence)}</span>
          </div>
          <button
            type="button"
            onClick={handlePlace}
            disabled={!canPlace}
            className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-full bg-ink text-paper px-5 py-4 text-[14px] font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2a221f] transition-colors"
          >
            {placing ? "Placing…" : <>Place order · {formatPrice(totalPence)}</>}
          </button>
          <p className="mt-3 text-[11px] text-je-grey-mid text-center">
            By placing your order you agree to our Terms.
          </p>
        </div>
      </aside>
    </div>
  );
}

function Section({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="rounded-[var(--r-lg)] border border-line bg-white p-5 sm:p-6">
      <h3 className="flex items-center gap-2 font-sans font-bold text-[15px] tracking-[-0.01em] mb-4">
        {icon && <span className="text-je-blue-navy">{icon}</span>}
        {title}
      </h3>
      {children}
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  className,
  hint,
  icon,
  inputType = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
  hint?: string;
  icon?: React.ReactNode;
  inputType?: string;
}) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-[0.14em] font-semibold text-je-grey-mid">{label}</span>
        {hint && <span className="text-[10px] text-je-grey-mid">{hint}</span>}
      </span>
      <span className="mt-1 flex items-center gap-2 rounded-[var(--r-md)] border border-line bg-white px-3.5 py-3 focus-within:border-ink">
        {icon}
        <input
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 text-[14px] outline-none bg-transparent placeholder:text-je-grey-mid/70"
        />
      </span>
    </label>
  );
}

function PaymentTile({
  active,
  onClick,
  icon,
  name,
  hint,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  name: string;
  hint: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col gap-2 p-4 rounded-[var(--r-md)] border text-left transition-colors ${
        active ? "bg-ink text-paper border-ink" : "bg-white border-line hover:border-ink"
      }`}
    >
      <span className="flex items-center justify-between">
        <span className={active ? "text-paper" : "text-ink"}>{icon}</span>
        <span
          className={`size-4 rounded-full border-[1.5px] inline-flex items-center justify-center ${
            active ? "border-paper bg-je-blue text-ink" : "border-line"
          }`}
        >
          {active && <Check className="size-2.5" strokeWidth={3} />}
        </span>
      </span>
      <span>
        <span className="block font-sans font-semibold text-[13px]">{name}</span>
        <span className={`block text-[11px] ${active ? "text-paper/70" : "text-je-grey-mid"}`}>{hint}</span>
      </span>
    </button>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-je-grey-mid">{label}</span>
      <span className="tabular-nums text-ink">{value}</span>
    </div>
  );
}
