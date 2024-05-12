import { File } from './File';

export interface Folder {
  name: string;
  type: 'folder';
  contents: (File | Folder)[];
}
