import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../theme/ThemeContext'; // Импортируем хук контекста
import { lightTheme, darkTheme } from '../theme/colors';
import { useNavigation } from '@react-navigation/native';

export default function SettingsScreen({ navigation }) {
  const { theme, toggleTheme } = useTheme(); // Получаем текущую тему и функцию для переключения
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Профиль */}
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Профиль')}>
          <View style={styles.profileInfo}>
            <View style={styles.avatar}>
              {/* Здесь можно вставить изображение аватара */}
              <Image 
                source={{ uri: 'https://i.pinimg.com/736x/7f/ad/4e/7fad4e3a961c45ba15a2a66c820a9cce.jpg' }} // Заглушка для аватара
                style={styles.avatarImage}
              />
            </View>
            <Text style={[styles.profileText, { color: theme.text }]}>Санек Викторов</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Заголовок */}
      <Text style={[styles.header, { color: theme.text }]}>Настройки</Text>

      {/* Переключение темы */}
      <View style={styles.switchContainer}>
        <Text style={[styles.switchLabel, { color: theme.text }]}>Темная тема</Text>
        <Switch
          value={theme === darkTheme} // Проверяем текущую тему
          onValueChange={toggleTheme} // Переключаем тему
          trackColor={{ false: theme.lightBlue, true: theme.blue }}
          thumbColor={theme === darkTheme ? theme.blue : theme.lightBlue}
        />
      </View>

      {/* Переключение уведомлений */}
      <View style={styles.switchContainer}>
        <Text style={[styles.switchLabel, { color: theme.text }]}>Уведомления</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={() => setNotificationsEnabled(!notificationsEnabled)}
          trackColor={{ false: theme.lightBlue, true: theme.blue }}
          thumbColor={notificationsEnabled ? theme.blue : theme.lightBlue}
        />
      </View>

      {/* Переключение звука */}
      <View style={styles.switchContainer}>
        <Text style={[styles.switchLabel, { color: theme.text }]}>Звук</Text>
        <Switch
          value={soundEnabled}
          onValueChange={() => setSoundEnabled(!soundEnabled)}
          trackColor={{ false: theme.lightBlue, true: theme.blue }}
          thumbColor={soundEnabled ? theme.blue : theme.lightBlue}
        />
      </View>

      {/* О приложении (в самом низу) */}
      <View style={styles.infoContainer}>
        <Text style={[styles.subHeader, { color: theme.text }]}>О приложении</Text>
        <Text style={[styles.versionText, { color: theme.text }]}>Версия 1.0</Text>
        <Text style={[styles.aboutText, { color: theme.text }]}>
          Это приложение предназначено для улучшения продуктивности и поддержания хорошего ментального состояния.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  profileContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  profileInfo: { flexDirection: 'row', alignItems: 'center' },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ccc',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  profileText: { fontSize: 18, fontWeight: 'bold' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  switchContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  switchLabel: { fontSize: 18, flex: 1 },
  subHeader: { fontSize: 20, fontWeight: 'bold', marginTop: 30 },
  infoContainer: { marginTop: 30, marginBottom: 20 },
  versionText: { fontSize: 16 },
  aboutText: { fontSize: 14, marginTop: 10 },
});
