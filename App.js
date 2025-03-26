import React, { useEffect, useState } from 'react';
import { StatusBar, View, Text } from 'react-native';
import { registerRootComponent } from 'expo';
import { ThemeProvider, useTheme } from './src/theme/ThemeContext';
import { lightTheme, darkTheme } from './src/theme/colors';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native'; // Навигация будет только один раз здесь
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './src/navigation/TabNavigator';
import ProfileScreen from './src/screens/ProfileScreen';
import NutritionScreen from './src/screens/NutritionScreen';

const Stack = createStackNavigator();

const AppContent = () => {
  const { theme } = useTheme();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    StatusBar.setBarStyle(theme === darkTheme ? 'light-content' : 'dark-content');

    // Запрос к бэкенду
    axios.get('http://localhost:5000/tasks')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  }, [theme]);

  return (
    <Stack.Navigator initialRouteName="TabNavigator">
      <Stack.Screen name="TabNavigator" component={TabNavigator}
      options={{ headerShown: false }} />
      <Stack.Screen name="Питание" component={NutritionScreen} />
      <Stack.Screen name="Профиль" component={ProfileScreen} />
    </Stack.Navigator>
    
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer> {/* Здесь NavigationContainer только один раз */}
        <AppContent />
      </NavigationContainer>
    </ThemeProvider>
  );
}

registerRootComponent(App);
