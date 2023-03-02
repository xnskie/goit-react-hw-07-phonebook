// import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import {contactsReducer} from "./contacts/contacts-slice";

const persistConfig = {
    key: "haha",
    storage,
}

// const rootReducer = combineReducers ({
//     contacts: contactsReducer,
//     filter: '',
// })


const persistedReducer = persistReducer(persistConfig, contactsReducer)

export default persistedReducer;