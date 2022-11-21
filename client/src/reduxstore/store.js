import { combineReducers, configureStore } from "@reduxjs/toolkit";

import articleSlice from "./slices/articleSlice";
import userSlice from "./slices/userSlice";
import reviewSlice from "./slices/reviewSlice";
import mainSlice from "./slices/mainSlice";

const rootReducer = combineReducers({
  article: articleSlice,
  user: userSlice,
  review: reviewSlice,
  main: mainSlice,
});

const store = configureStore({ reducer: rootReducer });

export default store;
