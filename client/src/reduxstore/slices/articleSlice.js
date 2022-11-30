import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Apis from "../../apis/apis";
import { Toast } from "../../components/Alert";

let jwtToken = localStorage.getItem("Authorization");

export const getArticleDetail = createAsyncThunk(
  "products/detail",
  async (id) => {
    return Apis.get(`products/details/${id}`, {
      headers: {
        Authorization: `${jwtToken}`,
      },
    })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

export const postCart = createAsyncThunk(
  "carts",
  async ({ postData, navigate }) => {
    return Apis.post(`carts`, postData, {
      headers: {
        Authorization: `${jwtToken}`,
      },
    })
      .then((res) => {
        console.log(res);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

export const postLike = createAsyncThunk("postLike", async (id) => {
  return Apis.post(
    `/products/${id}/likes`,
    {},
    {
      headers: {
        Authorization: `${jwtToken}`,
      },
    }
  )
    .then((res) => {
      Toast("success", "상품에 좋아요를 추가하셨습니다!");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
});

export const deleteLike = createAsyncThunk("deleteLike", async (id) => {
  return Apis.delete(`/products/${id}/likes`, {
    headers: {
      Authorization: `${jwtToken}`,
    },
  })
    .then((res) => {
      Toast("success", "상품에 좋아요를 삭제하셨습니다!");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
});

export const mainData = createAsyncThunk("mainData", async () => {
  return Apis.get(`products/score`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
});

export const getShoppingCart = createAsyncThunk(
  //비동기처리를 도와주는애(자동으로 지원해줌)
  "getShoppingCart",
  async () => {
    return Apis.get(`carts`, {
      headers: {
        Authorization: `${jwtToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
); //action 객체, action실행함수 등등....

export const deleteShoppingCart = createAsyncThunk(
  "getShoppingCart",
  async (elId) => {
    return Apis.delete(`carts/${elId}`, {
      headers: {
        Authorization: `${jwtToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(`shopslice`, res.data);
        window.location.reload();
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

export const postPayment = createAsyncThunk(
  "getShoppingCart",
  async ({ checkList, navigate }) => {
    console.log(checkList);
    return Apis.post(
      `orders`,
      {
        orderProducts: checkList,
      },
      {
        headers: {
          Authorization: `${jwtToken}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        console.log(`shopslice`, res.data);
        navigate("/members/mypage/purchase");
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

export const reCountCartItem = createAsyncThunk(
  "getShoppingCart",
  async ({ productCartId, itemCount }) => {
    return Apis.patch(
      `carts/${productCartId}`,
      {
        productCartId: `${productCartId}`,
        count: `${itemCount}`,
      },
      {
        headers: {
          Authorization: `${jwtToken}`,
        },
      }
    )
      .then((res) => {
        window.location.reload();
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

export const getSearchResult = createAsyncThunk(
  "getSearchResult",
  async ({ searchWord, page }) => {
    return Apis.get(`/products/search?title=${searchWord}&page=${page}`)
      .then((res) => {
        console.log(`shopslice`, res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

export const countSearchResult = createAsyncThunk(
  "countSearchResult",
  async (searchWord) => {
    return Apis.get(`products/count?title=${searchWord}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

export const popularSearch = createAsyncThunk("popularSearch", async () => {
  return Apis.get(`search/rank`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
});

export const postArticle = createAsyncThunk(
  "postArticle",
  async ({ postArticleData, navigate }) => {
    const form = new FormData();
    form.append("sellerId", postArticleData.sellerId);
    form.append("title", postArticleData.title);
    form.append("price", postArticleData.price);
    form.append("content", postArticleData.content[0]);
    form.append("content", postArticleData.content[1]);
    form.append("img", postArticleData.img);
    form.append("main", postArticleData.main);
    form.append("sub", postArticleData.sub);
    form.append("optionList[0].color", postArticleData.optionList[0].color);
    form.append("optionList[0].stock", postArticleData.optionList[0].stock);
    form.append("optionList[1].color", postArticleData.optionList[1].color);
    form.append("optionList[1].stock", postArticleData.optionList[1].stock);
    return Apis.post(`products`, form, {
      headers: {
        Authorization: `${jwtToken}`,
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        console.log(res);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

const articleSlice = createSlice({
  name: "article",
  initialState: {
    article: [],
    detailArticle: [],
    mainArticle: [],
    shoppingCartInitial: [],
    searchResultInitial: [],
    countSearchResultInitial: [],
    postArticle: [],
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: {
    [getArticleDetail.fulfilled]: (state, action) => {
      state.detailArticle = action.payload;
      state.loading = true;
      state.error = "";
    },

    [postCart.fulfilled]: (state, action) => {
      state.article = action.payload;
      state.loading = true;
      state.error = "";
    },
    [mainData.fulfilled]: (state, action) => {
      state.mainArticle = action.payload;
      state.loading = true;
      state.error = "";
    },
    [getShoppingCart.fulfilled]: (state, action) => {
      state.shoppingCartInitial = action.payload?.productCarts;
      state.loading = true;
      state.error = "";
    },
    [getSearchResult.fulfilled]: (state, action) => {
      state.searchResultInitial = action.payload;
      state.loading = true;
      state.error = "";
    },
    [countSearchResult.fulfilled]: (state, action) => {
      state.countSearchResultInitial = action.payload.count;
      state.loading = true;
      state.error = "";
    },
    [popularSearch.fulfilled]: (state, action) => {
      state.popularSearchInitial = action.payload;
      state.loading = true;
      state.error = "";
    },
    [postArticle.fulfilled]: (state, action) => {
      state.postArticle = action.payload;
      state.loading = true;
      state.error = "";
    },
  },
});

export default articleSlice.reducer;
