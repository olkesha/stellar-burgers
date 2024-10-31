import { describe, it, expect, jest } from '@jest/globals';
import { store, rootReducer } from './store';
import { feedSliceInitialState } from './slices/feedSlice/feedSlice';
import { ingredientSliceInitialState } from './slices/ingredientSlice/ingredientSlice';
import { userSliceInitialState } from './slices/userSlice/userSlice';
import { orderSliceInitialState } from './slices/orderSlice/orderSlice';
import { ordersSliceInitialState } from './slices/ordersSlice/ordersSlice';
import { burgerSliceInitialState } from './slices/burgerSlice/burgerSlice';

describe('[store] проверка корневого редюсера', () => {
  const initialState = {
    feed: feedSliceInitialState,
    ingredients: ingredientSliceInitialState,
    user: userSliceInitialState,
    order: orderSliceInitialState,
    orders: ordersSliceInitialState,
    burger: burgerSliceInitialState
  }

  test('проверка initialState', () => {
    expect(store.getState()).toEqual(initialState)
  })

  test('проверка rootReducer', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' })
    expect(state).toEqual(initialState)
  })
})