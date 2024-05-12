import { Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { useState } from 'react';
import { FileSystemNode } from '../../model/FileSystemModel/utils';
import { File } from '../../model/FileSystemModel/File';
import { Folder } from '../../model/FileSystemModel/Folder';

interface Props {
  data: FileSystemNode[];
}

export const FileSystemComponent: React.FC<Props> = ({ data }) => {
  const [openFolders, setOpenFolders] = useState<string[]>([]);
  const theme = useTheme();
  const [selected, setSelected] = useState<string | null>(null);

  const handleFolderClick = (folderName: string) => {
    const isOpen = openFolders.includes(folderName);
    setOpenFolders(isOpen ? openFolders.filter((f) => f !== folderName) : [...openFolders, folderName]);
    setSelected(folderName);
  };

  const handleFileClick = (fileName: string) => {
    setSelected(fileName);
  };

  const renderFileOrFolder = (item: FileSystemNode, level: number) => {
    if (item.type === 'folder') {
      const folder = item as Folder;
      return (
        <Box key={folder.name}>
          <ListItemButton
            onClick={() => handleFolderClick(folder.name)}
            selected={folder.name === selected}
            sx={{
              cursor: 'pointer',
              pl: 2 * level,
              ':hover': { bgcolor: 'secondary.lighter' },
              '&.Mui-selected': {
                bgcolor: 'primary.lighter',
                borderRight: `2px solid ${theme.palette.primary.main}`,
                '&:hover': {
                  bgcolor: 'primary.lighter',
                },
              },
            }}
          >
            <ListItemIcon>
              <FolderIcon />
            </ListItemIcon>
            <ListItemText primary={folder.name} />
          </ListItemButton>
          <Collapse
            in={openFolders.includes(folder.name)}
            timeout="auto"
            unmountOnExit
          >
            <List
              component="div"
              disablePadding
            >
              {folder.contents.map((childItem) => renderFileOrFolder(childItem, level + 1))}
            </List>
          </Collapse>
        </Box>
      );
    } else {
      const file = item as File;
      return (
        <ListItemButton
          key={file.name}
          onClick={() => handleFileClick(file.name)}
          selected={file.name === selected}
          sx={{
            cursor: 'pointer',
            pl: 2 * level,
            ':hover': { bgcolor: 'secondary.lighter' },
            '&.Mui-selected': {
              bgcolor: 'primary.lighter',
              borderRight: `2px solid ${theme.palette.primary.main}`,
              '&:hover': {
                bgcolor: 'primary.lighter',
              },
            },
          }}
        >
          <ListItemIcon>
            <InsertDriveFileIcon />
          </ListItemIcon>
          <ListItemText primary={file.name} />
        </ListItemButton>
      );
    }
  };

  return <List>{data.map((element) => renderFileOrFolder(element, 0))}</List>;
};
