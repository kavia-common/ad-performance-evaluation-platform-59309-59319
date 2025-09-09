import React, { useState } from "react";
import { exportScorecard } from "../../api";

// PUBLIC_INTERFACE
export default function ExportControls({ scorecard }) {
  /** Exports scorecards as PDF/CSV by calling backend and triggering a download. */
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const triggerDownload = (blob, filename) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
    }, 1000);
  };

  const handleExport = async (format) => {
    if (!scorecard?.creative?.id || !scorecard?.audience?.id) {
      setErr("Scorecard is required to export.");
      return;
    }
    setBusy(true);
    setErr("");
    try {
      const blob = await exportScorecard({
        creative_id: scorecard.creative.id,
        audience_id: scorecard.audience.id,
        format,
      });
      const filename = `scorecard_${scorecard.id || "latest"}.${format}`;
      triggerDownload(blob, filename);
    } catch (e) {
      setErr(e.message || String(e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <div className="section-subtitle">Export Scorecard</div>
      <div className="btn-row">
        <button className="btn" onClick={() => handleExport("pdf")} disabled={busy}>Export PDF</button>
        <button className="btn" onClick={() => handleExport("csv")} disabled={busy}>Export CSV</button>
      </div>
      {err && <div className="alert error">{err}</div>}
      {!scorecard && <div className="placeholder small">Score a creative to enable exports.</div>}
    </div>
  );
}
