import { createSlice } from '@reduxjs/toolkit';
import { Configuration, getDefaultConfiguration } from '../../model/configuration/configuration';

const initialState: {
  configuration: Configuration;
} = {
  configuration: getDefaultConfiguration(),
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
  },
});

export const { setConfiguration } = mapConfigurationSlice.actions;
export const { reducer: mapConfigurationReducer } = mapConfigurationSlice;
