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
