    import React, { useState, useMemo, useCallback } from 'react';
    import { View, Text, Modal, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, FlatList, ScrollView } from 'react-native';
    import { Picker } from '@react-native-picker/picker';

    const MILLISECONDS_PER_MINUTE = 60 * 1000;
    const MILLISECONDS_PER_HOUR = 60 * 60 * 1000;
    const MILLISECONDS_PER_DAY = 24 * MILLISECONDS_PER_HOUR;

    

    const SchedulePage = () => {
      const [viewMode, setViewMode] = useState('day');
      const [selectedDate, setSelectedDate] = useState(new Date());
      const [tasks, setTasks] = useState({});
      const [showModal, setShowModal] = useState(false);
      const [newTask, setNewTask] = useState({ time: '', description: '', color: '#FFFFFF' });
      const [editingTask, setEditingTask] = useState(null);

      const [showSmartFillModal, setShowSmartFillModal] = useState(false);
const [showTimeTipsModal, setShowTimeTipsModal] = useState(false);

const handleSmartFill = () => {
  const dateKey = selectedDate.toISOString().split('T')[0];
  
  const suggestedTasks = [
    { time: '08:00', description: 'Завтрак', color: '#FFD700' },
    { time: '09:00', description: 'Работа над проектом', color: '#87CEEB' },
    { time: '12:30', description: 'Обед', color: '#FFA07A' },
    { time: '18:00', description: 'Тренировка', color: '#98FB98' },
  ];
  
  setTasks((prev) => ({
    ...prev,
    [dateKey]: [...(prev[dateKey] || []), ...suggestedTasks.map(t => ({ ...t, id: new Date().getTime() + Math.random() }))]
  }));
  
  setShowSmartFillModal(false);
};

const handleTimeTips = () => {
  setShowTimeTipsModal(true);
};

      const getDaysInMonth = useCallback((date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month + 1, 0).getDate();
      }, []);

      const getFirstDayOfMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        // Если getDay() возвращает 0 (воскресенье), делаем его 7 (воскресенье в нашей модели)
        return firstDay === 0 ? 6 : firstDay - 1; // Начинаем с понедельника
      };
      const handleDeleteTask = useCallback((taskId) => {
        const dateKey = selectedDate.toISOString().split('T')[0];
        const filteredTasks = tasks[dateKey].filter((task) => task.id !== taskId);
        setTasks((prev) => ({
          ...prev,
          [dateKey]: filteredTasks,
        }));
        setShowModal(false);
        setEditingTask(null);
      }, [tasks, selectedDate]);
      

      const handleDayPress = useCallback((date) => {
        setSelectedDate(date);
        setViewMode('day');
      }, []);

      const handleAddTask = useCallback(() => {
        if (!newTask.time || !newTask.description) return;

        const dateKey = selectedDate.toISOString().split('T')[0];
        setTasks((prev) => ({
          ...prev,
          [dateKey]: [...(prev[dateKey] || []), { ...newTask, id: new Date().getTime() }],
        }));

        setShowModal(false);
        setNewTask({ time: '', description: '', color: '#FFFFFF' });
      }, [newTask, selectedDate]);

      const handleEditTask = useCallback((task) => {
        setEditingTask(task);
        setNewTask({ time: task.time, description: task.description, color: task.color });
        setShowModal(true);
      }, []);

      const handleUpdateTask = useCallback(() => {
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
      }, [newTask, editingTask, selectedDate, tasks]);

      const renderTaskList = useMemo(() => {
        const dateKey = selectedDate.toISOString().split('T')[0];
        return tasks[dateKey] ? (
          <FlatList
            data={tasks[dateKey]}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleEditTask(item)}
                style={{
                  padding: 10,
                  backgroundColor: item.color,
                  marginBottom: 5,
                  borderRadius: 10,
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.time}</Text>
                <Text>{item.description}</Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={{ paddingTop: 20 }}
          />
        ) : (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>Нет задач</Text>
        );
      }, [selectedDate, tasks]);

      const renderWeekView = useMemo(() => {
        const startOfWeek = new Date(selectedDate);
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
      
        return (
          <ScrollView contentContainerStyle={{ padding: 10 }}>
            {Array.from({ length: 7 }).map((_, i) => {
              const day = new Date(startOfWeek);
              day.setDate(startOfWeek.getDate() + i);
              const dateKey = day.toISOString().split('T')[0]; // получаем ключ для задач на этот день
              return (
                <View key={i} style={{ marginBottom: 20 }}>
                  <TouchableOpacity
                    onPress={() => handleDayPress(day)}
                    style={{
                      padding: 15,
                      borderRadius: 10,
                      backgroundColor: day.toDateString() === selectedDate.toDateString() ? '#4A90E2' : '#ddd',
                    }}
                  >
                    <Text style={{ fontSize: 16, textAlign: 'center' }}>{day.getDate()}</Text>
                  </TouchableOpacity>
                  <View style={{ marginTop: 10 }}>
                    {tasks[dateKey] ? (
                      <FlatList
                        data={tasks[dateKey]}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            onPress={() => handleEditTask(item)}
                            style={{
                              padding: 10,
                              backgroundColor: item.color,
                              marginBottom: 5,
                              borderRadius: 10,
                            }}
                          >
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.time}</Text>
                            <Text>{item.description}</Text>
                          </TouchableOpacity>
                        )}
                        contentContainerStyle={{ paddingTop: 10 }}
                      />
                    ) : (
                      <Text style={{ textAlign: 'center' }}>Нет задач</Text>
                    )}
                  </View>
                </View>
              );
            })}
          </ScrollView>
        );
      }, [selectedDate, tasks]);
      

      const renderMonthView = useMemo(() => {
        const daysInMonth = getDaysInMonth(selectedDate);
        let firstDayOfMonth = getFirstDayOfMonth(selectedDate);
      
        // Корректируем первый день месяца, если он воскресенье (0)
        if (firstDayOfMonth === 0) {
          firstDayOfMonth = 6; // Воскресенье становится последним (6), чтобы неделя начиналась с понедельника
        } else {
          firstDayOfMonth -= 1; // Сдвигаем дни недели на 1, чтобы понедельник был первым
        }
      
        const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
      
        // Дни недели с понедельника
        const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
      
        return (
          <View style={{ flex: 1 }}>
            {/* Заголовок месяца */}
            <Text style={{ fontSize: 24, textAlign: 'center', marginBottom: 10 }}>
              {selectedDate.toLocaleString('ru-RU', { month: 'long', year: 'numeric' })}
            </Text>
      
            {/* Дни недели */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10, paddingLeft: 20 }}>
              {weekDays.map((day, index) => (
                <Text key={index} style={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>
                  {day}
                </Text>
              ))}
            </View>
      
            {/* Дни месяца */}
            <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', padding: 10 }}>
              {/* Пустые ячейки перед первым днем месяца */}
              {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                <View key={i} style={{ width: '16.5%', aspectRatio: 1, margin: 2 }}></View>
              ))}
      
              {/* Отображение дней месяца */}
              {monthDays.map((day) => {
                const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
                return (
                  <TouchableOpacity
                    key={day}
                    onPress={() => handleDayPress(date)}
                    style={{
                      width: '13%', 
                      aspectRatio: 1,
                      margin: 2,
                      borderRadius: 5,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: date.toDateString() === selectedDate.toDateString() ? '#4A90E2' : '#ddd',
                    }}
                  >
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{day}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        );
      }, [selectedDate, getDaysInMonth, getFirstDayOfMonth]);
      
      

      const TimePicker = useMemo(() => ({ value, onChange }) => {
        const hours = Array.from({ length: 24 }, (_, i) => (i < 10 ? `0${i}` : `${i}`));
        const minutes = Array.from({ length: 12 }, (_, i) => (i * 5 < 10 ? `0${i * 5}` : `${i * 5}`));

        const [selectedHour, setSelectedHour] = useState(value.split(':')[0] || '00');
        const [selectedMinute, setSelectedMinute] = useState(value.split(':')[1] || '00');

        return (
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', padding: 10 }}>
            <Picker
              selectedValue={selectedHour}
              onValueChange={(itemValue) => {
                setSelectedHour(itemValue);
                onChange(`${itemValue}:${selectedMinute}`);
              }}
              style={{
                flex: 1,
                height: 200,
                fontSize: 24,
              }}
              itemStyle={{ color: 'black' }}
            >
              {hours.map((hour) => (
                <Picker.Item key={hour} label={hour} value={hour} />
              ))}
            </Picker>
            <Text style={{ fontSize: 24, paddingHorizontal: 10, color: 'black' }}>:</Text>
            <Picker
              selectedValue={selectedMinute}
              onValueChange={(itemValue) => {
                setSelectedMinute(itemValue);
                onChange(`${selectedHour}:${itemValue}`);
              }}
              style={{
                flex: 1,
                height: 200,
                fontSize: 24,
              }}
              itemStyle={{ color: 'black' }}
            >
              {minutes.map((minute) => (
                <Picker.Item key={minute} label={minute} value={minute} />
              ))}
            </Picker>
          </View>
        );
      }, []);

      return (
  <View style={{ flex: 1, padding: 20 }}>
    {/* Переключение между днями, неделями и месяцами */}
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 }}>
      {['day', 'week', 'month'].map((mode) => (
        <TouchableOpacity key={mode} onPress={() => setViewMode(mode)}>
          <Text style={{
            fontSize: 18,
            fontWeight: viewMode === mode ? 'bold' : 'normal',
            color: 'black',
          }}>
            {mode === 'day' ? 'День' : mode === 'week' ? 'Неделя' : 'Месяц'}
          </Text>
        </TouchableOpacity>
      ))}
    </View>

    <Text style={{ fontSize: 20, textAlign: 'center', marginBottom: 10 }}>
      {selectedDate.toLocaleDateString()}
    </Text>

    {/* Контейнер для отображения задач в зависимости от выбранного вида */}
    <View style={{
      flex: 1,
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 10,
      marginBottom: 50
    }}>
      {viewMode === 'day' && renderTaskList}
      {viewMode === 'week' && renderWeekView}
      {viewMode === 'month' && renderMonthView}
    </View>

    {/* Кнопки под задачами */}
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      {/* Кнопка "Умное заполнение" */}
      <TouchableOpacity
        onPress={() => setShowSmartFillModal(true)} // Открытие модального окна
        style={{
          flex: 1,
          marginRight: 10,
          backgroundColor: '#4CAF50',
          paddingVertical: 15,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Умное заполнение</Text>
      </TouchableOpacity>

      {/* Кнопка "Советы по распределению времени" */}
      <TouchableOpacity
        onPress={() => setShowTimeTipsModal(true)} // Открытие модального окна
        style={{
          flex: 1,
          marginLeft: 10,
          backgroundColor: '#FF9800',
          paddingVertical: 15,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Советы по времени</Text>
      </TouchableOpacity>
    </View>

    {/* Кнопка "+" для открытия модального окна добавления задачи */}
    <TouchableOpacity
      onPress={() => setShowModal(true)}
      style={{
        position: 'absolute',
        bottom: 115,
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

    {/* Модальное окно для добавления/редактирования задачи */}
    <Modal visible={showModal} animationType="slide" transparent>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
          <View style={{
            width: '85%',
            height: '80%',
            padding: 20,
            backgroundColor: '#F4F4F4',
            borderRadius: 15
          }}>
            <Text style={{
              fontSize: 22,
              fontWeight: 'bold',
              marginBottom: 15,
              textAlign: 'center'
            }}>
              {editingTask ? 'Редактировать задачу' : 'Добавить задачу'}
            </Text>

            {/* Ввод времени задачи */}
            <Text style={{ fontSize: 16, marginBottom: 5 }}>Время</Text>
            <TimePicker value={newTask.time} onChange={(text) => setNewTask({ ...newTask, time: text })} />

            {/* Ввод описания задачи */}
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
              placeholder="Введите задачу"
              placeholderTextColor="#707070"
              multiline
              value={newTask.description}
              onChangeText={(text) => setNewTask({ ...newTask, description: text })}
            />

            {/* Выбор цвета задачи */}
            <Text style={{ fontSize: 16, marginBottom: 5 }}>Цвет задачи</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 15 }}>
              {['#FFB6C1', '#ADD8E6', '#FFFFE0', '#90EE90'].map((color) => (
                <TouchableOpacity
                  key={color}
                  onPress={() => setNewTask({ ...newTask, color })}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    margin: 5,
                    backgroundColor: color,
                    borderWidth: newTask.color === color ? 3 : 0,
                    borderColor: '#707070',
                  }}
                />
              ))}
            </View>

            {/* Кнопка для сохранения или обновления задачи */}
            <TouchableOpacity
              onPress={editingTask ? handleUpdateTask : handleAddTask}
              style={{
                backgroundColor: '#10B981',
                padding: 15,
                borderRadius: 10,
                alignItems: 'center',
                marginTop: 20,
              }}
            >
              <Text style={{ color: 'white', fontSize: 18 }}>
                {editingTask ? 'Обновить' : 'Добавить'}
              </Text>
            </TouchableOpacity>

            {/* Кнопки Отменить и Удалить задачу */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <TouchableOpacity
                onPress={() => setShowModal(false)}
                style={{
                  backgroundColor: '#707070',
                  padding: 10,
                  width: 150,
                  height: 65,
                  borderRadius: 100,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 5,
                }}
              >
                <Text style={{ color: 'white', fontSize: 18 }}>Отменить</Text>
              </TouchableOpacity>

              {editingTask && (
                <TouchableOpacity
                  onPress={() => handleDeleteTask(editingTask.id)}
                  style={{
                    backgroundColor: '#FF4C4C',
                    padding: 10,
                    width: 150,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: 'white', fontSize: 18 }}>Удалить задачу</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>

    {/* Модальное окно для умного заполнения */}
    <Modal visible={showSmartFillModal} transparent animationType="slide">
      <TouchableWithoutFeedback onPress={() => setShowSmartFillModal(false)}>
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
          <View style={{ width: '80%', backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Автозаполнение</Text>
            <Text>Добавить рекомендуемые задачи в расписание?</Text>
            <TouchableOpacity
              onPress={handleSmartFill}
              style={{ backgroundColor: '#4CAF50', padding: 10, marginTop: 10, borderRadius: 5 }}
            >
              <Text style={{ color: 'white', textAlign: 'center' }}>Добавить</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>

    {/* Модальное окно для советов по времени */}
    <Modal visible={showTimeTipsModal} transparent animationType="slide">
      <TouchableWithoutFeedback onPress={() => setShowTimeTipsModal(false)}>
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
          <View style={{ width: '80%', backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Советы по времени</Text>
            <Text>Как лучше распределить время для работы и отдыха?</Text>
            <TouchableOpacity
              onPress={handleTimeTips}
              style={{ backgroundColor: '#FF9800', padding: 10, marginTop: 10, borderRadius: 5 }}
            >
              <Text style={{ color: 'white', textAlign: 'center' }}>Посмотреть</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  </View>
);

    };

    export default SchedulePage;
