import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WorkoutScreen from './WorkoutScreen';  // ваш экран тренировки
import NutritionScreen from '../screens/NutritionScreen';  // ваш экран питания
import ProfileScreen from '../screens/ProfileScreen';  // ваш экран профиля
import SettingsScreen from '../screens/SettingsScreen';  // ваш экран настроек

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Workout">
        <Stack.Screen name="Workout" component={WorkoutScreen} />
        <Stack.Screen name="Питание" component={NutritionScreen} />
        <Stack.Screen name="Профиль" component={ProfileScreen} />
        <Stack.Screen name="Настройки" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
