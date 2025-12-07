import { buildPDF } from "./build/buildPDF";
import { royalGoldTheme } from "./themes/RoyalGold";
import { antiqueTheme } from "./themes/AntiqueManuscript";
import { chromeTheme } from "./themes/BlackChromeRoyal";

export async function exportCoinsPDF(coins, theme, mode = "share") {
  let html = "";

  if (theme === "royal") html = royalGoldTheme(coins);
  if (theme === "antique") html = antiqueTheme(coins);
  if (theme === "chrome") html = chromeTheme(coins);

  await buildPDF(html, mode);
}
