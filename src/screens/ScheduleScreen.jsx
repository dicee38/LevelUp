import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, TextInput, Alert, ScrollView } from 'react-native';

const SchedulePage = () => {
  const [viewMode, setViewMode] = useState('day'); // "day", "week", "month"
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({ time: '', description: '', color: '#FFFFFF' }); // Добавлен цвет задачи
  const [editingTask, setEditingTask] = useState(null); // Для редактирования

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const handleDayPress = (date) => {
    setSelectedDate(date);
    setViewMode('day');
  };

  const handleAddTask = () => {
    if (!newTask.time || !newTask.description) return;

    const dateKey = selectedDate.toISOString().split('T')[0];
    setTasks((prev) => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), { ...newTask, id: new Date().getTime() }],
    }));

    setShowModal(false);
    setNewTask({ time: '', description: '', color: '#FFFFFF' });
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setNewTask({ time: task.time, description: task.description, color: task.color });
    setShowModal(true);
  };

  const handleUpdateTask = () => {
    if (!newTask.time || !newTask.description) return;

    const dateKey = selectedDate.toISOString().split('T')[0];
    const updatedTasks = tasks[dateKey].map((task) =>
      task.id === editingTask.id ? { ...task, time: newTask.time, description: newTask.description, color: newTask.color } : task
    );

    setTasks((prev) => ({
      ...prev,
      [dateKey]: updatedTasks,
    }));

    setShowModal(false);
    setNewTask({ time: '', description: '', color: '#FFFFFF' });
    setEditingTask(null);
  };

  const handleDeleteTask = (task) => {
    const dateKey = selectedDate.toISOString().split('T')[0];
    const updatedTasks = tasks[dateKey].filter((t) => t.id !== task.id);
    setTasks((prev) => ({
      ...prev,
      [dateKey]: updatedTasks,
    }));
  };

  const renderTaskList = () => {
    const dateKey = selectedDate.toISOString().split('T')[0];
    return tasks[dateKey] ? (
      <FlatList
        data={tasks[dateKey]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 10,
              backgroundColor: item.color,
              marginBottom: 5,
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.time}</Text>
            <Text>{item.description}</Text>
            <TouchableOpacity onPress={() => handleEditTask(item)} style={{ marginTop: 5, backgroundColor: '#4A90E2', padding: 5, borderRadius: 5 }}>
              <Text style={{ color: 'white' }}>Редактировать</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDeleteTask(item)}
              style={{ marginTop: 5, backgroundColor: '#FF3B30', padding: 5, borderRadius: 5 }}
            >
              <Text style={{ color: 'white' }}>Удалить</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    ) : (
      <Text style={{ textAlign: 'center', marginTop: 20 }}>Нет задач</Text>
    );
  };

  const renderWeekView = () => {
    const startOfWeek = new Date(selectedDate);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

    return (
      <ScrollView horizontal contentContainerStyle={{ flexDirection: 'row', padding: 10 }}>
        {Array.from({ length: 7 }).map((_, i) => {
          const day = new Date(startOfWeek);
          day.setDate(startOfWeek.getDate() + i);
          return (
            <TouchableOpacity
              key={i}
              onPress={() => handleDayPress(day)}
              style={{
                padding: 15,
                margin: 5,
                borderRadius: 10,
                backgroundColor: day.toDateString() === selectedDate.toDateString() ? '#4A90E2' : '#ddd',
              }}
            >
              <Text style={{ fontSize: 16 }}>{day.getDate()}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  };

  const renderMonthView = () => {
    const daysInMonth = getDaysInMonth(selectedDate);
    const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return (
      <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', padding: 10 }}>
        {monthDays.map((day) => {
          const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
          return (
            <TouchableOpacity
              key={day}
              onPress={() => handleDayPress(date)}
              style={{
                width: '14%',
                aspectRatio: 1,
                margin: 2,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: date.toDateString() === selectedDate.toDateString() ? '#4A90E2' : '#ddd',
              }}
            >
              <Text style={{ fontSize: 16 }}>{day}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {/* Переключение режимов */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 }}>
        {['day', 'week', 'month'].map((mode) => (
          <TouchableOpacity key={mode} onPress={() => setViewMode(mode)}>
            <Text style={{ fontSize: 18, fontWeight: viewMode === mode ? 'bold' : 'normal' }}>
              {mode === 'day' ? 'День' : mode === 'week' ? 'Неделя' : 'Месяц'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Текущая дата */}
      <Text style={{ fontSize: 20, textAlign: 'center', marginBottom: 10 }}>
        {selectedDate.toLocaleDateString()}
      </Text>

      {/* Контейнер с задачами */}
      <View style={{ flex: 1, backgroundColor: 'white', padding: 10, borderRadius: 10 }}>
        {viewMode === 'day' && renderTaskList()}
        {viewMode === 'week' && renderWeekView()}
        {viewMode === 'month' && renderMonthView()}
      </View>

      {/* Кнопки */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
        <TouchableOpacity style={{ backgroundColor: '#4A90E2', padding: 15, borderRadius: 10 }}>
          <Text style={{ color: 'white' }}>Умное заполнение</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ backgroundColor: '#50E3C2', padding: 15, borderRadius: 10 }}>
          <Text style={{ color: 'white' }}>Куда сходить</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ backgroundColor: '#F5A623', padding: 15, borderRadius: 10 }}>
          <Text style={{ color: 'white' }}>Советы</Text>
        </TouchableOpacity>
      </View>

      {/* Кнопка "+" */}
      <TouchableOpacity
        onPress={() => setShowModal(true)}
        style={{
          position: 'absolute',
          bottom: 90,
          right: 20,
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: '#007AFF',
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 5,
        }}
      >
        <Text style={{ fontSize: 36, color: 'white', fontWeight: 'bold' }}>+</Text>
      </TouchableOpacity>

      {/* Модалка добавления задач */}
      <Modal visible={showModal} animationType="slide" transparent>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ width: '90%', padding: 25, backgroundColor: 'white', borderRadius: 15 }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' }}>
              {editingTask ? 'Редактировать задачу' : 'Добавить задачу'}
            </Text>

            <Text style={{ fontSize: 16, marginBottom: 5 }}>Время</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 10,
                padding: 12,
                fontSize: 18,
                marginBottom: 15,
              }}
              placeholder="Например, 14:00"
              value={newTask.time}
              onChangeText={(text) => setNewTask({ ...newTask, time: text })}
            />

            <Text style={{ fontSize: 16, marginBottom: 5 }}>Описание</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 10,
                padding: 12,
                fontSize: 18,
                height: 80,
                textAlignVertical: 'top',
                marginBottom: 20,
              }}
              placeholder="Введите описание задачи"
              multiline
              value={newTask.description}
              onChangeText={(text) => setNewTask({ ...newTask, description: text })}
            />

            {/* Цвет задачи */}
            <Text style={{ fontSize: 16, marginBottom: 5 }}>Цвет задачи</Text>
            <View style={{ flexDirection: 'row', marginBottom: 15 }}>
              {['#FFB6C1', '#ADD8E6', '#FFFFE0', '#90EE90'].map((color) => (
                <TouchableOpacity
                  key={color}
                  onPress={() => setNewTask({ ...newTask, color })}
                  style={{
                    width: 30,
                    height: 30,
                    margin: 5,
                    borderRadius: 15,
                    backgroundColor: color,
                    borderWidth: newTask.color === color ? 2 : 0,
                    borderColor: 'black',
                  }}
                />
              ))}
            </View>

            {/* Кнопки сохранения и отмены */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity
                onPress={() => setShowModal(false)}
                style={{
                  backgroundColor: '#FF3B30',
                  padding: 15,
                  borderRadius: 10,
                  width: '48%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: 'white' }}>Отмена</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={editingTask ? handleUpdateTask : handleAddTask}
                style={{
                  backgroundColor: '#4A90E2',
                  padding: 15,
                  borderRadius: 10,
                  width: '48%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: 'white' }}>
                  {editingTask ? 'Обновить задачу' : 'Добавить задачу'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SchedulePage;
