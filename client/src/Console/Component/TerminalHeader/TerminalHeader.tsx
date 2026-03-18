import React, { JSX } from 'react';
import { TerminalConstants } from '@/constants';
import { TerminalType } from '@/types';

const TerminalHeader = () => {
  const handleTerminalActionClick = (event: React.MouseEvent, action: string, terminalKey = '') => {
    event.stopPropagation();
    event.preventDefault();
    console.log('🚀 ~ handleTerminalActionClick ~ action, terminalKey:', action, terminalKey);
  };
  return (
    <div>
      {(
        Object.entries(TerminalConstants.HEADER_ICON_DATA) as [
          TerminalType.TERMINAL_HEADER_ACTION,
          () => JSX.Element,
        ][]
      ).map(([action, IconComponent]) => (
        <span key={action} onClick={(event) => handleTerminalActionClick(event, action)}>
          <IconComponent />
        </span>
      ))}
    </div>
  );
};

export default TerminalHeader;
