import { combineReducers, configureStore } from "@reduxjs/toolkit";

import articleSlice from "./slices/articleSlice";
import userSlice from "./slices/userSlice";
import reviewSlice from "./slices/reviewSlice";
import mainSlice from "./slices/mainSlice";
import categorySlice from "./slices/categorySlice";
import subCategorySlice from "./slices/subCategorySlice";

const rootReducer = combineReducers({
  article: articleSlice,
  user: userSlice,
  review: reviewSlice,
  main: mainSlice,
  category: categorySlice,
  subcategory :subCategorySlice
});

const store = configureStore({ reducer: rootReducer });

export default store;
