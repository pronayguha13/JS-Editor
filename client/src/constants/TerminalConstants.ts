import { AddIcon, DeleteIcon, CloseIcon, SidebarHidden } from '@/assets/icons';
import { TerminalType } from '@/types';

const HEADER_ICON_DATA: TerminalType.HEADER_DOM = {
  'split-terminal': SidebarHidden,
  'add-terminal': AddIcon,
  close: CloseIcon,
  delete: DeleteIcon,
};

export default { HEADER_ICON_DATA };
