import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact } from "./operation";

const initialState = {
    contacts: [],
    isLoading: false,
    error: null
};

const contactsSlice = createSlice({
    // Ім'я слайсу
    name: "contacts",
    // Початковий стан редюсера слайсу
    initialState,
    // Об'єкт редюсерів
    reducers: {},
    extraReducers: builder => builder
    .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.contacts = payload;
            })
    .addCase(addContact.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.contacts = [...state.contacts, payload];
          })
    .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.contacts = state.contacts.filter(contact => contact.id !== payload.id);
            })
               
        .addMatcher(
            isAnyOf(
                fetchContacts.pending,
                addContact.pending,
                deleteContact.pending),
            state => {
            state.isLoading = true;
        })
        
        .addMatcher(
            isAnyOf(
        fetchContacts.rejected,
        addContact.rejected,
        deleteContact.rejected),
            (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        })
});



// Генератори екшн-креаторс
export const contactsReducer = contactsSlice.reducer;