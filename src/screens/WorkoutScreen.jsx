// WorkoutScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { useTheme } from '../theme/ThemeContext'; // Импортируем useTheme
import { useNavigation } from '@react-navigation/native'; // Импортируем useNavigation для навигации

export default function WorkoutScreen() {
  const { theme } = useTheme(); // Получаем текущую тему
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timer, setTimer] = useState(0); // Состояние для отслеживания времени
  const [laps, setLaps] = useState([]); // Состояние для хранения кругов
  const [isTimerVisible, setIsTimerVisible] = useState(false); // Состояние для видимости таймера
  const navigation = useNavigation(); // Хук для навигации

  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1); // Увеличиваем таймер каждую секунду
      }, 1000);
    } else {
      clearInterval(interval); // Останавливаем таймер, когда он не активен
    }

    return () => clearInterval(interval); // Очищаем интервал при размонтировании компонента
  }, [isTimerRunning]);

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

  // Форматирование времени секундомера в формате "MM:SS"
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  // Добавление нового круга
  const addLap = () => {
    setLaps([...laps, formatTime(timer)]);
  };

  // Сброс таймера
  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimer(0);
    setLaps([]);
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

      {/* Кнопка для отображения/скрытия таймера */}
      <TouchableOpacity
        style={styles.showTimerButton}
        onPress={() => setIsTimerVisible(!isTimerVisible)} // Переключение видимости таймера
      >
        <Text style={styles.buttonText}>Таймер</Text>
      </TouchableOpacity>

      {/* Если таймер видимый, отображаем его */}
      {isTimerVisible && (
        <View style={styles.timerContainer}>
          <Text style={[styles.timerText, { color: theme.text }]}>
            {formatTime(timer)}
          </Text>
          <TouchableOpacity
            style={[styles.timerButton, { backgroundColor: isTimerRunning ? '#F44336' : '#4CAF50' }]}
            onPress={() => setIsTimerRunning(!isTimerRunning)} // Переключение состояния секундомера
          >
            <Text style={styles.buttonText}>
              {isTimerRunning ? 'Стоп' : 'Старт'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.lapButton}
            onPress={addLap} // Добавление круга
            disabled={!isTimerRunning} // Кнопка доступна только когда таймер запущен
          >
            <Text style={styles.buttonText}>Круг</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.resetButton}
            onPress={resetTimer} // Сброс таймера
          >
            <Text style={styles.buttonText}>Сброс</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Список кругов */}
      <ScrollView style={styles.lapsContainer}>
        {laps.map((lap, index) => (
          <View key={index} style={styles.lapItem}>
            <Text style={[styles.lapText, { color: theme.text }]}>Круг {index + 1}: {lap}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Кнопка питания */}
      <TouchableOpacity
        style={styles.nutritionButton}
        onPress={() => navigation.navigate('Питание')} // Переход на страницу с питанием
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
  timerContainer: { marginTop: 20, alignItems: 'center' },
  timerText: { fontSize: 40, fontWeight: 'bold', marginBottom: 10 },
  timerButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: 150,
    marginBottom: 10,
  },
  lapButton: {
    padding: 15,
    backgroundColor: '#FFC107',
    borderRadius: 10,
    alignItems: 'center',
    width: 150,
    marginBottom: 10,
  },
  resetButton: {
    padding: 15,
    backgroundColor: '#9E9E9E',
    borderRadius: 10,
    alignItems: 'center',
    width: 150,
  },
  lapsContainer: { marginTop: 20, maxHeight: 200 },
  lapItem: { padding: 10, marginBottom: 5, borderBottomWidth: 1 },
  lapText: { fontSize: 16 },
  nutritionButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  showTimerButton: {
    padding: 15,
    backgroundColor: '#2196F3',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
});
