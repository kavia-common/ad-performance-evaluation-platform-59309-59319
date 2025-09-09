import React, { useState } from "react";
import { generateAudience } from "../../api";

// PUBLIC_INTERFACE
export default function AudienceBuilder({ audience, setAudience, onGenerate }) {
  /** Build a synthetic audience by specifying name, size and traits JSON. */
  const [name, setName] = useState(audience?.name || "");
  const [size, setSize] = useState(audience?.size || 10000);
  const [traits, setTraits] = useState(JSON.stringify(audience?.traits || { age: "25-44", interests: ["tech", "fitness"] }, null, 2));
  const [desc, setDesc] = useState(audience?.description || "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setBusy(true);
    setError("");
    try {
      const parsedTraits = JSON.parse(traits || "{}");
      const aud = await generateAudience({ name, description: desc, size: Number(size), traits: parsedTraits });
      setAudience(aud);
      onGenerate && onGenerate(aud);
    } catch (e) {
      setError(e.message || String(e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <div className="form-row">
        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Blu Tech Enthusiasts" />
      </div>
      <div className="form-row">
        <label>Size</label>
        <input type="number" value={size} onChange={(e) => setSize(e.target.value)} min={0} />
      </div>
      <div className="form-row">
        <label>Description</label>
        <input value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Short description" />
      </div>
      <div className="form-row">
        <label>Traits (JSON)</label>
        <textarea rows={6} value={traits} onChange={(e) => setTraits(e.target.value)} />
      </div>
      <div className="form-row">
        <button className="btn primary" type="button" onClick={handleGenerate} disabled={busy}>
          {busy ? "Generating…" : "Generate Audience"}
        </button>
      </div>
      {error && <div className="alert error">{error}</div>}
      {audience && (
        <div className="card subtle">
          <div className="card-title">{audience.name}</div>
          <div className="card-subtle">Size: {audience.size?.toLocaleString?.() || audience.size}</div>
        </div>
      )}
    </div>
  );
}
