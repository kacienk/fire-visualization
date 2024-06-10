import { MapLocation } from './geography';

export const ForesterPatrolStates = ['AVAILABLE', 'TRAVELLING', 'PATROLLING', 'FORRESTING'] as const;

export type ForesterPatrolState = (typeof ForesterPatrolStates)[number];

export type ForesterPatrol = {
  foresterPatrolId: number;
  timestamp: Date;
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
    timestamp: new Date(),
    state: 'AVAILABLE',
    baseLocation: {
      latitude: 0,
      longitude: 0,
    },
    currentLocation: {
      latitude: 0,
      longitude: 0,
    },
  };
};
