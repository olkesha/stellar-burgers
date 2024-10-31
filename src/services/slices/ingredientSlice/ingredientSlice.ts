import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../../utils/burger-api';
import { TIngredient } from '@utils-types';

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => {
    return getIngredientsApi();
  }
)

type TIngredientsState = {
  data: TIngredient[]
  loading: boolean;
}

const initialState: TIngredientsState = {
  data: [],
  loading: false,
}

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.rejected, (state) => {
        state.data = [];
        state.loading = true;
      })
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
  },
  selectors: {
    getIngredientsData: (state) => state.data,
    getIngredientsLoading: (state) => state.loading,
  }
})

export const ingredientSliceInitialState = initialState;
export const { getIngredientsData, getIngredientsLoading } = ingredientsSlice.selectors;
export const ingredientsReducer = ingredientsSlice.reducer;