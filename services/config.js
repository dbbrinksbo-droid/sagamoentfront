// services/config.js

import Constants from "expo-constants";

// 1) PRIMÆRT: Læs fra app.json → expo.extra
const extra = Constants.expoConfig?.extra ?? {};

// 2) Fald tilbage til .env (process.env) hvis kører i Expo Go
export const API_URL =
  extra.EXPO_PUBLIC_API_URL || process.env.EXPO_PUBLIC_API_URL;

export const OPENAI_API_KEY =
  extra.EXPO_PUBLIC_OPENAI_KEY || process.env.EXPO_PUBLIC_OPENAI_KEY;

// 3) Warnings (kun på dev)
if (!API_URL) {
  console.warn("⚠️ API_URL mangler! Tilføj EXPO_PUBLIC_API_URL i app.json eller .env");
}

if (!OPENAI_API_KEY) {
  console.warn("⚠️ OPENAI_API_KEY mangler! Tilføj EXPO_PUBLIC_OPENAI_KEY i app.json eller .env");
}

