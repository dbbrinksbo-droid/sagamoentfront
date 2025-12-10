// navigation/RootNavigation.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens — Scanner & AI
import ScannerScreen from "../screens/ScannerScreen";
import ResultScreen from "../screens/ResultScreen";

// Collection suite
import CollectionScreen from "../screens/CollectionScreen";
import CoinDetailScreen from "../screens/CoinDetailScreen";
import EditCoinScreen from "../screens/EditCoinScreen";

// Export
import ExportMenu from "../screens/ExportMenu";
import PdfExportScreen from "../screens/PdfExportScreen";
import ZipExportScreen from "../screens/ZipExportScreen";

// Home & Settings
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";

// Styles
import Theme from "../theme/Theme";

const Stack = createNativeStackNavigator();

export default function RootNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: Theme.colors.background },
          headerTintColor: Theme.colors.gold,
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >

        {/* HOME */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "SagaMoent" }}
        />

        {/* SCANNER + RESULT */}
        <Stack.Screen
          name="Scanner"
          component={ScannerScreen}
          options={{ title: "Scan Mønt" }}
        />

        <Stack.Screen
          name="Result"
          component={ResultScreen}
          options={{ title: "AI Resultat" }}
        />

        {/* COLLECTION */}
        <Stack.Screen
          name="Collection"
          component={CollectionScreen}
          options={{ title: "Min Samling" }}
        />

        <Stack.Screen
          name="CoinDetail"
          component={CoinDetailScreen}
          options={{ title: "Detaljer" }}
        />

        <Stack.Screen
          name="EditCoin"
          component={EditCoinScreen}
          options={{ title: "Rediger Mønt" }}
        />

        {/* EXPORT */}
        <Stack.Screen
          name="ExportMenu"
          component={ExportMenu}
          options={{ title: "Eksport" }}
        />

        <Stack.Screen
          name="PdfExport"
          component={PdfExportScreen}
          options={{ title: "PDF Eksport" }}
        />

        <Stack.Screen
          name="ZipExport"
          component={ZipExportScreen}
          options={{ title: "ZIP Eksport" }}
        />

        {/* SETTINGS */}
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: "Indstillinger" }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
