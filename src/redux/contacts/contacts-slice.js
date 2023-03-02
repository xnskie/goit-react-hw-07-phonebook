import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { toast } from 'react-toastify';

const contactSlice = createSlice({
    name: "contacts",
    initialState: [],
    reducers: {
        addContact: {
            reducer(state, action) {
                const contactsNames = state.map(contact => contact.name);
                if (contactsNames.includes(action.payload.name)) {
                    toast.error(`${action.payload.name} is already in contacts.`);
                    return;
                }
                state.unshift(action.payload);
            },
            prepare(name, number) {
                return {
                    payload: {
                        id: nanoid(),
                        name,
                        number,
                    },
                };
            },
        },
        deleteContact(state, action) {
            const index = state.findIndex(contact => contact.id === action.payload);
            state.splice(index, 1);
        },
    },
});

export const { addContact, deleteContact } = contactSlice.actions;
export const contactsReducer = contactSlice.reducer;


// import { createSlice } from "@reduxjs/toolkit";
// import { nanoid } from "@reduxjs/toolkit";

// const contactsSlice = createSlice({
//     name: "contacts",
//     initialState: {
//         contacts: [],
//         filter: '',
//     },
//     reducers: {
//         addContact: {
//             reducer(state, action) {
//                 state.contacts.unshift(action.payload);
//             },
//             prepare(newContact) {
//                 return { payload: { ...newContact, id: nanoid() } };
//             },
//         },
//         deleteContact: (state, { payload }) => state.contacts.filter(({ id }) => id !== payload),
//     }
// })

// export const { addContact, deleteContact } = contactsSlice.actions;
// export const contactsReducer = contactsSlice.reducer;