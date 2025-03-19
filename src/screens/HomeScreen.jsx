import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeContext'; // Импортируем useTheme

export default function HomeScreen({ navigation }) {
  const { theme } = useTheme(); // Получаем текущую тему
  const [goalProgress, setGoalProgress] = useState(0.6); // Прогресс для целей 60%
  const [workoutProgress, setWorkoutProgress] = useState(0.4); // Прогресс для тренировок 40%

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.greeting, { color: theme.text }]}>Привет, Санек!</Text>
        <Text style={[styles.subtitle, { color: theme.text }]}>Хорошего дня!</Text>
      </View>

      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={styles.sectionTitle}>Сводка дня:</Text>
        <View style={styles.summaryRow}>
          <TouchableOpacity
            style={[styles.summaryBox, { backgroundColor: theme.lightBlue }]}
            onPress={() => navigation.navigate('Расписание')} // Переход на экран "Расписание"
          >
            <Text style={styles.summaryText}>Задачи:</Text>
            <Text style={styles.summaryValue}>3/5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.summaryBox, { backgroundColor: theme.lightGreen }]}
            onPress={() => navigation.navigate('Дневник')} // Переход на экран "Дневник"
          >
            <Text style={styles.summaryText}>Настроение:</Text>
            <Text style={styles.summaryValue}>Хорошее</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Контейнеры для Целей и Тренировок в одну строку */}
      <View style={styles.achievements}>
        {/* Контейнер для Целей */}
        <TouchableOpacity
          style={[styles.achievementBox, { backgroundColor: theme.card, width: 138, height: 122, borderRadius: 10, justifyContent: 'space-between', padding: 10, marginRight: 10 }]}
          onPress={() => navigation.navigate('Расписание')} // Переход на экран "Цели"
        >
          <Text style={styles.achievementTitle}>Цели:</Text>
          <Text style={styles.achievementValue}>3 дня подряд</Text>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${goalProgress * 100}%`, backgroundColor: theme.purple }]} />
          </View>
        </TouchableOpacity>

        {/* Контейнер для Тренировок */}
        <TouchableOpacity
          style={[styles.achievementBox, { backgroundColor: theme.card, width: 138, height: 122, borderRadius: 10, justifyContent: 'space-between', padding: 10 }]}
          onPress={() => navigation.navigate('Тренировки')} // Переход на экран "Тренировки"
        >
          <Text style={styles.achievementTitle}>Тренировки:</Text>
          <Text style={styles.achievementValue}>Спортсмен</Text>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${workoutProgress * 100}%`, backgroundColor: theme.orange }]} />
          </View>
        </TouchableOpacity>
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
  achievements: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }, // Теперь это строка
  achievementBox: { flex: 1, alignItems: 'center', padding: 10, borderRadius: 10, marginHorizontal: 5 },
  achievementTitle: { fontSize: 14 },
  achievementValue: { fontSize: 16, fontWeight: 'bold' },

  // Стиль для прогресс-баров
  progressBarContainer: {
    height: 8, // Высота прогресс-бара
    borderRadius: 5,
    marginTop: 10,
    backgroundColor: '#E0E0E0', // Легкая серовато-белая полоса для фона
    width: '100%', // Чтобы прогресс-бар заполнил контейнер
  },
  progressBar: {
    height: '100%',
    borderRadius: 5,
  },
});
