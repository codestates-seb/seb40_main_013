import { combineReducers, configureStore } from "@reduxjs/toolkit";

import articleSlice from "./slices/articleSlice";
import userSlice from "./slices/userSlice";

const rootReducer = combineReducers({
  article: articleSlice,
  user: userSlice,
});

const store = configureStore({ reducer: rootReducer });

export default store;
