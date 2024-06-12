import { useRef } from 'react';
import { Modal, Typography, Stack, Button, Box } from '@mui/material';
import { Form, Formik, FormikProps } from 'formik';
import { MapWrapper } from '../../maps/MapWrapper';
import { NewConfigurationMap } from '../../maps/NewConfigurationMap';
import { FireBrigade, getDefaultFireBrigade } from '../../../model/FireBrigade';
import { FireBrigadeForm } from '../SensorlikeForms/FireBrigadeForm';

type CreateFireBrigadeModalProps = {
  isOpen: boolean;
  currentSectorId: number;
  handleSubmit: (values: FireBrigade) => Promise<void>;
  closeModal: () => void;
};

export const CreateFireBrigadeModal = ({
  isOpen,
  currentSectorId,
  handleSubmit,
  closeModal,
}: CreateFireBrigadeModalProps) => {
  const fireBrigadeFormRef = useRef<FormikProps<FireBrigade> | null>(null);

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
            initialValues={{ ...getDefaultFireBrigade() }}
            innerRef={fireBrigadeFormRef}
            onSubmit={handleSubmit}
          >
            <Form>
              <Stack spacing={2}>
                <FireBrigadeForm />
              </Stack>

              <MapWrapper>
                <NewConfigurationMap />
              </MapWrapper>
            </Form>
          </Formik>
        </Box>

        <Button onClick={async () => await fireBrigadeFormRef.current?.submitForm()}>Create</Button>
        <Button onClick={closeModal}>Cancel</Button>
      </Box>
    </Modal>
  );
};
