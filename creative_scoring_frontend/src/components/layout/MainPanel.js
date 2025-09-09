import React from "react";
import ScoreVisualization from "../score/ScoreVisualization";
import BreakdownChart from "../score/BreakdownChart";
import OutcomeProjection from "../projections/OutcomeProjection";

// PUBLIC_INTERFACE
export default function MainPanel({ scorecard, onScore, loading, error }) {
  /** Main panel for composite score, breakdown, and outcome projection. */
  return (
    <main className="panel main-panel">
      <section className="section">
        <div className="section-header">
          <h3 className="section-title">Scoring</h3>
          <button className="btn primary" onClick={onScore} disabled={loading}>
            {loading ? "Scoring…" : "Score Creative"}
          </button>
        </div>
        {error && <div className="alert error">{String(error)}</div>}
        {scorecard ? (
          <>
            <ScoreVisualization scorecard={scorecard} />
            <BreakdownChart scorecard={scorecard} />
            <OutcomeProjection scorecard={scorecard} />
          </>
        ) : (
          <div className="placeholder">Upload a creative and select an audience to score.</div>
        )}
      </section>
    </main>
  );
}
