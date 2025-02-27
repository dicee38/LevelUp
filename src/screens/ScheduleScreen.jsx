import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Modal, Button, Alert } from 'react-native';
import { useTheme } from '../theme/ThemeContext'; // Импортируем useTheme
import { lightTheme, darkTheme } from '../theme/colors'; // Импортируем цвета

const SchedulePage = () => {
  const { theme } = useTheme(); // Получаем текущую тему
  const [tasks, setTasks] = useState([
    { time: '10:00', description: 'Встреча с командой', color: 'lightBlue' },
    { time: '12:00', description: 'Обсуждение проекта', color: 'green' },
    { time: '14:00', description: 'Рабочие задачи', color: 'orange' },
    { time: '16:00', description: 'Планирование', color: 'lightBlue' },
  ]);

  const [showModal, setShowModal] = useState(false); // Состояние для отображения модального окна
  const [newTask, setNewTask] = useState({ time: '', description: '', color: 'lightBlue' }); // Данные для новой задачи
  const [editingIndex, setEditingIndex] = useState(null); // Индекс задачи, которую редактируем

  // Функция для открытия модального окна для добавления новой задачи или редактирования
  const openModal = (index) => {
    if (index !== null) {
      setEditingIndex(index);
      setNewTask({ time: tasks[index]?.time || '', description: tasks[index]?.description || '', color: tasks[index]?.color || 'lightBlue' });
    } else {
      setNewTask({ time: '', description: '', color: 'lightBlue' });
    }
    setShowModal(true);
  };

  // Функция для добавления новой задачи или редактирования существующей
  const addTask = () => {
    if (newTask.time && newTask.description) {
      if (editingIndex !== null) {
        const updatedTasks = [...tasks];
        updatedTasks[editingIndex] = newTask; // Обновляем редактируемую задачу
        setTasks(updatedTasks);
      } else {
        setTasks([...tasks, newTask]); // Добавляем новую задачу
      }
      setShowModal(false);
      setEditingIndex(null); // Сбрасываем индекс редактируемой задачи
    }
  };

  // Функция для удаления задачи
  const deleteTask = (index) => {
    Alert.alert(
      'Удалить задачу?',
      'Вы уверены, что хотите удалить эту задачу?',
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Удалить',
          onPress: () => {
            const updatedTasks = tasks.filter((_, i) => i !== index); // Удаляем задачу по индексу
            setTasks(updatedTasks);
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Заголовок страницы */}
      <View style={styles.header}>
        <Text style={[styles.greeting, { color: theme.text }]}>Расписание на день</Text>
        <Text style={[styles.subtitle, { color: theme.text }]}>18 января, Чт</Text>
      </View>

      {/* Карточка с планом дня */}
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={styles.sectionTitle}>План на день:</Text>

        {/* Кнопка добавления задачи в месте первого дела */}
        <TouchableOpacity
          style={[styles.summaryBox, { backgroundColor: theme.lightBlue }]}
          onPress={() => openModal(null)} // При нажатии на кнопку открываем меню для добавления задачи
        >
          <Text style={styles.summaryText}>+</Text>
        </TouchableOpacity>

        {/* Задачи */}
        {tasks.slice(1).map((task, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.summaryBox, { backgroundColor: theme[task.color] }]}
            onPress={() => openModal(index)} // При нажатии на задачу открываем меню для редактирования
          >
            <Text style={styles.summaryText}>{task.time}</Text>
            <Text style={styles.summaryValue}>{task.description}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Модальное окно для добавления/редактирования задачи */}
      <Modal visible={showModal} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>
              {editingIndex !== null ? 'Редактировать задачу' : 'Добавить задачу'}
            </Text>
            <TextInput
              style={[styles.input, { borderColor: theme.primary }]}
              placeholder="Время"
              value={newTask.time}
              onChangeText={(text) => setNewTask({ ...newTask, time: text })}
            />
            <TextInput
              style={[styles.input, { borderColor: theme.primary }]}
              placeholder="Описание"
              value={newTask.description}
              onChangeText={(text) => setNewTask({ ...newTask, description: text })}
            />

            {/* Выбор цвета задачи */}
            <View style={styles.colorPicker}>
              <TouchableOpacity
                style={[styles.colorOption, { backgroundColor: theme.lightBlue }]}
                onPress={() => setNewTask({ ...newTask, color: 'lightBlue' })}
              />
              <TouchableOpacity
                style={[styles.colorOption, { backgroundColor: theme.green }]}
                onPress={() => setNewTask({ ...newTask, color: 'green' })}
              />
              <TouchableOpacity
                style={[styles.colorOption, { backgroundColor: theme.orange }]}
                onPress={() => setNewTask({ ...newTask, color: 'orange' })}
              />
            </View>

            <Button title="Сохранить" onPress={addTask} />
            <Button title="Отмена" onPress={() => setShowModal(false)} color="red" />
            
            {/* Кнопка удаления задачи в модальном окне */}
            {editingIndex !== null && (
              <Button title="Удалить" onPress={() => deleteTask(editingIndex)} color="red" />
            )}
          </View>
        </View>
      </Modal>

      {/* Кнопки снизу */}
      <View style={styles.additionalFunctionsContainer}>
        <TouchableOpacity style={[styles.functionItem, { backgroundColor: theme.secondary }]}>
          <Text style={[styles.functionItemText, { color: theme.text }]}>Задачи</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.functionItem, { backgroundColor: theme.secondary }]}>
          <Text style={[styles.functionItemText, { color: theme.text }]}>Календарь</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.functionItem, { backgroundColor: theme.secondary }]}>
          <Text style={[styles.functionItemText, { color: theme.text }]}>Сообщения</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { marginBottom: 20 },
  greeting: { fontSize: 22, fontWeight: 'bold' },
  subtitle: { fontSize: 16 },
  card: { borderRadius: 10, padding: 15, marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold' },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 },
  summaryBox: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
  },
  summaryText: { fontSize: 40, fontWeight: 'bold' },
  summaryValue: { fontSize: 16, fontWeight: 'bold' },
  addEventButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    position: 'absolute',
    top: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  addEventButtonText: { fontSize: 40, color: '#fff' },
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContent: { padding: 20, borderRadius: 10, width: '80%' },
  modalTitle: { fontSize: 20, marginBottom: 10 },
  input: { height: 40, borderColor: '#ccc', borderWidth: 1, marginBottom: 10, paddingLeft: 10 },
  colorPicker: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  colorOption: { width: 30, height: 30, borderRadius: 15 },
  additionalFunctionsContainer: { marginTop: 30 },
  functionItem: { padding: 15, borderRadius: 10, marginVertical: 5 },
  functionItemText: { fontSize: 16, fontWeight: 'bold' },
});

export default SchedulePage;
