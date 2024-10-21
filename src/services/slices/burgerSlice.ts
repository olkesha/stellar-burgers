import { orderBurgerApi } from "@api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TIngredient, TOrder } from "@utils-types";

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
    addIngredient(state, action: PayloadAction<TIngredient>) {
      if (action.payload.type === 'bun') {
        state.constructorItems.bun = action.payload; // заменяем булку
      } else {
        state.constructorItems.ingredients.push(action.payload); // добавляем ингредиент
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

export const { addIngredient, updateIngredients, clearIngredients } = burgerSlice.actions;
export const { getСonstructorItems } = burgerSlice.selectors;
export const burgerReducer = burgerSlice.reducer;