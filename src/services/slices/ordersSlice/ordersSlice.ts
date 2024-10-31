import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getOrdersApi } from '../../../utils/burger-api';
import { TOrder } from '@utils-types';

// для авторизованного пользака
export const fetchOrders = createAsyncThunk(
  'feed/fetchOrders',
  async () => {
    const data = await getOrdersApi();
    return data;
  }
)

export type TOrderState = {
  orders: TOrder[],
}

const initialState: TOrderState = {
  orders: [],
}

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.orders = [];
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
  },
  selectors: {
    getOrders: state => state.orders,
  }
})

export const ordersSliceInitialState = initialState;
export const { getOrders } = ordersSlice.selectors;
export const ordersReducer = ordersSlice.reducer;