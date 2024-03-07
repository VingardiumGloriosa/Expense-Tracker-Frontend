// EntryListScreen.tsx

import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { setEntries } from '../../store/entriesSlice';
import axios from 'axios';
import { RootState } from '../../store/store';
import { Entry } from '../../interfaces/entry';
import { RootStackParamList } from '../../App';
import  { ExpenseItem } from '../../components/ExpenseItem'

type EntryListScreenProps = NativeStackScreenProps<RootStackParamList, 'EntryList'>;

const EntryListScreen = ({ navigation }: EntryListScreenProps) => {
  const dispatch = useDispatch();
  const entries = useSelector((state: RootState) => state.entries.entries);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Entry[]>((process.env.BASE_URL || 'localhost:3000') + '/entry');
        dispatch(setEntries(response.data));
      } catch (error) {
        console.error("There was an error fetching the entries:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  const NewExpenseButton = () => (
    <TouchableOpacity style={styles.newExpenseButton} onPress={() => navigation.navigate('AddEntry')}>
      <Text style={styles.newExpenseButtonText}>New Expense</Text>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
        renderItem={({ item }) => (
          <ExpenseItem
            item={item}
            onPress={() => navigation.navigate('EntryEdit', { entryId: item.id })}
          />
        )}
      />
      <NewExpenseButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    width: '100%'
  },
  list: {
    width: '100%'
  },
  newExpenseButton: {
    padding: 15,
    backgroundColor: '#2196F3',
    marginTop: 10,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  newExpenseButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EntryListScreen;
