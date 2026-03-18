// Define a separate type for the toolbar option
type ToolbarOption = {
  title: string;
};

export const handleToolbarClick = ({ title }: ToolbarOption) => {
  switch (title) {
    case 'File':
      console.log('File clicked');
      break;
    case 'Terminal':
      console.log('File clicked');
      break;
    case 'Help':
      console.log('Help clicked');
      break;
  }
};
