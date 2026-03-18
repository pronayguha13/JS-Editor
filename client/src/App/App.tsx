import ViewContextWrapper from '@/contexts/View/ViewContext';
import style from './App.module.css';

import Container from '@/container/Container';
import FileContextWrapper from '@/contexts/File/FileContextWrapper';

function App() {
  return (
    <div className={style.container}>
      <ViewContextWrapper>
        <FileContextWrapper>
          <Container />
        </FileContextWrapper>
      </ViewContextWrapper>
    </div>
  );
}

export default App;
