import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Preloader, ProfileMenuUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { fetchLogoutUser, isAuthenticatedSelector } from '../../services/slices/userSlice';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch()
  const navigate = useNavigate()

  /** диспатчить логаут */
  const handleLogout = () => {
    dispatch(fetchLogoutUser())
    navigate('/login', { replace: true })
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
