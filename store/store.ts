import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './categorySlice';
import entriesReducer from './entriesSlice';
import thunk from 'redux-thunk';

export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    entries: entriesReducer,
  }});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
