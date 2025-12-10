// navigation/AppNavigator.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeStack from "./HomeStack";
import ScanStack from "./ScanStack";
import CollectionStack from "./CollectionStack";
import SettingsStack from "./SettingsStack";
import AiStack from "./AiStack";

import OnboardingScreen from "../screens/OnboardingScreen";
import PaywallMainScreen from "../screens/PaywallMainScreen";

import { usePro } from "../services/ProLockService";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { isPro } = usePro();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Første start */}
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />

      {/* Hoved appen */}
      <Stack.Screen name="HomeStack" component={HomeStack} />
      <Stack.Screen name="ScanStack" component={ScanStack} />
      <Stack.Screen name="CollectionStack" component={CollectionStack} />
      <Stack.Screen name="SettingsStack" component={SettingsStack} />
      <Stack.Screen name="AiStack" component={AiStack} />

      {/* Paywall */}
      {!isPro && (
        <Stack.Screen name="Paywall" component={PaywallMainScreen} />
      )}
    </Stack.Navigator>
  );
}
