// third-party
import { combineReducers } from 'redux';

// project import
import menuReducer from './menuSlice';

// ==============================|| COMBINE REDUCERS ||============================== //

export const combinedReducers = combineReducers({ menu: menuReducer });
