import React from "react";

/**
 * BalanceCard
 * props:
 *  - title: string
 *  - balance: number (in smallest unit or decimal; here we expect plain number)
 *  - accent: "classic" | "modern" etc (optional)
 */
export default function BalanceCard({
  title,
  balance = 0,
  accent = "classic",
}) {
  // Use Intl API to format in Canadian dollars
  const formatter = new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 2,
  });

  const formatted = formatter.format(balance);

  return (
    <div
      className={`balance-card ${accent}`}
      role="region"
      aria-labelledby="balance-title"
    >
      <div className="balance-card-inner">
        <div className="left">
          <p id="balance-title" className="card-title">
            {title}
          </p>
          <p className="card-sub">As of today</p>
        </div>

        <div className="right" aria-hidden="false">
          <p className="balance" title={formatted}>
            {formatted}
          </p>
          <p className="balance-note">Available</p>
        </div>
      </div>
    </div>
  );
}
