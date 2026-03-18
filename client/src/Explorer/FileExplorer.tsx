import style from './FileExplorer.module.css';
import { ContextMenu } from '@/components';
import { getContextMenudata } from './constants/ContextMenuOptions';
import FileExplorerToolbar from './components/FileExplorerToolbar';
import Folder from '@/Explorer/components/Folder/Folder';
import { useFileExplorer } from './hooks/UseFileExplorer';

const FileExplorer = () => {
  const {
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
  } = useFileExplorer();

  return (
    <div className={style.explorer}>
      <FileExplorerToolbar
        onCreateFile={() => {
          setIsCreatingNew(true);
          setNewNodeType('file');
          if (selectedFolder) expandFolder(selectedFolder.name);
        }}
        onCreateFolder={() => {
          setIsCreatingNew(true);
          setNewNodeType('folder');
          if (selectedFolder) expandFolder(selectedFolder.name);
        }}
        onCollapseAll={collapseAllhandler}
      />

      <div className={style.tree_container}>
        {root ? (
          <Folder
            item={root}
            isCreatingNew={isCreatingNew}
            isRenaming={isRenaming}
            selectedNodeData={selectedFile}
            selectedFolderData={selectedFolder}
            onNodeSelect={handleNodeSelect}
            onCreate={(name) => {
              handleCreateNew(name, newNodeType);
              setIsCreatingNew(false);
            }}
            handleRename={handleRenameAction}
            renamingNode={renamingNode}
            onCollapseAll={collapseAllhandler}
            isCollapsed={collapseTrigger}
            onContextMenu={handleContextMenu}
            expandedFolders={expandedFolders}
            setExpandedFolders={setExpandedFolders}
            copiedNode={copiedNode}
            isCutOperation={isCutOperation}
          />
        ) : (
          <span>No folder</span>
        )}
      </div>

      {isContextMenuVisible && selectedNodeRef.current && contextMenuNode && (
        <ContextMenu
          htmlRef={selectedNodeRef.current}
          onClickOptions={handleContextAction}
          data={getContextMenudata(
            contextMenuNode.type,
            !!copiedNode,
            copiedNode?.getParent()?.name !== contextMenuNode.name,
          )}
        />
      )}
    </div>
  );
};

export default FileExplorer;
