import { buildPDF } from "./build/buildPDF";
import { royalGoldTheme } from "./themes/RoyalGold";
import { antiqueTheme } from "./themes/AntiqueManuscript";
import { chromeTheme } from "./themes/BlackChromeRoyal";

export async function exportCoinsPDF(coins, theme, mode = "share") {
  let html = "";

  switch (theme) {
    case "royal":
      html = royalGoldTheme(coins);
      break;
    case "antique":
      html = antiqueTheme(coins);
      break;
    case "chrome":
      html = chromeTheme(coins);
      break;
  }

  return await buildPDF(html, mode);
}
