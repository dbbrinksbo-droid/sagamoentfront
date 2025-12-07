import * as Print from "expo-print";

export async function printPDF(html) {
  try {
    await Print.printAsync({
      html,
    });
  } catch (err) {
    console.log("PRINT ERROR:", err);
    throw err;
  }
}
