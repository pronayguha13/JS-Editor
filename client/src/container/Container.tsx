import Header from '@/Header';
import ViewContext from '@/contexts/View/Context';
import { Fragment, useContext } from 'react';
import FileExplorer from '@/Explorer/FileExplorer';
import style from './Container.module.css';
import Editor from '@/Editor';
import { Console } from '@/Console';
import ErrorBoundary from '@/Explorer/components/ErrorBoundary';

const Container = () => {
  const { showConsole, showSidebar } = useContext(ViewContext);

  return (
    <Fragment>
      <Header />
      <div className={style.middle_container}>
        {showSidebar ? (
          <div className={style.left}>
            <ErrorBoundary fallback={<div>File Explorer crashed. Please refresh.</div>}>
              <FileExplorer />
            </ErrorBoundary>
          </div>
        ) : null}
        <div className={style.right}>
          <Editor />
        </div>
      </div>
      <div className={`${style.console_container} ${!showConsole ? style.hide_console : null}`}>
        <Console />
      </div>
    </Fragment>
  );
};

export default Container;
