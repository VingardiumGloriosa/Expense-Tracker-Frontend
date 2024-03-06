import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Entry } from '../interfaces/entry';

export const calculateTotalAmount = (entries: Entry[]): number => {
  return entries.reduce((total, entry) => total + entry.amount, 0);
};

interface EntriesState {
  entries: Entry[];
  loading: boolean;
  error: string | null;
  totalAmount: number;

}

const initialState: EntriesState = {
  entries: [],
  loading: false,
  error: null,
  totalAmount: 1,
};

export const entriesSlice = createSlice({
  name: 'entries',
  initialState,
  reducers: {
    setEntries: (state, action: PayloadAction<Entry[]>) => {
      state.entries = action.payload;
      state.totalAmount = calculateTotalAmount(action.payload);
    },
    addEntry: (state, action: PayloadAction<Entry>) => {
      state.entries.push(action.payload);
    },
    updateEntry: (state, action: PayloadAction<Entry>) => {
      const index = state.entries.findIndex((entry) => entry.id === action.payload.id);
      if (index !== -1) {
        state.entries[index] = action.payload;
      }
    },
    deleteEntry: (state, action: PayloadAction<number>) => {
      state.entries = state.entries.filter((entry) => entry.id !== action.payload);
    },
  },
});

// Manually type the action creators
type EntriesSliceActions = typeof entriesSlice.actions;

export const {
  setEntries,
  addEntry,
  updateEntry,
  deleteEntry,
} = entriesSlice.actions as EntriesSliceActions;

export default entriesSlice.reducer;