import { describe, it, expect, jest } from '@jest/globals';
import { burgerReducer, addIngredient, updateIngredients, clearIngredients } from './burgerSlice';
import { v4 as uuidv4 } from 'uuid';

// мокаем модуль v4, который генерирует уникальный id
jest.mock('uuid', () => ({
  v4: jest.fn(),
}));


describe('[reducer] тест редюсеров burgerSlice', () => {

  const initialBurgerState = {
    constructorItems: {
      bun: null,
      ingredients: [
        {  
          calories: 643,
          carbohydrates: 85,
          fat: 26,
          image: "https://code.s3.yandex.net/react/code/meat-03.png",
          image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
          image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
          name: "Филе Люминесцентного тетраодонтимформа",
          price: 988,
          proteins: 44,
          type: "main",
          _id: "643d69a5c3f7b9001cfa093e"
        }
      ]
    }
  }

  
  it('[addIngredient] должен добавить булку в конструктор бургера с уникальным id', () => {
    const bun = {  
      calories: 643,
      carbohydrates: 85,
      fat: 26,
      image: "https://code.s3.yandex.net/react/code/bun-01.png",
      image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
      image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
      name: "Флюоресцентная булка R2-D3",
      price: 988,
      proteins: 44,
      type: "bun",
      _id: "643d69a5c3f7b9001cfa093d"
    };

    const mockId = 'test-uuid';
    (uuidv4 as jest.Mock).mockImplementation(() => mockId);

    const newBurgerState = burgerReducer(initialBurgerState, addIngredient(bun));

    expect(newBurgerState.constructorItems.bun).toEqual({
      ...bun,
      id: mockId
    })
  })


  it('[addIngredient] должен добавить ингредиент в конструктор бургера с уникальным id', () => {
    const ingredient = {  
      calories: 643,
      carbohydrates: 85,
      fat: 26,
      image: "https://code.s3.yandex.net/react/code/meat-03.png",
      image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
      image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
      name: "Филе Люминесцентного тетраодонтимформа",
      price: 988,
      proteins: 44,
      type: "main",
      _id: "643d69a5c3f7b9001cfa093e"
    };

    const mockId = 'test-uuid';
    (uuidv4 as jest.Mock).mockImplementation(() => mockId);
    
    const newBurgerState = burgerReducer(initialBurgerState, addIngredient(ingredient))

    expect(newBurgerState.constructorItems.ingredients).toEqual([
      ...initialBurgerState.constructorItems.ingredients,
      {
        ...ingredient,
        id: mockId
      }
    ]);
  })


  it('[updateIngredients] удалить ингредиент из бургера и обновить массив', () => {
    const removeItemState = initialBurgerState.constructorItems.ingredients.filter(
      (_, index) => index !== 0
    );

    const newBurgerState = burgerReducer(initialBurgerState, updateIngredients(removeItemState))

    expect(newBurgerState.constructorItems.ingredients).toEqual([])
  })


  it('[clearIngredients] должен очистить все ингредиенты бургера', () => {
    const newBurgerState = burgerReducer(initialBurgerState, clearIngredients());

    expect(newBurgerState).toEqual({
      constructorItems: {
        bun: null,
        ingredients: []
      },
    })
  })

})