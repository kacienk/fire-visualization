// third-party
import { configureStore } from '@reduxjs/toolkit';

// project import
import { combinedReducers } from './reducers';

// ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //

export const store = configureStore({
  reducer: combinedReducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const { dispatch } = store;
