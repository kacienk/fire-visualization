import { getDefaultMapLocation } from './common';
import { MapLocation } from './geography';

export type Camera = {
  cameraId: number;
  location: MapLocation;
  range: number;
  timestamp: number;
};

export const isCamera = (obj: unknown): obj is Camera => {
  return (obj as Camera).cameraId !== undefined;
};

export const getDefaultCamera = (): Camera => {
  return {
    cameraId: 0,
    location: getDefaultMapLocation(),
    range: 1,
    timestamp: Date.now(),
  };
};
