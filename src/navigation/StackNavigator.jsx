// src/navigation/StackNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator'; // Импортируем TabNavigator
import NutritionScreen from '../screens/NutritionScreen'; // Импортируем экран питания

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      {/* TabNavigator будет основной частью навигации */}
      <Stack.Screen name="HomeTabs" component={TabNavigator} options={{ headerShown: false }} />
      {/* Экран питания будет добавлен как отдельный экран */}
      <Stack.Screen name="Nutrition" component={NutritionScreen} />
    </Stack.Navigator>
  );
}
