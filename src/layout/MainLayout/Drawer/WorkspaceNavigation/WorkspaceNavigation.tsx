import { Box, Typography, Button, Modal, TextField, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FileAddOutlined, FolderAddOutlined, FolderOpenOutlined } from '@ant-design/icons';
import { FileSystemComponent } from './FileSystemComponent';
import { useEffect, useRef, useState } from 'react';
import { createNode, getNode, getNodeChildren, getNodes } from '../../../../components/apiService';
import {
  FileSystemNode,
  mapApiDataNodeToFileSystemNode,
  mapApiDataNodesToFileSystemNodes,
  mapFileSystemNodeToApiDataNode,
} from '../../../../model/FileSystemModel/FileSystemNode';
import { NodeTypeEnum } from '../../../../model/FileSystemModel/NodeTypeEnum';
import { ForestFormPart } from '../../../../components/configuration/ForestConfiguration';
import { Form, Formik, FormikProps } from 'formik';
import { Configuration, getDefaultConfigution } from '../../../../model/configuration/configuration';
import { get } from 'http';

export const WorkspaceNavigation: React.FC = () => {
  const theme = useTheme();
  const [isSelectWorkspaceModalVisible, setIsSelectWorkspaceModalVisible] = useState(false);
  const [isNewFolderModalVisible, setIsNewFolderModalVisible] = useState(false);
  const [isNewConfigurationModalVisible, setIsNewConfigurationModalVisible] = useState(false);
  const [newFolderName, setNewFolderName] = useState<string | null>(null);
  const [newConfigurationName, setNewConfigurationName] = useState<string | null>(null);
  const [configuration, setConfiguration] = useState<Configuration>(getDefaultConfigution());
  const [url, setUrl] = useState('http://localhost:31415');
  const [allNodes, setAllNodes] = useState<{ parent: null; nodes: FileSystemNode[] }>({ parent: null, nodes: [] });
  const [selectedMenuItem, setSelectedMenuItem] = useState<string | null>(null);
  const [selectedModalMenuItem, setSelectedModalMenuItem] = useState<string | null>(null);
  const [workspace, setWorkspace] = useState<{ parent: FileSystemNode | null; nodes: FileSystemNode[] }>({
    parent: null,
    nodes: [],
  });

  const configurationFormRef = useRef<any>();

  const handleOpenSelectWorkspaceModal = async () => {
    setIsSelectWorkspaceModalVisible(true);
    setSelectedMenuItem(null);
    setSelectedModalMenuItem(null);
    const fetchedNodes = await fetchAllNodes();
    setAllNodes((prevState) => ({ ...prevState, nodes: fetchedNodes }));
  };

  const handleSelectWorkspaceCloseModal = () => {
    setIsSelectWorkspaceModalVisible(false);
    setSelectedMenuItem(null);
    setSelectedModalMenuItem(null);
  };

  const fetchAllNodes = async (): Promise<FileSystemNode[]> => {
    let convertedData: FileSystemNode[] = [];
    try {
      const data = await getNodes(url);
      convertedData = mapApiDataNodesToFileSystemNodes(data);
    } catch (error) {
      console.error('Error fetching nodes:', error);
    }

    return convertedData;
  };

  const fetchChildNodes = async () => {
    try {
      if (workspace.parent) {
        const data = await getNodeChildren(url, workspace.parent.id);
        const convertedData = mapApiDataNodesToFileSystemNodes(data);
        setWorkspace((prevState) => ({ ...prevState, nodes: convertedData }));
      }
    } catch (error) {
      console.error('Error fetching nodes:', error);
    }
  };

  useEffect(() => {
    fetchChildNodes();
  }, [workspace.parent]);

  const selectWorkspace = async () => {
    try {
      if (selectedModalMenuItem) {
        const data = await getNode(url, selectedModalMenuItem);
        const convertedData = mapApiDataNodeToFileSystemNode(data);
        setWorkspace({ parent: convertedData, nodes: [] });
      }
    } catch (error) {
      console.error('Error fetching workspace node:', error);
    }

    handleSelectWorkspaceCloseModal();
  };

  const handleOpenNewFolderModal = (): void => {
    setIsNewFolderModalVisible(true);
    setSelectedMenuItem(null);
    setSelectedModalMenuItem(null);
    setNewFolderName(null);
  };

  const handleCloseNewFolderModal = (): void => {
    setIsNewFolderModalVisible(false);
    setSelectedMenuItem(null);
    setSelectedModalMenuItem(null);
    setNewFolderName(null);
  };

  const handleOpenNewConfigurationModal = (): void => {
    setIsNewConfigurationModalVisible(true);
    setNewConfigurationName(null);
  };

  const handleCloseNewConfigurationModal = (): void => {
    setIsNewConfigurationModalVisible(false);
    setNewConfigurationName(null);
  };

  const handleCreateFolder = async () => {
    if (selectedModalMenuItem && newFolderName) {
      const newFolder: FileSystemNode = {
        id: 'null',
        name: newFolderName,
        nodeType: NodeTypeEnum.FOLDER,
      };

      try {
        await createNode(url, mapFileSystemNodeToApiDataNode(newFolder, selectedModalMenuItem));
      } catch (error) {
        console.error('Error creating new folder:', error);
      }
    }

    fetchChildNodes();
    handleCloseNewFolderModal();
  };

  const handleCreateConfiguration = async () => {
    if (workspace.parent && newConfigurationName) {
      if (configurationFormRef.current) {
        configurationFormRef.current.submitForm();
      }

      const newConfiguration: FileSystemNode = {
        id: 'null',
        name: newConfigurationName,
        nodeType: NodeTypeEnum.FILE,
      };
      const newConfigurationMapped = mapFileSystemNodeToApiDataNode(newConfiguration, workspace.parent.id);
      newConfigurationMapped.data = JSON.stringify(configuration);

      try {
        await createNode(url, newConfigurationMapped);
      } catch (error) {
        console.error('Error creating new configuration:', error);
      }
    }

    fetchChildNodes();
    handleCloseNewConfigurationModal();
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
          <Button
            disabled={!workspace.parent}
            sx={{ color: 'secondary.main', minWidth: 0 }}
            onClick={handleOpenNewConfigurationModal}
          >
            <FileAddOutlined style={{ fontSize: 20 }} />
          </Button>
          <Button
            sx={{ color: 'secondary.main', minWidth: 0 }}
            disabled={!workspace.parent}
            onClick={handleOpenNewFolderModal}
          >
            <FolderAddOutlined style={{ fontSize: 20 }} />
          </Button>
          <Button
            onClick={handleOpenSelectWorkspaceModal}
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
          <Button onClick={handleSelectWorkspaceCloseModal}>Cancel</Button>
        </Box>
      </Modal>

      <Modal
        open={isNewFolderModalVisible}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ backgroundColor: 'secondary.A100', p: 2, borderRadius: 2 }}>
          <Typography variant="h2">Create Folder</Typography>
          <Typography> URL: {url} </Typography>
          <TextField
            sx={{ my: 1 }}
            id="outlined-basic"
            label="Folder name"
            variant="outlined"
            onChange={(e) => setNewFolderName(e.target.value)}
          />

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
              data={workspace}
              selected={selectedModalMenuItem}
              onItemSelected={setSelectedModalMenuItem}
              inSelectWorkspace={true}
            />
          </Box>

          <Button
            onClick={handleCreateFolder}
            disabled={selectedModalMenuItem === null || newFolderName === null || newFolderName === ''}
          >
            Create
          </Button>
          <Button onClick={handleCloseNewFolderModal}>Cancel</Button>
        </Box>
      </Modal>

      <Modal
        open={isNewConfigurationModalVisible}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            backgroundColor: 'secondary.A100',
            p: 2,
            borderRadius: 2,
          }}
        >
          <Typography variant="h2">New configuration</Typography>
          <Typography> URL: {url} </Typography>
          <Typography> Folder name: {selectedMenuItem ? selectedMenuItem : workspace.parent?.name} </Typography>
          <TextField
            sx={{ my: 1 }}
            id="outlined-basic"
            label="Configuration name"
            variant="outlined"
            value={newConfigurationName}
            onChange={(e) => setNewConfigurationName(e.target.value)}
          />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mt: 2,
              borderColor: 'secondary.darker',
              height: '480px',
              width: '620px',
              overflow: 'scroll',
            }}
          >
            <Formik
              initialValues={{ ...configuration }}
              onSubmit={(values) => {
                const content = JSON.stringify(values);
                setConfiguration(values);
                console.log(content); // save
              }}
              innerRef={configurationFormRef}
            >
              <Form>
                <Stack spacing={2}>
                  <ForestFormPart />
                </Stack>
              </Form>
            </Formik>
          </Box>

          <Button
            onClick={handleCreateConfiguration}
            disabled={newConfigurationName === null || newConfigurationName === ''}
          >
            Create
          </Button>
          <Button onClick={handleCloseNewConfigurationModal}>Cancel</Button>
        </Box>
      </Modal>

      <FileSystemComponent
        data={workspace}
        selected={selectedMenuItem}
        onItemSelected={setSelectedMenuItem}
        inSelectWorkspace={false}
      />
    </Box>
  );
};
