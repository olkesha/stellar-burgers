import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';
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
  error?: string | null
}

const initialState: TIngredientsState = {
  data: [],
  loading: false,
  error: ''
}

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.data = action.payload;
      })
  },
  selectors: {
    getIngredientsData: (state) => state.data,
    getIngredientsLoading: (state) => state.loading,
    getIngredientsError: (state) => state.error
  }
})

export const { getIngredientsData, getIngredientsLoading, getIngredientsError } = ingredientsSlice.selectors;
export const ingredientsReducer = ingredientsSlice.reducer;