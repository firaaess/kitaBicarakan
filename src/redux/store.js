import authSlice from "./authSlice";
import { combineReducers, configureStore }  from "@reduxjs/toolkit"
import kategoriSlice from "./kategoriSlice";
import lokasiSlice from "./lokasiSlice";
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
import storage from 'redux-persist/lib/storage';
import pengaduanSlice from "./pengaduanSlice";

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};

const rootReducer = combineReducers({
    auth: authSlice,
    kategori: kategoriSlice,
    lokasi: lokasiSlice,
    pengaduan: pengaduanSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
    // reducer:{
    //     auth: authSlice,
    //     kategori: kategoriSlice,
    //     lokasi: lokasiSlice
    // }
})

export default store