import React, { useState } from 'react';
import { Terminal } from './index';
import style from './Console.module.css';
import TerminalList from './Component/TreminalList/TerminalList';
import TerminalHeader from './Component/TerminalHeader/TerminalHeader';
import { TerminalType } from '@/types';

const Console = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //! setTerminalData needs to be added
  const [terminalData] = useState<TerminalType.TerminalValue[]>([
    { value: 'Terminal', key: crypto.randomUUID() },
    { value: 'Terminal', key: crypto.randomUUID() },
    { value: 'Terminal', key: crypto.randomUUID() },
    { value: 'Terminal', key: crypto.randomUUID() },
  ]);

  const path = 'root\\JS-Editor';

  // !TODO add all the functionality to context
  // const handleTerminalActionClick = (event: React.MouseEvent, action: string, terminalKey = '') => {
  //   event.stopPropagation();
  //   event.preventDefault();
  //   console.log('🚀 ~ handleTerminalActionClick ~ action:', action);

  //   if (action === 'add-terminal') {
  //     const newTerminal: TerminalItem = {
  //       name: 'Terminal',
  //       key: crypto.randomUUID(),
  //     };
  //     setTerminalData((prev) => [...prev, newTerminal]);
  //     setActiveTerminal(newTerminal.key);
  //   } else if (action === 'delete') {
  //     const keyToDelete = terminalKey || activeTerminal;
  //     setTerminalData((prev) => prev.filter((item) => item.key !== keyToDelete));

  //     // If deleting the active terminal, reset to another one
  //     if (activeTerminal === keyToDelete && terminalData.length > 1) {
  //       const remaining = terminalData.find((item) => item.key !== keyToDelete);
  //       if (remaining) setActiveTerminal(remaining.key);
  //     }
  //   }
  // };

  return (
    <React.Fragment>
      <div className={style.multiConsole_terminal}>
        <div className={style.terminal_header}>
          <div>Terminal</div>
          <div className={style.header_action}>
            <TerminalHeader />
          </div>
        </div>
        <div className={style.terminal}>
          <div className={style.terminal_editor}>
            <Terminal path={path} />
          </div>
          <div className={style.terminal_list}>
            <TerminalList terminalData={terminalData} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Console;
