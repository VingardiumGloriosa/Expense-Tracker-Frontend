import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import EntryListScreen from './screens/entryScreens/EntryListScreen';
import EntryEditScreen from './screens/entryScreens/EntryEditScreen';
import EntryDeleteScreen from './screens/entryScreens/EntryDeleteScreen';
import AddEntryScreen from './screens/entryScreens/AddEntryScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { store } from './store/store'
import { Provider } from 'react-redux'
import { Categories } from './screens/Categories';

// dotenv.config();

export type RootStackParamList = {
  // Expenses: undefined,
  Entries: undefined;
  AddEntry: undefined;
  EntryEdit: { entryId: number };
  EntryDelete: { entryId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const EntryStackNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Entries" component={EntryListScreen} />
        <Stack.Screen name="AddEntry" component={AddEntryScreen} />
        <Stack.Screen name="EntryEdit" component={EntryEditScreen} />
        <Stack.Screen name="EntryDelete" component={EntryDeleteScreen} />
      </Stack.Navigator>
  )
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={HomeScreen}/>
        <Tab.Screen name="Expenses" component={EntryStackNavigator} />
        <Tab.Screen name="Settings" component={Categories} />
      </Tab.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
