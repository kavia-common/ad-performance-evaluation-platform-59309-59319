import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import {
  LeftPanel,
  MainPanel,
  RightPanel,
  TopNav,
} from "./components";
import { listCreatives, scoreCreative } from "./api";

// PUBLIC_INTERFACE
function App() {
  /** Root app that renders a three-pane layout and orchestrates flows. */
  const [theme, setTheme] = useState(
    window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark"
  );
  const [creatives, setCreatives] = useState([]);
  const [selectedCreative, setSelectedCreative] = useState(null);
  const [metadata, setMetadata] = useState({});
  const [audience, setAudience] = useState(null);
  const [scorecard, setScorecard] = useState(null);
  const [loadingScore, setLoadingScore] = useState(false);
  const [errorScore, setErrorScore] = useState("");

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Load creatives on init
  useEffect(() => {
    (async () => {
      try {
        const data = await listCreatives();
        setCreatives(Array.isArray(data) ? data : []);
      } catch {
        // ignore
      }
    })();
  }, []);

  // Composite percentage for CSS conic gradient
  const compositePct = useMemo(() => {
    const val = scorecard?.composite ?? 0;
    const pct = Math.max(0, Math.min(100, Math.round(val)));
    document.documentElement.style.setProperty("--p", pct.toString());
    return pct;
  }, [scorecard]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  const onUploadComplete = (created) => {
    setCreatives((prev) => [created, ...prev]);
    setSelectedCreative(created);
  };

  const onGenerateAudience = (aud) => {
    setAudience(aud);
  };

  const onScore = async () => {
    if (!selectedCreative?.id || !audience?.id) {
      setErrorScore("Please select a creative and generate an audience first.");
      return;
    }
    setLoadingScore(true);
    setErrorScore("");
    setScorecard(null);
    try {
      const sc = await scoreCreative({
        creative_id: selectedCreative.id,
        audience_id: audience.id,
      });
      setScorecard(sc);
    } catch (e) {
      setErrorScore(e.message || String(e));
    } finally {
      setLoadingScore(false);
    }
  };

  return (
    <div className="App">
      <TopNav theme={theme} onToggleTheme={toggleTheme} />
      <div className="workspace">
        <LeftPanel
          selectedCreative={selectedCreative}
          setSelectedCreative={setSelectedCreative}
          metadata={metadata}
          setMetadata={setMetadata}
          audience={audience}
          setAudience={setAudience}
          onUploadComplete={onUploadComplete}
          onGenerateAudience={onGenerateAudience}
          creatives={creatives}
        />
        <MainPanel
          scorecard={scorecard}
          onScore={onScore}
          loading={loadingScore}
          error={errorScore}
        />
        <RightPanel
          scorecard={scorecard}
          selectedCreative={selectedCreative}
          audience={audience}
          creatives={creatives}
        />
      </div>
    </div>
  );
}

export default App;
