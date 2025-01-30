import {  configureStore } from '@reduxjs/toolkit';
import userReducer from "./pages/Slices/UserSlice";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { geminiSlice } from './pages/Slices/GeminiSlice';
import resultReducer from './pages/Slices/ResultsSlice'; // Adjust the path as necessary

const persistConfig = {
    key: 'root',
    storage,
  }

  const persistedReducer = persistReducer(persistConfig, userReducer)

export const store = configureStore({
    reducer:{
        user: persistedReducer,
        [geminiSlice.reducerPath]: geminiSlice.reducer,
        result: resultReducer 
    }, 
    middleware: (getDefaultMiddleware)=>
         getDefaultMiddleware().concat(geminiSlice.middleware)
});

export const persistor = persistStore(store); 