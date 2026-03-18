export const hasValidExtension = (filename: string) => {
  const extensions = ['.js', '.ts', '.json', '.txt', '.md', '.html', '.css', 'scss', 'tsx', 'jsx'];
  return extensions.some((ext) => filename.toLowerCase().endsWith(ext));
};
