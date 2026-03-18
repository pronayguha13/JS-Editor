import { handleToolbarClick } from '@/Header/helper';
import { ContextMenuData } from '@/types';
const headerToolbarData: ContextMenuData.ContextMenuData[] = [
  {
    title: 'File',
    key: 'file',
    path: 'file',
    subMenu: [
      {
        title: 'File1',
        key: 'file1',
        path: 'file/file1',
        subMenu: [],
        onClick: function () {
          handleToolbarClick({ title: this.title });
        },
      },
      {
        title: 'File2',
        key: 'file2',
        path: 'file/file2',
        subMenu: [],
        onClick: function () {
          handleToolbarClick({ title: this.title });
        },
      },
      {
        title: 'File3',
        key: 'file3',
        path: 'file/file3',
        subMenu: [],
        onClick: function () {
          handleToolbarClick({ title: this.title });
        },
      },
    ],
  },
  {
    title: 'Terminal',
    key: 'terminal',
    path: 'terminal',
    subMenu: [
      {
        title: 'Terminal1',
        key: 'terminal1',
        path: 'terminal/terminal1',
        subMenu: [
          {
            title: 'Terminal1.1',
            key: 'terminal1.1',
            path: 'terminal/terminal1/terminal1.1',
            subMenu: [],
            onClick: function () {
              handleToolbarClick({ title: this.title });
            },
          },
        ],
      },
      {
        title: 'Terminal2',
        key: 'terminal2',
        path: 'terminal/terminal2',
        subMenu: [],
        onClick: function () {
          handleToolbarClick({ title: this.title });
        },
      },
    ],
  },
  {
    title: 'Help',
    key: 'help',
    path: 'help',
    subMenu: [],
    onClick: function () {
      handleToolbarClick({ title: this.title });
    },
  },
];

export default { headerToolbarData };
