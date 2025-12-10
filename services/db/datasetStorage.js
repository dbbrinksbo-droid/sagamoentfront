// services/db/datasetStorage.js
import * as SQLite from "expo-sqlite";

let db;

// Åbn DB
(async () => {
  db = await SQLite.openDatabaseAsync("sagamoent.db");

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS dataset (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      label TEXT,
      note TEXT,
      imagePath TEXT,
      updatedAt INTEGER
    );
  `);
})();

// OPDATER
export async function updateDatasetEntry(id, fields) {
  const keys = Object.keys(fields);
  const values = Object.values(fields);

  const setString = keys.map((k) => `${k}=?`).join(", ");

  await db.runAsync(
    `UPDATE dataset SET ${setString}, updatedAt=? WHERE id=?`,
    [...values, Date.now(), id]
  );
}

// SLET
export async function deleteDatasetEntry(id) {
  await db.runAsync("DELETE FROM dataset WHERE id=?", [id]);
}
