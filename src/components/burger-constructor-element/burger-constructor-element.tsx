import { FC, memo, useState } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch, useSelector } from '../../services/store';
import { getСonstructorItems, updateIngredients } from '../../services/slices/burgerSlice/burgerSlice'

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const constructorItems = useSelector(getСonstructorItems);
    const dispatch = useDispatch();
    
    const handleMoveDown = () => {
      if (index < constructorItems.ingredients.length - 1) {
        const newIngredients = [...constructorItems.ingredients];
        newIngredients.splice(index + 1, 0, newIngredients.splice(index, 1)[0])
        dispatch(updateIngredients(newIngredients));
      }
    };

    const handleMoveUp = () => {
      if (index > 0) {
        const newIngredients = [...constructorItems.ingredients];
        newIngredients.splice(index - 1, 0, newIngredients.splice(index, 1)[0])
        dispatch(updateIngredients(newIngredients));
      }
    };

    const handleClose = () => {
      const newIngredients = [...constructorItems.ingredients];
      newIngredients.splice(index, 1)
      dispatch(updateIngredients(newIngredients));
    };

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
