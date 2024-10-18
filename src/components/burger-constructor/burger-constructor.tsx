import { FC, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { fetchCreateOrder, getModalData, getRequest, getСonstructorItems } from '../../services/slices/burgerSlice';
import { getUserData } from '../../services/slices/userSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const user = useSelector(getUserData)
  const constructorItems = useSelector(getСonstructorItems)

  const orderRequest = useSelector(getRequest);

  const orderModalData = useSelector(getModalData);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      navigate('/login', { state: { from: location }, replace: true });
    }
  };
  
  const closeOrderModal = () => {};

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TIngredient) => s + (v.price || 0),
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
