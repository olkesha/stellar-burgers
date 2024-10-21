import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getOrderByNumberApi, orderBurgerApi } from "@api";
import { TOrder } from "@utils-types";

export const fetchGetOrder = createAsyncThunk(
  'order/fetchGetOrder',
  getOrderByNumberApi
)

export const fetchPostOrder = createAsyncThunk(
  'order/fetchPostOrder',
  orderBurgerApi
)

type TOrderState = {
  order: TOrder | null;
  loading: boolean;
  orderRequest: boolean;
  orderModalData: TOrder | null
}

const initialState: TOrderState = {
  order: null,
  loading: false,
  orderRequest: false,
  orderModalData: null
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrderModalData: (state) => {
      state.order = null;
      state.orderModalData = null;
      state.orderRequest = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGetOrder.fulfilled, (state, action) => {
        state.order = action.payload.orders[0];
        state.loading = false
      })
      .addCase(fetchPostOrder.pending, (state) => {
        state.loading = true;
        state.orderRequest = true;
      })
      .addCase(fetchPostOrder.fulfilled, (state, action) => {
        state.order = action.payload.order;
        state.loading = false;
        state.orderRequest = false;
        state.orderModalData = action.payload.order
      })
  },
  selectors: {
    getOrderData: state => state,
    getLoading: state => state.loading,
    getOrderRequest: state => state.orderRequest,
    getOrderModalData: state => state.order
  }
})

export const { clearOrderModalData } = orderSlice.actions;
export const { getLoading, getOrderData, getOrderRequest, getOrderModalData } = orderSlice.selectors;
export const orderReducer = orderSlice.reducer;