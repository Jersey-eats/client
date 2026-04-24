"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { CreditCard, Check, MapPin, Mail, Phone, ShieldCheck } from "lucide-react";
import { useBasket } from "@/lib/store/basket";
import { useParish } from "@/lib/store/parish";
import { MOCK_PARISHES } from "@/lib/data/mock/parishes";
import { parishName } from "@/lib/data/services/parishes";
import { Select } from "@/components/ui/Select";
import { getCurrentUser } from "@/lib/data/services/auth";
import { placeOrder } from "@/lib/data/services/orders";
import { formatPrice } from "@/lib/utils";
import type { BasketLine, ParishCode, SavedAddress, UserProfile } from "@/lib/data/types";

type Payment = "apple_pay" | "google_pay" | "card";

export function CheckoutForm() {
  const router = useRouter();
  const lines = useBasket((s) => s.lines);
  const subtotal = useBasket((s) => s.subtotalPence());
  const clear = useBasket((s) => s.clear);

  const groups = useMemo(() => groupByRestaurant(lines), [lines]);

  const [user, setUser] = useState<UserProfile | null>(null);
  useEffect(() => {
    getCurrentUser().then(setUser);
  }, []);

  const storedParish = useParish((s) => s.parish);
  const lockedParish: ParishCode = storedParish ?? "st_helier";

  const [mode, setMode] = useState<"saved" | "manual">("saved");
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [manual, setManual] = useState<SavedAddress>({
    id: "m",
    label: "Delivery",
    line1: "",
    parish: lockedParish,
    postcode: "",
    note: "",
    isDefault: false,
  });

  useEffect(() => {
    setManual((prev) => ({ ...prev, parish: lockedParish }));
  }, [lockedParish]);
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
              <h3 className="font-sans font-bold text-[15px] tracking-[-0.01em]">
                Faster next time
              </h3>
              <p className="mt-1 text-[13px] text-je-grey-mid">
                Sign in to reuse saved addresses and payment.
              </p>
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
                required
              />
              <label className="block">
                <span className="text-[10px] uppercase tracking-[0.14em] font-semibold text-je-grey-mid">
                  Parish
                </span>
                <Select
                  value={lockedParish}
                  onChange={() => {}}
                  options={MOCK_PARISHES.map((p) => ({ value: p.code, label: p.name }))}
                  wrapperClassName="mt-1"
                  aria-label="Parish"
                  disabled
                />
              </label>
              <Field
                label="Postcode"
                value={manual.postcode ?? ""}
                onChange={(v) => setManual({ ...manual, postcode: v })}
                placeholder="JE2 3RR"
                hint="Optional"
              />
              <Field
                label="Note for the driver"
                className="sm:col-span-2"
                value={manual.note ?? ""}
                onChange={(v) => setManual({ ...manual, note: v })}
                placeholder="Ring doorbell twice, blue door on the left."
                hint="Optional"
                multiline
                rows={3}
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
              required
            />
            <Field
              label="Email"
              value={contact.email}
              onChange={(v) => setContact((c) => ({ ...c, email: v }))}
              placeholder="you@example.je"
              icon={<Mail className="size-3.5 text-je-grey-mid" />}
              inputType="email"
              required
            />
          </div>
        </Section>

        <Section title="Payment" icon={<CreditCard className="size-4" />}>
          <div className="inline-flex items-center gap-2 rounded-full bg-je-green/10 text-je-green-dark px-3 py-1.5 mb-4 text-[12px] font-semibold">
            <ShieldCheck className="size-4" strokeWidth={2.25} />
            Secure payments
          </div>
          <div className="grid gap-2.5 sm:grid-cols-3">
            <PaymentTile
              active={payment === "apple_pay"}
              onClick={() => setPayment("apple_pay")}
              name="Apple Pay"
              hint="Face ID / Touch ID"
            />
            <PaymentTile
              active={payment === "google_pay"}
              onClick={() => setPayment("google_pay")}
              name="Google Pay"
              hint="Device biometrics"
            />
            <PaymentTile
              active={payment === "card"}
              onClick={() => setPayment("card")}
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
          <div className="mt-4 flex flex-col gap-5 pb-4 border-b border-line">
            {groups.map((g) => (
              <div key={g.slug} className="flex flex-col gap-3">
                <h2 className="font-sans font-bold text-[15px] tracking-[-0.01em]">
                  {g.restaurantName}
                </h2>
                <ul className="flex flex-col gap-3">
                  {g.lines.map((l) => (
                    <li key={l.lineId} className="flex gap-2 text-[13px]">
                      <span className="text-je-grey-mid tabular-nums shrink-0">{l.quantity}×</span>
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
              </div>
            ))}
          </div>
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
  multiline,
  rows = 3,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
  hint?: string;
  icon?: React.ReactNode;
  inputType?: string;
  multiline?: boolean;
  rows?: number;
  required?: boolean;
}) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="text-[10px] uppercase tracking-[0.14em] font-semibold text-je-grey-mid inline-flex items-baseline gap-1.5">
        <span>{label}</span>
        {required && <span className="text-je-coral tracking-normal">*</span>}
        {hint && (
          <span className="normal-case tracking-normal font-medium text-je-grey-mid/80">
            ({hint.toLowerCase()})
          </span>
        )}
      </span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className="mt-1 w-full rounded-[var(--r-md)] border border-line bg-white px-3.5 py-3 text-[14px] focus:border-ink outline-none placeholder:text-je-grey-mid/70 resize-none leading-relaxed"
        />
      ) : (
        <span className="relative mt-1 block">
          {icon && (
            <span className="pointer-events-none absolute inset-y-0 left-3.5 inline-flex items-center">
              {icon}
            </span>
          )}
          <input
            type={inputType}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={`w-full rounded-[var(--r-md)] border border-line bg-white py-3 text-[14px] focus:border-ink outline-none placeholder:text-je-grey-mid/70 ${
              icon ? "pl-10 pr-3.5" : "px-3.5"
            }`}
          />
        </span>
      )}
    </label>
  );
}

