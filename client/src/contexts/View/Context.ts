import { createContext } from 'react';

type HeaderToolbarContextType = {
  showSidebar: boolean;
  showConsole: boolean;
  onClickSideBarIcon: () => void;
  onClickConsoleIcon: () => void;
};

const initialState: HeaderToolbarContextType = {
  showSidebar: false,
  showConsole: false,
  onClickSideBarIcon: () => {},
  onClickConsoleIcon: () => {},
};

const HeaderToolbarContext = createContext(initialState);

export default HeaderToolbarContext;
