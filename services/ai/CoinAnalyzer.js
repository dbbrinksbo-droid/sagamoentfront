// services/ai/CoinAnalyzer.js
import { analyzeFullCoin } from "../FullCoinAI";

export async function analyzeCoinV18(frontUri, backUri = null) {
  try {
    console.log("🔍 FullCoinAI → Running analysis…");

    const result = await analyzeFullCoin(frontUri, backUri);

    if (!result.success) {
      throw new Error(result.error || "AI-fejl");
    }

    return {
      label_name: result.label_name,
      confidence: result.confidence,
      ocr_text: result.ocr_text,
      metadata: result.metadata,
      model_used: result.model_used,
      raw: result,
    };
  } catch (err) {
    console.log("❌ CoinAnalyzer error:", err);
    throw err;
  }
}
