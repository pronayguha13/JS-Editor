import React from 'react';
import style from './TerminalList.module.css';
import { DeleteIcon } from '@/assets/icons';
import { TerminalType } from '@/types';

type TerminalListProps = {
  terminalData: TerminalType.TerminalValue[];
};

const TerminalList = ({ terminalData }: TerminalListProps) => {
  const handleTerminalActionClick = (event: React.MouseEvent, action: string, terminalKey = '') => {
    event.stopPropagation();
    event.preventDefault();
    console.log('🚀 ~ handleTerminalActionClick ~ action, terminalKey:', action, terminalKey);
  };

  const handleTerminalListClick = (key: string) => {
    console.log('🚀 ~ handleTerminalListClick ~ key:', key);
  };

  return (
    <React.Fragment>
      <ul className={style.terminal_ul}>
        {terminalData.map((item: TerminalType.TerminalValue) => (
          <li
            key={item.key}
            className={style.terminal_li}
            onClick={() => handleTerminalListClick(item.key)}
          >
            {item.value}
            <span onClick={(event) => handleTerminalActionClick(event, 'delete', item.key)}>
              <DeleteIcon />
            </span>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default TerminalList;
