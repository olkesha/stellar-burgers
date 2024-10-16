import { ChangeEvent, FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { fetchLoginUser, isAuthenticatedSelector } from '../../services/slices/userSlice';
import { Navigate } from 'react-router-dom';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const dispatch = useDispatch();

  if (isAuthenticated) {
    return (
        <Navigate
          to={'/'}
        />
      );
  }

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    dispatch(fetchLoginUser({ email, password }))
  };

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
