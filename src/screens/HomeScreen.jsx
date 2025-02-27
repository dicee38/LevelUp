import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../theme/ThemeContext'; // Импортируем useTheme

export default function HomeScreen() {
  const { theme } = useTheme(); // Получаем текущую тему

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.greeting, { color: theme.text }]}>Привет, Санек!</Text>
        <Text style={[styles.subtitle, { color: theme.text }]}>Хорошего дня!</Text>
      </View>
      
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={styles.sectionTitle}>Сводка дня:</Text>
        <View style={styles.summaryRow}>
          <View style={[styles.summaryBox, { backgroundColor: theme.lightBlue }]}>
            <Text style={styles.summaryText}>Задачи:</Text>
            <Text style={styles.summaryValue}>3/5</Text>
          </View>
          <View style={[styles.summaryBox, { backgroundColor: theme.lightGreen }]}>
            <Text style={styles.summaryText}>Настроение:</Text>
            <Text style={styles.summaryValue}>Хорошее</Text>
          </View>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Достижения</Text>
        <Text style={[styles.link, { color: theme.link }]}>Все</Text>
      </View>

      <View style={styles.achievements}>
        <View style={[styles.achievementBox, { backgroundColor: theme.lightBlue }]}>
          <Text style={styles.achievementTitle}>Цели:</Text>
          <Text style={styles.achievementValue}>3 дня подряд</Text>
        </View>
        <View style={[styles.achievementBox, { backgroundColor: theme.lightOrange }]}>
          <Text style={styles.achievementTitle}>Тренировки:</Text>
          <Text style={styles.achievementValue}>Спортсмен</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { marginBottom: 20 },
  greeting: { fontSize: 22, fontWeight: 'bold' },
  subtitle: { fontSize: 16 },
  card: { borderRadius: 10, padding: 15, marginBottom: 20 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold' },
  link: { fontSize: 16 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between' },
  summaryBox: { flex: 1, padding: 10, borderRadius: 10, alignItems: 'center', marginHorizontal: 5 },
  summaryText: { fontSize: 14 },
  summaryValue: { fontSize: 16, fontWeight: 'bold' },
  achievements: { flexDirection: 'row', justifyContent: 'space-between' },
  achievementBox: { flex: 1, padding: 10, borderRadius: 10, alignItems: 'center', marginHorizontal: 5 },
  achievementTitle: { fontSize: 14 },
  achievementValue: { fontSize: 16, fontWeight: 'bold' },
});
