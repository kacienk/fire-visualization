import { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { Modal, Typography, TextField, Stack, Button, Box } from '@mui/material';
import { Form, Formik, FormikProps } from 'formik';
import { ForestFormPart } from '../../../../components/configuration/ForestConfiguration';
import { FileSystemNodes } from './WorkspaceNavigation';
import { FileSystemNode } from '../../../../model/FileSystemModel/FileSystemNode';
import { Configuration } from '../../../../model/configuration/configuration';

type CreateConfigurationModalProps = {
  isOpen: boolean;

  url: string;

  newConfigurationName: string | null;
  setNewConfigurationName: Dispatch<SetStateAction<string | null>>;

  nodesData: FileSystemNodes;
  selectedNode: FileSystemNode | null;

  configuration: Configuration;
  setConfiguration: Dispatch<SetStateAction<Configuration>>;

  configurationFormRef: MutableRefObject<FormikProps<Configuration> | null>;

  handleCreateConfiguration: () => Promise<void>;

  closeModal: () => void;
};

export const CreateConfigurationModal = ({
  isOpen,
  url,
  newConfigurationName,
  setNewConfigurationName,
  nodesData,
  selectedNode,
  configuration,
  setConfiguration,
  configurationFormRef,
  handleCreateConfiguration,
  closeModal,
}: CreateConfigurationModalProps) => {
  return (
    <Modal
      open={isOpen}
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
        <Typography> Folder name: {selectedNode ? selectedNode.name : nodesData.parent?.name} </Typography>
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
        <Button onClick={closeModal}>Cancel</Button>
      </Box>
    </Modal>
  );
};
