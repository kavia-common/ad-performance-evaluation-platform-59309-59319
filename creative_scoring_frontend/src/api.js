//
// API client abstraction for the Django backend.
// Uses environment variables for base URL. All endpoints mirror provided openapi.json.
//
// PUBLIC_INTERFACE
export const getApiBase = () => {
  /** Returns the base API URL from the environment variable REACT_APP_API_BASE or defaults to /api. */
  const base = process.env.REACT_APP_API_BASE || "/api";
  return base.replace(/\/$/, "");
};

// PUBLIC_INTERFACE
export async function apiGet(path, params) {
  /** Perform GET request with optional query parameters.
   * Returns parsed JSON or throws an error with message for HTTP errors.
   */
  const url = new URL(getApiBase() + path, window.location.origin);
  if (params && typeof params === "object") {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null) url.searchParams.append(k, v);
    });
  }
  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Accept": "application/json",
    },
    credentials: "include",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GET ${path} failed: ${res.status} ${text}`);
  }
  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return res.json();
  }
  return res.blob();
}

// PUBLIC_INTERFACE
export async function apiPost(path, body, isForm = false) {
  /** Perform POST request with JSON body by default or multipart/form-data when isForm is true.
   * Returns parsed JSON or throws on error.
   */
  const res = await fetch(getApiBase() + path, {
    method: "POST",
    headers: isForm
      ? { Accept: "application/json" }
      : {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
    body: isForm ? body : JSON.stringify(body),
    credentials: "include",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`POST ${path} failed: ${res.status} ${text}`);
  }
  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return res.json();
  }
  return res.blob();
}

// PUBLIC_INTERFACE
export async function uploadCreative({ title, description, creative_type, file, metadata }) {
  /** Upload creative asset (MP4, JPG/PNG, or HTML5 bundle) with metadata. Returns Creative. */
  const form = new FormData();
  form.append("title", title);
  form.append("description", description || "");
  form.append("creative_type", creative_type);
  if (file) form.append("file", file);
  if (metadata) form.append("metadata", JSON.stringify(metadata));
  return apiPost("/upload/", form, true);
}

// PUBLIC_INTERFACE
export async function listCreatives() {
  /** List creatives for the authenticated user. */
  return apiGet("/creatives/");
}

// PUBLIC_INTERFACE
export async function generateAudience({ name, description, size, traits }) {
  /** Create or get synthetic audience definition. Returns Audience. */
  return apiPost("/audience/", { name, description, size, traits });
}

// PUBLIC_INTERFACE
export async function scoreCreative({ creative_id, audience_id }) {
  /** Compute component scores/composite and return Scorecard with breakdown. */
  return apiPost("/score/", { creative_id, audience_id });
}

// PUBLIC_INTERFACE
export async function getRecommendations({ creative_id, audience_id }) {
  /** Get top 3 recommendations for a given creative and audience. */
  return apiGet("/recommendations/", { creative_id, audience_id });
}

// PUBLIC_INTERFACE
export async function runComparativeTest({ creative_a_id, creative_b_id, audience_id }) {
  /** Runs a comparative creative test and returns lift projections and summary. */
  return apiPost("/comparative_test/", { creative_a_id, creative_b_id, audience_id });
}

// PUBLIC_INTERFACE
export async function exportScorecard({ creative_id, audience_id, format = "pdf" }) {
  /** Export a scorecard as PDF or CSV. Returns Blob. Caller should trigger download. */
  return apiGet("/export/", { creative_id, audience_id, format });
}

// PUBLIC_INTERFACE
export async function listWeightings() {
  /** List score weightings for admin. */
  return apiGet("/admin/weightings");
}

// PUBLIC_INTERFACE
export async function createWeighting(payload) {
  /** Create a weighting configuration. Set is_active=true to activate. */
  return apiPost("/admin/weightings", payload);
}
