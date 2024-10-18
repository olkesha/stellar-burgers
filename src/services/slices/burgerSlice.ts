import { orderBurgerApi } from "@api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TIngredient, TOrder } from "@utils-types";

export const fetchCreateOrder = createAsyncThunk(
  'burger/fetchCreateOrder',
  async (ingredients: string[]) => {
    const response = await orderBurgerApi(ingredients);
    return response.order
  }
)

type TBurgerState = {
  constructorItems: {
    bun: TIngredient | null,
    ingredients: TIngredient[]
  },
  request: boolean,
  modalData: TOrder | null
}

const initialState: TBurgerState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  request: false,
  modalData: null
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
    }
  },
  selectors: {
    getСonstructorItems: state => state.constructorItems,
    getRequest: state => state.request,
    getModalData: state => state.modalData
  }
})

export const { addIngredient, updateIngredients } = burgerSlice.actions;
export const { getСonstructorItems, getRequest, getModalData } = burgerSlice.selectors;
export const burgerReducer = burgerSlice.reducer;