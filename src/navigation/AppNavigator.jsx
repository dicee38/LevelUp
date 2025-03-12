import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './TabNavigator'; // Ваш существующий TabNavigator
import ProfileScreen from '../screens/ProfileScreen'; // Экран профиля
import { useTheme } from '../theme/ThemeContext'; // Хук для тем

const Stack = createStackNavigator();

export default function AppNavigator() {
  const { theme } = useTheme(); // Получаем текущую тему

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: theme.card },
          headerTintColor: theme.text,
        }}
      >
        {/* Основной экран с вкладками */}
        <Stack.Screen name="Главная" component={TabNavigator} options={{ headerShown: false }} />

        {/* Экран профиля */}
        <Stack.Screen name="Профиль" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
