// services/ai/CoinAnalyzer.js — FINAL V12

import { analyzeFullCoin } from "../FullCoinAI";

export async function analyzeCoinV12(frontUri, backUri = null) {
  try {
    console.log("🔍 Running FullCoinAI V12…");

    const result = await analyzeFullCoin(frontUri, backUri);

    if (!result.success) {
      throw new Error(result.error || "Unknown AI error");
    }

    return {
      aiLabel: result.label_name,
      aiConfidence: result.confidence,
      ocr: result.ocr_text,
      metadata: result.metadata,
      raw: result.raw,
    };

  } catch (err) {
    console.log("❌ CoinAnalyzer V12 error:", err);
    throw err;
  }
}

