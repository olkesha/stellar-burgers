import { describe, it, expect, jest } from '@jest/globals';
import { fetchOrders, ordersReducer } from './ordersSlice';
import { configureStore } from '@reduxjs/toolkit';
import { getOrdersApi } from '../../../utils/burger-api';

jest.mock('../../../utils/burger-api')

describe('[thunk] тест асинхронного экшена', () => {

  let store: any;

  const expectedResult = [
    {
      createdAt: "2024-10-21T19:45:50.576Z",
      ingredients: [
        "643d69a5c3f7b9001cfa093d", 
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa093f", 
        "643d69a5c3f7b9001cfa0940", 
        "643d69a5c3f7b9001cfa0941", 
        "643d69a5c3f7b9001cfa093d"
      ],
      name: "Флюоресцентный люминесцентный бессмертный био-марсианский метеоритный бургер",
      number: 57121,
      owner: "67149453d829be001c777266",
      status: "done",
      updatedAt: "2024-10-21T19:45:51.381Z",
      _id: "6716af6ed829be001c777891"
    },
    {
      createdAt: "2024-10-21T16:38:23.417Z",
      ingredients: [
        "643d69a5c3f7b9001cfa093d", 
        "643d69a5c3f7b9001cfa0940",
        "643d69a5c3f7b9001cfa093d"
      ],
      name: "Флюоресцентный метеоритный бургер",
      number: 57107,
      owner: "67149453d829be001c777266",
      status: "done",
      updatedAt: "2024-10-21T16:38:24.253Z",
      _id: "6716837fd829be001c7777f1"
    }
  ]

  beforeEach(() => {
    store = configureStore({
      reducer: ordersReducer
    });

    (getOrdersApi as jest.Mock).mockReturnValue(expectedResult);
  })

  it('[fetchOrders] должен возвращать массив заказов пользователя', async () => {
    await store.dispatch(fetchOrders())

    const state = store.getState();

    expect(state.orders).toEqual(expectedResult)
  })

  it('[fetchOrders] должен возвращать пустой массив при закгрузке', async () => {
    await store.dispatch(fetchOrders.pending(''))

    const state = store.getState();

    expect(state.orders).toEqual([])
  })

})