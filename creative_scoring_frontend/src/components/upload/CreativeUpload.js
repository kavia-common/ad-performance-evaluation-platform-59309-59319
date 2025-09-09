import React, { useState, useEffect } from "react";
import { uploadCreative, listCreatives } from "../../api";

// PUBLIC_INTERFACE
export default function CreativeUpload({
  onUploadComplete,
  selectedCreative,
  setSelectedCreative,
  creatives,
}) {
  /** Uploads new creative and lists existing ones. */
  const [localCreatives, setLocalCreatives] = useState(creatives || []);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [ctype, setCtype] = useState("image");
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function refreshList() {
    try {
      const data = await listCreatives();
      setLocalCreatives(Array.isArray(data) ? data : []);
    } catch (e) {
      // Non-fatal; can be unauth or empty
    }
  }

  useEffect(() => {
    if (!creatives) {
      refreshList();
    } else {
      setLocalCreatives(creatives);
    }
  }, [creatives]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const created = await uploadCreative({
        title,
        description: desc,
        creative_type: ctype,
        file,
        metadata: {},
      });
      onUploadComplete && onUploadComplete(created);
      await refreshList();
      setTitle("");
      setDesc("");
      setFile(null);
    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-row">
          <label>Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="form-row">
          <label>Description</label>
          <input value={desc} onChange={(e) => setDesc(e.target.value)} />
        </div>
        <div className="form-row">
          <label>Type</label>
          <select value={ctype} onChange={(e) => setCtype(e.target.value)}>
            <option value="mp4">MP4</option>
            <option value="image">JPG/PNG</option>
            <option value="html5">HTML5</option>
          </select>
        </div>
        <div className="form-row">
          <label>File</label>
          <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        </div>
        <div className="form-row">
          <button className="btn primary" type="submit" disabled={busy}>
            {busy ? "Uploading…" : "Upload"}
          </button>
        </div>
        {error && <div className="alert error">{error}</div>}
      </form>

      <div className="divider" />
      <div className="list">
        <div className="list-header">Your Creatives</div>
        {localCreatives?.length ? (
          localCreatives.map((c) => (
            <button
              key={c.id}
              className={`list-item ${selectedCreative?.id === c.id ? "selected" : ""}`}
              onClick={() => setSelectedCreative(c)}
              type="button"
            >
              <div className="list-item-title">{c.title}</div>
              <div className="list-item-subtle">{c.creative_type}</div>
            </button>
          ))
        ) : (
          <div className="placeholder small">No creatives yet.</div>
        )}
      </div>
    </div>
  );
}
