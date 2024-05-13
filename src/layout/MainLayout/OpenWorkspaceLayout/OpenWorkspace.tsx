import { useState } from 'react';
import { FolderOpenOutlined } from '@ant-design/icons';
import { Button, Modal, Typography } from '@mui/material';
import { OpenWorkspaceLayout } from './OpenWorkspaceLayout';

export const OpenWorkspace: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [url, setUrl] = useState('');
  const [fileSystem, setFileSystem] = useState('');

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleFetchData = () => {
    // Fetch data from the provided URL and update the state
    // with the fetched data and file system information
    // Replace the placeholder URL with your actual API endpoint
    const apiUrl = 'https://example.com/api/data';
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setUrl(apiUrl);
        setFileSystem(data.fileSystem);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <>
      <Button onClick={handleOpenModal}>
        <FolderOpenOutlined />
        Open Workspace
      </Button>

      <Modal open={isModalVisible}>
        {/* <Typography>URL: {url}</Typography>
        <Typography>File System: {fileSystem}</Typography> */}
        <OpenWorkspaceLayout onClose={() => {}}></OpenWorkspaceLayout>
      </Modal>
    </>
  );
};

export default OpenWorkspace;
