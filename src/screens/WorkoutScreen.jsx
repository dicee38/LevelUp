// WorkoutScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useTheme } from '../theme/ThemeContext'; // Импортируем useTheme
import { useNavigation } from '@react-navigation/native'; // Импортируем useNavigation для навигации

export default function WorkoutScreen() {
  const { theme } = useTheme(); // Получаем текущую тему
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const navigation = useNavigation(); // Хук для навигации

  // Список тренировок
  const workouts = [
    { id: '1', name: 'Кардионагрузка' },
    { id: '2', name: 'Силовые тренировки' },
    { id: '3', name: 'Йога' },
  ];

  // Список упражнений для каждой тренировки
  const exercises = {
    '1': ['Бег', 'Велотренажер', 'Плавание'],
    '2': ['Приседания', 'Жим лежа', 'Подтягивания'],
    '3': ['Поза дерева', 'Поза собаки мордой вниз', 'Поза воина'],
  };

  // Функция для отображения упражнений для выбранной тренировки
  const renderExercises = () => {
    if (!selectedWorkout) return null;
    const workoutExercises = exercises[selectedWorkout];

    return (
      <FlatList
        data={workoutExercises}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.exerciseItem}>
            <Text style={[styles.exerciseText, { color: theme.text }]}>{item}</Text>
          </View>
        )}
      />
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.header, { color: theme.text }]}>Тренировки</Text>

      {/* Список тренировок */}
      <FlatList
        data={workouts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.workoutItem, { backgroundColor: theme.card }]}
            onPress={() => setSelectedWorkout(item.id === selectedWorkout ? null : item.id)}
          >
            <Text style={[styles.workoutText, { color: theme.text }]}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Отображение упражнений выбранной тренировки */}
      {renderExercises()}

      {/* Кнопка питания */}
      <TouchableOpacity
        style={styles.nutritionButton}
        onPress={() => navigation.navigate('Nutrition')} // Переход на страницу с питанием
      >
        <Text style={styles.buttonText}>Посмотреть питание</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  workoutItem: { padding: 15, borderRadius: 10, marginBottom: 10 },
  workoutText: { fontSize: 18, fontWeight: 'bold' },
  exerciseItem: { padding: 10, marginBottom: 5, borderBottomWidth: 1 },
  exerciseText: { fontSize: 16 },
  nutritionButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});
