import { FC } from 'react';
import { getDefaultConfigution } from '../../model/configuration/configuration';
import { Form, Formik } from 'formik';
import { SectorsFormPart } from './SectorConfiguration';
import { ForestFormPart } from './ForestConfiguration';
import { Button, Divider, Stack } from '@mui/material';
import { SensorsFormPart } from './SensorConfiguration';
import { CamerasFormPart } from './CameraConfiguration';
import { FireBrigadesFormPart } from './FireBrigadeConfiguration';
import { ForesterPatrolsFormPart } from './ForesterPatrolConfiguration';
export const ConfigurationForm: FC = () => {
  return (
    <Formik
      initialValues={{ ...getDefaultConfigution() }}
      onSubmit={(values) => {
        const content = JSON.stringify(values);
        console.log(content); // save
      }}
    >
      <Form>
        <Stack spacing={2}>
          <ForestFormPart />
          <Divider>Sectors</Divider>
          <SectorsFormPart />
          <Divider>Sensors</Divider>
          <SensorsFormPart />
          <Divider>Cameras</Divider>
          <CamerasFormPart />
          <Divider>Fire Brigades</Divider>
          <FireBrigadesFormPart />
          <Divider>Forester Patrols</Divider>
          <ForesterPatrolsFormPart />
        </Stack>
        <Button
          color={'primary'}
          variant={'contained'}
          type={'submit'}
        >
          Save
        </Button>
      </Form>
    </Formik>
  );
};
