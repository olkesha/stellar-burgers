import { describe, it, expect, jest } from '@jest/globals';
import { fetchIngredients, ingredientsReducer } from './ingredientSlice';
import { configureStore } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../../utils/burger-api';

jest.mock('../../../utils/burger-api'); // Мокаем API

describe('[thunk] тест асинхронного экшена', () => {

  let store: any;

  const expectedResult = {
    data: [
      {
        calories: 420,
        carbohydrates: 53,
        fat: 24,
        image: "https://code.s3.yandex.net/react/code/bun-02.png",
        image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
        image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        name: "Краторная булка N-200i",
        price: 1255,
        proteins: 80,
        type: "bun",
        _id: "643d69a5c3f7b9001cfa093c"
      },
      {
        calories: 4242,
        carbohydrates: 242,
        fat: 142,
        image: "https://code.s3.yandex.net/react/code/meat-01.png",
        image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
        image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
        name: "Биокотлета из марсианской Магнолии",
        price: 424,
        proteins: 420,
        type: "main",
        _id: "643d69a5c3f7b9001cfa0941"
      }
    ],
    loading: false
  };

  beforeEach(() => {
    store = configureStore({
      reducer: ingredientsReducer,
    });

    (getIngredientsApi as jest.Mock).mockReturnValue(expectedResult); // Настройка мока
  });
  
  it('[fetchIngredients] должен устанавливать loading в true при загрузке', async () => {
    const loadingState = { data: [], loading: true };
    
    store.dispatch(fetchIngredients.pending(''));
    const state = store.getState();
    
    expect(state).toEqual(loadingState);
  });

  it('[fetchIngredients] должен устанавливать data в пустой массив и loading в true при ошибке', async () => {
    await store.dispatch(fetchIngredients.rejected(new Error(), 'Ошибка загрузки'));
    
    const state = store.getState();
    
    expect(state.data).toEqual([]);
    expect(state.loading).toBeTruthy();
  });
  
  it('[fetchIngredients] должен возвращать данные об ингредиентах с сервера', async () => {
    await store.dispatch(fetchIngredients.fulfilled(expectedResult.data, ''));

    const state = store.getState();

    expect(state.data).toEqual(expectedResult.data);
    expect(state.loading).toBeFalsy();
  });

})