import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import { feedReducer } from './slices/feedSlice/feedSlice'
import { ingredientsReducer } from './slices/ingredientSlice/ingredientSlice'
import { ordersReducer } from './slices/ordersSlice/ordersSlice'
import { userReducer } from './slices/userSlice/userSlice'
import { orderReducer } from './slices/orderSlice/orderSlice';
import { burgerReducer } from './slices/burgerSlice/burgerSlice';

export const rootReducer = combineReducers({
  feed: feedReducer,
  ingredients: ingredientsReducer,
  user: userReducer,
  order: orderReducer,
  orders: ordersReducer,
  burger: burgerReducer
})

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
