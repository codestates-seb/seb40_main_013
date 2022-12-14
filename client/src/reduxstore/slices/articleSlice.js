import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Apis from "../../apis/apis";
import { Alert, Toast } from "../../components/Alert";
import Swal from "sweetalert2";

export const getArticleDetail = createAsyncThunk(
  "products/detail",
  async (id) => {
    return Apis.get(`products/details/${id}`, {
      headers: {
        Authorization: `${localStorage.getItem("Authorization")}`,
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
  async ({ postData, navigate, clickCheckFunction }) => {
    return Apis.post(`carts`, postData, {
      headers: {
        Authorization: `${localStorage.getItem("Authorization")}`,
      },
    })
      .then((res) => {
        Swal.fire({
          title: "장바구니에 추가되었습니다",
          text: "장바구니로 이동하시겠습니까??",
          icon: "success",
          showCancelButton: true,
          confirmButtonColor: "#002C6D",
          cancelButtonColor: "#FFAF51",
          showCancelButton: true,
          confirmButtonText: "장바구니로 이동",
          cancelButtonText: "계속 쇼핑하기",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/cart");
            clickCheckFunction()
          } else {
            window.location.reload();
          }
        });
        return res.data;
      })
      .catch((err) => {
        if (err.response.data.fieldErrors[0].reason === "널이어서는 안됩니다") {
          Alert("error", "옵션을 선택해주세요!");
          }
      });
  }
);

export const postLike = createAsyncThunk("postLike", async (id) => {
  return Apis.post(
    `/products/${id}/likes`,
    {},
    {
      headers: {
        Authorization: `${localStorage.getItem("Authorization")}`,
      },
    }
  )
    .then((res) => {
      Toast("success", "상품에 좋아요를 추가하셨습니다!");
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
});

export const deleteLike = createAsyncThunk("deleteLike", async (id) => {
  return Apis.delete(`/products/${id}/likes`, {
    headers: {
      Authorization: `${localStorage.getItem("Authorization")}`,
    },
  })
    .then((res) => {
      Toast("success", "상품에 좋아요를 삭제하셨습니다!");
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
});

export const articleLike = createAsyncThunk("postLike", async (id) => {
  return Apis.get(`/products/${id}/likes`, {
    headers: {
      Authorization: `${localStorage.getItem("Authorization")}`,
    },
  })
    .then((res) => {
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
        Authorization: `${localStorage.getItem("Authorization")}`,
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
        Authorization: `${localStorage.getItem("Authorization")}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
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
    return Apis.post(
      `orders`,
      {
        orderProducts: checkList,
      },
      {
        headers: {
          Authorization: `${localStorage.getItem("Authorization")}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
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
          Authorization: `${localStorage.getItem("Authorization")}`,
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
  async ({ storageWord, page, sortArgument, third }) => {
    return Apis.get(
      `/products/search?title=${storageWord}&page=${page}&sortType=${sortArgument}&order=${third}`
    )
      .then((res) => {
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

export const getSubCount = createAsyncThunk(
  "getCount",
  async ({ mainCateClick, subclick }) => {
    return Apis.get(`products/count?main=${mainCateClick}&sub=${subclick}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  });

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
    form.append("content", postArticleData.content[2]);
    form.append("img", postArticleData.img);
    form.append("main", postArticleData.main);
    form.append("sub", postArticleData.sub);
    form.append("optionList[0].color", postArticleData.optionList[0].color);
    form.append("optionList[0].stock", postArticleData.optionList[0].stock);
    form.append("optionList[1].color", postArticleData.optionList[1].color);
    form.append("optionList[1].stock", postArticleData.optionList[1].stock);
    return Apis.post(`products`, form, {
      headers: {
        Authorization: `${localStorage.getItem("Authorization")}`,
        "Content-Type": "multipart/form-data",
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

const articleSlice = createSlice({
  name: "article",
  initialState: {
    article: [],
    detailArticle: [],
    mainArticle: [],
    shoppingCartInitial: [],
    searchResultInitial: [],
    countSearchResultInitial: [],
    getSubCountInitial: [],
    postArticle: [],
    articleLike: [],
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => builder
    .addCase(getArticleDetail.fulfilled, (state, action) => {
      state.detailArticle = action.payload;
      state.loading = true;
      state.error = "";
    })
    .addCase(postCart.fulfilled, (state, action) => {
      state.article = action.payload;
      state.loading = true;
      state.error = "";
    })
    .addCase(postLike.fulfilled,(state, action) => {
      state.articleLike = action.payload;
      state.loading = true;
      state.error = "";
    })
    .addCase(deleteLike.fulfilled, (state, action) => {
      state.articleLike = action.payload;

      state.loading = true;
      state.error = "";
    })
    .addCase(mainData.fulfilled, (state, action) => {
      state.mainArticle = action.payload;
      state.detailArticle = [];
      state.loading = true;
      state.error = "";
    })
    .addCase(getShoppingCart.fulfilled, (state, action) => {
      state.shoppingCartInitial = action.payload?.productCarts;
      state.loading = true;
      state.error = "";
    })
    .addCase(getSearchResult.fulfilled, (state, action) => {
      state.searchResultInitial = action.payload.content;
      state.loading = true;
      state.error = "";
    })
    .addCase(countSearchResult.fulfilled, (state, action) => {
      state.countSearchResultInitial = action.payload.count;
      state.loading = true;
      state.error = "";
    })
    .addCase(getSubCount.fulfilled, (state, action) => {
      state.getSubCountInitial = action.payload.count;
      state.loading = true;
      state.error = "";
    })
    .addCase(popularSearch.fulfilled, (state, action) => {
      state.popularSearchInitial = action.payload;
      state.loading = true;
      state.error = "";
    })
    .addCase(postArticle.fulfilled, (state, action) => {
      state.postArticle = action.payload;
      state.loading = true;
      state.error = "";
    })
});

export default articleSlice.reducer;
