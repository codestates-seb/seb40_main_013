import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Apis from "../../apis/apis";
import { type PageInfo, type ProductDetail } from "../../type";
interface getMyOrderArgs {
  count: number;
  setTotalpage: React.Dispatch<React.SetStateAction<number>>;
}

interface FilterMyOrderArgs {
  id: string;
}

export const getMyOrder = createAsyncThunk("getMyOrder", async ({ count, setTotalpage }: getMyOrderArgs) => {
  return await Apis.get(`orders?page=${count}&size=20&sort=createdAt,DESC`, {
    headers: {
      Authorization: `${localStorage?.getItem("Authorization") ?? ""}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      setTotalpage(res.data.pageInfo?.totalPages);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
});

export const filterMyOrder = createAsyncThunk("filterMyOrder", async ({ id }: FilterMyOrderArgs) => {
  return await Apis.get(`orders/${id}`, {
    headers: {
      Authorization: `${localStorage?.getItem("Authorization") ?? ""}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
});

export interface Content {
  createdAt: string;
  orderId: number;
  orderNumber: number;
  orderProducts: ProductDetail[];
  status: string;
}
interface MyOrderArgs {
  content: Content[];
  pageInfo: PageInfo;
}
interface FilterOrderArgs {
  createdAt: string;
  orderId: number;
  orderNumber: number;
  orderProducts: ProductDetail[];
  status: string;
}

interface OrderState {
  myorder: MyOrderArgs;
  filterorder: FilterOrderArgs;
  loading: boolean;
  error: string;
}

const initialState: OrderState = {
  myorder: {
    content: [],
    pageInfo: {
      page: 0,
      size: 0,
      totalElements: 0,
      totalPages: 0,
    },
  },
  filterorder: {
    createdAt: "",
    orderId: 0,
    orderNumber: 0,
    orderProducts: [],
    status: "",
  },
  loading: false,
  error: "",
};

const myOrderSlice = createSlice({
  name: "myorder",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getMyOrder.fulfilled, (state, action) => {
        state.myorder = action.payload;
        state.loading = true;
        state.error = "";
      })
      .addCase(filterMyOrder.fulfilled, (state, action) => {
        state.filterorder = action.payload;
        state.loading = true;
        state.error = "";
      }),
});

export default myOrderSlice.reducer;
