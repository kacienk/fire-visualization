import { FC, useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import { SectorFormPart } from './SectorConfiguration';
import { Button, Divider, List, ListItem, Stack } from '@mui/material';
import { SensorsFormPart } from './form_parts/SensorConfiguration';
import { CamerasFormPart } from './form_parts/CameraConfiguration';
import { FireBrigadesFormPart } from './form_parts/FireBrigadeConfiguration';
import { ForesterPatrolsFormPart } from './form_parts/ForesterPatrolConfiguration';
import { useSelector } from 'react-redux';
import { RootState, dispatch } from '../../store/reduxStore';
import { MainCard } from '../MainCard';
import { setConfiguration } from '../../store/reducers/mapConfigurationSlice';
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
import { SensorlikeListItem } from './SensorlikeListItem';
import { PlusOutlined } from '@ant-design/icons';

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
      values.sensorId = Math.max(...newConfiguration.sensors.map((sensor) => sensor.sensorId)) + 1;
      newConfiguration.sensors.push(values);
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

  const objectWithinSelectedSector = (object: Sensor | Camera | FireBrigade | ForesterPatrol) => {
    if (currentSectorId === null || idx === undefined) return false;

    const lon_min = mapConfiguration.sectors[idx].contours[0][0];
    const lon_max = mapConfiguration.sectors[idx].contours[2][0];
    const lat_min = mapConfiguration.sectors[idx].contours[0][1];
    const lat_max = mapConfiguration.sectors[idx].contours[2][1];

    if (isSensor(object) || isCamera(object)) {
      return (
        lon_min <= object.location.longitude &&
        object.location.longitude <= lon_max &&
        lat_min <= object.location.latitude &&
        object.location.latitude <= lat_max
      );
    } else {
      return (
        lon_min <= object.currentLocation.longitude &&
        object.currentLocation.longitude <= lon_max &&
        lat_min <= object.currentLocation.latitude &&
        object.currentLocation.latitude <= lat_max
      );
    }
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
        currentSectorId={currentSectorId}
        closeModal={closeCreateSensorModal}
        handleSubmit={handleCreate}
      />
      <List>
        <ListItem
          sx={{
            p: '2px',
            borderRadius: '4px',
            transition: 'all 0.25s',
            '&:hover': {
              bgcolor: 'secondary.lighter',
            },
          }}
        >
          <Button
            sx={{
              display: 'inline-flex',
              flexGrow: 1,
              alignItems: 'center',
              justifyContent: 'center',
              height: 24,
              backgroundColor: 'transparent',
              '&:hover': {
                bgcolor: 'transparent',
              },
            }}
            type="button"
            color="secondary"
            onClick={() => setIsCreateSensorModalOpen(true)}
          >
            <PlusOutlined />
          </Button>
        </ListItem>
        {mapConfiguration.sensors
          .filter((sensor) => objectWithinSelectedSector(sensor))
          .map((sensor) => (
            <SensorlikeListItem
              key={sensor.sensorId}
              values={sensor}
              url={url}
            />
          ))}
      </List>
      <Divider>Cameras</Divider>
      <CreateCameraModal
        isOpen={isCreateCameraModalOpen}
        currentSectorId={currentSectorId}
        closeModal={closeCreateCameraModal}
        handleSubmit={handleCreate}
      />
      <List>
        <ListItem
          sx={{
            p: '2px',
            borderRadius: '4px',
            transition: 'all 0.25s',
            '&:hover': {
              bgcolor: 'secondary.lighter',
            },
          }}
        >
          <Button
            sx={{
              display: 'inline-flex',
              flexGrow: 1,
              alignItems: 'center',
              justifyContent: 'center',
              height: 24,
              backgroundColor: 'transparent',
              '&:hover': {
                bgcolor: 'transparent',
              },
            }}
            type="button"
            color="secondary"
            onClick={() => setIsCreateCameraModalOpen(true)}
          >
            <PlusOutlined />
          </Button>
        </ListItem>
        {mapConfiguration.cameras
          .filter((camera) => objectWithinSelectedSector(camera))
          .map((camera) => (
            <SensorlikeListItem
              key={camera.cameraId}
              values={camera}
              url={url}
            />
          ))}
      </List>
      <Divider>Fire Brigades</Divider>
      <CreateFireBrigadeModal
        isOpen={isCreateFireBrigadeModalOpen}
        currentSectorId={currentSectorId}
        closeModal={closeCreateFireBrigadeModal}
        handleSubmit={handleCreate}
      />
      <List>
        <ListItem
          sx={{
            p: '2px',
            borderRadius: '4px',
            transition: 'all 0.25s',
            '&:hover': {
              bgcolor: 'secondary.lighter',
            },
          }}
        >
          <Button
            sx={{
              display: 'inline-flex',
              flexGrow: 1,
              alignItems: 'center',
              justifyContent: 'center',
              height: 24,
              backgroundColor: 'transparent',
              '&:hover': {
                bgcolor: 'transparent',
              },
            }}
            type="button"
            color="secondary"
            onClick={() => setIsCreateFireBrigadeModalOpen(true)}
          >
            <PlusOutlined />
          </Button>
        </ListItem>
        {mapConfiguration.fireBrigades
          .filter((fireBrigade) => objectWithinSelectedSector(fireBrigade))
          .map((fireBrigade) => (
            <SensorlikeListItem
              key={fireBrigade.fireBrigadeId}
              values={fireBrigade}
              url={url}
            />
          ))}
      </List>
      <Divider>Forester Patrols</Divider>
      <CreateForesterPatrolModal
        isOpen={isCreateForesterPatrolModalOpen}
        currentSectorId={currentSectorId}
        closeModal={closeCreateForesterPatrolModal}
        handleSubmit={handleCreate}
      />
      <List>
        <ListItem
          sx={{
            p: '2px',
            borderRadius: '4px',
            transition: 'all 0.25s',
            '&:hover': {
              bgcolor: 'secondary.lighter',
            },
          }}
        >
          <Button
            sx={{
              display: 'inline-flex',
              flexGrow: 1,
              alignItems: 'center',
              justifyContent: 'center',
              height: 24,
              backgroundColor: 'transparent',
              '&:hover': {
                bgcolor: 'transparent',
              },
            }}
            type="button"
            color="secondary"
            onClick={() => setIsCreateForesterPatrolModalOpen(true)}
          >
            <PlusOutlined />
          </Button>
        </ListItem>
        {mapConfiguration.foresterPatrols
          .filter((foresterPatrol) => objectWithinSelectedSector(foresterPatrol))
          .map((foresterPatrol) => (
            <SensorlikeListItem
              key={foresterPatrol.foresterPatrolId}
              values={foresterPatrol}
              url={url}
            />
          ))}
      </List>
    </MainCard>
  );
};
