// navigation/AiStack.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AiTrainerScreen from "../screens/AiTrainerScreen";
import DatasetManagerScreen from "../screens/DatasetManagerScreen";
import DatasetScreen from "../screens/DatasetScreen";
import CorrectLabelsScreen from "../screens/CorrectLabelsScreen";
import ChatAssistantScreen from "../screens/ChatAssistantScreen";

import PaywallMainScreen from "../screens/PaywallMainScreen";
import { usePro } from "../services/ProLockService";

const Stack = createNativeStackNavigator();

export default function AiStack() {
  const { isPro } = usePro();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      {/* AI Trainer */}
      <Stack.Screen name="AiTrainer">
        {() =>
          isPro ? (
            <AiTrainerScreen />
          ) : (
            <PaywallMainScreen />
          )
        }
      </Stack.Screen>

      {/* Dataset Manager */}
      <Stack.Screen name="DatasetManager">
        {() =>
          isPro ? (
            <DatasetManagerScreen />
          ) : (
            <PaywallMainScreen />
          )
        }
      </Stack.Screen>

      {/* Dataset detaljer */}
      <Stack.Screen name="Dataset">
        {() =>
          isPro ? (
            <DatasetScreen />
          ) : (
            <PaywallMainScreen />
          )
        }
      </Stack.Screen>

      {/* Label korrektion */}
      <Stack.Screen name="CorrectLabels">
        {() =>
          isPro ? (
            <CorrectLabelsScreen />
          ) : (
            <PaywallMainScreen />
          )
        }
      </Stack.Screen>

      {/* AI Expert (GPT) */}
      <Stack.Screen name="CoinExpert">
        {() =>
          isPro ? (
            <ChatAssistantScreen />
          ) : (
            <PaywallMainScreen />
          )
        }
      </Stack.Screen>
    </Stack.Navigator>
  );
}
