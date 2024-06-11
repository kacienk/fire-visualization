import { useRef } from 'react';
import { Modal, Typography, Stack, Button, Box } from '@mui/material';
import { Form, Formik, FormikProps } from 'formik';
import { MapWrapper } from '../../maps/MapWrapper';
import { NewConfigurationMap } from '../../maps/NewConfigurationMap';
import { Sensor, getDefaultSensor } from '../../../model/sensor';
import { SensorsFormPart } from '../SensorConfiguration';
import { SensorForm } from '../SensorlikeForms/SensorForm';
import { Camera, getDefaultCamera } from '../../../model/camera';

type CreateCameraModalProps = {
  isOpen: boolean;
  currentSectorId: number;
  handleSubmit: (values: Camera) => Promise<void>;
  closeModal: () => void;
};

export const CreateCameraModal = ({ isOpen, currentSectorId, handleSubmit, closeModal }: CreateCameraModalProps) => {
  const cameraFormRef = useRef<FormikProps<Camera> | null>(null);

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
        <Typography variant="h2">New sensor</Typography>

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
            initialValues={{ ...getDefaultCamera() }}
            innerRef={cameraFormRef}
            onSubmit={handleSubmit}
          >
            <Form>
              <Stack spacing={2}>
                <SensorForm />
              </Stack>

              <MapWrapper>
                <NewConfigurationMap />
              </MapWrapper>
            </Form>
          </Formik>
        </Box>

        <Button onClick={async () => await cameraFormRef.current?.submitForm()}>Create</Button>
        <Button onClick={closeModal}>Cancel</Button>
      </Box>
    </Modal>
  );
};
