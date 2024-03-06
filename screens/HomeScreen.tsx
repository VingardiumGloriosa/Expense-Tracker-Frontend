import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import axios from 'axios';
import { Entry } from '../interfaces/entry';
import { setEntries } from '../store/entriesSlice';
import { ScreenContainer } from 'react-native-screens';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const entries = useSelector((state: RootState) => state.entries.entries);
    const totalAmount = useSelector((state: RootState) => state.entries.totalAmount);

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
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>Finance Tracker</Text>
        <Text style={styles.subtitle}>Your Financial Overview</Text>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.title}>Total spent: {totalAmount} moneys</Text>
        <Text style={styles.title}>keep going!!!</Text>
     </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0', // Background color for the entire screen
    padding: 16,
  },
  topContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Background color for the entire screen
    padding: 16,
  },
  bottomContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Background color for the entire screen
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333', // Title color
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 16,
    color: '#666', // Subtitle color
  },
  // Add more styles as needed
});

export default HomeScreen;
