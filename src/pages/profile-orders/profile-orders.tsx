import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchOrders, getOrders } from '../../services/slices/ordersSlice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора -> DONE */
  const orders: TOrder[] = useSelector(getOrders);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchOrders())
  }, [dispatch])

  return <ProfileOrdersUI orders={orders} />;
};
