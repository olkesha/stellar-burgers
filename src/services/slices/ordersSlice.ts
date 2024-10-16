import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getOrdersApi } from '../../utils/burger-api';
import { TOrder } from '@utils-types';

const fetchFeeds = createAsyncThunk(
  'feed/fetchOrders',
  async () => {
    const data = await getOrdersApi();
    console.log(data);
    
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
  selectors: {
    getOrders: state => state.orders,
    selectOrdersRequest: state => state.request
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
  }
})

export const { setOrderRequest } = ordersSlice.actions;
export const { getOrders, selectOrdersRequest } = ordersSlice.selectors;
export const ordersReducer = ordersSlice.reducer;