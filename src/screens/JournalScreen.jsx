import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from '../theme/colors';
export default function JournalScreen() {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>  
      <Text style={[styles.header, { color: theme.text }]}>Дневник</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 22, fontWeight: 'bold' },
});
