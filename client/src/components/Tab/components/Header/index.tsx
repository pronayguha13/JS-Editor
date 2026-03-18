import { CloseIcon } from '@/assets/icons';
import style from './style.module.css';
import { useContext, useEffect, useState } from 'react';
import FileContext from '@/contexts/File/Context';
import { IFile } from '@/types';

type TabHeaderProps = {
  file: IFile.Node;
};

const TabHeader = ({ file }: TabHeaderProps) => {
  const { selectedFile, updateSelectedFile, closeFile } = useContext(FileContext);
  const [selected, setSelected] = useState<boolean>(false);

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    closeFile(file);
  };

  useEffect(() => {
    setSelected(selectedFile !== null && selectedFile.name === file.name);
  }, [selectedFile, file]);

  return (
    <div className={style.header_container} onClick={() => updateSelectedFile(file)}>
      <div className={`${style.header_content} ${selected ? style.selected : null}`}>
        <p>{file.name}</p>
        <button onClick={handleClose}>
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};

export default TabHeader;
