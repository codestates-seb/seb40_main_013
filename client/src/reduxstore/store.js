import { combineReducers, configureStore } from "@reduxjs/toolkit";

import articleSlice from "./slices/articleSlice";
import userSlice from "./slices/userSlice";
import reviewSlice from "./slices/reviewSlice";
import mainSlice from "./slices/mainSlice";
import mainCategorySlice from "./slices/mainCategorySlice";
import myOrderSlice from "./slices/myOrderSlice";
import bedroomSlice from "./slices/sub/bedrommSlice";
import kitchenSlice from "./slices/sub/kitchenSlice";
import LibrarySlice from "./slices/sub/LibrarySlice";
import LivingroomSlice from "./slices/sub/LivingroomSlice";
import likeSlice from "./slices/likeSlice";

const rootReducer = combineReducers({
  article: articleSlice,
  user: userSlice,
  review: reviewSlice,
  main: mainSlice,
  maincategory: mainCategorySlice,
  myorder: myOrderSlice,
  bedroom: bedroomSlice,
  kitchen: kitchenSlice,
  library: LibrarySlice,
  livingroom: LivingroomSlice,
  like: likeSlice
});

const store = configureStore({ reducer: rootReducer });

export default store;
