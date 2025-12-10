// navigation/SettingsStack.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SettingsScreen from "../screens/SettingsScreen";
import AboutScreen from "../screens/AboutScreen";
import LicenseScreen from "../screens/LicenseScreen";
import PdfThemeScreen from "../screens/PdfThemeScreen";
import PaywallMainScreen from "../screens/PaywallMainScreen";
import DebugScreen from "../screens/DebugScreen";

import { usePro } from "../services/ProLockService";

const Stack = createNativeStackNavigator();

export default function SettingsStack() {
  const { isPro } = usePro();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      {/* 1 – Hovedindstillinger */}
      <Stack.Screen name="Settings" component={SettingsScreen} />

      {/* 2 – Om appen */}
      <Stack.Screen name="About" component={AboutScreen} />

      {/* 3 – Licenser */}
      <Stack.Screen name="License" component={LicenseScreen} />

      {/* 4 – PDF temaer (Pro) */}
      <Stack.Screen name="PdfTheme">
        {() =>
          isPro ? (
            <PdfThemeScreen />
          ) : (
            <PaywallMainScreen />
          )
        }
      </Stack.Screen>

      {/* 5 – Debug (valgfri Pro) */}
      <Stack.Screen name="Debug">
        {() =>
          isPro ? (
            <DebugScreen />
          ) : (
            <PaywallMainScreen />
          )
        }
      </Stack.Screen>

    </Stack.Navigator>
  );
}
