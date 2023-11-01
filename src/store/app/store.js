import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { baseApi } from "../api/baseApi";
import userReducer from "../features/user/userSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
// import storageSession from 'reduxjs-toolkit-persist/lib/storage/session'
import storageSession from "redux-persist/lib/storage/session";

// local persist storage configuration
const persistConfig = {
  key: "root",
  version: 1,
  storage: storage,
  blacklist: [baseApi.reducerPath],
};
// session storage configuration
const sessionConfig = {
  key: "session",
  version: "1",
  storage: storageSession,
};
// combine all the persist reducers (drop all reducers that you would like to store at localstorage)
const rootPersistReducers = combineReducers({
  userReducer,
});
// combine all the session reducers (drop all reducers that you would like to store at session storage)
const sessionReducers = combineReducers({
  userReducer,
});

// persist reducer
const persistedReducer = persistReducer(persistConfig, rootPersistReducers);
// session reducer
const sessionReducer = persistReducer(sessionConfig, sessionReducers);
//storage configuration
export const store = configureStore({
  reducer: {
    local: persistedReducer,
    session: sessionReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);
