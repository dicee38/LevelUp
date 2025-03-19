// src/navigation/StackNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator'; // Импортируем TabNavigator
import NutritionScreen from '../screens/NutritionScreen'; // Импортируем экран питания

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    
      <NavigationContainer>
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
          </NavigationContainer>
   
  );
}
