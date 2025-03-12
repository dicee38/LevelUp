import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeContext'; // Импортируем хук контекста
import { lightTheme, darkTheme } from '../theme/colors';

export default function SettingsScreen({ navigation }) {
  const { theme, toggleTheme } = useTheme(); // Получаем текущую тему и функцию для переключения
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Профиль */}
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <View style={styles.profileInfo}>
            <View style={styles.avatar}></View>
            <Text style={[styles.profileText, { color: theme.text }]}>Имя пользователя</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Заголовок */}
      <Text style={[styles.header, { color: theme.text }]}>Настройки</Text>

      {/* Переключение темы */}
      <View style={styles.switchContainer}>
        <Text style={{ color: theme.text }}>Темная тема</Text>
        <Switch
          value={theme === darkTheme} // Проверяем текущую тему
          onValueChange={toggleTheme} // Переключаем тему
          trackColor={{ false: theme.lightBlue, true: theme.blue }}
          thumbColor={theme === darkTheme ? theme.blue : theme.lightBlue}
        />
      </View>

      {/* Переключение уведомлений */}
      <View style={styles.switchContainer}>
        <Text style={{ color: theme.text }}>Уведомления</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={() => setNotificationsEnabled(!notificationsEnabled)}
          trackColor={{ false: theme.lightBlue, true: theme.blue }}
          thumbColor={notificationsEnabled ? theme.blue : theme.lightBlue}
        />
      </View>

      {/* Переключение звука */}
      <View style={styles.switchContainer}>
        <Text style={{ color: theme.text }}>Звук</Text>
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
        <Text style={{ color: theme.text }}>Версия 1.0</Text>
        <Text style={{ color: theme.text, marginTop: 10 }}>
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
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ccc',
    marginRight: 10,
  },
  profileText: { fontSize: 18, fontWeight: 'bold' },
  header: { fontSize: 22, fontWeight: 'bold' },
  switchContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 20 },
  subHeader: { fontSize: 18, fontWeight: 'bold', marginTop: 30 },
  infoContainer: { marginTop: 30, marginBottom: 20 }, // Убедитесь, что пространство для текста не перекрывает другие элементы
});
