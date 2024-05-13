import { Box, Typography, Button, Modal } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FileAddOutlined, FolderAddOutlined, FolderOpenOutlined } from '@ant-design/icons';
import { FileSystemComponent } from './FileSystemComponent';
import { getSampleFileSystem } from '../../model/FileSystemModel/utils';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import OpenWorkspaceLayout from '../../layout/MainLayout/OpenWorkspaceLayout/OpenWorkspaceLayout';
// import { ipcRenderer } from 'electron';

export const filesURL = 'http://localhost:31415';

export const WorkspaceNavigation: React.FC = () => {
  // const handleOpenSelectWorkspaceDialog = () => {
  //   ipcRenderer.send('open-select-workspace-window');
  // };
  const theme = useTheme();
  const navigate = useNavigate();
  const [isSelecWorkspaceModalVisible, setIsSelecWorkspaceModalVisible] = useState(false);

  const handleOpenModal = () => {
    setIsSelecWorkspaceModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsSelecWorkspaceModalVisible(false);
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
          Workspace
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
        open={isSelecWorkspaceModalVisible}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* <Typography>URL: {url}</Typography>
        <Typography>File System: {fileSystem}</Typography> */}
        {/* <OpenWorkspaceLayout onClose={() => {}}></OpenWorkspaceLayout> */}
        <Box sx={{ backgroundColor: 'secondary.A100', p: 2, borderRadius: 2 }}>
          <Typography variant="h2">Open Workspace</Typography>
          <Typography> URL: {filesURL} </Typography>

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
            <FileSystemComponent data={getSampleFileSystem()} />
          </Box>

          <Button onClick={() => {}}>Open</Button>
          <Button onClick={handleCloseModal}>Cancel</Button>
        </Box>
      </Modal>

      <FileSystemComponent data={getSampleFileSystem()} />
    </Box>
  );
};
