import { createSlice } from '@reduxjs/toolkit';
import { Configuration, getDefaultConfiguration } from '../../model/configuration/configuration';
import { FileSystemNode } from '../../model/FileSystemModel/FileSystemNode';
import { NodeTypeEnum } from '../../model/FileSystemModel/NodeTypeEnum';
import { Sensor } from '../../model/sensor';

type mapConfigurationState = {
  fileSystemNode: FileSystemNode;
  configuration: Configuration;
  currentSectorId: number | null;
};

const initialState: mapConfigurationState = {
  fileSystemNode: {
    id: '',
    name: '',
    nodeType: NodeTypeEnum.FILE,
  },
  configuration: getDefaultConfiguration(),
  currentSectorId: null,
};

export const mapConfigurationSlice = createSlice({
  name: 'mapConfiguration',
  initialState,
  reducers: {
    setConfiguration: (state, action) => {
      const { configuration } = action.payload;
      const processedSectors = Configuration.preprocessSectors(configuration);
      state.configuration = { ...configuration, sectors: processedSectors };
    },
    setCurrentSectorId: (state, action) => {
      const { currentSectorId: prevSectorId } = state;
      const { currentSectorId: nextSectorId } = action.payload;
      state.currentSectorId = prevSectorId !== nextSectorId ? nextSectorId : null;
    },
    setFileSystemNode: (state, action) => {
      const { fileSystemNode } = action.payload;
      state.fileSystemNode = fileSystemNode;
    },
    addSensor: (state, action: { payload: { sensor: Sensor }; type: string }) => {
      const { sensor } = action.payload;
      state.configuration.sensors.push(sensor);
    },
  },
});

export const { setConfiguration, setCurrentSectorId, setFileSystemNode, addSensor } = mapConfigurationSlice.actions;
export const { reducer: mapConfigurationReducer } = mapConfigurationSlice;
