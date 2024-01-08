import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import {configureStore} from '@reduxjs/toolkit';
import {inkartReducer} from './Reducer';

const persistConfig = {
  key: 'InKartAdmin',
  storage: AsyncStorage,
};

// //  Middleware : redux persisit persisted reducer

const persistedReducer = persistReducer(persistConfig, inkartReducer);

// redux:store

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: []
// });

let persister = persistStore(store);
// export
export {store, persister};
