import { createSlice } from "@reduxjs/toolkit";

const initialState = '';

const filterSlice = createSlice({
    // Ім'я слайсу
    name: "filter",
  // Початковий стан редюсера слайсу 
    initialState,
  // Об'єкт редюсерів
  reducers: {
      setFilter(_, { payload }) {
          return payload;
    },
  },
});

// Генератори екшн-креаторс
export const { setFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;