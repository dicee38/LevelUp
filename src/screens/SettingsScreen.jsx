import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { useTheme } from '../theme/ThemeContext'; // Импортируем хук контекста
import { lightTheme, darkTheme } from '../theme/colors';

export default function SettingsScreen() {
  const { theme, toggleTheme } = useTheme(); // Получаем текущую тему и функцию для переключения

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.header, { color: theme.text }]}>Настройки</Text>
      <View style={styles.switchContainer}>
        <Text style={{ color: theme.text }}>Темная тема</Text>
        <Switch
          value={theme === darkTheme} // Проверяем текущую тему
          onValueChange={toggleTheme} // Переключаем тему
          trackColor={{ false: theme.lightBlue, true: theme.blue }}
          thumbColor={theme === darkTheme ? theme.blue : theme.lightBlue}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 22, fontWeight: 'bold' },
  switchContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 20 },
});
