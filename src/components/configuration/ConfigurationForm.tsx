import { FC } from 'react';
import { getDefaultConfiguration } from '../../model/configuration/configuration';
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
      initialValues={{ ...getDefaultConfiguration() }}
      onSubmit={(values) => {
        const content = JSON.stringify(values);
        console.log(content); // save
      }}
    >
      <Form>
        <Stack spacing={2}>
          <ForestFormPart />
          <Divider>Sectors</Divider>
          <SectorsFormPart readonly={false} />
          <Divider>Sensors</Divider>
          <SensorsFormPart readonly={false} />
          <Divider>Cameras</Divider>
          <CamerasFormPart readonly={false} />
          <Divider>Fire Brigades</Divider>
          <FireBrigadesFormPart readonly={false} />
          <Divider>Forester Patrols</Divider>
          <ForesterPatrolsFormPart readonly={false} />
          <Button
            color={'primary'}
            variant={'contained'}
            type={'submit'}
          >
            Save
          </Button>
        </Stack>
      </Form>
    </Formik>
  );
};
