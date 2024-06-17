import { FC, useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import { SectorFormPart } from './SectorConfiguration';
import { Button, Divider, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState, dispatch } from '../../store/reduxStore';
import { MainCard } from '../MainCard';
import { addSensor, setConfiguration } from '../../store/reducers/mapConfigurationSlice';
import { updateNode } from '../apiService';
import { mapFileSystemNodeToApiDataNode } from '../../model/FileSystemModel/FileSystemNode';
import { CreateSensorModal } from './create_items_modals/CreateSensorModal';
import { Sensor, isSensor } from '../../model/sensor';
import { FireBrigade, isFireBrigade } from '../../model/FireBrigade';
import { ForesterPatrol, isForesterPatrol } from '../../model/ForesterPatrol';
import { Camera, isCamera } from '../../model/camera';
import { CreateCameraModal } from './create_items_modals/CreateCameraModal';
import { CreateFireBrigadeModal } from './create_items_modals/CreateFireBrigadeModal';
import { CreateForesterPatrolModal } from './create_items_modals/CreateForesterPatrolModal';
import { SensorlikeList } from './SensorlikeList/SensorlikeList';
import { Configuration } from '../../model/configuration/configuration';

export const ConfigurationForm: FC = () => {
  const {
    configuration: mapConfiguration,
    currentSectorId,
    fileSystemNode,
  } = useSelector((state: RootState) => state.mapConfiguration);
  const [editInitialState, setEditInitialState] = useState<boolean>(false);
  const url = 'http://localhost:31415';

  const [isCreateSensorModalOpen, setIsCreateSensorModalOpen] = useState<boolean>(false);
  const [isCreateCameraModalOpen, setIsCreateCameraModalOpen] = useState<boolean>(false);
  const [isCreateFireBrigadeModalOpen, setIsCreateFireBrigadeModalOpen] = useState<boolean>(false);
  const [isCreateForesterPatrolModalOpen, setIsCreateForesterPatrolModalOpen] = useState<boolean>(false);

  const [idx, setIdx] = useState<number | undefined>(undefined);
  useEffect(() => {
    setIdx(currentSectorId !== null ? currentSectorId - 1 : undefined);
  }, [currentSectorId]);

  const closeCreateSensorModal = () => {
    setIsCreateSensorModalOpen(false);
  };

  const closeCreateCameraModal = () => {
    setIsCreateCameraModalOpen(false);
  };

  const closeCreateFireBrigadeModal = () => {
    setIsCreateFireBrigadeModalOpen(false);
  };

  const closeCreateForesterPatrolModal = () => {
    setIsCreateForesterPatrolModalOpen(false);
  };

  const handleCreate = async (values: Sensor | Camera | FireBrigade | ForesterPatrol) => {
    if (currentSectorId === null || idx === undefined) return;

    const newConfiguration = { ...mapConfiguration };
    if (isSensor(values)) {
      closeCreateSensorModal();

      // Assign new sensorId based on the current list of sensors
      if (mapConfiguration.sensors.length > 0) {
        values.sensorId = Math.max(...mapConfiguration.sensors.map((sensor) => sensor.sensorId)) + 1;
      } else {
        values.sensorId = 0;
      }

      // Update the configuration file/document with the new sensor
      const apiNode = mapFileSystemNodeToApiDataNode(fileSystemNode, null);
      apiNode.data = JSON.stringify({
        ...mapConfiguration,
        sensors: [...mapConfiguration.sensors, values],
      } satisfies Configuration);

      await updateNode(url, fileSystemNode.id, apiNode);

      // Add sensor to the mapConfiguration stored in the redux state
      dispatch(addSensor({ sensor: values }));
    } else if (isCamera(values)) {
      closeCreateCameraModal();
      values.cameraId = Math.max(...newConfiguration.cameras.map((camera) => camera.cameraId)) + 1;
      newConfiguration.cameras.push(values);
    } else if (isFireBrigade(values)) {
      closeCreateFireBrigadeModal();
      values.fireBrigadeId =
        Math.max(...newConfiguration.fireBrigades.map((fireBrigade) => fireBrigade.fireBrigadeId)) + 1;
      newConfiguration.fireBrigades.push(values);
    } else if (isForesterPatrol(values)) {
      closeCreateForesterPatrolModal();
      values.foresterPatrolId =
        Math.max(...newConfiguration.foresterPatrols.map((foresterPatrol) => foresterPatrol.foresterPatrolId)) + 1;
      newConfiguration.foresterPatrols.push(values);
    }

    // console.debug('newConfiguration', newConfiguration);

    // const stringifiedConfiguration = JSON.stringify(newConfiguration);
    // const apiNode = mapFileSystemNodeToApiDataNode(fileSystemNode, null);
    // console.debug('dupa5');
    // apiNode.data = stringifiedConfiguration;

    // const res = await updateNode(url, fileSystemNode.id, apiNode);
    // console.debug('res', res);

    // dispatch(
    //   setConfiguration({
    //     configuration: newConfiguration,
    //   }),
    // );
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
          </Stack>
        </Form>
      </Formik>
      <Divider>Sensors</Divider>
      <CreateSensorModal
        isOpen={isCreateSensorModalOpen}
        closeModal={closeCreateSensorModal}
        handleSubmit={handleCreate}
      />
      <SensorlikeList
        sensorlikeItems={mapConfiguration.sensors}
        url={url}
        openModal={setIsCreateSensorModalOpen}
      />
      <Divider>Cameras</Divider>
      <CreateCameraModal
        isOpen={isCreateCameraModalOpen}
        currentSectorId={currentSectorId}
        closeModal={closeCreateCameraModal}
        handleSubmit={handleCreate}
      />
      <SensorlikeList
        sensorlikeItems={mapConfiguration.cameras}
        url={url}
        openModal={setIsCreateCameraModalOpen}
      />
      <Divider>Fire Brigades</Divider>
      <CreateFireBrigadeModal
        isOpen={isCreateFireBrigadeModalOpen}
        currentSectorId={currentSectorId}
        closeModal={closeCreateFireBrigadeModal}
        handleSubmit={handleCreate}
      />
      <SensorlikeList
        sensorlikeItems={mapConfiguration.fireBrigades}
        url={url}
        openModal={setIsCreateFireBrigadeModalOpen}
      />
      <Divider>Forester Patrols</Divider>
      <CreateForesterPatrolModal
        isOpen={isCreateForesterPatrolModalOpen}
        currentSectorId={currentSectorId}
        closeModal={closeCreateForesterPatrolModal}
        handleSubmit={handleCreate}
      />
      <SensorlikeList
        sensorlikeItems={mapConfiguration.foresterPatrols}
        url={url}
        openModal={setIsCreateForesterPatrolModalOpen}
      />
    </MainCard>
  );
};
