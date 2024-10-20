import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getOrderByNumberApi, orderBurgerApi } from "@api";
import { TOrder } from "@utils-types";

export const fetchGetOrder = createAsyncThunk(
  'order/fetchGetOrder',
  async (number: number) => {
    const response = await getOrderByNumberApi(number);
    return response.orders[0]
  }
)

export const fetchPostOrder = createAsyncThunk(
  'order/fetchPostOrder',
  async (ingredients: string[]) => {
    const response = await orderBurgerApi(ingredients);
    return response.order
  }
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
      state.orderRequest = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGetOrder.fulfilled, (state, action) => {
        state.order = action.payload;
        state.loading = false
      })
      .addCase(fetchPostOrder.fulfilled, (state, action) => {
        state.order = action.payload;
        state.loading = false;
        state.orderRequest = true;
        state.orderModalData = action.payload
      })
  },
  selectors: {
    getOrderData: state => state,
    getOrderRequest: state => state.orderRequest,
    getOrderModalData: state => state.order
  }
})

export const { clearOrderModalData } = orderSlice.actions;
export const { getOrderData, getOrderRequest, getOrderModalData } = orderSlice.selectors;
export const orderReducer = orderSlice.reducer;