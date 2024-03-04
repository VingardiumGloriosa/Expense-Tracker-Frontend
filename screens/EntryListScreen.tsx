import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Button } from 'react-native'; // Import Button
import { useDispatch, useSelector } from 'react-redux';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { setEntries } from '../store/entriesSlice';
import axios from 'axios';
import { Entry } from '../interfaces/entry';
import { RootStackParamList } from '../App';
import { RootState } from '../store/store';
import Config from 'react-native-config';

type EntryListScreenProps = NativeStackScreenProps<RootStackParamList, 'EntryList'>;

const EntryListScreen = ({ navigation }: EntryListScreenProps) => {
    const dispatch = useDispatch();
    const entries = useSelector((state: RootState) => state.entries.entries);

    useEffect(() => {
        axios.get((process.env.BASE_URL || 'localhost:3000') + '/entry')
            .then(response => {
                console.log((process.env.BASE_URL || 'localhost:3000') + '/entry', response);
                dispatch(setEntries(response.data));
            })
            .catch(error => {
                console.error("There was an error fetching the entries:", error);
            });
    }, [dispatch]);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>All expense entries</Text>
            <FlatList
                data={entries}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('EntryEdit', { entryId: item.id })}>
                        <Text>{item.name} - {item.amount} {item.currency}</Text>
                    </TouchableOpacity>
                )}
            />
            {/* Use TouchableOpacity or Button for navigation */}
            <TouchableOpacity 
                style={{ padding: 10, backgroundColor: 'blue', marginTop: 10 }}
                onPress={() => navigation.navigate('AddEntry')}
            >
                <Text style={{ color: 'white' }}>Add Entry</Text>
            </TouchableOpacity>
            {/* Alternatively, you can use the Button component
            <Button
                title="Add Entry"
                onPress={() => navigation.navigate('AddEntry')}
            /> */}
        </View>
    );
};

export default EntryListScreen;
