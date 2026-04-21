"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { rateOrder } from "@/lib/data/services/orders";

export function RatingPrompt({
  orderId,
  initialStars,
}: {
  orderId: string;
  initialStars?: number;
}) {
  const [stars, setStars] = useState(initialStars ?? 0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(initialStars != null);

  if (submitted) {
    return (
      <div className="rounded-[var(--r-md)] border border-line bg-mist p-5 flex items-center gap-4">
        <div className="size-10 rounded-full bg-je-blue inline-flex items-center justify-center">
          <Star className="size-5 fill-ink text-ink" />
        </div>
        <div>
          <div className="font-sans font-semibold text-[14px]">Thanks for the {stars} stars!</div>
          <div className="text-[12px] text-je-grey-mid">We've passed it along to the restaurant.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[var(--r-md)] border border-line bg-white p-5">
      <div className="text-[10px] font-semibold tracking-[0.16em] uppercase text-je-blue-navy mb-2">
        How was it?
      </div>
      <h3 className="font-sans font-bold text-[18px] tracking-[-0.015em]">
        Rate your <span className="font-serif italic font-medium text-je-blue-dark">experience</span>
      </h3>
      <div
        className="mt-4 flex gap-1.5"
        onMouseLeave={() => setHover(0)}
      >
        {[1, 2, 3, 4, 5].map((n) => {
          const lit = n <= (hover || stars);
          return (
            <button
              key={n}
              type="button"
              onClick={() => setStars(n)}
              onMouseEnter={() => setHover(n)}
              aria-label={`${n} stars`}
              className="size-9 inline-flex items-center justify-center rounded-full hover:scale-110 transition-transform"
            >
              <Star
                className={`size-6 ${lit ? "text-je-amber" : "text-je-grey-light"}`}
                fill={lit ? "currentColor" : "none"}
                strokeWidth={1.5}
              />
            </button>
          );
        })}
      </div>
      {stars > 0 && (
        <div className="mt-4 je-rise">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Anything you'd like to say? (optional)"
            rows={3}
            className="w-full rounded-[var(--r-md)] border border-line p-3 text-[13px] resize-none focus:border-ink outline-none"
          />
          <button
            type="button"
            onClick={async () => {
              await rateOrder(orderId, stars, comment || undefined);
              setSubmitted(true);
            }}
            className="mt-3 inline-flex items-center gap-2 rounded-full bg-ink text-paper px-5 py-2.5 text-[13px] font-medium"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}
