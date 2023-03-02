import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { contactsReducer } from "./contacts/contacts-slice";
import { filtersReducer } from "./filter/filter-slice";
import storage from 'redux-persist/lib/storage';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['filter'],
};

const rootReducer = combineReducers({
    contacts: contactsReducer,
    filter: filtersReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
});

export const persistor = persistStore(store);

// import { configureStore } from '@reduxjs/toolkit';
// import { persistStore } from 'redux-persist';

// import persistedReducer from './root-reducer';
// import {filterReducer} from "./filter/filter-slice";


// export const store = configureStore({
//     reducer: {
//         contacts: persistedReducer,
//         filter: filterReducer,
//     } 
// })

// export const persistor = persistStore(store)