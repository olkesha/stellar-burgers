import { describe, it, expect, jest } from '@jest/globals';
import { feedReducer, fetchFeeds } from './feedSlice';
import { configureStore } from '@reduxjs/toolkit';
import { getFeedsApi } from '../../../utils/burger-api';

jest.mock('../../../utils/burger-api'); // Мокаем API

describe('[thunk] тест асинхронного экшена fetchFeeds', () => {

  let store: any;

  const expectedResult = {
    feed: {
      orders: [
        {
          createdAt: "2024-10-29T11:41:45.430Z",
          ingredients: ["643d69a5c3f7b9001cfa093d", "643d69a5c3f7b9001cfa093e", "643d69a5c3f7b9001cfa093d"],
          name: "Флюоресцентный люминесцентный бургер",
          number: 57972,
          owner: "67209e38d829be001c7799a8",
          status: "done",
          updatedAt: "2024-10-29T11:41:46.399Z",
          _id: "6720c9f9d829be001c779a58"
        }
      ],
      total: 100,
      totalToday: 10
    },
    loading: false
  };

  beforeEach(() => {
    store = configureStore({
      reducer: feedReducer,
    });
  
    (getFeedsApi as jest.Mock).mockReturnValue(expectedResult);
  })
  
  it('[fetchFeeds] должен возвращать пустой массив и отсутствие заказов при загрузке', async () => {
    await store.dispatch(fetchFeeds.pending(''));
    
    const state = store.getState();
    
    expect(state.feed.orders).toEqual([])
    expect(state.feed.total).toBe(0)
    expect(state.feed.totalToday).toBe(0)
  })

  it('[fetchFeeds] должен возвращать пустой массив и отсутствие заказов при ошибке', async () => {
    await store.dispatch(fetchFeeds.rejected(new Error(), 'Ошибка загрузки'));
    
    const state = store.getState();
    
    expect(state.feed.orders).toEqual([])
    expect(state.feed.total).toBe(0)
    expect(state.feed.totalToday).toBe(0)
  })
  
  it('[fetchFeeds] должен возвращать данные всех заказов с сервера', async () => {
    const testFeeds = {
      success: true,
      orders: [
        {
          createdAt: "2024-10-29T11:41:45.430Z",
          ingredients: ["643d69a5c3f7b9001cfa093d", "643d69a5c3f7b9001cfa093e", "643d69a5c3f7b9001cfa093d"],
          name: "Флюоресцентный люминесцентный бургер",
          number: 57972,
          owner: "67209e38d829be001c7799a8",
          status: "done",
          updatedAt: "2024-10-29T11:41:46.399Z",
          _id: "6720c9f9d829be001c779a58"
        }
      ],
      total: 100,
      totalToday: 10
    }

    await store.dispatch(fetchFeeds.fulfilled(testFeeds, ''));

    const state = store.getState()
    
    expect(state.feed.orders).toEqual(expectedResult.feed.orders);
    expect(state.feed.total).toBe(expectedResult.feed.total);
    expect(state.feed.totalToday).toBe(expectedResult.feed.totalToday);
  })

})