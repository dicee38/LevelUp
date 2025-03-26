import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '../theme/ThemeContext'; // Импортируем хук из контекста
import HomeScreen from '../screens/HomeScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import JournalScreen from '../screens/JournalScreen';
import WorkoutScreen from '../screens/WorkoutScreen';
import SettingsScreen from '../screens/SettingsScreen';
import NutritionScreen from '../screens/NutritionScreen'; // Экран питания

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const { theme } = useTheme(); // Получаем текущую тему

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: theme.card },
        tabBarActiveTintColor: theme.blue,
      }}
    >
      <Tab.Screen name="Главная" component={HomeScreen} />
      <Tab.Screen name="Расписание" component={ScheduleScreen} />
      <Tab.Screen name="Дневник" component={JournalScreen} />
      <Tab.Screen name="Тренировки" component={WorkoutScreen} />
      <Tab.Screen name="Настройки" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
