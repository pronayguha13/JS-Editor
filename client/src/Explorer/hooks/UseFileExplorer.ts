import { useContext, useEffect, useRef, useState } from 'react';
import { IFile } from '@/types';
import { hasValidExtension } from '../helper/helper';
import FileContext from '@/contexts/File/Context';
import { ContextActionType } from '../constants/ContextMenuOptions';

export const useFileExplorer = () => {
  const {
    root,
    createNode,
    deleteNode,
    renameNode,
    initDirectory,
    updateSelectedFile,
    selectedFile,
    closeFile,
    openedFiles,
  } = useContext(FileContext);

  const rootNode = useRef<Nullable<IFile.FolderNode>>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [renamingNode, setRenamingNode] = useState<Nullable<IFile.Node>>(null);
  const [copiedNode, setCopiedNode] = useState<Nullable<IFile.Node>>(null);
  const [isCutOperation, setIsCutOperation] = useState(false);
  const [newNodeType, setNewNodeType] = useState<'file' | 'folder'>('file');
  const [collapseTrigger, setCollapseTrigger] = useState<boolean>(false);
  const selectedNodeRef = useRef<Nullable<HTMLElement>>(null);
  const [isContextMenuVisible, setIsContextMenuVisible] = useState<boolean>(false);
  const [contextMenuNode, setContextMenuNode] = useState<Nullable<IFile.Node>>(null);
  const [selectedFolder, setSelectedFolder] = useState<Nullable<IFile.FolderNode>>(null);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

  const handleNodeSelect = (node: IFile.Node) => {
    if (node.type === IFile.NODE_TYPE.FILE) {
      updateSelectedFile(node);
    } else {
      setSelectedFolder(node as IFile.FolderNode);
    }
  };

  const handleCutNode = (node: IFile.Node) => {
    setCopiedNode(node);
    setIsCutOperation(true);
  };

  const handleCopyNode = (node: IFile.Node) => {
    setCopiedNode(node);
    setIsCutOperation(false);
  };

  const handleCreateNew = (name: string, type: 'file' | 'folder') => {
    if (!name || !selectedFolder) return;

    const trimmedName = name.trim();
    if (!trimmedName) {
      setIsCreatingNew(false);
      return;
    }

    const isFile = type === 'file';

    if (isFile && !hasValidExtension(trimmedName)) {
      alert(
        'File must have a valid extension: .js, .ts, .json, .txt, .md, .html, .css, scss, tsx, jsx',
      );
      return;
    }

    try {
      createNode(
        trimmedName,
        isFile ? IFile.NODE_TYPE.FILE : IFile.NODE_TYPE.FOLDER,
        selectedFolder,
      );
      setIsCreatingNew(false);
    } catch (error: unknown) {
      alert(`Failed to create: ${(error as Error).message}`);
    }
  };

  const handlePasteNode = (targetNode: IFile.Node) => {
    if (!copiedNode || !targetNode || targetNode.type !== IFile.NODE_TYPE.FOLDER) return;

    if (copiedNode.getParent()?.name === targetNode.name) {
      alert('Cannot paste into the same folder');
      return;
    }

    try {
      createNode(
        copiedNode.name,
        copiedNode.type,
        targetNode as IFile.FolderNode,
        copiedNode.getContent(),
      );

      if (isCutOperation) {
        try {
          deleteNode(copiedNode.name, copiedNode.getParent()!);
        } catch (error: unknown) {
          alert(
            `Failed to delete during cut operation: ${
              error instanceof Error ? (error as Error).message : 'Unknown error'
            }`,
          );
          return;
        }
      }

      setCopiedNode(null);
      setIsCutOperation(false);
    } catch (error: unknown) {
      alert(`Failed to paste: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleRenameAction = (newName: string) => {
    if (!renamingNode || !newName || newName === renamingNode.name || !renamingNode.getParent()) {
      setIsRenaming(false);
      setRenamingNode(null);
      return;
    }

    const trimmedNewName = newName.trim();
    const isFile = renamingNode.type === IFile.NODE_TYPE.FILE;

    if (isFile && !hasValidExtension(trimmedNewName)) {
      alert(
        'Renamed file must have a valid extension: .js, .ts, .json, .txt, .md, .html, .css, scss, tsx, jsx',
      );
      return;
    }

    try {
      renameNode(renamingNode.name, trimmedNewName, renamingNode.getParent());
    } catch (error: unknown) {
      alert(`Failed to rename: ${(error as Error).message}`);
      return;
    }

    setIsRenaming(false);
    setRenamingNode(null);
  };

  const expandFolder = (folderName: string) => {
    setExpandedFolders((prev) => new Set(prev).add(folderName));
  };

  const handleContextAction = (option: { key: string }) => {
    if (!contextMenuNode) return;

    switch (option.key) {
      case ContextActionType.Rename:
        setIsRenaming(true);
        setRenamingNode(contextMenuNode);
        break;
      case ContextActionType.Delete:
        if (contextMenuNode.getParent()) {
          try {
            deleteNode(contextMenuNode.name, contextMenuNode.getParent());
            if (openedFiles.has(contextMenuNode.name)) {
              closeFile(contextMenuNode);
            }
          } catch (error: unknown) {
            alert(`Failed to delete: ${error instanceof Error ? error.message : 'Unknown error'}`);
          }
        } else {
          alert('Cannot delete the root folder.');
        }
        break;
      case ContextActionType.Cut:
        handleCutNode(contextMenuNode);
        break;
      case ContextActionType.Copy:
        handleCopyNode(contextMenuNode);
        break;
      case ContextActionType.Paste:
        handlePasteNode(contextMenuNode);
        break;
      case ContextActionType.NewFile:
      case ContextActionType.NewFolder:
        const targetFolder =
          contextMenuNode.type === IFile.NODE_TYPE.FOLDER
            ? (contextMenuNode as IFile.FolderNode)
            : contextMenuNode.getParent()!;

        setSelectedFolder(targetFolder);
        expandFolder(targetFolder.name);
        setNewNodeType(option.key === ContextActionType.NewFile ? 'file' : 'folder');
        setIsCreatingNew(true);
        break;
      default:
        break;
    }
    setIsContextMenuVisible(false);
  };

  const collapseAllhandler = () => {
    setCollapseTrigger((prev) => !prev);
    setExpandedFolders(new Set());
  };

  const handleContextMenu = (e: React.MouseEvent, node: IFile.Node) => {
    e.preventDefault();
    setContextMenuNode(node);
    selectedNodeRef.current = e.currentTarget as HTMLElement;
    setIsContextMenuVisible(true);
  };

  const handleClickAnywhere = () => {
    if (isContextMenuVisible) {
      setIsContextMenuVisible(false);
    }
  };

  useEffect(() => {
    if (root) {
      rootNode.current = root;
      const existingNames = root.getChildren().map((child) => child.name.toLowerCase());

      if (!existingNames.includes('index.js')) {
        createNode('index.js', IFile.NODE_TYPE.FILE, root, 'let data = 6');
      }
      if (!existingNames.includes('index.html')) {
        createNode('index.html', IFile.NODE_TYPE.FILE, root, '<html></html>');
      }
      if (!existingNames.includes('index.css')) {
        createNode('index.css', IFile.NODE_TYPE.FILE, root, 'html {background-color: #fff}');
      }

      setSelectedFolder(root);
      sessionStorage.setItem('root', JSON.stringify(root.toJSON()));
      expandFolder(root.name);
    }
  }, [root]);

  useEffect(() => {
    const stored = sessionStorage.getItem('root');
    if (!stored) {
      initDirectory();
    }
  }, [initDirectory]);

  useEffect(() => {
    window.addEventListener('click', handleClickAnywhere);
    return () => window.removeEventListener('click', handleClickAnywhere);
  }, [isContextMenuVisible]);

  return {
    root,
    isCreatingNew,
    isRenaming,
    renamingNode,
    selectedFile,
    selectedFolder,
    collapseTrigger,
    isContextMenuVisible,
    contextMenuNode,
    selectedNodeRef,
    copiedNode,
    isCutOperation,
    newNodeType,
    expandedFolders,
    setExpandedFolders,
    handleNodeSelect,
    handleCreateNew,
    handleRenameAction,
    handleContextMenu,
    handleContextAction,
    collapseAllhandler,
    setIsCreatingNew,
    setNewNodeType,
    expandFolder,
  };
};
