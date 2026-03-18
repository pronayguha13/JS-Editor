import { useState, useEffect, useContext, useRef } from 'react';
import style from './Folder.module.css';
import { IFile } from '@/types';
import { FolderOpen, Folder as FolderIcon } from '@/assets/icons';
import FileContext from '@/contexts/File/Context';

interface FolderProps {
  item: IFile.Node;
  isCreatingNew: boolean;
  selectedNodeData: Nullable<IFile.Node>;
  selectedFolderData: Nullable<IFile.FolderNode>;
  isRenaming: boolean;
  renamingNode: Nullable<IFile.Node>;
  onNodeSelect: (node: IFile.Node) => void;
  onCreate: (fileName: string) => void;
  onContextMenu: (e: React.MouseEvent, node: IFile.Node) => void;
  handleRename: (newName: string) => void;
  onCollapseAll: () => void;
  isCollapsed?: boolean;
  expandedFolders: Set<string>;
  setExpandedFolders: (folders: Set<string>) => void;
  copiedNode?: Nullable<IFile.Node>;
  isCutOperation?: boolean;
}

const Folder = ({
  item,
  isCreatingNew,
  selectedNodeData,
  selectedFolderData,
  isRenaming,
  renamingNode,
  onNodeSelect,
  onCreate,
  onContextMenu,
  handleRename,
  onCollapseAll,
  isCollapsed,
  expandedFolders,
  setExpandedFolders,
  copiedNode,
  isCutOperation,
}: FolderProps) => {
  const { updateOpenedFiles } = useContext(FileContext);
  const [expanded, setExpanded] = useState(expandedFolders.has(item.name));
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (isCollapsed !== undefined) {
      setExpanded(false);
    }
  }, [isCollapsed]);

  useEffect(() => {
    if (expandedFolders.has(item.name)) {
      setExpanded(true);
    }
  }, [expandedFolders, item.name]);

  const toggleExpand = () => {
    const newExpanded = !expanded;
    setExpanded(newExpanded);
    const newSet = new Set(expandedFolders);
    if (newExpanded) {
      newSet.add(item.name);
    } else {
      newSet.delete(item.name);
    }
    setExpandedFolders(newSet);
  };

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onContextMenu(e, item);
  };

  const isNodeCut = isCutOperation && copiedNode?.name === item.name;

  useEffect(() => {
    if (!isCreatingNew) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        onCreate('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCreatingNew]);

  // File node
  if (item.type === IFile.NODE_TYPE.FILE) {
    return (
      <div
        className={`${style.node} ${selectedNodeData?.name === item.name ? style.selected : ''} ${
          isNodeCut ? style.cut : ''
        }`}
        onContextMenu={handleRightClick}
      >
        {isRenaming && renamingNode?.name === item.name ? (
          <input
            autoFocus
            type="text"
            defaultValue={item.name}
            className={style.renameInput}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.currentTarget.value) {
                handleRename(e.currentTarget.value);
              }
            }}
            onBlur={(e) => handleRename(e.currentTarget.value)}
          />
        ) : (
          <div
            onClick={() => {
              onNodeSelect(item);
              updateOpenedFiles(item);
            }}
          >
            {item.name}
          </div>
        )}
      </div>
    );
  }

  // Folder node
  return (
    <div className={`${style.folder} ${isNodeCut ? style.cut : ''}`}>
      <div
        className={`${style.node} ${selectedFolderData?.name === item.name ? style.selected : ''}`}
        onClick={toggleExpand}
        onContextMenu={handleRightClick}
      >
        {expanded ? <FolderOpen /> : <FolderIcon />}
        {isRenaming && renamingNode?.name === item.name ? (
          <input
            autoFocus
            type="text"
            defaultValue={item.name}
            className={style.renameInput}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.currentTarget.value) {
                handleRename(e.currentTarget.value);
              }
            }}
            onBlur={(e) => handleRename(e.currentTarget.value)}
          />
        ) : (
          <span>{item.name}</span>
        )}
      </div>

      {expanded && 'getChildren' in item && (item as IFile.FolderNode).getChildren().length > 0 && (
        <div className={style.children}>
          {(item as IFile.FolderNode).getChildren().map((child) => (
            <Folder
              key={child.name}
              item={child}
              isCreatingNew={isCreatingNew}
              selectedNodeData={selectedNodeData}
              selectedFolderData={selectedFolderData}
              isRenaming={isRenaming}
              renamingNode={renamingNode}
              onNodeSelect={onNodeSelect}
              onCreate={onCreate}
              onContextMenu={onContextMenu}
              handleRename={handleRename}
              onCollapseAll={onCollapseAll}
              isCollapsed={isCollapsed}
              expandedFolders={expandedFolders}
              setExpandedFolders={setExpandedFolders}
              copiedNode={copiedNode}
              isCutOperation={isCutOperation}
            />
          ))}
        </div>
      )}

      {expanded && isCreatingNew && selectedFolderData?.name === item.name && !isRenaming && (
        <div className={style.node}>
          <input
            autoFocus
            ref={inputRef}
            type="text"
            className={style.renameInput}
            placeholder="Enter name"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.currentTarget.value) {
                onCreate(e.currentTarget.value);
              }
            }}
            onBlur={(e) => {
              if (e.currentTarget.value) {
                onCreate(e.currentTarget.value);
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Folder;
