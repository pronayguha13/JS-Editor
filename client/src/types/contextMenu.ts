export type ContextMenuData = {
  title: string;
  path?: string;
  key: string;
  disabled?: boolean;
  subMenu?: Array<ContextMenuData>;
  onClick?: Function;
};

export type ContextMenuOptions = {
  option: ContextMenuData;
  handleToolbarOptionClick: (option: ContextMenuData, targetElement: HTMLElement | null) => void;
  onClickOptions: (option: any) => void;
  isSelected: boolean;
};

export type ContextMenu = {
  data: Array<ContextMenuData>;
  onClickOptions: (option: any) => void;
  htmlRef: HTMLElement;
  isNested?: boolean;
  position?: string;
};
