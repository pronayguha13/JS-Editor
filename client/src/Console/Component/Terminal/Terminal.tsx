import useTerminal from '@/utils/hooks/useTerminal';
import style from './Terminal.module.css';
import { useRef } from 'react';
import { TerminalType } from '@/types';

type TerminalProps = {
  path: string;
};

const Terminal = ({ path }: TerminalProps) => {
  const terminalInputRef = useRef<HTMLInputElement | null>(null);
  const terminalRef = useRef<HTMLInputElement | null>(null);

  const { currentInput, CurrentPath, handleChange, handleKeydown, terminalValues } = useTerminal(
    path,
    terminalInputRef.current,
    terminalRef.current,
  );

  const getTerminalPrompt = () => {
    return terminalValues.map((item: TerminalType.TerminalValue, index: number) => (
      <div key={index} className={style.terminal_value}>
        <span>{'$ '}</span>
        <span>{item.key}</span>
        <span>{'>'}</span>
        <span>{item.value}</span>
      </div>
    ));
  };

  return (
    <div className={style.terminal_container} ref={terminalRef}>
      {getTerminalPrompt()}
      <div className={style.terminal_input}>
        <span>{'$ '}</span>
        <span>{CurrentPath}</span>
        <span>{'>'}</span>
        <span>{currentInput}</span>
        <span className={style.blinking_cursor}>|</span>
        <input
          ref={terminalInputRef}
          type="text"
          value={currentInput}
          onChange={handleChange}
          onKeyDown={handleKeydown}
        />
      </div>
    </div>
  );
};

export default Terminal;
