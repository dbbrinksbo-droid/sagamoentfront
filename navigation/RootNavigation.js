// navigation/RootNavigation.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import AppNavigator from "./AppNavigator";
import ThemeProvider from "../theme/ThemeService";
import ProProvider from "../services/ProLockService";
import AppContextProvider from "../services/AppContext";

// GLOBAL WRAPPER – Ens retning i hele appen
export default function RootNavigation() {
  return (
    <AppContextProvider>
      <ProProvider>
        <ThemeProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </ThemeProvider>
      </ProProvider>
    </AppContextProvider>
  );
}
