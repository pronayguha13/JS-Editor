import style from './contextMenu.module.css';
import { createPortal } from 'react-dom';
import { useState } from 'react';
import ContextMenuOptions from './Components/ContextMenuOptions';
import { ContextMenuData } from '@/types';

const ContextMenu = ({
  data,
  htmlRef,
  onClickOptions,
  isNested = false,
  position = 'bottom',
}: ContextMenuData.ContextMenu) => {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const handleToolbarOptionClick = (option: ContextMenuData.ContextMenuData): void => {
    setSelectedKey(option.key); // Update the selected option
  };

  const getPopoverStyle = () => {
    if (htmlRef) {
      return {
        top: isNested
          ? htmlRef.getBoundingClientRect().top
          : position === 'bottom'
          ? htmlRef.getBoundingClientRect().bottom
          : htmlRef.getBoundingClientRect().top,
        left: htmlRef.getBoundingClientRect().right,
      };
    }
  };

  return createPortal(
    <div
      className={`${style.header_modal} ${isNested ? style.subheader_modal : null}`}
      style={getPopoverStyle()}
      id="header-modal"
    >
      {data.map((option: ContextMenuData.ContextMenuData) => (
        <ContextMenuOptions
          key={option.key}
          option={option}
          onClickOptions={(option) => onClickOptions(option)}
          handleToolbarOptionClick={handleToolbarOptionClick}
          isSelected={selectedKey === option.key}
        />
      ))}
    </div>,
    document.body,
  );
};

export default ContextMenu;
