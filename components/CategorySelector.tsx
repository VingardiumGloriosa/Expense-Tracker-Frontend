import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { CategoriesAPI } from '../api/categoriesAPI';
import { Category } from '../entities/category';


const CategorySelector = ({ selectedCategoryId, onSelectCategory }) => {

    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            setCategories(await CategoriesAPI.fetchAll());
        }

        fetchCategories();
    }, [])

    return (
      <View style={styles.wrapper}>
        <Text>Select category</Text>
        <ScrollView horizontal style={styles.container} showsHorizontalScrollIndicator={false}>
            {categories.map((category) => (
                <TouchableOpacity
                    key={category.id}
                    style={[
                        styles.categoryButton,
                        (category.id === selectedCategoryId) ? styles.selectedCategory : {},
                    ]}
                    onPress={() => onSelectCategory(category)}
                >
                <Text style={
                  (category.id === selectedCategoryId) ? 
                    styles.selectedCategoryButtonText : 
                    styles.categoryButtonText
                  }>{category.name}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
      </View>
    );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 'auto',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  categoryButton: {
    backgroundColor: '#c5e6fc',
    borderWidth: 1,
    borderColor: '#3498db',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 5,
    marginVertical: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  selectedCategory: {
    backgroundColor: '#2980b9',
  },
  selectedCategoryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoryButtonText: {
    color: '#023b61',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CategorySelector;