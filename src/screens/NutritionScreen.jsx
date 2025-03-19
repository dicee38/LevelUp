// NutritionScreen.js
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTheme } from '../theme/ThemeContext'; // Импортируем useTheme

const NutritionScreen = () => {
  const { theme } = useTheme(); // Получаем текущую тему

  // Список питания (можно заменить на реальные данные)
  const nutritionData = [
    { id: '1', name: 'Овсянка', calories: 150 },
    { id: '2', name: 'Курица', calories: 200 },
    { id: '3', name: 'Яблоко', calories: 80 },
    { id: '4', name: 'Рис', calories: 250 },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.header, { color: theme.text }]}>Питание</Text>

      {/* Список питания */}
      <FlatList
        data={nutritionData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.item, { backgroundColor: theme.card }]}>
            <Text style={[styles.itemText, { color: theme.text }]}>{item.name}</Text>
            <Text style={[styles.itemText, { color: theme.text }]}>Калорий: {item.calories}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NutritionScreen;
