// services/db/coinStorage.js
import * as SQLite from "expo-sqlite";

let db;

// Åbn database
(async () => {
  db = await SQLite.openDatabaseAsync("sagamoent.db");

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS coins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      frontImage TEXT,
      backImage TEXT,
      label_name TEXT,
      confidence REAL,
      year TEXT,
      country TEXT,
      type TEXT,
      metal TEXT,
      grade TEXT,
      variant TEXT,
      ocr TEXT,
      metadata TEXT,
      valueMin REAL,
      valueMax REAL,
      valueAvg REAL,
      notes TEXT,
      savedAt INTEGER
    );
  `);
})();

// HENT ALLE
export async function getAllCoins() {
  if (!db) return [];
  return await db.getAllAsync("SELECT * FROM coins ORDER BY id DESC");
}

// GEM
export async function saveCoin(coin) {
  const {
    frontImage,
    backImage,
    label_name,
    confidence,
    year,
    country,
    type,
    metal,
    grade,
    variant,
    ocr,
    metadata,
    valueMin,
    valueMax,
    valueAvg,
    notes,
  } = coin;

  await db.runAsync(
    `INSERT INTO coins 
    (frontImage, backImage, label_name, confidence, year, country, type, metal, grade, variant, ocr, metadata, valueMin, valueMax, valueAvg, notes, savedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      frontImage,
      backImage,
      label_name,
      confidence,
      year,
      country,
      type,
      metal,
      grade,
      variant,
      ocr,
      JSON.stringify(metadata),
      valueMin,
      valueMax,
      valueAvg,
      notes,
      Date.now(),
    ]
  );
}

// SLET
export async function deleteCoin(id) {
  await db.runAsync("DELETE FROM coins WHERE id = ?", [id]);
}

// OPDATER
export async function updateCoin(id, fields) {
  const keys = Object.keys(fields);
  const values = Object.values(fields);

  const setString = keys.map((k) => `${k}=?`).join(", ");

  await db.runAsync(
    `UPDATE coins SET ${setString} WHERE id = ?`,
    [...values, id]
  );
}
