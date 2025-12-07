import * as Print from "expo-print";
import * as FileSystem from "expo-file-system";

export async function generateCoinPDF(coin) {
  const html = `
    <html><body style="font-family:-apple-system;padding:20px;">
      <h1>${coin.label_name}</h1>
      <h3>Confidence: ${Math.round(coin.confidence * 100)}%</h3>
      <img src="${coin.image_uri}" style="width:200px;height:200px;border-radius:12px;" />
      <p>Gemtdato: ${new Date(coin.savedAt).toLocaleDateString("da-DK")}</p>
    </body></html>
  `;

  const { uri } = await Print.printToFileAsync({ html });
  const pdf = `${FileSystem.cacheDirectory}coin_${coin.id}.pdf`;

  await FileSystem.copyAsync({ from: uri, to: pdf });
  return pdf;
}

