import { combineReducers, configureStore } from "@reduxjs/toolkit";

import articleSlice from "./slices/articleSlice";
import userSlice from "./slices/userSlice";
import reviewSlice from "./slices/reviewSlice";
import mainSlice from "./slices/mainSlice";
import mainCategorySlice from "./slices/mainCategorySlice";
import myOrderSlice from "./slices/myOrderSlice";
import bedroomSlice from "./slices/sub/bedrommSlice";
import kitchenSlice from "./slices/sub/kitchenSlice";
import librarySlice from "./slices/sub/LibrarySlice";
import LivingroomSlice from "./slices/sub/LivingroomSlice";
import likeSlice from "./slices/likeSlice";
import intinitiSlice from "./slices/intinitiSlice";

const rootReducer = combineReducers({
  article: articleSlice,
  user: userSlice,
  review: reviewSlice,
  main: mainSlice,
  maincategory: mainCategorySlice,
  myorder: myOrderSlice,
  bedroom: bedroomSlice,
  kitchen: kitchenSlice,
  library: librarySlice,
  livingroom: LivingroomSlice,
  like: likeSlice,
  infinite: intinitiSlice
});

const store = configureStore({ reducer: rootReducer });

export default store;
