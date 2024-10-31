import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TIngredient } from "@utils-types";
import { v4 as uuidv4 } from 'uuid';

type TBurgerState = {
  constructorItems: {
    bun: TIngredient | null,
    ingredients: TIngredient[]
  }
}

const initialState: TBurgerState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
}

const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload; // заменяем булку
        } else {
          state.constructorItems.ingredients.push(action.payload); // добавляем ингредиент
        }
      },
      prepare: (ingredient: TIngredient) => {
        const uniqueKey = uuidv4();
        return { payload: { ...ingredient, id: uniqueKey } };
      }
    },
    updateIngredients(state, action: PayloadAction<TIngredient[]>) {
      state.constructorItems.ingredients = action.payload;
    },
    clearIngredients(state) {
      state.constructorItems = {
        bun: null,
        ingredients: []
      }
    }
  },
  selectors: {
    getСonstructorItems: state => state.constructorItems,
  }
})

export const burgerSliceInitialState = initialState;
export const { addIngredient, updateIngredients, clearIngredients } = burgerSlice.actions;
export const { getСonstructorItems } = burgerSlice.selectors;
export const burgerReducer = burgerSlice.reducer;