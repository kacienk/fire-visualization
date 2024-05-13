import { Box, Button, Typography } from '@mui/material';

interface OpenWorkspaceLayoutProps {
  onClose: () => void;
}

export const OpenWorkspaceLayout: React.FC<OpenWorkspaceLayoutProps> = ({ onClose }) => {
  const handleOpenWorkspace = () => {
    // Logic to open workspace
  };

  return (
    <Box>
      <Typography variant="h2">Open Workspace</Typography>

      <Button onClick={handleOpenWorkspace}>Open</Button>
      <Button onClick={onClose}>Cancel</Button>
    </Box>
  );
};

export default OpenWorkspaceLayout;
