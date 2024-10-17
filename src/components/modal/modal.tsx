import { FC, memo, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { TModalProps } from './type';
import { ModalUI } from '@ui';
import { useLocation, useNavigate } from 'react-router-dom';

const modalRoot = document.getElementById('modals');

export const Modal: FC<TModalProps> = memo(({ title, onClose, children }) => {
  const location = useLocation()
  const navigate = useNavigate()

  const background = location.state?.background || '/';

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      e.key === 'Escape'&& onClose()
        navigate(background, { replace: true })
    };

    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [navigate, onClose]);

  return ReactDOM.createPortal(
    <ModalUI title={title} onClose={() => {onClose(); navigate(background, { replace: true })}}>
      {children}
    </ModalUI>,
    modalRoot as HTMLDivElement
  );
});
