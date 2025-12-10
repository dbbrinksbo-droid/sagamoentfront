// services/api.js
// ------------------------------------------------------
// SAGAMOENT OFFICIEL BACKEND CLIENT (AVANCERET V12 FLOW)
// ------------------------------------------------------

import { API_URL } from "./config";

// ------------------------------------------------------
// 1) analyzeOne — kun front-billede
// ------------------------------------------------------
export async function analyzeOne(frontUri) {
  try {
    const form = new FormData();

    form.append("front", {
      uri: frontUri,
      name: "front.jpg",
      type: "image/jpeg",
    });

    const res = await fetch(`${API_URL}/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: form,
    });

    return await safeJson(res);
  } catch (err) {
    return formatError("analyzeOne", err);
  }
}

// ------------------------------------------------------
// 2) analyzeDouble — front + back → fuld V12 analyse
// ------------------------------------------------------
export async function analyzeDouble(frontUri, backUri) {
  try {
    const form = new FormData();

    form.append("front", {
      uri: frontUri,
      name: "front.jpg",
      type: "image/jpeg",
    });

    if (backUri) {
      form.append("back", {
        uri: backUri,
        name: "back.jpg",
        type: "image/jpeg",
      });
    }

    const res = await fetch(`${API_URL}/full-analyze-v3`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: form,
    });

    return await safeJson(res);
  } catch (err) {
    return formatError("analyzeDouble", err);
  }
}

// ------------------------------------------------------
// 3) analyzeFull — intelligent wrapper
// Bruges af ScannerScreen / ResultScreen
// Auto-vælger single eller double
// ------------------------------------------------------
export async function analyzeFull(frontUri, backUri = null) {
  if (!frontUri) {
    return { success: false, error: "Mangler front-billede" };
  }

  if (!backUri) {
    // Single-side analyse
    const r = await analyzeOne(frontUri);
    return normalizeResponse(r, false);
  }

  // Dual-side analyse
  const r = await analyzeDouble(frontUri, backUri);
  return normalizeResponse(r, true);
}

// ------------------------------------------------------
// HELPER: safe JSON parse
// ------------------------------------------------------
async function safeJson(res) {
  try {
    return await res.json();
  } catch (e) {
    return { success: false, error: "Invalid JSON fra server" };
  }
}

// ------------------------------------------------------
// HELPER: error wrapper
// ------------------------------------------------------
function formatError(where, err) {
  console.log("🔥 API FEJL:", where, err);
  return {
    success: false,
    error: `${where} fejlede`,
    details: String(err),
  };
}

// ------------------------------------------------------
// HELPER: Ensret backend svar til ét format
// ------------------------------------------------------
function normalizeResponse(r, doubleSide) {
  if (!r) return { success: false, error: "Intet svar fra backend" };

  return {
    success: true,
    mode: doubleSide ? "double" : "single",
    label_name: r.label_name ?? r.label ?? "Ukendt",
    label_idx: r.label_idx ?? null,
    confidence: r.confidence ?? 0,
    year: r.year ?? null,
    metadata: r.metadata ?? {},
    ocr: r.ocr_text ?? r.ocr ?? "",
    raw: r,
  };
}
