import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

type ExpenseProps = {
  title: string;
  onPress: () => void;
};

export function ExpenseItem(props: ExpenseProps) {
  const { title, onPress } = props;

  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <View>
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});