import React, { useEffect, useState } from "react";
import { getRecommendations } from "../../api";

// PUBLIC_INTERFACE
export default function Recommendations({ scorecard }) {
  /** Fetches and shows top 3 recommendations for the scorecard's creative & audience. */
  const [recs, setRecs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    const fetchRecs = async () => {
      if (!scorecard?.creative?.id || !scorecard?.audience?.id) {
        setRecs([]);
        return;
      }
      setLoading(true);
      setErr("");
      try {
        const data = await getRecommendations({
          creative_id: scorecard.creative.id,
          audience_id: scorecard.audience.id,
        });
        setRecs(Array.isArray(data) ? data.slice(0, 3) : []);
      } catch (e) {
        setErr(e.message || String(e));
      } finally {
        setLoading(false);
      }
    };
    fetchRecs();
  }, [scorecard]);

  return (
    <div>
      <div className="section-subtitle">Top 3 Recommendations</div>
      {loading && <div className="placeholder small">Loading…</div>}
      {err && <div className="alert error">{err}</div>}
      {!loading && !recs.length && <div className="placeholder small">No recommendations yet.</div>}
      <ul className="recommendations">
        {recs.map((r) => (
          <li key={r.id} className="recommendation">
            <div className="rec-priority">#{r.priority ?? "-"}</div>
            <div className="rec-text">{r.text}</div>
            {r.category && <div className="rec-category">{r.category}</div>}
          </li>
        ))}
      </ul>
      <div className="divider" />
      <div className="card subtle">
        <div className="card-title">Partner Integrations</div>
        <div className="card-subtle">Placeholders for future partner add-ons (e.g., media platforms, verification partners).</div>
      </div>
    </div>
  );
}
