import React, { useReducer, useEffect, useState, useCallback } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput, FlatList, TouchableWithoutFeedback, Keyboard, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import Icon from 'react-native-vector-icons/FontAwesome';

const initialState = {
  entries: [],
  newEntry: { title: '', content: '', color: '#FFFFFF', mood: 'normal' },
  showModal: false,
  editingEntry: null,
};

function journalReducer(state, action) {
  switch (action.type) {
    case 'SET_ENTRIES':
      return { ...state, entries: action.payload };
    case 'SET_NEW_ENTRY':
      return { ...state, newEntry: action.payload };
    case 'TOGGLE_MODAL':
      return { ...state, showModal: !state.showModal };
    case 'SET_EDITING_ENTRY':
      return { ...state, editingEntry: action.payload };
    case 'CLEAR_NEW_ENTRY':
      return { ...state, newEntry: { title: '', content: '', color: '#FFFFFF', mood: 'normal' } };
    case 'REMOVE_ENTRY':
      return {
        ...state,
        entries: state.entries.filter(entry => entry.id !== action.payload),
        showModal: false,
        editingEntry: null,
      };
    default:
      return state;
  }
}

export default function JournalScreen() {
  const { theme } = useTheme();
  const [state, dispatch] = useReducer(journalReducer, initialState);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEntries, setFilteredEntries] = useState(state.entries);
  const [filterVisible, setFilterVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);

  

  useEffect(() => {
    const initialEntries = [
      { id: 1, title: 'Запись 1', content: 'Содержание записи 1', color: '#FFB6C1', mood: 'good', createdAt: new Date().toLocaleString() },
      { id: 2, title: 'Запись 2', content: 'Содержание записи 2', color: '#ADD8E6', mood: 'normal', createdAt: new Date().toLocaleString() },
    ];
    dispatch({ type: 'SET_ENTRIES', payload: initialEntries });
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setFilteredEntries(
        state.entries.filter((entry) =>
          entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          entry.content.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredEntries(state.entries);
    }
  }, [searchQuery, state.entries]);

  const handleAddEntry = useCallback(() => {
    if (!state.newEntry.title || !state.newEntry.content) return;
    const newEntry = { 
      ...state.newEntry, 
      id: new Date().getTime(),
      createdAt: new Date().toLocaleString(),
    };
    dispatch({ type: 'SET_ENTRIES', payload: [...state.entries, newEntry] });
    dispatch({ type: 'CLEAR_NEW_ENTRY' });
    dispatch({ type: 'TOGGLE_MODAL' });
  }, [state]);

  const handleEditEntry = useCallback((entry) => {
    dispatch({ type: 'SET_EDITING_ENTRY', payload: entry });
    dispatch({ type: 'SET_NEW_ENTRY', payload: { title: entry.title, content: entry.content, color: entry.color, mood: entry.mood } });
    dispatch({ type: 'TOGGLE_MODAL' });
  }, []);

  const handleUpdateEntry = useCallback(() => {
    if (!state.newEntry.title || !state.newEntry.content) return;
    const updatedEntries = state.entries.map((entry) =>
      entry.id === state.editingEntry.id
        ? { ...entry, title: state.newEntry.title, content: state.newEntry.content, color: state.newEntry.color, mood: state.newEntry.mood }
        : entry
    );
    dispatch({ type: 'SET_ENTRIES', payload: updatedEntries });
    dispatch({ type: 'CLEAR_NEW_ENTRY' });
    dispatch({ type: 'TOGGLE_MODAL' });
  }, [state]);

  const handleDeleteEntry = useCallback(() => {
    dispatch({ type: 'REMOVE_ENTRY', payload: state.editingEntry.id });
  }, [state]);

  const handleCancel = useCallback(() => {
    dispatch({ type: 'CLEAR_NEW_ENTRY' });
    dispatch({ type: 'TOGGLE_MODAL' });
  }, []);

  const renderEntries = () => {
    return (
      <FlatList
        data={filteredEntries}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleEditEntry(item)} style={[styles.entry, { backgroundColor: item.color }]}>
            <Text style={[styles.entryTitle, { color: theme.text }]}>{item.title}</Text>
            <Text style={{ color: theme.text }}>{item.content.slice(0, 100)}...</Text>
            <Text style={{ color: theme.text, fontSize: 12, marginTop: 5 }}>{`Создано: ${item.createdAt}`}</Text>
            <Text style={{ color: theme.text, fontSize: 12, marginTop: 5 }}>{`Настроение: ${item.mood}`}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.entryList}
      />
    );
  };

  
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.header, { color: theme.text }]}>Дневник</Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={() => setFilterVisible(!filterVisible)} style={styles.iconButton}>
          <Icon name="filter" size={24} color={theme.text} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setSearchVisible(!searchVisible)} style={styles.iconButton}>
          <Icon name="search" size={24} color={theme.text} />
        </TouchableOpacity>
      </View>

      {searchVisible && (
        <TextInput
          style={[styles.input, { marginBottom: 15 }]}
          placeholder="Поиск по записям"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      )}

      {filterVisible && (
        <TextInput
          style={[styles.input, { marginBottom: 15 }]}
          placeholder="Фильтровать по дате"
        />
      )}

      {renderEntries()}

      <TouchableOpacity onPress={() => dispatch({ type: 'TOGGLE_MODAL' })} style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      <Modal visible={state.showModal} animationType="slide" transparent>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalHeader}>
                {state.editingEntry ? 'Редактировать запись' : 'Добавить запись'}
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Заголовок"
                value={state.newEntry.title}
                onChangeText={(text) => dispatch({ type: 'SET_NEW_ENTRY', payload: { ...state.newEntry, title: text } })}
              />
              <TextInput
                style={[styles.input, styles.textarea]}
                placeholder="Содержание"
                value={state.newEntry.content}
                onChangeText={(text) => dispatch({ type: 'SET_NEW_ENTRY', payload: { ...state.newEntry, content: text } })}
                multiline
              />

              <Text style={{ fontSize: 16, marginBottom: 5 }}>Настроение</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 15 }}>
                {['Хорошее', 'Нормальное', 'Плохое'].map((mood) => (
                  <TouchableOpacity
                    key={mood}
                    onPress={() => dispatch({ type: 'SET_NEW_ENTRY', payload: { ...state.newEntry, mood } })}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      margin: 5,
                      backgroundColor: mood === 'Хорошее' ? '#90EE90' : mood === 'Плохое' ? '#FF6347' : '#ADD8E6',
                      borderWidth: state.newEntry.mood === mood ? 3 : 0,
                      borderColor: '#707070',
                    }}
                  />
                ))}
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={state.editingEntry ? handleUpdateEntry : handleAddEntry} style={styles.button}>
                  <Text style={styles.buttonText}>{state.editingEntry ? 'Сохранить' : 'Добавить'}</Text>
                </TouchableOpacity>
                {state.editingEntry && (
                  <TouchableOpacity onPress={handleDeleteEntry} style={[styles.button, styles.deleteButton]}>
                    <Text style={styles.buttonText}>Удалить</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity onPress={handleCancel} style={[styles.button, styles.cancelButton]}>
                  <Text style={styles.buttonText}>Отмена</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  entryList: { paddingTop: 10 },
  entry: { marginBottom: 15, padding: 10, backgroundColor: '#f8f8f8', borderRadius: 10 },
  entryTitle: { fontSize: 18, fontWeight: 'bold' },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    zIndex: 1,
  },
  addButtonText: { fontSize: 36, color: 'white', fontWeight: 'bold' },
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContainer: { width: '85%', padding: 20, backgroundColor: '#fff', borderRadius: 10 },
  modalHeader: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 10, fontSize: 16, marginBottom: 15 },
  textarea: { height: 100, textAlignVertical: 'top' },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  button: { flex: 1, paddingVertical: 12, backgroundColor: '#4CAF50', borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  deleteButton: { backgroundColor: '#FF6347' },
  cancelButton: { backgroundColor: '#808080' },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  iconButton: { marginHorizontal: 10 },
  buttonsContainer: { flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 15 },
});
