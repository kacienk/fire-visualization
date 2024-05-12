import { Box, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FileAddOutlined, FolderAddOutlined, FolderOpenOutlined } from '@ant-design/icons';
import { FileSystemComponent } from './FileSystemComponent';
import { getSampleFileSystem } from '../../model/FileSystemModel/utils';

export const WorkspaceNavigation: React.FC = () => {
  const theme = useTheme();

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
          <Button sx={{ color: 'secondary.main', minWidth: 0 }}>
            <FolderOpenOutlined style={{ fontSize: 20 }} />
          </Button>
        </Box>
      </Box>
      <FileSystemComponent data={getSampleFileSystem()} />
    </Box>
  );
};
