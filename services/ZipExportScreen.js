import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import JSZip from "jszip";
import { getCollection } from "./CoinsService";

export async function exportFullZip() {
  const collection = await getCollection();
  if (!collection.length) throw new Error("Tom samling");

  const zip = new JSZip();
  const root = zip.folder("SagaMoentCollection");

  for (const coin of collection) {
    const f = root.folder(`coin_${coin.id}`);
    f.file("profile.json", JSON.stringify(coin, null, 2));

    if (coin.frontImage) {
      f.file(
        "front.jpg",
        Buffer.from(coin.frontImage, "base64"),
        { binary: true }
      );
    }

    if (coin.backImage) {
      f.file(
        "back.jpg",
        Buffer.from(coin.backImage, "base64"),
        { binary: true }
      );
    }
  }

  const zip64 = await zip.generateAsync({ type: "base64" });
  const zipPath = FileSystem.cacheDirectory + "SagaMoentCollection.zip";

  await FileSystem.writeAsStringAsync(zipPath, zip64, {
    encoding: FileSystem.EncodingType.Base64,
  });

  await Sharing.shareAsync(zipPath);

  return zipPath;
}
