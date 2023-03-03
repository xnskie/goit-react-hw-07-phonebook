import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://6400f0a13779a862624fa78c.mockapi.io/contacts";

export const fetchAllContacts = createAsyncThunk(
    "contacts/fetchAll",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("/contacts");
            return response.data;
        } catch ({ e }) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
);

export const addContact = createAsyncThunk(
    "contacts/addContact",
    async (contact, thunkAPI) => {
        try {
            const response = await axios.post("/contacts", contact);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    },
    {
        condition: ({ name }, { getState }) => {
            const {contacts} = getState();
            const normalizedName = name.toLowerCase();
            const result = contacts.items.find(({ name }) => {
                return (name.toLowerCase() === normalizedName)
            })
            if (result) {
                alert(`${name} is already in contacts.`);
                alert.preventDefault();
                return false;
            }
        }
    }
);

export const deleteContact = createAsyncThunk(
    "contacts/deleteContact",
    async (contactId, thunkAPI) => {
        try {
            const response = await axios.delete(`/contacts/${contactId}`);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);


/*
export const fetchAllContacts =() => {
    const func = async(dispatch) => {
        try {
            dispatch(fetchAllContactsLoading());
            const data = await getAllContacts.get();
            console.log(data);
            dispatch(fetchAllContactsSuccess(data));

        } 
        catch ({responce}) {
            dispatch(fetchAllContactsError(responce.data.message));
        }
    }
    return func;
}

const isDublicate = (contacts, {name, number}) => {
    const normalizedName = name.toLowerCase();
    const result = contacts.find(({name, number}) => {
        return (name.toLowerCase() === normalizedName)
    })
    return Boolean(result);
}

export const fetchAddContact = (data) => {
    const func = async(dispatch, getState) => {
        try {
            const {contacts} = getState();
            if (isDublicate(contacts.items, data)) {
                alert(`${data.name} is already in contacts.`);
                return false;
            }
            dispatch(fetchAddContactLoading());
            const result = await addContact(data);
            dispatch(fetchAddContactSuccess(result));
        } 
        catch ({responce}) {
            dispatch(fetchAddContactError(responce.data.message))
        }
    }
    return func;
}

export const fetchDeleteContact = (id) => {
    const func = async(dispatch) => {
        try {
            dispatch(fetchDeleteContactLoading());
            await deleteBook(id);
            dispatch(fetchDeleteContactSuccess(id));

        } 
        catch ({responce}) {
            dispatch(fetchDeleteContactError(responce.data.message))
        }
    }
    return func;
}
*/