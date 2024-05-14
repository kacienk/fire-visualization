import { ApiDataNode } from './ApiDataNode';
import { NodeTypeEnum } from './NodeTypeEnum';

export interface FileSystemNode {
  id: string;
  name: string;
  nodeType: NodeTypeEnum;
  contents?: FileSystemNode[];
}

export const mapApiDataNodeToFileSystemNode = (apiDataNode: ApiDataNode): FileSystemNode => {
  return {
    id: apiDataNode.id,
    name: apiDataNode.name,
    nodeType: apiDataNode.nodeType,
    contents: apiDataNode.nodeType === NodeTypeEnum.FOLDER ? [] : undefined,
  };
};

export const mapApiDataNodesToFileSystemNodes = (apiDataNodes: ApiDataNode[]): FileSystemNode[] => {
  const findRoots = (nodes: ApiDataNode[]): ApiDataNode[] => {
    console.log('nodes', nodes);
    const parentIds = nodes.map((node) => node.parentId);
    return nodes.filter((node) => node.parentId === null || !parentIds.includes(node.id));
  };

  const buildTree = (nodes: ApiDataNode[], parent: ApiDataNode | null): FileSystemNode[] => {
    return nodes
      .filter((node) => node.parentId === (parent ? parent.id : null))
      .map((node) => ({
        ...mapApiDataNodeToFileSystemNode(node),
        contents: buildTree(nodes, node),
      }));
  };

  const roots = findRoots(apiDataNodes);
  return roots.flatMap((root) => ({
    ...mapApiDataNodeToFileSystemNode(root),
    contents: buildTree(apiDataNodes, root),
  }));
};
