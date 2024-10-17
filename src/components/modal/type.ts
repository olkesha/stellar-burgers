import { ReactNode } from 'react';

export type TModalProps = {
  title: string;
  isOpen?: boolean;
  onClose: () => void;
  children?: ReactNode;
};