function PaymentTile({
  active,
  onClick,
  name,
  hint,
}: {
  active: boolean;
  onClick: () => void;
  name: string;
  hint: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      role="radio"
      aria-checked={active}
      className={`flex items-center gap-3 p-4 rounded-[var(--r-md)] border text-left transition-colors ${
        active
          ? "bg-je-blue/25 text-ink border-je-blue-dark"
          : "bg-white text-ink border-line hover:border-ink"
      }`}
    >
      <span
        className={`size-5 shrink-0 rounded-full border-[1.5px] inline-flex items-center justify-center ${
          active ? "bg-je-blue-navy border-je-blue-navy" : "bg-white border-line"
        }`}
      >
        {active && <span className="size-2 rounded-full bg-white" />}
      </span>
      <span className="min-w-0">
        <span className="block font-sans font-semibold text-[13px]">{name}</span>
        <span className={`block text-[11px] ${active ? "text-ink/70" : "text-je-grey-mid"}`}>{hint}</span>
      </span>
    </button>
  );
}

type RestaurantGroup = {
  slug: string;
  restaurantName: string;
  lines: BasketLine[];
};

function groupByRestaurant(lines: BasketLine[]): RestaurantGroup[] {
  const bySlug = new Map<string, RestaurantGroup>();
  for (const l of lines) {
    const g = bySlug.get(l.restaurantSlug);
    if (g) {
      g.lines.push(l);
    } else {
      bySlug.set(l.restaurantSlug, {
        slug: l.restaurantSlug,
        restaurantName: l.restaurantName,
        lines: [l],
      });
    }
  }
  return [...bySlug.values()];
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-je-grey-mid">{label}</span>
      <span className="tabular-nums text-ink">{value}</span>
    </div>
  );
}
