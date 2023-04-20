import { combineReducers, configureStore } from "@reduxjs/toolkit";

import articleSlice from "./slices/articleSlice";
import userSlice from "./slices/userSlice";
import reviewSlice from "./slices/reviewSlice";
import myOrderSlice from "./slices/myOrderSlice";
import likeSlice from "./slices/likeSlice";

const rootReducer = combineReducers({
  article: articleSlice,
  user: userSlice,
  review: reviewSlice,
  myorder: myOrderSlice,
  like: likeSlice,
});

const store = configureStore({ reducer: rootReducer });

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
