import { IFile } from '@/types';
import { createContext } from 'react';

export type FileContextType = {
  root: Nullable<IFile.FolderNode>;
  openedFiles: Map<string, Nullable<IFile.Node>>;
  selectedFile: Nullable<IFile.Node>;
  createNode: Function;
  deleteNode: Function;
  initDirectory: Function;
  updateOpenedFiles: (fileObject: IFile.Node) => void;
  updateSelectedFile: (file: IFile.Node | null) => void;
  closeFile: (file: IFile.Node) => void;
  renameNode: (oldName: string, newName: string, parent: IFile.FolderNode | null) => boolean;
};

const initialState: FileContextType = {
  root: null,
  openedFiles: new Map(),
  selectedFile: null,
  createNode: () => {},
  deleteNode: () => {},
  initDirectory: () => {},
  updateOpenedFiles: () => {},
  updateSelectedFile: () => {},
  closeFile: () => {},
  renameNode: () => false,
};

const FileContext = createContext(initialState);

export default FileContext;
