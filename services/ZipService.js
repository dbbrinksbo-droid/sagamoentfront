import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import JSZip from "jszip";
import { getCollection } from "./CoinsService";

export async function exportFullZip() {
  const collection = await getCollection();
  if (!collection.length) throw new Error("Samlingen er tom.");

  const zip = new JSZip();
  const root = zip.folder("SagaMoentCollection");

  for (const coin of collection) {
    const f = root.folder(`coin_${coin.id}`);

    f.file("profile.json", JSON.stringify(coin, null, 2));

    if (coin.frontImageBase64) {
      f.file(
        "front.jpg",
        Buffer.from(coin.frontImageBase64, "base64"),
        { binary: true }
      );
    }

    if (coin.backImageBase64) {
      f.file(
        "back.jpg",
        Buffer.from(coin.backImageBase64, "base64"),
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

