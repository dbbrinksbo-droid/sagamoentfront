// navigation/ScanStack.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ScannerScreen from "../screens/ScannerScreen";
import ResultScreen from "../screens/ResultScreen";
import ManualInfoScreen from "../screens/ManualInfoScreen";
import CorrectLabelsScreen from "../screens/CorrectLabelsScreen";
import CoinExpertScreen from "../screens/CoinExpertScreen";

import PdfExportScreen from "../screens/PdfExportScreen";
import SingleExportChooseScreen from "../screens/SingleExportChooseScreen";
import ShareExportScreen from "../screens/ShareExportScreen";

import PaywallMainScreen from "../screens/PaywallMainScreen";

import { usePro } from "../services/ProLockService";

const Stack = createNativeStackNavigator();

export default function ScanStack() {
  const { isPro } = usePro();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      {/* 1 – scanner */}
      <Stack.Screen name="Scanner" component={ScannerScreen} />

      {/* 2 – resultat */}
      <Stack.Screen name="Result" component={ResultScreen} />

      {/* 3 – manuel info (bruges ved ocr-fejl eller unknown coin) */}
      <Stack.Screen name="ManualInfo" component={ManualInfoScreen} />

      {/* 4 – korrektion (labels & metadata) */}
      <Stack.Screen name="CorrectLabels" component={CorrectLabelsScreen} />

      {/* 5 – CoinExpert (GPT) */}
      <Stack.Screen name="CoinExpert" component={CoinExpertScreen} />

      {/* 6 – Eksport (PDF / Fil) */}
      <Stack.Screen name="PdfExport" component={PdfExportScreen} />
      <Stack.Screen name="SingleExportChoose" component={SingleExportChooseScreen} />
      <Stack.Screen name="ShareExport" component={ShareExportScreen} />

      {/* 7 – Paywall fallback */}
      {!isPro && (
        <Stack.Screen name="Paywall" component={PaywallMainScreen} />
      )}
    </Stack.Navigator>
  );
}
