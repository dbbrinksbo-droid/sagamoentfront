// services/AiServicePro.js
import { API_URL } from "./config";

export async function analyzeSingle(imageUri) {
  let formData = new FormData();
  formData.append("image", {
    uri: imageUri,
    name: "coin.jpg",
    type: "image/jpeg",
  });

  const res = await fetch(`${API_URL}/analyze-single`, {
    method: "POST",
    headers: { "Content-Type": "multipart/form-data" },
    body: formData,
  });

  return await res.json();
}

export async function analyzeDouble(frontUri, backUri) {
  let formData = new FormData();
  formData.append("front", {
    uri: frontUri,
    name: "front.jpg",
    type: "image/jpeg",
  });

  formData.append("back", {
    uri: backUri,
    name: "back.jpg",
    type: "image/jpeg",
  });

  const res = await fetch(`${API_URL}/analyze-double`, {
    method: "POST",
    headers: { "Content-Type": "multipart/form-data" },
    body: formData,
  });

  return await res.json();
}

