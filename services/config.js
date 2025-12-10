import Constants from "expo-constants";

const extra = Constants.expoConfig?.extra ?? {};

export const API_URL =
  extra.EXPO_PUBLIC_API_URL || process.env.EXPO_PUBLIC_API_URL;

export const OPENAI_API_KEY =
  extra.EXPO_PUBLIC_OPENAI_KEY || process.env.EXPO_PUBLIC_OPENAI_KEY;

if (!API_URL) {
  console.warn("⚠️ API_URL mangler! Tilføj EXPO_PUBLIC_API_URL i app.json eller .env");
}
