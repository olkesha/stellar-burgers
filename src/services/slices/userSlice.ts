import { TRegisterData, getUserApi, loginUserApi, logoutApi } from "@api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TUser } from "@utils-types";
import { deleteCookie, getCookie, setCookie } from "../../utils/cookie";
import { get } from "http";

export const fetchLoginUser = createAsyncThunk(
  'user/fetchLoginUser',
  async ({ email, password }: Omit<TRegisterData, 'name'>) => {
    const data = await loginUserApi({ email, password })
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data.user;
  }
)

// export const checkUserAuth = createAsyncThunk(
//   'user/checkUserAuth',
//   (_, { dispatch }) => {
//     if (getCookie('accessToken')) {
//       getUserApi().finally(() => {
//         dispatch(authChecked()); 
//       });
//     } else {
//       dispatch(authChecked());
//     }
//   }
// ); 

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

type TUserState = {
  isAuthChecked: boolean,
  isAuthenticated: boolean;
  data: TUser |null,
  loginUserError: null,
  loginUserRequest: boolean,
}

const initialState: TUserState = {
  isAuthChecked: false,
  isAuthenticated: false,
  data: null,
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
      state.data = null;
    },
    registerUser: (state, action) => {
      state.data = action.payload;
    }
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
        state.data = action.payload;
        state.loginUserRequest = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
  },
  selectors: {
    isAuthenticatedSelector: state => state.isAuthenticated,
    isAuthCheckedSelector: state => state.isAuthChecked,
    getUserData: state => state.data
  }
})

export const { isAuthenticatedSelector, isAuthCheckedSelector, getUserData } = userSlice.selectors;
export const { authChecked, userLogout, registerUser } = userSlice.actions;
export const userReducer = userSlice.reducer;