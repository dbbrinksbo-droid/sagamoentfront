// services/FullCoinAI.js — FIXED FOR EAS BUILD

import { API_URL } from "./config";

export async function analyzeFullCoin(frontUri, backUri = null) {
  const formData = new FormData();

  formData.append("front", {
    uri: frontUri,
    name: "front.jpg",
    type: "image/jpeg",
  });

  if (backUri) {
    formData.append("back", {
      uri: backUri,
      name: "back.jpg",
      type: "image/jpeg",
    });
  }

  try {
    const response = await fetch(`${API_URL}/full-analyze-v3`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });

    const json = await response.json();

    return {
      success: true,
      label_idx: json.label_idx ?? null,
      label_name: json.label_name ?? json.label ?? "Unknown",
      confidence: json.confidence ?? 0,
      ocr_text: json.ocr_text ?? "",
      metadata: json.metadata ?? {},
      model_used: json.model_used ?? "backend",
    };

  } catch (err) {
    console.log("🔥 FullCoinAI FEJL:", err);
    return {
      success: false,
      error: "AI analyze failed",
      raw: err,
    };
  }
}


