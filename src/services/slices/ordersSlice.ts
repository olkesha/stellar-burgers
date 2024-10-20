import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getOrdersApi } from '../../utils/burger-api';
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
  request: boolean,
}

const initialState: TOrderState = {
  orders: [],
  request: false,
}

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrderRequest: (state, action) => {
      state.request = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
    })
  },
  selectors: {
    getOrders: state => state.orders,
    selectOrdersRequest: state => state.request
  }
})

export const { setOrderRequest } = ordersSlice.actions;
export const { getOrders, selectOrdersRequest } = ordersSlice.selectors;
export const ordersReducer = ordersSlice.reducer;