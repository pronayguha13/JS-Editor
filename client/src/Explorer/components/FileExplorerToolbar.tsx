import { AddFile, Folder as FolderIcon, CollapseAll } from '@/assets/icons';
import style from '../FileExplorer.module.css';

interface FileExplorerToolbarProps {
  onCreateFile: () => void;
  onCreateFolder: () => void;
  onCollapseAll: () => void;
}

const FileExplorerToolbar = ({
  onCreateFile,
  onCreateFolder,
  onCollapseAll,
}: FileExplorerToolbarProps) => (
  <div className={style.toolbar}>
    <button onClick={onCreateFile}>
      <AddFile />
    </button>
    <button onClick={onCreateFolder}>
      <FolderIcon />
    </button>
    <button onClick={onCollapseAll}>
      <CollapseAll />
    </button>
  </div>
);

export default FileExplorerToolbar;
