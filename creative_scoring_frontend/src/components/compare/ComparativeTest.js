import React, { useState } from "react";
import { runComparativeTest } from "../../api";

// PUBLIC_INTERFACE
export default function ComparativeTest({ audience, creatives }) {
  /** Side-by-side comparative testing for two creatives given the audience. */
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const handleRun = async () => {
    if (!a || !b || !audience?.id) {
      setErr("Select two creatives and ensure an audience is generated.");
      return;
    }
    setBusy(true);
    setErr("");
    setResult(null);
    try {
      const data = await runComparativeTest({
        creative_a_id: Number(a),
        creative_b_id: Number(b),
        audience_id: audience.id,
      });
      setResult(data);
    } catch (e) {
      setErr(e.message || String(e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <div className="form-row">
        <label>Creative A</label>
        <select value={a} onChange={(e) => setA(e.target.value)}>
          <option value="">Select creative…</option>
          {creatives?.map((c) => (
            <option key={c.id} value={c.id}>{c.title}</option>
          ))}
        </select>
      </div>
      <div className="form-row">
        <label>Creative B</label>
        <select value={b} onChange={(e) => setB(e.target.value)}>
          <option value="">Select creative…</option>
          {creatives?.map((c) => (
            <option key={c.id} value={c.id}>{c.title}</option>
          ))}
        </select>
      </div>
      <button className="btn primary" type="button" onClick={handleRun} disabled={busy}>
        {busy ? "Running…" : "Run Comparative Test"}
      </button>
      {err && <div className="alert error">{err}</div>}

      {result && (
        <div className="card">
          <div className="card-title">Lift Projection</div>
          <pre className="code">{JSON.stringify(result.lift_projection || {}, null, 2)}</pre>
          <div className="card-subtle">{result.result_summary}</div>
        </div>
      )}
    </div>
  );
}
