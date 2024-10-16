import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '../../utils/burger-api';
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
  error?: string | null
}

const initialState: TFeedState = {
  feed: {
    orders: [],
    total: 0,
    totalToday: 0,
  },
  loading: false,
  error: ''
}

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
    getStateError: (state) => state.error
  }
})

export const { getFeed, getFeedOrders, getFeedTotal, getFeedTotalToday, getStateLoading, getStateError } = feedSlice.selectors;
export const feedReducer = feedSlice.reducer;