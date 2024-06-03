import { createSlice } from '@reduxjs/toolkit';
import { Configuration, getDefaultConfiguration } from '../../model/configuration/configuration';

type mapConfigurationState = {
  configuration: Configuration;
  currentSectorId: number | null;
};

const initialState: mapConfigurationState = {
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

      // reset the currentSectorId
      state.currentSectorId = null;
    },
    setCurrentSectorId: (state, action) => {
      const { currentSectorId: prevSectorId } = state;
      const { currentSectorId: nextSectorId } = action.payload;
      state.currentSectorId = prevSectorId !== nextSectorId ? nextSectorId : null;
    },
  },
});

export const { setConfiguration, setCurrentSectorId } = mapConfigurationSlice.actions;
export const { reducer: mapConfigurationReducer } = mapConfigurationSlice;
