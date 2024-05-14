import { MapLocation } from './geography';

export const ForesterPatrolStates = ['AVAILABLE', 'TRAVELLING', 'PATROLLING', 'FORRESTING'] as const;

export type ForesterPatrolState = (typeof ForesterPatrolStates)[number];

export interface ForesterPatrol {
  foresterPatrolId: number;
  timestamp: Date;
  state: ForesterPatrolState;
  baseLocation: MapLocation;
  currentLocation: MapLocation;
}

export const getDefaultForesterPatrol = (): ForesterPatrol => {
  return {
    foresterPatrolId: 0,
    timestamp: new Date(Date.now()),
    state: "AVAILABLE",
    baseLocation: {
      latitude: 0,
      longitude: 0
    },
    currentLocation: {
      latitude: 0,
      longitude: 0
    }
  }
}