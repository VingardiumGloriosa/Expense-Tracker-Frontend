import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { AppDispatch, RootState } from "../store/store";
import { decrement, increment } from "../store/counterSlice";
import { createCategory, fetchCategories } from "../store/categorySlice";
import { CategoryItem } from "../components/CategoryItem";
import { Category } from "../entities/category";
import { CreateCategoryDTO } from "../entities/CreateCategoryDTO";


export function Categories() {
  const [text, onChangeText] = React.useState('Useless Text');
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );
  const dispatch = useDispatch<AppDispatch>();

  console.log("From view", categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <View>
      <TextInput  style={styles.input} onChangeText={onChangeText} value={text} />
      <Button title="Create Category" onPress={() => dispatch(createCategory(new CreateCategoryDTO(text)))} />

      <SafeAreaView>
        <FlatList
          data={categories}
          renderItem={({ item }) => <CategoryItem name={item.name} />}
          keyExtractor={(item) => item.id.toString()}
        />
      </SafeAreaView>
      {/* <Button
            title="Increment"
            onPress={() => dispatch(increment())}
        />
        <Text>{count}</Text>
        <Button
            title="Decrement"
            onPress={() => dispatch(decrement())}
        /> */}
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});