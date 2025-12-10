// navigation/CollectionStack.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CollectionScreen from "../screens/CollectionScreen";
import CoinDetailScreen from "../screens/CoinDetailScreen";
import EditCoinScreen from "../screens/EditCoinScreen";

import ExportMenu from "../screens/ExportMenu";
import SingleExportChooseScreen from "../screens/SingleExportChooseScreen";
import ShareExportScreen from "../screens/ShareExportScreen";
import PdfExportScreen from "../screens/PdfExportScreen";

import MarketScreen from "../screens/MarketScreen";
import PaywallMainScreen from "../screens/PaywallMainScreen";

import { usePro } from "../services/ProLockService";

const Stack = createNativeStackNavigator();

export default function CollectionStack() {
  const { isPro } = usePro();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      {/* 1 – Liste af mønter */}
      <Stack.Screen name="Collection" component={CollectionScreen} />

      {/* 2 – Detaljer */}
      <Stack.Screen name="CoinDetail" component={CoinDetailScreen} />

      {/* 3 – Redigering */}
      <Stack.Screen name="EditCoin" component={EditCoinScreen} />

      {/* 4 – Export menu */}
      <Stack.Screen name="ExportMenu" component={ExportMenu} />
      <Stack.Screen name="PdfExport" component={PdfExportScreen} />
      <Stack.Screen name="SingleExportChoose" component={SingleExportChooseScreen} />
      <Stack.Screen name="ShareExport" component={ShareExportScreen} />

      {/* 5 – Market (prisinfo, trends, upcoming) */}
      <Stack.Screen name="Market" component={MarketScreen} />

      {/* 6 – Paywall fallback til PRO features */}
      {!isPro && (
        <Stack.Screen name="Paywall" component={PaywallMainScreen} />
      )}
    </Stack.Navigator>
  );
}
