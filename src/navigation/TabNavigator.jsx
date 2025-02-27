import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import JournalScreen from '../screens/JournalScreen';
import WorkoutScreen from '../screens/WorkoutScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from '../theme/colors';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: theme.card },
          tabBarActiveTintColor: theme.blue,
        }}
      >
        <Tab.Screen name="Главная" component={HomeScreen} />
        <Tab.Screen name="Расписание" component={ScheduleScreen} />
        <Tab.Screen name="Дневник" component={JournalScreen} />
        <Tab.Screen name="Тренировки" component={WorkoutScreen} />
        <Tab.Screen name="Настройки" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}