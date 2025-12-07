// services/CoinsService.js
// SagaMoent – Katalog- og møntprofil service
// Gemmer AI/GPT Vision profiler, loader samling, beregner totalværdi

import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "SAGAMOENT_COLLECTION_V1";

// ------------------------------------------------------
// 🟡 Hent samlingen
// ------------------------------------------------------
export async function getCollection() {
  try {
    const json = await AsyncStorage.getItem(KEY);
    return json ? JSON.parse(json) : [];
  } catch (err) {
    console.log("Error loading collection:", err);
    return [];
  }
}

// ------------------------------------------------------
// 🟢 Gem hele samlingen (intern hjælpefunktion)
// ------------------------------------------------------
async function saveCollection(collection) {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(collection));
  } catch (err) {
    console.log("Error saving collection:", err);
  }
}

// ------------------------------------------------------
// 🔥 SPARER → GEM MØNTPROFIL
// ------------------------------------------------------
export async function saveCoinToCollection(coinProfile) {
  try {
    const collection = await getCollection();

    // Tilføj mønten
    collection.push({
      ...coinProfile,
      savedAt: Date.now(),
    });

    await saveCollection(collection);
    console.log("Møntprofil gemt:", coinProfile.id);

    return true;
  } catch (err) {
    console.log("Error saving coin:", err);
    return false;
  }
}

// ------------------------------------------------------
// 🟣 SLET EN MØNT FRA KOLLEKTIONEN
// ------------------------------------------------------
export async function deleteCoin(id) {
  try {
    let collection = await getCollection();
    collection = collection.filter((c) => c.id !== id);
    await saveCollection(collection);
    return true;
  } catch (err) {
    console.log("Error deleting coin:", err);
    return false;
  }
}

// ------------------------------------------------------
// ⭐ BEREGN TOTAL SAMLERVÆRDI
// ------------------------------------------------------
export async function getTotalValue() {
  const collection = await getCollection();

  let sumMin = 0;
  let sumMax = 0;
  let sumAvg = 0;

  for (const coin of collection) {
    const vMin = coin.valueMin ?? 0;
    const vMax = coin.valueMax ?? 0;
    const vAvg =
      coin.userAdjustValue ??
      coin.valueAvg ??
      Math.round((vMin + vMax) / 2);

    sumMin += vMin;
    sumMax += vMax;
    sumAvg += vAvg;
  }

  return {
    count: collection.length,
    totalMin: sumMin,
    totalMax: sumMax,
    totalAvg: sumAvg,
  };
}

// ------------------------------------------------------
// ⭐ HENT ENKEL MØNT
// ------------------------------------------------------
export async function getCoin(id) {
  const collection = await getCollection();
  return collection.find((c) => c.id === id) || null;
}

// ------------------------------------------------------
// ⭐ OPDATER MØNT (fx værdi eller stand)
// ------------------------------------------------------
export async function updateCoin(updatedCoin) {
  try {
    const collection = await getCollection();

    const index = collection.findIndex((c) => c.id === updatedCoin.id);
    if (index === -1) return false;

    collection[index] = {
      ...collection[index],
      ...updatedCoin,
    };

    await saveCollection(collection);
    return true;
  } catch (err) {
    console.log("Error updating coin:", err);
    return false;
  }
}

