import React, { useState, useEffect } from "react";

// PUBLIC_INTERFACE
export default function MetadataForm({ metadata, setMetadata }) {
  /** Simple metadata editor as key/value pairs stored locally until upload (for future use). */
  const [rows, setRows] = useState([{ key: "", value: "" }]);

  useEffect(() => {
    if (metadata && typeof metadata === "object") {
      const pairs = Object.entries(metadata).map(([key, value]) => ({ key, value }));
      if (pairs.length) setRows(pairs);
    }
  }, [metadata]);

  const updateRow = (i, field, val) => {
    const next = rows.slice();
    next[i] = { ...next[i], [field]: val };
    setRows(next);
    setMetadata(Object.fromEntries(next.filter(r => r.key).map(r => [r.key, r.value])));
  };

  const addRow = () => setRows([...rows, { key: "", value: "" }]);
  const removeRow = (i) => {
    const next = rows.filter((_, idx) => i !== idx);
    setRows(next);
    setMetadata(Object.fromEntries(next.filter(r => r.key).map(r => [r.key, r.value])));
  };

  return (
    <div>
      {rows.map((r, i) => (
        <div className="form-row" key={i}>
          <input placeholder="Key" value={r.key} onChange={(e) => updateRow(i, "key", e.target.value)} />
          <input placeholder="Value" value={r.value} onChange={(e) => updateRow(i, "value", e.target.value)} />
          <button className="btn ghost" type="button" onClick={() => removeRow(i)} aria-label="Remove">✕</button>
        </div>
      ))}
      <button className="btn" type="button" onClick={addRow}>Add field</button>
    </div>
  );
}
