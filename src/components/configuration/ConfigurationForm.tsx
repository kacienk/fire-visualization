import { FC, useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import { SectorFormPart } from './SectorConfiguration';
import { Button, Divider, Stack } from '@mui/material';
import { SensorsFormPart } from './SensorConfiguration';
import { CamerasFormPart } from './CameraConfiguration';
import { FireBrigadesFormPart } from './FireBrigadeConfiguration';
import { ForesterPatrolsFormPart } from './ForesterPatrolConfiguration';
import { useSelector } from 'react-redux';
import { RootState, dispatch } from '../../store/reduxStore';
import { MainCard } from '../MainCard';
import { setConfiguration } from '../../store/reducers/mapConfigurationSlice';
import { updateNode } from '../apiService';
import { mapFileSystemNodeToApiDataNode } from '../../model/FileSystemModel/FileSystemNode';

export const ConfigurationForm: FC = () => {
  const {
    configuration: mapConfiguration,
    currentSectorId,
    fileSystemNode,
  } = useSelector((state: RootState) => state.mapConfiguration);
  const [editInitialState, setEditInitialState] = useState<boolean>(false);
  const url = 'http://localhost:31415';

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
          const stringifiedConfiguration = JSON.stringify(values);
          const apiNode = mapFileSystemNodeToApiDataNode(fileSystemNode, null);
          apiNode.data = stringifiedConfiguration;

          updateNode(url, fileSystemNode.id, apiNode).then(() => {
            dispatch(
              setConfiguration({
                configuration: values,
              }),
            );
          });
        }}
        enableReinitialize={true}
      >
        <Form>
          <Stack spacing={2}>
            <Divider>Sector {currentSectorId}</Divider>
            <SectorFormPart
              readonly={!editInitialState}
              obj={mapConfiguration.sectors[idx]}
            />
            <Button
              sx={{ display: editInitialState ? 'none' : 'block' }}
              color="primary"
              variant="outlined"
              type="button"
              onClick={() => setEditInitialState(true)}
            >
              Edit
            </Button>
            <Button
              sx={{ display: editInitialState ? 'block' : 'none' }}
              color="primary"
              variant="contained"
              type="submit"
              onClick={() => setEditInitialState(false)}
            >
              Save
            </Button>
            <Divider>Sensors</Divider>
            <SensorsFormPart
              readonly={false}
              currentSectorId={currentSectorId}
            />
            <Divider>Cameras</Divider>
            <CamerasFormPart
              readonly={false}
              currentSectorId={currentSectorId}
            />
            <Divider>Fire Brigades</Divider>
            <FireBrigadesFormPart readonly={false} />
            <Divider>Forester Patrols</Divider>
            <ForesterPatrolsFormPart readonly={false} />
          </Stack>
        </Form>
      </Formik>
    </MainCard>
  );
};
