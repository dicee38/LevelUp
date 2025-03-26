import React, { useEffect, useState } from 'react';
import { StatusBar, View, Text } from 'react-native';
import { registerRootComponent } from 'expo';
import TabNavigator from '../src/navigation/TabNavigator';
import { ThemeProvider, useTheme } from '../src/theme/ThemeContext';
import { lightTheme, darkTheme } from '../src/theme/colors';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import NutritionScreen from "../src/screens/NutritionScreen"
export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

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

  const Stack = createStackNavigator()
  return (
    <View style={{ flex: 1 }}>


     
      <TabNavigator />
      {tasks.map(task => (
        <Text key={task.id}>{task.title}</Text>
      ))}
    </View>
  );
};

registerRootComponent(App);