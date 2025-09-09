# Creative Scoring Frontend

This React app implements a three-pane layout for the creative scoring platform with:
- Left panel: Upload, Metadata, Synthetic Audience
- Main panel: Scoring, Breakdown, Outcome Projections
- Right panel: Recommendations, Comparative Testing, Export, Admin Weighting

Environment:
- Set REACT_APP_API_BASE to the backend base URL (e.g., http://localhost:8000/api or /api via proxy)
  You can copy `.env.example` to `.env` and adjust as necessary.

Scripts:
- npm start
- npm run build
- npm test

Notes:
- No heavy UI libraries; pure CSS and React for minimal footprint.
- Privacy-first UX: no PII; assets handled via backend upload endpoint.
