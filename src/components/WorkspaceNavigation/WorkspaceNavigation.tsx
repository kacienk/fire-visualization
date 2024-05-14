import { Box, Typography, Button, Modal } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FileAddOutlined, FolderAddOutlined, FolderOpenOutlined } from '@ant-design/icons';
import { FileSystemComponent } from './FileSystemComponent';
import { getSampleFileSystem } from '../../model/FileSystemModel/utils';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getNode, getNodeChildren, getNodes } from '../apiService';
import OpenWorkspaceLayout from '../../layout/MainLayout/OpenWorkspaceLayout/OpenWorkspaceLayout';
import {
  FileSystemNode,
  mapApiDataNodeToFileSystemNode,
  mapApiDataNodesToFileSystemNodes,
} from '../../model/FileSystemModel/FileSystemNode';

export const WorkspaceNavigation: React.FC = () => {
  const theme = useTheme();
  const [isSelectWorkspaceModalVisible, setIsSelectWorkspaceModalVisible] = useState(false);
  const [url, setUrl] = useState('http://localhost:31415');
  const [allNodes, setAllNodes] = useState<FileSystemNode[]>([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState<string | null>(null);
  const [selectedModalMenuItem, setSelectedModalMenuItem] = useState<string | null>(null);
  const [workspace, setWorkspace] = useState<{ parent: FileSystemNode | null; nodes: FileSystemNode[] }>({
    parent: null,
    nodes: [],
  });

  const handleOpenModal = async () => {
    setIsSelectWorkspaceModalVisible(true);
    setSelectedMenuItem(null);
    setSelectedModalMenuItem(null);
    const fetchedNodes = await fetchAllNodes();
    setAllNodes(fetchedNodes);
  };

  const handleCloseModal = () => {
    setIsSelectWorkspaceModalVisible(false);
    setSelectedMenuItem(null);
    setSelectedModalMenuItem(null);
  };

  const fetchAllNodes = async (): Promise<FileSystemNode[]> => {
    let convertedData: FileSystemNode[] = [];
    try {
      const data = await getNodes(url);
      convertedData = mapApiDataNodesToFileSystemNodes(data);
      console.log('Converted Data:', convertedData);
    } catch (error) {
      console.error('Error fetching nodes:', error);
    }

    return convertedData;
  };

  useEffect(() => {
    const fetchChildNodes = async () => {
      try {
        if (workspace.parent) {
          const data = await getNodeChildren(url, workspace.parent.id);
          const convertedData = mapApiDataNodesToFileSystemNodes(data);
          console.log('Converted Data:', convertedData);
          setWorkspace((prevState) => ({ ...prevState, nodes: convertedData }));
        }
      } catch (error) {
        console.error('Error fetching nodes:', error);
      }
    };

    fetchChildNodes();
  }, [workspace]);

  const selectWorkspace = async () => {
    try {
      if (selectedModalMenuItem) {
        const data = await getNode(url, selectedModalMenuItem);
        const convertedData = mapApiDataNodeToFileSystemNode(data);
        console.log('Converted Data:', convertedData);
        setWorkspace({ parent: convertedData, nodes: [] });
      }
    } catch (error) {
      console.error('Error fetching workspace node:', error);
    }

    handleCloseModal();
  };

  return (
    <Box
      sx={{
        boxSizing: 'border-box',
        width: 250,
        paddingX: 1,
        borderRight: `1px solid ${theme.palette.divider}`,
        backgroundImage: 'none',
        boxShadow: 'inherit',
        bgcolor: 'secondary.A100',
      }}
    >
      <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography
          sx={{
            color: 'secondary.main',
          }}
          variant="h6"
          component="div"
        >
          Workspace ({workspace.parent ? workspace.parent.name : 'None'})
        </Typography>
        <Box>
          <Button sx={{ color: 'secondary.main', minWidth: 0 }}>
            <FileAddOutlined style={{ fontSize: 20 }} />
          </Button>
          <Button sx={{ color: 'secondary.main', minWidth: 0 }}>
            <FolderAddOutlined style={{ fontSize: 20 }} />
          </Button>
          <Button
            onClick={handleOpenModal}
            sx={{ color: 'secondary.main', minWidth: 0 }}
          >
            <FolderOpenOutlined style={{ fontSize: 20 }} />
          </Button>
        </Box>
      </Box>

      <Modal
        open={isSelectWorkspaceModalVisible}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ backgroundColor: 'secondary.A100', p: 2, borderRadius: 2 }}>
          <Typography variant="h2">Open Workspace</Typography>
          <Typography> URL: {url} </Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mt: 2,
              borderColor: 'secondary.darker',
              height: '480px',
              width: '640px',
              border: '1px solid',
              overflow: 'scroll',
            }}
          >
            <FileSystemComponent
              data={allNodes}
              selected={selectedModalMenuItem}
              onItemSelected={setSelectedModalMenuItem}
              inSelectWorkspace={true}
            />
          </Box>

          <Button
            onClick={selectWorkspace}
            disabled={selectedModalMenuItem === null}
          >
            Open
          </Button>
          <Button onClick={handleCloseModal}>Cancel</Button>
        </Box>
      </Modal>

      <FileSystemComponent
        data={workspace.nodes}
        selected={selectedMenuItem}
        onItemSelected={setSelectedMenuItem}
        inSelectWorkspace={false}
      />
    </Box>
  );
};
