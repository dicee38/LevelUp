import React from 'react';
import { StatusBar, View } from 'react-native';
import { registerRootComponent } from 'expo';
import TabNavigator from './src/navigation/TabNavigator';
import { ThemeProvider, useTheme } from './src/theme/ThemeContext'; // Импортируем контекст
import { lightTheme, darkTheme } from './src/theme/colors';

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

const AppContent = () => {
  const { theme } = useTheme(); // Получаем текущую тему

  React.useEffect(() => {
    StatusBar.setBarStyle(theme === darkTheme ? 'light-content' : 'dark-content');
  }, [theme]);

  return (
    <View style={{ flex: 1 }}>
      <TabNavigator />
    </View>
  );
};

registerRootComponent(App);
