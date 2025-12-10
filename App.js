// App.js — SagaMoent V12
import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import RootNavigation from "./navigation/RootNavigation";
import { ThemeProvider } from "./theme/ThemeService";  // global theme

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <StatusBar style="light" />
        <RootNavigation />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
