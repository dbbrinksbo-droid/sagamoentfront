import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "SAGAMOENT_COLLECTION_V2";

export async function getCollection() {
  const raw = await AsyncStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : [];
}

async function saveCollection(c) {
  await AsyncStorage.setItem(KEY, JSON.stringify(c));
}

export async function saveCoin(aiResult) {
  const collection = await getCollection();

  const coin = {
    id: Date.now().toString(),
    label_idx: aiResult.label_idx,
    label_name: aiResult.label_name,
    confidence: aiResult.confidence,
    metadata: aiResult.metadata,
    image_uri: aiResult.image_uri,
    frontImageBase64: aiResult.frontImageBase64,
    backImageBase64: aiResult.backImageBase64,
    savedAt: Date.now(),

    // værdier (kommer senere)
    valueMin: 0,
    valueMax: 0,
    valueAvg: 0,
  };

  collection.push(coin);
  await saveCollection(collection);
  return coin.id;
}

export async function deleteCoin(id) {
  const c = await getCollection();
  const f = c.filter((x) => x.id !== id);
  await saveCollection(f);
}

export async function updateCoin(updated) {
  const c = await getCollection();
  const i = c.findIndex((x) => x.id === updated.id);
  if (i === -1) return;
  c[i] = { ...c[i], ...updated };
  await saveCollection(c);
}

