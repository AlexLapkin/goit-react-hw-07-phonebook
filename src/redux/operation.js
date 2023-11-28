import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Notiflix from "notiflix";

axios.defaults.baseURL = "https://6560ec1f83aba11d99d1b525.mockapi.io";

export const fetchContacts = createAsyncThunk('contacts/fetchAll', async (_,
    thunkAPI) => {
    try {
        const { data } = await axios.get("/contacts");
        // Це буде записано в action.payload ({ payload }) редюсера
        return data;
    } catch (err) {
       return thunkAPI.rejectWithValue(err.response.data);
    }
}
);

// Додавання контакту addContact 
export const addContact = createAsyncThunk('contacts/addContacts', async (finalContacts,
    thunkAPI) => {
    try {
        const { data } = await axios.post("/contacts", finalContacts);
        // Це буде записано в action.payload ({ payload }) редюсера
        return data;
    } catch (err) {
       return thunkAPI.rejectWithValue(err.response.data);
    }
}
);

// Видалення контакту deleteContact
export const deleteContact = createAsyncThunk('contacts/deleteContact', async (contactId,
    thunkAPI) => {
    try {
        const { data } = await axios.delete(`/contacts/${contactId}`);
        // Повідомлення про видалення з книги контакту
        Notiflix.Notify.info(`Contact ${data.name} is deleted!`, {
            position: 'right-center',
            timeout: 3000,
        });
        // Це буде записано в action.payload ({ payload }) редюсера
        return data;
        
         } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
}
);
