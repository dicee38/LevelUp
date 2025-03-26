import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Image, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '../theme/ThemeContext'; // Для использования текущей темы (если есть)

const ProfileScreen = () => {
  const { theme } = useTheme(); // Получаем текущую тему
  const [username, setUsername] = useState('Санек Викторов'); // Пример данных пользователя
  const [email, setEmail] = useState('sanek@example.com');
  const [phone, setPhone] = useState('+7 123 456 78 90');
  const [profileImage, setProfileImage] = useState('https://i.pinimg.com/736x/7f/ad/4e/7fad4e3a961c45ba15a2a66c820a9cce.jpg'); // URL изображения
  const [isEditing, setIsEditing] = useState(false); // Статус редактирования профиля

  // Функция для сохранения изменений
  const handleSave = () => {
    // Здесь добавим код для отправки изменений на сервер или в базу данных
    setIsEditing(false);
    // Уведомление о том, что изменения сохранены
    Alert.alert("Успех", "Изменения сохранены!");
  };

  const handleImageChange = () => {
    // Здесь можно добавить код для загрузки нового фото (например, через библиотеку ImagePicker)
    Alert.alert("Изображение", "Загрузите новое изображение!");
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        {/* Профильная картинка */}
        <TouchableOpacity onPress={handleImageChange}>
          <Image
            source={{ uri: profileImage }} // Замените на URL изображения
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <Text style={[styles.name, { color: theme.text }]}>{username}</Text>
        <Text style={[styles.email, { color: theme.text }]}>{email}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Информация</Text>
        
        {/* Редактируемые данные */}
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: theme.text }]}>Имя:</Text>
          {isEditing ? (
            <TextInput
              style={[styles.input, { backgroundColor: theme.card, color: theme.text }]}
              value={username}
              onChangeText={setUsername}
            />
          ) : (
            <Text style={[styles.value, { color: theme.text }]}>{username}</Text>
          )}
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: theme.text }]}>Телефон:</Text>
          {isEditing ? (
            <TextInput
              style={[styles.input, { backgroundColor: theme.card, color: theme.text }]}
              value={phone}
              onChangeText={setPhone}
            />
          ) : (
            <Text style={[styles.value, { color: theme.text }]}>{phone}</Text>
          )}
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: theme.text }]}>Email:</Text>
          {isEditing ? (
            <TextInput
              style={[styles.input, { backgroundColor: theme.card, color: theme.text }]}
              value={email}
              onChangeText={setEmail}
            />
          ) : (
            <Text style={[styles.value, { color: theme.text }]}>{email}</Text>
          )}
        </View>

        {/* Кнопка для редактирования или сохранения */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.blue }]}
          onPress={() => setIsEditing(!isEditing)}
        >
          <Text style={styles.buttonText}>{isEditing ? 'Сохранить' : 'Редактировать'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.settingsContainer}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Настройки</Text>
        {/* Пример кнопки настроек */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Изменить пароль</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Выход</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: 'gray',
  },
  infoContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
    padding: 10,
    borderRadius: 5,
  },
  value: {
    fontSize: 16,
    color: 'gray',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
  settingsContainer: {
    marginTop: 30,
  },
});

export default ProfileScreen;
