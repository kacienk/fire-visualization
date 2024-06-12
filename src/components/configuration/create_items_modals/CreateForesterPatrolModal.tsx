import { useRef } from 'react';
import { Modal, Typography, Stack, Button, Box } from '@mui/material';
import { Form, Formik, FormikProps } from 'formik';
import { MapWrapper } from '../../maps/MapWrapper';
import { NewConfigurationMap } from '../../maps/NewConfigurationMap';
import { ForesterPatrol, getDefaultForesterPatrol } from '../../../model/ForesterPatrol';
import { ForesterPatrolForm } from '../sensorlike_forms/ForesterPatrolForm';

type CreateForesterPatrolModalProps = {
  isOpen: boolean;
  currentSectorId: number;
  handleSubmit: (values: ForesterPatrol) => Promise<void>;
  closeModal: () => void;
};

export const CreateForesterPatrolModal = ({
  isOpen,
  currentSectorId,
  handleSubmit,
  closeModal,
}: CreateForesterPatrolModalProps) => {
  const foresterPatrolFormRef = useRef<FormikProps<ForesterPatrol> | null>(null);

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
        <Typography variant="h2">New fire brigade</Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            mt: 2,
            borderColor: 'secondary.darker',
            width: '620px',
            overflow: 'scroll',
          }}
        >
          <Formik
            initialValues={{ ...getDefaultForesterPatrol() }}
            innerRef={foresterPatrolFormRef}
            onSubmit={handleSubmit}
          >
            <Form>
              <Stack spacing={2}>
                <ForesterPatrolForm />
              </Stack>

              <MapWrapper>
                <NewConfigurationMap />
              </MapWrapper>
            </Form>
          </Formik>
        </Box>

        <Button onClick={async () => await foresterPatrolFormRef.current?.submitForm()}>Create</Button>
        <Button onClick={closeModal}>Cancel</Button>
      </Box>
    </Modal>
  );
};
