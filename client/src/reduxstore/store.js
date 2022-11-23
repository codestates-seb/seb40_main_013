import { combineReducers, configureStore } from "@reduxjs/toolkit";

import articleSlice from "./slices/articleSlice";
import userSlice from "./slices/userSlice";
import reviewSlice from "./slices/reviewSlice";
import mainSlice from "./slices/mainSlice";
import categorySlice from "./slices/categorySlice";

const rootReducer = combineReducers({
  article: articleSlice,
  user: userSlice,
  review: reviewSlice,
  main: mainSlice,
  category: categorySlice,
});

const store = configureStore({ reducer: rootReducer });

export default store;
