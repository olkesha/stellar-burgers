import { Navigate, useLocation } from "react-router-dom";
import { authChecked, getUserData, isAuthCheckedSelector } from "../../services/slices/userSlice";
import { useDispatch, useSelector } from "../../services/store";
import { Preloader } from "../ui/preloader";
import { useEffect } from "react";

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({onlyUnAuth, children}: ProtectedRouteProps) => {
  const location = useLocation();
  const isAuthChecked = useSelector(isAuthCheckedSelector);
  const user = useSelector(getUserData);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authChecked())
  }, [dispatch])

  if (!isAuthChecked) { // пока идёт чекаут пользователя, показываем прелоадер
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
}