import { createSlice } from '@reduxjs/toolkit';
import { mapConfigMockup } from '../../data/sectorsMockup';
import { Configuration } from '../../model/configuration/configuration';

const initialState: Configuration = mapConfigMockup;

export const mapConfigurationSlice = createSlice({
  name: 'mapConfiguration',
  initialState,
  reducers: {},
});

export const {} = mapConfigurationSlice.actions;
export const { reducer: mapConfigurationReducer } = mapConfigurationSlice;
