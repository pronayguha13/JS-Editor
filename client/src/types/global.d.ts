import { ReactNode } from 'react';
export {};
declare global {
  type Nullable<T> = T | null;

  export type ContextWrapperProps = {
    children: ReactNode;
  };
}
