import { MapLocation } from './geography';

export type Camera = {
  cameraId: number;
  location: MapLocation;
  range: number;
  timestamp: Date;
};

export const isCamera = (obj: unknown): obj is Camera => {
  return (obj as Camera).cameraId !== undefined;
};

export const getDefaultCamera = (): Camera => {
  return {
    cameraId: 0,
    location: {
      latitude: 0,
      longitude: 0,
    },
    range: 1,
    timestamp: new Date(Date.now()),
  };
};
