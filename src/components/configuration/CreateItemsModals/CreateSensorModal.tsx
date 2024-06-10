import { useRef } from 'react';
import { Modal, Typography, Stack, Button, Box } from '@mui/material';
import { Form, Formik, FormikProps } from 'formik';
import { MapWrapper } from '../../maps/MapWrapper';
import { NewConfigurationMap } from '../../maps/NewConfigurationMap';
import { Sensor, getDefaultSensor } from '../../../model/sensor';
import { SensorsFormPart } from '../SensorConfiguration';
import { SensorForm } from '../SensorForm';

type CreateSensorModalProps = {
  isOpen: boolean;
  currentSectorId: number;
  handleSubmit: (values: Sensor) => Promise<void>;
  closeModal: () => void;
};

export const CreateSensorModal = ({ isOpen, currentSectorId, handleSubmit, closeModal }: CreateSensorModalProps) => {
  const sensorFormRef = useRef<FormikProps<Sensor> | null>(null);

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
            initialValues={{ ...getDefaultSensor() }}
            innerRef={sensorFormRef}
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

        <Button onClick={async () => await sensorFormRef.current?.submitForm()}>Create</Button>
        <Button onClick={closeModal}>Cancel</Button>
      </Box>
    </Modal>
  );
};
