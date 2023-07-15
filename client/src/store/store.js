// import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import videoSlice from "./videoSlice";
import userSlice from "./userSlice";
import loggedInUser from "./loggedInUser";
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";
// import storage from "redux-persist/lib/storage";

// const rootReducer = combineReducers({
//   video: videoSlice,
//   user: userSlice,
//   loggedInUser: loggedInUser,
// });

// const persistConfig = {
//   key: "root",
//   version: 1,
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });
export const store = configureStore({
  reducer: {
    video: videoSlice,
    user: userSlice,
    loggedInUser: loggedInUser,
  },
});

// export let persistor = persistStore(store);
