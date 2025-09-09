import React from "react";

// PUBLIC_INTERFACE
export default function TopNav({ theme, onToggleTheme }) {
  /** Top Navigation with app title, privacy note, and theme toggle. */
  return (
    <div className="topnav">
      <div className="brand">
        <span className="brand-mark">●</span>
        <span className="brand-name">Creative Scoring</span>
      </div>
      <div className="topnav-center">
        <span className="privacy-note" title="We never store PII. Assets are processed securely.">
          Privacy-first • No PII • Secure processing
        </span>
      </div>
      <div className="topnav-actions">
        <button className="btn ghost" onClick={onToggleTheme} aria-label="Toggle theme">
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>
    </div>
  );
}
