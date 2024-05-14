import { MapLocation } from './geography';

export interface Camera {
  cameraId: number;
  location: MapLocation;
  range: number;
  timestamp: Date;
}

export const getDefaultCamera = (): Camera => {
  return {
    cameraId: 0,
    location: {
      latitude: 0,
      longitude: 0
    },
    range: 1,
    timestamp: new Date(Date.now())
  }
}