// services/CoinsService.js
import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "SAGAMOENT_COLLECTION_V2";

export async function getCollection() {
  const raw = await AsyncStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : [];
}

async function saveCollection(list) {
  await AsyncStorage.setItem(KEY, JSON.stringify(list));
}

export async function saveCoin(aiResult) {
  const list = await getCollection();

  const coin = {
    id: Date.now().toString(),
    label_name: aiResult.label_name,
    confidence: aiResult.confidence,
    metadata: aiResult.metadata,
    frontImage: aiResult.frontImageBase64 ?? null,
    backImage: aiResult.backImageBase64 ?? null,
    savedAt: Date.now(),
    valueMin: 0,
    valueMax: 0,
    valueAvg: 0,
  };

  list.push(coin);
  await saveCollection(list);
  return coin.id;
}

export async function updateCoin(updated) {
  const list = await getCollection();
  const i = list.findIndex((c) => c.id === updated.id);
  if (i === -1) return;
  list[i] = { ...list[i], ...updated };
  await saveCollection(list);
}

export async function deleteCoin(id) {
  const list = await getCollection();
  await saveCollection(list.filter((x) => x.id !== id));
}
