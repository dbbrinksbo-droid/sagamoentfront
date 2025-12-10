import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import RootNavigation from "./navigation/RootNavigation";
import { ThemeProvider } from "./theme/ThemeService";
import { ProProvider } from "./services/ProLockService";

export default function App() {
  return (
    <ProProvider>
      <ThemeProvider>
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
      </ThemeProvider>
    </ProProvider>
  );
}
