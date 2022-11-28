import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Apis from "../../../apis/apis";

export const getLibrary = createAsyncThunk(
  "getLibrary",
  async ({ page}) => {
    return Apis.get(`products?main=서재&page=${page}`)
      .then((res) => {
        console.log(`shopslice`, res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

export const getOne = createAsyncThunk(
  "getOne",
  async ({ click, page, sortArgument}) => {
    console.log(111, {click, page, sortArgument});
    return Apis.get(`products?main=서재&sub=${click}&page=${page}&sortType=${sortArgument}`)
      .then((res) => {
        console.log(`getOne`, res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
);


export const getTwo = createAsyncThunk(
  "getTwo",
  async ({ click, page, sortArgument}) => {
    console.log({click, page, sortArgument});
    return Apis.get(`products?main=서재&sub=${click}&page=${page}&sortType=${sortArgument}`)
      .then((res) => {
        console.log(`getTwo`, res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
);


export const getThree = createAsyncThunk(
  "getThree",
  async ({ click, page, sortArgument}) => {
    console.log({click, page, sortArgument});
    return Apis.get(`products?main=서재&sub=${click}&page=${page}&sortType=${sortArgument}`)
      .then((res) => {
        console.log(`getThree`, res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
);


export const getFour = createAsyncThunk(
  "getFour",
  async ({ click, page, sortArgument}) => {
    console.log({click, page, sortArgument});
    return Apis.get(`products?main=서재&sub=${click}&page=${page}&sortType=${sortArgument}`)
      .then((res) => {
        console.log(`getFour`, res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
);


export const getAsc = createAsyncThunk(
  "getAsc",
  async ({ click, page, sortArgument, third}) => {
    return Apis.get(`products?main=서재&sub=${click}&page=${page}&sortType=${sortArgument}&order=${third}`)
      .then((res) => {
        console.log(`shopslice`, res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

export const getCount = createAsyncThunk(
  "getCount",
  async () => {
    return Apis.get(`products/count?main=서재`)
      .then((res) => {
        console.log(`shopslice`, res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

const librarySlice = createSlice({
  name: "library",
  initialState: {
    libraryInitial: [],
    sublibraryInitial: [],
    ascInitial: [],
    coutnInitial: {},
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: {
    [getLibrary.fulfilled]: (state, action) => {
      state.libraryInitial = action.payload;
      state.loading = true;
      state.error = "";
    },
    [getOne.fulfilled]: (state, action) => {
      state.oneInitial = action.payload.content;
      state.loading = true;
      state.error = "";
    },
    [getTwo.fulfilled]: (state, action) => {
      state.twoInitial = action.payload.content;
      state.loading = true;
      state.error = "";
    },
    [getThree.fulfilled]: (state, action) => {
      state.threeInitial = action.payload.content;
      state.loading = true;
      state.error = "";
    },
    [getFour.fulfilled]: (state, action) => {
      state.fourInitial = action.payload.content;
      state.loading = true;
      state.error = "";
    },
    [getAsc.fulfilled]: (state, action) => {
      state.ascInitial = action.payload.content;
      state.loading = true;
      state.error = "";
    },
    [getCount.fulfilled]: (state, action) => {
      state.coutnInitial = action.payload;
      state.loading = true;
      state.error = "";
    },
  },
});

export default librarySlice.reducer;
