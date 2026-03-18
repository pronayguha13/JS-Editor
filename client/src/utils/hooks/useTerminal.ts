import { useCallback, useEffect, useState } from 'react';
import { getCDNewPath, isCDCommand } from '@/Console/Helper/helper';
import { TerminalType } from '@/types';

const useTerminal = (
  path: string,
  terminalInputRef: HTMLInputElement | null,
  terminalRef: HTMLInputElement | null,
): TerminalType.UseTerminalReturn => {
  const [currentInput, setCurrentInput] = useState('hello');
  const [CurrentPath, setCurrentPath] = useState(path);
  const [terminalValues, setTerminalValues] = useState<TerminalType.TerminalValue[]>([]);

  const handleClickOnTerminal = useCallback(() => {
    if (terminalInputRef) {
      terminalInputRef.focus();
      terminalInputRef.setSelectionRange(
        terminalInputRef.value.length,
        terminalInputRef.value.length,
      );
    }
  }, [terminalInputRef]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCurrentInput(event.target.value);
  };

  const handleKeydown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      const value = (event.target as HTMLInputElement).value;
      if (value.toLowerCase() === 'cls') {
        setTerminalValues([]);
        setCurrentInput('');
      } else if (isCDCommand(value)) {
        const newPath = getCDNewPath(value, CurrentPath);
        setCurrentPath(newPath);
        setCurrentInput('');
        setTerminalValues((prev) => [...prev, { key: CurrentPath, value: value }]);
      } else {
        const data = { key: path, value: value };
        setTerminalValues((prev) => [...prev, data]);
        setCurrentInput('');
      }
    }
  };

  useEffect(() => {
    handleClickOnTerminal();

    if (terminalRef) {
      terminalRef.addEventListener('click', () => {
        handleClickOnTerminal();
      });

      () => {
        terminalRef.removeEventListener('click', () => {
          handleClickOnTerminal();
        });
      };
    }
  }, [terminalRef, handleClickOnTerminal]);

  return {
    currentInput,
    CurrentPath,
    terminalValues,
    handleChange,
    handleKeydown,
  };
};

export default useTerminal;
