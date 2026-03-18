export type ContextMenuData = {
  title: string;
  key: string;
  disabled?: boolean;
  subMenu?: ContextMenuData[];
  onClick?: (option: { key: string }) => void;
};

export enum ContextActionType {
  Rename = 'rename',
  Delete = 'delete',
  Cut = 'cut',
  Copy = 'copy',
  Paste = 'paste',
  NewFile = 'new_file',
  NewFolder = 'new_folder',
}

const baseMenuItems: ContextMenuData[] = [
  {
    title: 'Rename',
    key: ContextActionType.Rename,
  },
  {
    title: 'Delete',
    key: ContextActionType.Delete,
  },
  {
    title: 'Cut',
    key: ContextActionType.Cut,
  },
  {
    title: 'Copy',
    key: ContextActionType.Copy,
  },
  {
    title: 'Paste',
    key: ContextActionType.Paste,
    disabled: true,
  },
];

export const FileContextMenuData: ContextMenuData[] = [...baseMenuItems];

export const FolderContextMenuData: ContextMenuData[] = [
  ...baseMenuItems,
  {
    title: 'New File',
    key: ContextActionType.NewFile,
  },
  {
    title: 'New Folder',
    key: ContextActionType.NewFolder,
  },
];

export const getContextMenudata = (
  nodeType: string,
  hasCopiedNode: boolean,
  canPaste: boolean,
): ContextMenuData[] => {
  const baseMenu = nodeType === 'FILE' ? [...FileContextMenuData] : [...FolderContextMenuData];

  return baseMenu.map((item) => {
    if (item.key === ContextActionType.Paste) {
      return {
        ...item,
        disabled: !(hasCopiedNode && canPaste),
      };
    }
    return item;
  });
};
