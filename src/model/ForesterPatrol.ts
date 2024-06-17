import { ForesterPatrolMarker } from '../components/maps/ForesterPatrolMarkers';
import { getDefaultMapLocation } from './common';
import { MapLocation } from './geography';

export const ForesterPatrolStates = ['AVAILABLE', 'TRAVELLING', 'PATROLLING', 'FORRESTING'] as const;

export type ForesterPatrolState = (typeof ForesterPatrolStates)[number];

export type ForesterPatrol = {
  foresterPatrolId: number;
  timestamp: number;
  state: ForesterPatrolState;
  baseLocation: MapLocation;
  currentLocation: MapLocation;
};

export const ForesterPatrol = {
  toMarkerProps: (foresterPatrol: ForesterPatrol): ForesterPatrolMarker => {
    return {
      location: { lng: foresterPatrol.currentLocation.longitude, lat: foresterPatrol.currentLocation.latitude },
      key: `foresterPatrol-${foresterPatrol.foresterPatrolId}`,
      state: foresterPatrol.state,
    };
  },
};

export const isForesterPatrol = (obj: unknown): obj is ForesterPatrol => {
  return (obj as ForesterPatrol).foresterPatrolId !== undefined;
};

export const getDefaultForesterPatrol = (): ForesterPatrol => {
  return {
    foresterPatrolId: 0,
    timestamp: Date.now(),
    state: 'AVAILABLE',
    baseLocation: getDefaultMapLocation(),
    currentLocation: getDefaultMapLocation(),
  };
};
