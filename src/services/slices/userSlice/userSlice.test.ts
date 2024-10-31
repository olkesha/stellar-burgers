import { describe, it, expect, jest } from '@jest/globals';
import { userReducer, fetchLoginUser, fetchRegisterUser, checkUserAuth, fetchLogoutUser, fetchUpdateUserData, authChecked, userLogout } from './userSlice';
import { configureStore } from '@reduxjs/toolkit';
import { loginUserApi, registerUserApi, getUserApi, logoutApi, updateUserApi } from '../../../utils/burger-api';

jest.mock('../../../utils/burger-api'); // Мокаем API

const initialUserState = {
  isAuthChecked: true,
  isAuthenticated: true,
  user: {
    email: 'loginuser@mail.com',
    name: 'LoginUser'
  },
  loginUserError: null,
  loginUserRequest: false,
}

describe('[reducer] тест редюсеров userReducer', () => {

  it('[userLogout] должен удалять данные о пользователе и выходить из личного кабинета', () => {
    const newState = userReducer(initialUserState, userLogout());

    expect(newState).toEqual({
      isAuthChecked: false,
      isAuthenticated: false,
      user: null,
      loginUserError: null,
      loginUserRequest: false,
    })
  })

  it('[authChecked] должен проверять авторизован ли пользователь', () => {
    const newState = userReducer(initialUserState, authChecked());

    expect(newState.isAuthChecked).toBeTruthy()
  })

})


describe('[thunk] тест асинхронных экшенов', () => {
  let store: any;

  const expectedLoginResult = {
    isAuthChecked: true,
    isAuthenticated: true,
    user: {
      email: "loginuser@mail.com",
      name: "LoginUser"
    },
    loginUserError: null,
    loginUserRequest: false,
  };

  const expectedRegisterResult = {
    isAuthChecked: true,
    isAuthenticated: true,
    user: { 
      email: "newUser@mail.com", 
      name: "newUser" 
    },
    loginUserError: null,
    loginUserRequest: false,
  };

  const loginData = { email: "loginuser@mail.com", password: "password" }

  beforeEach(() => {
    store = configureStore({
      reducer: userReducer,
    });
  });

  it("[fetchLoginUser] должен возращать данные зарегистрированного пользователя", async () => {
    await store.dispatch(fetchLoginUser.fulfilled(expectedLoginResult.user, '', loginData));
    const state = store.getState();

    expect(state.user).toEqual(expectedLoginResult.user);
    expect(state.isAuthenticated).toBeTruthy();
  });

  it("[fetchLoginUser] запрос на получение данных пользователя", async () => {
    await store.dispatch(fetchLoginUser.pending('', loginData));
    const state = store.getState();
    
    expect(state.loginUserRequest).toBeTruthy();
    expect(state.loginUserError).toBeNull();
  });

  it("[fetchLoginUser] ставит isAuthChecked в false т.к. пользователь не зарегистрирован", async () => {
    await store.dispatch(fetchLoginUser.rejected(new Error(), 'Ошибка загрузки', loginData));
    const state = store.getState();

    expect(state.loginUserRequest).toBeFalsy();
    expect(state.isAuthChecked).toBeFalsy();
  });


  it("[fetchRegisterUser] возращает пользователя после регистрации", async () => {
    await store.dispatch(fetchRegisterUser.fulfilled({ email: "newUser@mail.com", name: "newUser" }, '', { email: "newUser@mail.com", password: "password", name: "newUser" }));
    const state = store.getState();

    expect(state.user).toEqual(expectedRegisterResult.user);
    expect(state.isAuthenticated).toBeFalsy();
    expect(state.isAuthChecked).toBeTruthy();
  });


  it('[fetchUpdateUserData] возвращает пользователя с обновленными данными', async () => {
    await store.dispatch(fetchUpdateUserData.fulfilled({success: true, user: { email: "updateUser@mail.com", name: "updateUser" }}, '', { email: "updateUser@mail.com", password: "12345678", name: "updateUser" } ));
    const state = store.getState();

    expect(state.user).toEqual({ email: "updateUser@mail.com", name: "updateUser" });
  })


  it('[fetchLogoutUser] выходит и удаляет данные пользователя', async () => {
    await store.dispatch(fetchLogoutUser.fulfilled( void{}, '', void{} ));
    const state = store.getState();

    expect(state.user).toBeNull();
  })


  it('[checkUserAuth] ставит isAuthChecked в false при загрузке проверки авторизованности ', async () => {
    await store.dispatch(checkUserAuth.pending( '', void{} ));
    const state = store.getState();

    expect(state.isAuthChecked).toBeFalsy();
    expect(state.loginUserRequest).toBeTruthy();
  })

  it('[checkUserAuth] ставит isAuthChecked в false и возвращает пользователя', async () => {
    await store.dispatch(checkUserAuth.fulfilled( {success: true, user: { email: "loginuser@mail.com", name: "LoginUser" }}, '', void{} ));
    const state = store.getState();

    expect(state.user).toEqual(expectedLoginResult.user);
    expect(state.isAuthChecked).toBeTruthy();
    expect(state.loginUserRequest).toBeFalsy();
  })

});