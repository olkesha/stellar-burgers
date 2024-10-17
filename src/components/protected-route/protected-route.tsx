import { Navigate, useLocation } from "react-router-dom";
import { authChecked, getUserData, isAuthCheckedSelector } from "../../services/slices/userSlice";
import { useDispatch, useSelector } from "../../services/store";
import { Preloader } from "../ui/preloader";
import { useEffect } from "react";

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({onlyUnAuth = false, children}: ProtectedRouteProps) => {
  const location = useLocation();
  const isAuthChecked = useSelector(isAuthCheckedSelector);
  const user = useSelector(getUserData);
  const dispatch = useDispatch()

  const from = location.state?.from || { pathname: '/' };

  useEffect(() => {
    dispatch(authChecked())
  })

  if (!isAuthChecked) { // пока идёт чекаут пользователя, показываем прелоадер
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) { // если пользователь на странице авторизации и данных в хранилище нет, то делаем редирект
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) { // если пользователь на странице авторизации и данные есть в хранилище
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to="/" state={from} />;
  }

  return children;
}