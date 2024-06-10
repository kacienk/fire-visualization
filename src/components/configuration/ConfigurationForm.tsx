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
import { CreateSensorModal } from './CreateItemsModals/CreateSensorModal';
import { Sensor, isSensor } from '../../model/sensor';
import { FireBrigade, isFireBrigade } from '../../model/FireBrigade';
import { ForesterPatrol, isForesterPatrol } from '../../model/ForesterPatrol';
import { Camera, isCamera } from '../../model/camera';

export const ConfigurationForm: FC = () => {
  const {
    configuration: mapConfiguration,
    currentSectorId,
    fileSystemNode,
  } = useSelector((state: RootState) => state.mapConfiguration);
  const [editInitialState, setEditInitialState] = useState<boolean>(false);
  const url = 'http://localhost:31415';

  const [isCreateSensorModalOpen, setIsCreateSensorModalOpen] = useState<boolean>(false);

  const [idx, setIdx] = useState<number | undefined>(undefined);
  useEffect(() => {
    setIdx(currentSectorId !== null ? currentSectorId - 1 : undefined);
  }, [currentSectorId]);

  const closeCreateSensorModal = () => {
    setIsCreateSensorModalOpen(false);
  };

  const handleCreate = async (values: Sensor | Camera | FireBrigade | ForesterPatrol) => {
    closeCreateSensorModal();
    if (currentSectorId === null || idx === undefined) return;

    const newConfiguration = { ...mapConfiguration };
    if (isSensor(values)) {
      values.sensorId = Math.max(...newConfiguration.sensors.map((sensor) => sensor.sensorId)) + 1;
      newConfiguration.sensors.push(values);
    } else if (isCamera(values)) {
      values.cameraId = Math.max(...newConfiguration.cameras.map((camera) => camera.cameraId)) + 1;
      newConfiguration.cameras.push(values);
    } else if (isFireBrigade(values)) {
      values.fireBrigadeId =
        Math.max(...newConfiguration.fireBrigades.map((fireBrigade) => fireBrigade.fireBrigadeId)) + 1;
      newConfiguration.fireBrigades.push(values);
    } else if (isForesterPatrol(values)) {
      values.foresterPatrolId =
        Math.max(...newConfiguration.foresterPatrols.map((foresterPatrol) => foresterPatrol.foresterPatrolId)) + 1;
      newConfiguration.foresterPatrols.push(values);
    }

    const stringifiedConfiguration = JSON.stringify(newConfiguration);
    const apiNode = mapFileSystemNodeToApiDataNode(fileSystemNode, null);
    apiNode.data = stringifiedConfiguration;

    updateNode(url, fileSystemNode.id, apiNode).then(() => {
      dispatch(
        setConfiguration({
          configuration: newConfiguration,
        }),
      );
    });
  };

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
            <CreateSensorModal
              isOpen={isCreateSensorModalOpen}
              currentSectorId={currentSectorId}
              closeModal={closeCreateSensorModal}
              handleSubmit={handleCreate}
            />
            <Button
              color="primary"
              variant="outlined"
              type="button"
              onClick={() => setIsCreateSensorModalOpen(true)}
            >
              Add
            </Button>
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
