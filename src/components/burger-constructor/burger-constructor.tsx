import { FC, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { clearIngredients, getСonstructorItems } from '../../services/slices/burgerSlice';
import { getUserData } from '../../services/slices/userSlice';
import { fetchPostOrder, getOrderModalData, getOrderRequest, clearOrderModalData } from '../../services/slices/orderSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const background = location.state?.background || '/';

  const user = useSelector(getUserData);
  const constructorItems = useSelector(getСonstructorItems);

  const orderRequest = useSelector(getOrderRequest);

  const orderModalData = useSelector(getOrderModalData);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!user) {
      navigate('/login', { state: { from: location }, replace: true });
    } else {
      const ingredients = [
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((item: TIngredient) => item._id),
        constructorItems.bun._id
      ];
      dispatch(fetchPostOrder(ingredients));
      dispatch(clearIngredients());
    }
};
  
  const closeOrderModal = () => {
    dispatch(clearOrderModalData())
    navigate(background, { replace: true })
  };

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
