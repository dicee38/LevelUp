import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';  // Для использования темы

export default function ProfileScreen() {
  const { theme } = useTheme();  // Получаем текущую тему

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.header, { color: theme.text }]}>Профиль</Text>
      <Text style={[styles.text, { color: theme.text }]}>Имя пользователя: Иван Иванов</Text>
      <Text style={[styles.text, { color: theme.text }]}>Возраст: 30 лет</Text>
      <Text style={[styles.text, { color: theme.text }]}>Статус: Активен</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 22, fontWeight: 'bold' },
  text: { fontSize: 16, marginTop: 10 },
});
