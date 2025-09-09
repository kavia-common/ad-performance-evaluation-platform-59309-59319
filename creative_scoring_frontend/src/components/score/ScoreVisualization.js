import React from "react";

// PUBLIC_INTERFACE
export default function ScoreVisualization({ scorecard }) {
  /** Displays composite score and component KPIs in a modern minimal style. */
  const composite = Math.round(scorecard?.composite ?? 0);
  const brand = Math.round(scorecard?.brand_lift ?? 0);
  const perf = Math.round(scorecard?.performance ?? 0);
  const attn = Math.round(scorecard?.attention ?? 0);

  return (
    <div className="score-visual">
      <div className="composite">
        <div className="composite-value" aria-label={`Composite score ${composite}`}>
          {composite}
        </div>
        <div className="composite-label">Composite</div>
      </div>
      <div className="kpi-row">
        <div className="kpi-chip">
          <span className="kpi-label">Brand Lift</span>
          <span className="kpi-value">{brand}</span>
        </div>
        <div className="kpi-chip">
          <span className="kpi-label">Performance</span>
          <span className="kpi-value">{perf}</span>
        </div>
        <div className="kpi-chip">
          <span className="kpi-label">Attention</span>
          <span className="kpi-value">{attn}</span>
        </div>
      </div>
    </div>
  );
}
