import React from "react";
import CreativeUpload from "../upload/CreativeUpload";
import MetadataForm from "../upload/MetadataForm";
import AudienceBuilder from "../audience/AudienceBuilder";

// PUBLIC_INTERFACE
export default function LeftPanel({
  selectedCreative,
  setSelectedCreative,
  metadata,
  setMetadata,
  audience,
  setAudience,
  onUploadComplete,
  onGenerateAudience,
  creatives,
}) {
  /** Left panel containing creative upload, metadata entry and audience builder. */
  return (
    <aside className="panel left-panel">
      <section className="section">
        <h3 className="section-title">Upload Creative</h3>
        <CreativeUpload
          onUploadComplete={onUploadComplete}
          selectedCreative={selectedCreative}
          setSelectedCreative={setSelectedCreative}
          creatives={creatives}
        />
      </section>

      <section className="section">
        <h3 className="section-title">Metadata</h3>
        <MetadataForm metadata={metadata} setMetadata={setMetadata} />
      </section>

      <section className="section">
        <h3 className="section-title">Synthetic Audience</h3>
        <AudienceBuilder audience={audience} setAudience={setAudience} onGenerate={onGenerateAudience} />
      </section>
    </aside>
  );
}
