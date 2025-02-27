import { registerRootComponent } from 'expo';
import TabNavigator from './src/navigation/TabNavigator';

export default function App() {
  return <TabNavigator />;
}

registerRootComponent(App);
