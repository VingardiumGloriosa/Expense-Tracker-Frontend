import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import categoryReducer from './categorySlice';
import entriesReducer from './entriesSlice'; // Import the entries reducer

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    categories: categoryReducer,
    entries: entriesReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
