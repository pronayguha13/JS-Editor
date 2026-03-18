import FileContext from '@/contexts/File/Context';
import useMap, { ACTION_TYPES } from '@/utils/hooks/useMap';
import { IFile } from '@/types';
import { useState } from 'react';
import useDirectory from '@/utils/hooks/useDirectory';

interface ContextWrapperProps {
  children: React.ReactNode;
}

const FileContextWrapper: React.FC<ContextWrapperProps> = ({ children }) => {
  const [openedFiles, setOpenedFile] = useMap<string, IFile.Node>({
    shouldCache: true,
    cacheKey: 'openedFiles',
  });

  const { root, initDirectory, createNode, deleteNode, renameNode } = useDirectory();

  const [selectedFile, setSelectedFile] = useState<Nullable<IFile.Node>>(
    (Array.from(openedFiles.values())[0] as IFile.Node) ?? null,
  );

  const updateOpenedFiles = (fileObject: IFile.Node) => {
    if (!openedFiles.has(fileObject.name)) {
      setOpenedFile({ type: ACTION_TYPES.ADD, key: fileObject.name, value: fileObject });
    }
    updateSelectedFile(fileObject);
  };

  const updateSelectedFile = (file: IFile.Node | null) => {
    setSelectedFile(file);
  };

  const closeFile = (file: IFile.Node) => {
    if (selectedFile && selectedFile.name === file.name) {
      let newSelectedFile: Nullable<IFile.Node> = null;
      if (openedFiles.size > 1) {
        let previousOpenFileInTab = '';
        if (openedFiles.size === 2) {
          const openFileNames = Array.from(openedFiles.keys());
          const currentSelectedFileIndex = openFileNames.indexOf(file.name);
          if (currentSelectedFileIndex === 0) {
            previousOpenFileInTab = openFileNames[1];
          } else {
            previousOpenFileInTab = openFileNames[0];
          }
        } else if (openedFiles.size > 2) {
          const openFileNames = Array.from(openedFiles.keys());
          const currentSelectedFileIndex = openFileNames.indexOf(file.name);
          previousOpenFileInTab = openFileNames[currentSelectedFileIndex - 1];
        }
        newSelectedFile =
          previousOpenFileInTab && openedFiles.has(previousOpenFileInTab)
            ? openedFiles.get(previousOpenFileInTab)!
            : null;
      }
      updateSelectedFile(newSelectedFile);
    }

    setOpenedFile({ type: ACTION_TYPES.DELETE, key: file.name });
  };

  const handleRenameNode = (oldName: string, newName: string, parent: IFile.FolderNode | null) => {
    try {
      const success = renameNode(oldName, newName, parent);

      if (success && openedFiles.has(oldName)) {
        const file = openedFiles.get(oldName)!;
        file.name = newName;
        setOpenedFile({
          type: ACTION_TYPES.UPDATE,
          key: newName,
          value: file,
        });
        updateSelectedFile(file);
        if (selectedFile && selectedFile.name === oldName) {
          updateSelectedFile(file);
        }
      }
      return true;
    } catch (error) {
      throw new Error(
        `A ${oldName.toLowerCase()} named '${oldName}' already exists in this folder`,
      );
      return false;
    }
  };

  return (
    <FileContext.Provider
      value={{
        root: root,
        openedFiles: openedFiles,
        selectedFile: selectedFile,
        initDirectory: initDirectory,
        createNode,
        deleteNode,
        renameNode: handleRenameNode,
        updateOpenedFiles,
        updateSelectedFile,
        closeFile,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};

export default FileContextWrapper;
