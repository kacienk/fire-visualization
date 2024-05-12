import { Folder } from './Folder';
import { File } from './File';

export type FileSystemNode = Folder | File;

export const getSampleFileSystem = (): FileSystemNode[] => {
  return [
    {
      name: 'Folder1',
      type: 'folder',
      contents: [{ name: 'File1' } as File, { name: 'File2' } as File, { name: 'File3' } as File],
    } as Folder,
    {
      name: 'Folder2',
      type: 'folder',
      contents: [{ name: 'File1' } as File, { name: 'File2' } as File, { name: 'File3' } as File],
    } as Folder,
    { name: 'File1' } as File,
    { name: 'File2' } as File,
  ];
};
