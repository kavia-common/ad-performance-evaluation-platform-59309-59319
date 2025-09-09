import React, { useEffect, useState } from "react";
import { createWeighting, listWeightings } from "../../api";

// PUBLIC_INTERFACE
export default function AdminWeighting() {
  /** Admin panel to view and create weighting configurations. */
  const [weightings, setWeightings] = useState([]);
  const [name, setName] = useState("");
  const [brand, setBrand] = useState(0.4);
  const [perf, setPerf] = useState(0.4);
  const [attn, setAttn] = useState(0.2);
  const [active, setActive] = useState(true);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const load = async () => {
    try {
      const data = await listWeightings();
      setWeightings(Array.isArray(data) ? data : []);
    } catch {
      // ignore unauth, etc.
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onCreate = async () => {
    setBusy(true);
    setErr("");
    try {
      const payload = {
        name: name || `Config ${new Date().toISOString()}`,
        brand_lift_weight: Number(brand),
        performance_weight: Number(perf),
        attention_weight: Number(attn),
        is_active: Boolean(active),
      };
      await createWeighting(payload);
      setName("");
      await load();
    } catch (e) {
      setErr(e.message || String(e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <div className="section-subtitle">Score Weightings</div>
      <div className="list">
        {weightings?.map((w) => (
          <div key={w.id} className={`list-item ${w.is_active ? "selected" : ""}`}>
            <div className="list-item-title">{w.name}</div>
            <div className="list-item-subtle">Brand: {w.brand_lift_weight} | Perf: {w.performance_weight} | Attn: {w.attention_weight}</div>
          </div>
        ))}
        {!weightings?.length && <div className="placeholder small">No weighting configs yet.</div>}
      </div>

      <div className="divider" />
      <div className="section-subtitle">Create New</div>
      <div className="form-row">
        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Config name" />
      </div>
      <div className="form-row">
        <label>Brand</label>
        <input type="number" step="0.01" value={brand} onChange={(e) => setBrand(e.target.value)} />
      </div>
      <div className="form-row">
        <label>Performance</label>
        <input type="number" step="0.01" value={perf} onChange={(e) => setPerf(e.target.value)} />
      </div>
      <div className="form-row">
        <label>Attention</label>
        <input type="number" step="0.01" value={attn} onChange={(e) => setAttn(e.target.value)} />
      </div>
      <div className="form-row">
        <label>Active</label>
        <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} />
      </div>
      <button className="btn primary" onClick={onCreate} disabled={busy}>
        {busy ? "Saving…" : "Save Weighting"}
      </button>
      {err && <div className="alert error">{err}</div>}
    </div>
  );
}
