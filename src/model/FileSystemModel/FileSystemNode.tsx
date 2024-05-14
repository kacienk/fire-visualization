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
    id: apiDataNode.id ? apiDataNode.id : '',
    name: apiDataNode.name,
    nodeType: apiDataNode.nodeType,
    contents: apiDataNode.nodeType === NodeTypeEnum.FOLDER ? [] : undefined,
  };
};

export const mapFileSystemNodeToApiDataNode = (
  fileSystemNode: FileSystemNode,
  parentId: string | null,
): ApiDataNode => {
  return {
    id: null,
    name: fileSystemNode.name,
    nodeType: fileSystemNode.nodeType,
    parentId: parentId,
    data: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

export const mapApiDataNodesToFileSystemNodes = (apiDataNodes: ApiDataNode[]): FileSystemNode[] => {
  const findRoots = (nodes: ApiDataNode[]): ApiDataNode[] => {
    const parentIds = nodes.map((node) => node.parentId);
    console.log('parentIds:', parentIds);
    return nodes.filter(
      (node) => node.parentId === null || !apiDataNodes.map((node) => node.id).includes(node.parentId),
    );
  };

  const buildTree = (nodes: ApiDataNode[], parent: ApiDataNode | null): FileSystemNode[] => {
    return nodes
      .filter((node) => node.parentId === (parent ? parent.id : null))
      .map((node) => ({
        ...mapApiDataNodeToFileSystemNode(node),
        contents: buildTree(nodes, node),
      }));
  };

  console.log('apiDataNodes:', apiDataNodes);
  const roots = findRoots(apiDataNodes);
  console.log('roots:', roots);
  return roots.flatMap((root) => ({
    ...mapApiDataNodeToFileSystemNode(root),
    contents: buildTree(apiDataNodes, root),
  }));
};
