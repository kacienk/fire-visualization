import { NodeTypeEnum } from './NodeTypeEnum';

export interface ApiDataNode {
  id: string;
  name: string;
  nodeType: NodeTypeEnum;
  parentId: string | null;
  data: string | null;
  createdAt: string;
  updatedAt: string;
}
