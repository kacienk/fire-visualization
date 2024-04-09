import { useState } from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
  Typography,
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { useTheme } from '@mui/material/styles';


interface File {
  name: string;
  type: 'file';
}

interface Folder {
  name: string;
  type: 'folder';
  contents: (File | Folder)[];
}

type FileOrFolder = File | Folder;

interface Props {
  data: FileOrFolder[];
}

export const sampleData = [
  {
    name: "Folder1",
    type: "folder",
    contents: [
      {name: "File1"} as File,
      {name: "File2"} as File,
      {name: "File3"} as File
    ]
  } as Folder,
  {
    name: "Folder2",
    type: "folder",
    contents: [
      {name: "File1"} as File,
      {name: "File2"} as File,
      {name: "File3"} as File
    ]
  } as Folder,
  {name: "File1"} as File,
  {name: "File2"} as File,
]

const WorkspaceNavigation: React.FC<Props> = ({ data }) => {
  const [openFolders, setOpenFolders] = useState<string[]>([]);
  const theme = useTheme();

  const handleClick = (folderName: string) => {
    const isOpen = openFolders.includes(folderName);
    setOpenFolders(
      isOpen
        ? openFolders.filter((f) => f !== folderName)
        : [...openFolders, folderName]
    );

const WorkspaceNavigation: React.FC<Props> = ({ data }) => {
  const [openFolders, setOpenFolders] = useState<string[]>([]);
  const theme = useTheme()

  const handleClick = (folderName: string) => {
    const isOpen = openFolders.includes(folderName);
    setOpenFolders(
      isOpen
        ? openFolders.filter((f) => f !== folderName)
        : [...openFolders, folderName]
    );
  };

  const renderFileOrFolder = (item: FileOrFolder, level: number) => {
    if (item.type === 'folder') {
      const folder = item as Folder;
      return (
        <div key={folder.name}>
          <ListItem
            onClick={() => handleClick(folder.name)}
            sx={{cursor: "pointer", pl: 2 * level, ":hover": {bgcolor: "secondary.lighter"}}}
          >
            <ListItemIcon>
              <FolderIcon />
            </ListItemIcon>
            <ListItemText primary={folder.name} />
          </ListItem>
          <Collapse in={openFolders.includes(folder.name)} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {folder.contents.map((childItem) => renderFileOrFolder(childItem, level + 1))}
            </List>
          </Collapse>
        </div>
      );
    } else {
      const file = item as File;
      return (
        <ListItem key={file.name} sx={{cursor: "pointer", pl: 2 * level, ":hover": {bgcolor: "secondary.lighter"}}}>
          <ListItemIcon>
            <InsertDriveFileIcon />
          </ListItemIcon>
          <ListItemText primary={file.name} />
        </ListItem>
      );
    }
  };

  return (
    <Box sx={
      {
      boxSizing: 'border-box',
      width: 400,
      paddingX: 1,
      borderRight: `1px solid ${theme.palette.divider}`,
      backgroundImage: 'none',
      boxShadow: 'inherit',
      bgcolor: "secondary.A100"
      }
    }
    >
      <Typography sx={{ mt: 2, color: "secondary.main" }} variant="h6" component="div">
        Workspace
      </Typography>
      <List>
        {data.map((element) => renderFileOrFolder(element, 0))}
      </List>
    </Box>
  );
};


export default WorkspaceNavigation;
