import { createSlice } from "@reduxjs/toolkit";
import { fetchAllContacts, addContact, deleteContact } from "./contacts-operations";

const handlePending = state => {
    state.isLoading = true;
};

const handleRejected = (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
};

const contactsSlice = createSlice({
    name: "contacts",
    initialState: {
        items: [],
        isLoading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllContacts.pending, handlePending);
        builder.addCase(fetchAllContacts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.items = action.payload;
        });
        builder.addCase(fetchAllContacts.rejected, handleRejected);
        builder.addCase(addContact.pending, handlePending);
        builder.addCase(addContact.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.items.push(action.payload);
        });
        builder.addCase(addContact.rejected, handleRejected);
        builder.addCase(deleteContact.pending, handlePending);
        builder.addCase(deleteContact.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            const index = state.items.findIndex(
                contact => contact.id === action.payload.id
            );
            state.items.splice(index, 1);
        });
        builder.addCase(deleteContact.rejected, handleRejected);
    },
});

export const contactsReducer = contactsSlice.reducer;



// addContact: {
//     reducer(state, action) {
//         const contactsNames = state.map(contact => contact.name);
//         if (contactsNames.includes(action.payload.name)) {
//             toast.error(`${action.payload.name} is already in contacts.`);
//             return;
//         }
//         state.unshift(action.payload);
//     },
//     prepare(name, number) {
//         return {
//             payload: {
//                 id: nanoid(),
//                 name,
//                 number,
//             },
//         };
//     },
// },
// deleteContact(state, action) {
//     const index = state.findIndex(contact => contact.id === action.payload);
//     state.splice(index, 1);
// },


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