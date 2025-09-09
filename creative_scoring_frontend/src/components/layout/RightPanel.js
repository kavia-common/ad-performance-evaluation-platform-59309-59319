import React, { useState } from "react";
import Recommendations from "../recommendations/Recommendations";
import ComparativeTest from "../compare/ComparativeTest";
import ExportControls from "../export/ExportControls";
import AdminWeighting from "../admin/AdminWeighting";

// PUBLIC_INTERFACE
export default function RightPanel({
  scorecard,
  selectedCreative,
  audience,
  creatives,
}) {
  /** Right panel for recommendations, comparisons, export and admin controls. */
  const [activeTab, setActiveTab] = useState("recommendations");
  return (
    <aside className="panel right-panel">
      <div className="tabs">
        <button
          className={`tab ${activeTab === "recommendations" ? "active" : ""}`}
          onClick={() => setActiveTab("recommendations")}
        >
          Recommendations
        </button>
        <button
          className={`tab ${activeTab === "compare" ? "active" : ""}`}
          onClick={() => setActiveTab("compare")}
        >
          Compare
        </button>
        <button
          className={`tab ${activeTab === "export" ? "active" : ""}`}
          onClick={() => setActiveTab("export")}
        >
          Export
        </button>
        <button
          className={`tab ${activeTab === "admin" ? "active" : ""}`}
          onClick={() => setActiveTab("admin")}
        >
          Admin
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "recommendations" && (
          <Recommendations scorecard={scorecard} />
        )}
        {activeTab === "compare" && (
          <ComparativeTest audience={audience} creatives={creatives} />
        )}
        {activeTab === "export" && (
          <ExportControls scorecard={scorecard} />
        )}
        {activeTab === "admin" && <AdminWeighting />}
      </div>
    </aside>
  );
}
