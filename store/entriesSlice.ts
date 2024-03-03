import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Entry } from '../interfaces/entry'; // Adjust the import path as necessary

interface EntriesState {
  entries: Entry[];
}

const initialState: EntriesState = {
  entries: [],
};

export const entriesSlice = createSlice({
  name: 'entries',
  initialState,
  reducers: {
    setEntries: (state, action: PayloadAction<Entry[]>) => {
      state.entries = action.payload;
    },
    addEntry: (state, action: PayloadAction<Entry>) => {
      // Assuming your backend generates the ID for new entries,
      // simply add the new entry to the state array.
      state.entries.push(action.payload);
    },
    updateEntry: (state, action: PayloadAction<Entry>) => {
        const index = state.entries.findIndex(entry => entry.id === action.payload.id);
        if (index !== -1) {
          state.entries[index] = action.payload;
        }
    },
    deleteEntry: (state, action: PayloadAction<number>) => {
      state.entries = state.entries.filter(entry => entry.id !== action.payload);
    },
  },
});

export const { setEntries, addEntry, updateEntry, deleteEntry } = entriesSlice.actions;

export default entriesSlice.reducer;
