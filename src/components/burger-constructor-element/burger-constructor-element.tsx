import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useSelector } from '../../services/store';
import { getСonstructorItems } from '../../services/slices/burgerSlice'

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {

    const constructorItems = useSelector(getСonstructorItems)

    const ing = constructorItems.ingredients.find(item => item._id === ingredient._id)
    
    // перемещение ингредиентов
    const handleMoveDown = () => {};

    const handleMoveUp = () => {};

    const handleClose = () => {};

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
