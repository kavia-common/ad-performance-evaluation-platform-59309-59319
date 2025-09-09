import React from "react";

// PUBLIC_INTERFACE
export default function BreakdownChart({ scorecard }) {
  /** Visual bar breakdown of labels or components using CSS only. */
  const labels = scorecard?.breakdown_labels || {
    hook: 0.7,
    clarity: 0.6,
    branding: 0.8,
    pacing: 0.65,
  };
  const entries = Object.entries(labels || {});
  if (!entries.length) return null;

  return (
    <div className="breakdown">
      <div className="breakdown-title">Breakdown</div>
      {entries.map(([label, value]) => {
        const pct = Math.round((value > 1 ? value : value * 100));
        const width = Math.max(0, Math.min(100, pct));
        return (
          <div className="breakdown-row" key={label}>
            <div className="breakdown-label">{label}</div>
            <div className="breakdown-bar">
              <div className="breakdown-fill" style={{ width: `${width}%` }} />
            </div>
            <div className="breakdown-val">{width}</div>
          </div>
        );
      })}
    </div>
  );
}
