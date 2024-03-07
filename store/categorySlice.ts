  import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
  import type { PayloadAction } from '@reduxjs/toolkit'
  import { Category } from '../entities/category'
  import { CategoriesAPI } from '../api/categoriesAPI'
  import { CreateCategoryDTO } from '../entities/CreateCategoryDTO'
  import axios, { AxiosError } from 'axios'; 

  export interface CategoriesState {
    categories: Category[]
  }

  const initialState: CategoriesState = {
    categories: [],
  }


  // First, create the thunk
  export const fetchCategories = createAsyncThunk(
      'fetchCategories',
      async (thunkAPI) => {
        return await CategoriesAPI.fetchAll();
      },
    )

    export const createCategory = createAsyncThunk(
      'createCategory',
      async (category: CreateCategoryDTO, thunkAPI) => {
        return await CategoriesAPI.createCategory(category)
      },
    )

    export const deleteCategory = createAsyncThunk(
      'categories/deleteCategory',
      async (categoryId: number, { rejectWithValue }) => {
        try {
          await CategoriesAPI.deleteCategory(categoryId);
          return categoryId;
        } catch (error: any) { 
          return rejectWithValue(error.response.data);
        }
      }
    );
    



  export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
      // decrement: (state) => {
      //   state.value -= 1
      // },
      // incrementByAmount: (state, action: PayloadAction<number>) => {
      //   state.value += action.payload
      // },
      setCategories: (state, action: PayloadAction<Category[]>) => {
        state.categories = action.payload;
      },
    },
    extraReducers: (builder) => {
      // Add reducers for additional action types here, and handle loading state as needed
      builder.addCase(fetchCategories.fulfilled, (state, action) => {
        // Add user to the state array
        console.log("action.payload", action.payload);
        state.categories = action.payload;
      //   state.entities.push(action.payload)
      }),
      builder.addCase(createCategory.fulfilled, (state, action) => {
          // Add user to the state array
          console.log("action.payload", action.payload);
          state.categories.push(action.payload)
        //   state.entities.push(action.payload)
        })

        builder.addCase(deleteCategory.fulfilled, (state, action) => {
          state.categories = state.categories.filter((category) => category.id !== action.payload);
        });
  }
  })

  // Action creators are generated for each case reducer function
  // ACTIONS
  export const { setCategories  } = categorySlice.actions

  export default categorySlice.reducer