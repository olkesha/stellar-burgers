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

type TOrderState = {
  order: TOrder | null;
  loading: boolean
}

const initialState: TOrderState = {
  order: null,
  loading: false
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGetOrder.fulfilled, (state, action) => {
        state.order = action.payload;
        state.loading = false
      })
  },
  selectors: {
    getOrderData: state => state
  }
})

export const { getOrderData } = orderSlice.selectors;
export const orderReducer = orderSlice.reducer;