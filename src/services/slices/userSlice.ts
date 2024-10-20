import { TRegisterData, getUserApi, loginUserApi, logoutApi, registerUserApi, updateUserApi } from "@api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TUser } from "@utils-types";
import { deleteCookie, getCookie, setCookie } from "../../utils/cookie";

// вход
export const fetchLoginUser = createAsyncThunk(
  'user/fetchLoginUser',
  async ({ email, password }: Omit<TRegisterData, 'name'>) => {
    const data = await loginUserApi({ email, password })
      if (!data?.success) {
        throw new Error('Ошибка входа'); 
      }
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data.user;
  }
)

// регистрация
export const fetchRegisterUser = createAsyncThunk(
  'user/fetchRegisterUser',
  async (data: TRegisterData) => {
    const response = await registerUserApi(data);
    if (!response?.success) {
        throw new Error('Ошибка регистрации'); 
      }
      setCookie('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      return response.user;
  }
)

// проверка авторизован ли
export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      getUserApi().finally(() => {
        dispatch(authChecked()); 
      });
    } else {
      dispatch(authChecked());
    }
  }
); 

// выход
export const fetchLogoutUser = createAsyncThunk(
  'user/fetchLogoutUser',
  (_, { dispatch }) => {
    logoutApi()
      .then(() => {
        localStorage.clear(); // очищаем refreshToken
        deleteCookie('accessToken'); // очищаем accessToken
        dispatch(userLogout()); // удаляем пользователя из хранилища
      })
      .catch(() => {
        console.log('Ошибка выполнения выхода');
      });
  }
);


// обновление данных
export const fetchUpdateUserData = createAsyncThunk(
  'user/fetchUpdateUserData',
  async (data: TRegisterData) => {
    const response = await updateUserApi(data);
    return response;
  }
)

type TUserState = {
  isAuthChecked: boolean,
  isAuthenticated: boolean;
  user: TUser | null
  loginUserError: string | null,
  loginUserRequest: boolean,
}

const initialState: TUserState = {
  isAuthChecked: false,
  isAuthenticated: false,
  user: null,
  loginUserError: null,
  loginUserRequest: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    },
    userLogout: (state) => {
      state.user = null;
      state.isAuthChecked = false;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoginUser.pending, (state) => {
        state.loginUserRequest = true;
        state.loginUserError = null;
      })
      .addCase(fetchLoginUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.isAuthChecked = true;
      })
      .addCase(fetchLoginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loginUserRequest = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(fetchRegisterUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchUpdateUserData.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(fetchLogoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthChecked = false;
        state.isAuthenticated = false;
      })
  },
  selectors: {
    isAuthenticatedSelector: state => state.isAuthenticated,
    isAuthCheckedSelector: state => state.isAuthChecked,
    getUserData: state => state.user
  }
})

export const { isAuthenticatedSelector, isAuthCheckedSelector, getUserData } = userSlice.selectors;
export const { authChecked, userLogout } = userSlice.actions;
export const userReducer = userSlice.reducer;