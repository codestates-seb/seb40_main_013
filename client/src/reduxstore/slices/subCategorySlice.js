import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Apis from "../../apis/apis";

export const getSubCategory = createAsyncThunk(
  "getSubCategory",
  async ({ click, page }) => {
    console.log(1231);
    return Apis.get(`products?main=${click}&page=${page}`)
      .then((res) => {
        console.log(`shopslice`, res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

export const getLibrary = createAsyncThunk(
  "getLibrary",
  async ({ click, page }) => {
    return Apis.get(`products?main=서재&sub=${click}&page=${page}`)
      .then((res) => {
        console.log(`shopslice`, res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

export const getBedroom = createAsyncThunk(
  "getBedroom",
  async ({ click, page }) => {
    return Apis.get(`products?main=침실&sub=${click}&page=${page}`)
      .then((res) => {
        console.log(`shopslice`, res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

export const getLivingRoom = createAsyncThunk(
  "getLivingRoom",
  async ({ click, pageNum }) => {
    return Apis.get(`products?main=침실&sub=${click}&page=${pageNum}`)
      .then((res) => {
        console.log(`shopslice`, res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

export const getKitchen = createAsyncThunk(
  "getKitchen",
  async ({ click, pageNum }) => {
    return Apis.get(`products?main=침실&sub=${click}&page=${pageNum}`)
      .then((res) => {
        console.log(`shopslice`, res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

const subCategorySlice = createSlice({
  name: "subcategory",
  initialState: {
    subCategoryInitial: {},
    libraryInitial: {},
    bedroomInitial: {},
    livingRoomInitial: {},
    kitchenInitial: {},
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: {
    [getSubCategory.fulfilled]: (state, action) => {
      state.subCategoryInitial = action.payload;
      state.loading = true;
      state.error = "";
    },
    [getLibrary.fulfilled]: (state, action) => {
      state.libraryInitial = action.payload;
      state.loading = true;
      state.error = "";
    },
    [getBedroom.fulfilled]: (state, action) => {
      state.bedroomInitial = action.payload;
      state.loading = true;
      state.error = "";
    },
    [getLivingRoom.fulfilled]: (state, action) => {
      state.livingRoomInitial = action.payload;
      state.loading = true;
      state.error = "";
    },
    [getKitchen.fulfilled]: (state, action) => {
      state.kitchenInitial = action.payload;
      state.loading = true;
      state.error = "";
    },
  },
});

export default subCategorySlice.reducer;
