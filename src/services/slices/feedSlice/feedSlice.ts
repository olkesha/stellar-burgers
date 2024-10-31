import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '../../../utils/burger-api';
import { TOrder } from '@utils-types';

export const fetchFeeds = createAsyncThunk( // createAsyncThunk = action creator
  'feed/fetchFeeds',
  async () => {
    return getFeedsApi();
  }
)

type TOrderData = {
  orders: TOrder[],
  total: number,
  totalToday: number,
} 

type TFeedState = {
  feed: TOrderData;
  loading: boolean;
}

const initialState: TFeedState = {
  feed: {
    orders: [],
    total: 0,
    totalToday: 0,
  },
  loading: false,
}

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.rejected, (state) => {
        state.feed.orders = [];
        state.feed.total = 0;
        state.feed.totalToday = 0;
      })
      .addCase(fetchFeeds.pending, (state) => {
        state.feed.orders = [];
        state.feed.total = 0;
        state.feed.totalToday = 0;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.feed.orders = action.payload.orders;
        state.feed.total = action.payload.total;
        state.feed.totalToday = action.payload.totalToday;
      })
  },
  selectors: {
    getFeed: state => state.feed,
    getFeedOrders: (state) => state.feed.orders,
    getFeedTotal: (state) => state.feed.total,
    getFeedTotalToday: (state) => state.feed.totalToday,
    getStateLoading: (state) => state.loading,
  }
})

export const feedSliceInitialState = initialState;
export const { getFeed, getFeedOrders, getFeedTotal, getFeedTotalToday, getStateLoading } = feedSlice.selectors;
export const feedReducer = feedSlice.reducer;