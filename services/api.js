// services/api.js
// ----------------------------------------------
// OFFICIEL BACKEND CLIENT (ren, stabil, V12 ready)
// ----------------------------------------------

import { API_URL } from "./config";

/**
 * analyzeOne
 * Front billede → backend
 */
export async function analyzeOne(frontUri) {
  const form = new FormData();

  form.append("front", {
    uri: frontUri,
    name: "front.jpg",
    type: "image/jpeg",
  });

  const res = await fetch(`${API_URL}/analyze-single`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: form,
  });

  return await res.json();
}

/**
 * analyzeDouble
 * Front + Back → backend
 */
export async function analyzeDouble(frontUri, backUri) {
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

  const res = await fetch(`${API_URL}/analyze-double`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: form,
  });

  return await res.json();
}

