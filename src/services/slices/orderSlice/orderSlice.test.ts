import { describe, it, expect, jest } from '@jest/globals';
import { orderReducer, fetchGetOrder, fetchPostOrder, clearOrderModalData } from './orderSlice';
import { configureStore } from '@reduxjs/toolkit';
import { getOrderByNumberApi, orderBurgerApi } from '../../../utils/burger-api';

jest.mock('../../../utils/burger-api'); // Мокаем API

describe('[reducer] тест редюсера orderReducer', () => {
  
  const initialOrderState = {
    order: {
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
    loading: false,
    orderRequest: false,
    orderModalData: {
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
    }
  }

  it('[clearOrderModalData] должен удалить данные для модального окна заказа', () => {
    const newState = orderReducer(initialOrderState, clearOrderModalData())

    expect(newState).toEqual({
      order: null,
      loading: false,
      orderRequest: false,
      orderModalData: null
    })
  })

})


describe('[thunk] тест асинхронных экшенов', () => {

  let store: any;

  const expectedResult = {
    order: {
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
    loading: false,
    orderRequest: false,
    orderModalData: {
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
    }
  }

  beforeEach(() => {
    store = configureStore({
      reducer: orderReducer
    });

    (getOrderByNumberApi as jest.Mock).mockReturnValue({ orders: [expectedResult.order] });
    (orderBurgerApi as jest.Mock).mockReturnValue(expectedResult);
  })
  
  it('[fetchGetOrder] должен вернуть loading со значением true при загрузке', async () => {
    await store.dispatch(fetchGetOrder.pending('', 57121));

    const state = store.getState();

    expect(state.loading).toBeTruthy();
  })
  
  it('[fetchGetOrder] должен вернуть данные заказа по его id', async () => {
    const testOrder = {
      success: true,
      orders: [
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
        }
      ]
    }

    await store.dispatch(fetchGetOrder.fulfilled(testOrder, '', 57121));

    const state = store.getState();

    expect(state.order).toEqual(expectedResult.order);
    expect(state.loading).toBeFalsy();
  })
  
  it('[fetchPostOrder] должен вернуть loading и orderRequest со значениями true при загрузке', async () => {
    await store.dispatch(fetchPostOrder.pending('', expectedResult.order.ingredients));

    const state = store.getState();

    expect(state.loading).toBeTruthy();
    expect(state.orderRequest).toBeTruthy();
  })
  
  it('[fetchPostOrder] должен отправить данные заказа', async () => {
    const testNewOrder = {
      success: true,
      order: {
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
      name: 'Флюоресцентный люминесцентный бессмертный био-марсианский метеоритный бургер'
    }

    await store.dispatch(fetchPostOrder.fulfilled(testNewOrder, '', expectedResult.order.ingredients));

    const state = store.getState();

    expect(state.orderModalData).toEqual(expectedResult.orderModalData);
    expect(state.order).toEqual(expectedResult.order);
    expect(state.loading).toBeFalsy();
    expect(state.orderRequest).toBeFalsy();
  })

})