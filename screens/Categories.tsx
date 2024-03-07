import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AppDispatch, RootState } from "../store/store";
//import { decrement, increment } from "../store/counterSlice";
import { createCategory, deleteCategory, fetchCategories, setCategories } from "../store/categorySlice";
import { CategoryItem } from "../components/CategoryItem";
import { Category } from "../entities/category";
import axios from 'axios';

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

  // Function to handle category press
  const handlePressCategory = (categoryId: any) => {
    dispatch(deleteCategory(categoryId));
  };

//   useEffect(() => {
//     axios.get((process.env.BASE_URL || 'localhost:3000') + '/category')
//         .then(response => {
//             console.log((process.env.BASE_URL || 'localhost:3000') + '/category', response);
//             dispatch(setCategories(response.data));
//         })
//         .catch(error => {
//             console.error("There was an error fetching the categories:", error);
//         });
// }, [dispatch]);

return (
  <View>
    <TextInput style={styles.input} onChangeText={onChangeText} value={text} />
    <Button title="Create Category" onPress={() => dispatch(createCategory(new CreateCategoryDTO(text)))} />
    <SafeAreaView>
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          // Wrap CategoryItem with TouchableOpacity
          <TouchableOpacity onPress={() => handlePressCategory(item.id)}>
            <CategoryItem name={item.name} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
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