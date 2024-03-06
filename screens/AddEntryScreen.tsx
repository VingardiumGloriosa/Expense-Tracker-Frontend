import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Platform, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { addEntry } from '../store/entriesSlice'; // Make sure you have an addEntry action in your Redux slice
import { Entry } from '../interfaces/entry';
import Config from 'react-native-config';

type Props = NativeStackScreenProps<RootStackParamList, 'AddEntry'>;

const AddEntryScreen = ({ navigation }: Props) => {
    const dispatch = useDispatch();

    const [form, setForm] = useState<Entry>({
        id: 0, // This might not be necessary depending on how your backend handles IDs
        name: '',
        amount: 0,
        currency: '',
        date: new Date().toISOString().substring(0, 10), // Ensure this matches your backend format
        comment: '',
    });

    const [showDatePicker, setShowDatePicker] = useState(false);

    const onDateChange = (_event: Event, selectedDate?: Date) => {
        const currentDate = selectedDate ? selectedDate.toISOString().substring(0, 10) : form.date;
        setShowDatePicker(Platform.OS === 'ios');
        setForm({ ...form, date: currentDate });
    };

    const handleSave = () => {
        const submissionData = {
            ...form,
            categoryId: 1,
            date: new Date(form.date).toISOString() // Convert back to ISO string for backend
        };
        console.log(submissionData);
        // Use axios.post to add a new entry
        axios.post((process.env.BASE_URL || 'localhost:3000') + '/entry', submissionData)
            .then(() => {
                dispatch(addEntry(submissionData)); // Adjust according to your Redux store
                navigation.goBack();
            })
            .catch(error => {
                console.error("There was an error adding the entry:", error);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add Entry</Text>
            <TextInput
                style={styles.input}
                value={form.name}
                onChangeText={(text) => setForm({ ...form, name: text })}
                placeholder="Name"
            />
            <TextInput
                style={styles.input}
                value={form.amount.toString()}
                keyboardType="numeric"
                onChangeText={(text) => setForm({ ...form, amount: parseFloat(text) || 0 })}
                placeholder="Amount"
            />
            <TextInput
                style={styles.input}
                value={form.currency}
                onChangeText={(text) => setForm({ ...form, currency: text })}
                placeholder="Currency"
            />
            <View>
                <Button onPress={() => setShowDatePicker(true)} title="Set Date" />
                {showDatePicker && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={new Date(form.date)}
                        mode="date"
                        is24Hour={true}
                        display="default"
                        onChange={onDateChange}
                        maximumDate={new Date(2025, 11, 31)}
                        minimumDate={new Date(2000, 0, 1)}
                    />
                )}
            </View>
            <TextInput
                style={styles.input}
                value={form.comment}
                onChangeText={(text) => setForm({ ...form, comment: text })}
                placeholder="Comment"
            />
            <Button title="Save" onPress={handleSave} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        marginVertical: 12,
        borderWidth: 1,
        borderColor: '#cccccc',
        padding: 10,
    },
});

export default AddEntryScreen;
