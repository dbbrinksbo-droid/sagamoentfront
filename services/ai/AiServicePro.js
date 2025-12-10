// services/AiServicePro.js
import { API_URL } from "./config";

export async function analyzeCoin(frontUri, backUri = null) {
  try {
    const data = new FormData();
    data.append("front", { uri: frontUri, name: "front.jpg", type: "image/jpeg" });

    if (backUri) {
      data.append("back", { uri: backUri, name: "back.jpg", type: "image/jpeg" });
    }

    const res = await fetch(`${API_URL}/analyze`, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });

    return await res.json();
  } catch (err) {
    console.log("SERVER ERROR:", err);
    return { error: "server_failed" };
  }
}
