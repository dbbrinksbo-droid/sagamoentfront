// services/ProLockService.js
import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "SAGAMOENT_PRO_UNLOCKED";

const ProContext = createContext();

export function ProProvider({ children }) {
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem(KEY);
      setIsPro(saved === "true");
    })();
  }, []);

  async function unlockPro() {
    await AsyncStorage.setItem(KEY, "true");
    setIsPro(true);
  }

  return (
    <ProContext.Provider value={{ isPro, unlockPro }}>
      {children}
    </ProContext.Provider>
  );
}

export function usePro() {
  return useContext(ProContext);
}
