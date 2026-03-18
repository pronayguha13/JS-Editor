import { JSX } from 'react';

export enum TERMINAL_HEADER_ACTION {
  'SPLIT-TERMINAL' = 'split-terminal',
  'ADD-TERMINAL' = 'add-terminal',
  'CLOSE' = 'close',
  'DELETE' = 'delete',
}

export type HEADER_DOM = {
  [key in TERMINAL_HEADER_ACTION]: () => JSX.Element;
};
export type TerminalValue = {
  key: string;
  value: string;
};

export type UseTerminalReturn = {
  currentInput: string;
  CurrentPath: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeydown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  terminalValues: TerminalValue[];
};
