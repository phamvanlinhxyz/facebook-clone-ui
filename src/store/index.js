import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  authReducer,
  postsReducer,
  appReducer,
  searchReducer,
  friendReducer,
  notificationReducer,
} from './reducers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';

const reducers = combineReducers({
  authReducer,
  postsReducer,
  appReducer,
  searchReducer,
  friendReducer,
  notificationReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: 'postsReducer appReducer friendReducer notificationReducer',
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
