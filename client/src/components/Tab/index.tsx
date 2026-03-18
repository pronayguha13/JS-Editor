import Editor from '@monaco-editor/react';

import TabHeader from '@/components/Tab/components/Header';

import style from './style.module.css';
import { useContext, useMemo } from 'react';
import FileContext from '@/contexts/File/Context';

const Tab = () => {
  const { openedFiles, selectedFile } = useContext(FileContext);

  const selectedFileLanguage = useMemo(() => {
    if (selectedFile) {
      const lastIndexOfSeparator = selectedFile?.name.lastIndexOf('.');

      const extension = selectedFile?.name.slice(lastIndexOfSeparator + 1);

      return extension === 'js' ? 'javascript' : extension;
    }
  }, [selectedFile]);

  const renderTabs = () => {
    return Array.from(openedFiles.entries()).map(([fileName, file]) => (
      <TabHeader key={fileName} file={file!} />
    ));
  };

  return (
    <div className={style.tab_container}>
      <div className={style.header_container}>{renderTabs()}</div>
      <div className={style.main_editor}>
        {/* placeholder for breadcrumb */}
        {selectedFile ? (
          <Editor
            theme="vs-dark"
            width="100%"
            height="100%"
            defaultLanguage="javascript"
            language={selectedFileLanguage}
            defaultValue="// some comment"
            value={selectedFile?.content ?? ''}
            options={{
              scrollBeyondLastLine: false, // Important for height calculation
              minimap: { enabled: true }, // Optional: disable minimap for cleaner look
              automaticLayout: true, // Adjust layout on container resize
            }}
          />
        ) : (
          <h1> Please Select a File</h1>
        )}
      </div>
    </div>
  );
};

export default Tab;
