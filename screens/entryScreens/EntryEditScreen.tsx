import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Platform, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { updateEntry, deleteEntry } from '../../store/entriesSlice';
import { Entry } from '../../interfaces/entry';
import Config from 'react-native-config';

type Props = NativeStackScreenProps<RootStackParamList, 'EntryEdit'>;


const EntryEditScreen = ({ route, navigation }: Props) => {
    const dispatch = useDispatch();
    const { entryId } = route.params;

    const [form, setForm] = useState<Entry>({
        id: 0,
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
    useEffect(() => {
        axios.get((process.env.BASE_URL || 'localhost:3000') + `/entry/${entryId}`)
            .then(response => {
                const data = response.data;
                setForm({
                    ...data,
                    date: new Date(data.date).toISOString().substring(0, 10), // Convert to "YYYY-MM-DD"
                });
            })
            .catch(error => {
                console.error("There was an error fetching the entry:", error);
            });
    }, [entryId]);

    const handleSave = () => {
        const submissionData = {
            ...form,
            date: new Date(form.date).toISOString() // Convert back to ISO string for backend
        };

        axios.patch((process.env.BASE_URL || 'localhost:3000') + `/entry/${entryId}`, submissionData)
            .then(() => {
                dispatch(updateEntry(submissionData));
                navigation.goBack();
            })
            .catch(error => {
                console.error("There was an error updating the entry:", error);
            });
    };

    const handleDelete = () => {
        axios.delete((process.env.BASE_URL || 'localhost:3000') + `/entry/${entryId}`)
            .then(() => {
                dispatch(deleteEntry(entryId));
                navigation.goBack();
            })
            .catch(error => {
                console.error("There was an error deleting the entry:", error);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Edit Entry</Text>
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
                <Button onPress={() => setShowDatePicker(true)} title="Change Date" />
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
            <Button title="Delete" onPress={handleDelete} color="red" />
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

export default EntryEditScreen;
