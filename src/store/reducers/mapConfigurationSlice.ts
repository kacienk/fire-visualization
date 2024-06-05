import { createSlice } from '@reduxjs/toolkit';
import { Configuration, getDefaultConfiguration } from '../../model/configuration/configuration';
import { FileSystemNode } from '../../model/FileSystemModel/FileSystemNode';
import { NodeTypeEnum } from '../../model/FileSystemModel/NodeTypeEnum';

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
  },
});

export const { setConfiguration, setCurrentSectorId, setFileSystemNode } = mapConfigurationSlice.actions;
export const { reducer: mapConfigurationReducer } = mapConfigurationSlice;
