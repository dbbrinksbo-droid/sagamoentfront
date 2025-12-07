import { buildPDF } from "./build/buildPDF";
import { royalGoldTheme } from "./themes/RoyalGold";
import { antiqueTheme } from "./themes/AntiqueManuscript";
import { chromeTheme } from "./themes/BlackChromeRoyal";

/**
 * Export Coins PDF (Legendary Edition)
 * ------------------------------------
 * - coins: array of coin objects
 * - theme: "royal" | "antique" | "chrome"
 * - mode:  "share" | "print" | "save"
 */

export async function exportCoinsPDF(coins, theme = "royal", mode = "share") {
  try {
    let html;

    // 🎨 TEMA VÆLGER
    switch (theme) {
      case "antique":
        html = antiqueTheme(coins);
        break;

      case "chrome":
        html = chromeTheme(coins);
        break;

      case "royal":
      default:
        html = royalGoldTheme(coins);
        break;
    }

    if (!html || typeof html !== "string") {
      console.log("⛔ Tema returnerede ingen HTML");
      return;
    }

    // 📝 GENERER PREMIUM PDF
    await buildPDF(html, mode);

  } catch (error) {
    console.log("💥 EXPORT PDF ERROR:", error);
    throw error;
  }
}
