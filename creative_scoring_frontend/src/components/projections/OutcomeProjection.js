import React from "react";

// PUBLIC_INTERFACE
export default function OutcomeProjection({ scorecard }) {
  /** Simple outcome projection visualization based on composite score. */
  if (!scorecard) return null;
  const composite = scorecard.composite || 0;
  const reach = Math.round((scorecard.audience?.size || 0) * 0.2);
  const projectedLift = Math.round(composite * 0.3);
  const ctr = Math.round((scorecard.performance || 0) * 0.2) / 100;

  return (
    <div className="projection">
      <div className="projection-title">Outcome Projections</div>
      <div className="projection-grid">
        <div className="projection-item">
          <div className="projection-value">{reach.toLocaleString()}</div>
          <div className="projection-label">Reach (est.)</div>
        </div>
        <div className="projection-item">
          <div className="projection-value">{projectedLift}%</div>
          <div className="projection-label">Brand Lift (est.)</div>
        </div>
        <div className="projection-item">
          <div className="projection-value">{(ctr * 100).toFixed(2)}%</div>
          <div className="projection-label">CTR (est.)</div>
        </div>
      </div>
    </div>
  );
}
