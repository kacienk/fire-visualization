import { FC, useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import { SectorFormPart } from './SectorConfiguration';
import { Button, Divider, Stack } from '@mui/material';
import { SensorsFormPart } from './SensorConfiguration';
import { CamerasFormPart } from './CameraConfiguration';
import { FireBrigadesFormPart } from './FireBrigadeConfiguration';
import { ForesterPatrolsFormPart } from './ForesterPatrolConfiguration';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reduxStore';
import { MainCard } from '../MainCard';

export const ConfigurationForm: FC = () => {
  const { configuration: mapConfiguration, currentSectorId } = useSelector(
    (state: RootState) => state.mapConfiguration,
  );

  const [idx, setIdx] = useState<number | undefined>(undefined);
  useEffect(() => {
    setIdx(currentSectorId !== null ? currentSectorId - 1 : undefined);
  }, [currentSectorId]);

  if (currentSectorId === null || idx === undefined) return null;

  return (
    <MainCard sx={{ mt: 2 }}>
      <Formik
        initialValues={mapConfiguration}
        onSubmit={(values) => {
          const content = JSON.stringify(values);
          console.log(content); // save
        }}
      >
        <Form>
          <Stack spacing={2}>
            <Divider>Sector {currentSectorId}</Divider>
            <SectorFormPart
              readonly={true}
              idx={idx}
            />
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
    </MainCard>
  );
};
