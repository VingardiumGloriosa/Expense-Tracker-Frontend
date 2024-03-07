import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Category } from '../entities/category';

type ExpenseProps = {
  item: {
    name: string,
    amount: number,
    currency: string,
    category: Category,
    date: Date,
    id: number,
  };
  onPress: () => void;
};

export function ExpenseItem(props: ExpenseProps) {
  const { item, onPress } = props;

  const date = new Date(item.date);
  const dateString = [date.getDate(), date.getMonth()+1, date.getFullYear()].join('-');

  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.category}>
          {
            item.category?.name ?
                item.category.name :
                ' '
          }
        </Text> 
      </View>
      <View>
        <Text style={styles.amount}>{item.amount} {item.currency}</Text>
        <Text style={styles.date}>{dateString}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#c5e6fc',
    borderWidth: 1,
    borderColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  category: {
    color: '#023b61',
    fontSize: 12,
  },
  name: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  amount: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    color: '#023b61',
    fontSize: 12,
    textAlign: 'right',
  }
});