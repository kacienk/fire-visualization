import { MapLocation } from './geography';

export const FireBrigadeStates = ['AVAILABLE', 'TRAVELLING', 'EXTINGUISHING'] as const;

export type FireBrigadeState = (typeof FireBrigadeStates)[number];

export interface FireBrigade {
  fireBrigadeId: number;
  timestamp: Date;
  state: FireBrigadeState;
  baseLocation: MapLocation;
  currentLocation: MapLocation;
}

export const getDefaultFireBrigade = (): FireBrigade => {
  return {
    fireBrigadeId: 0,
    timestamp: new Date(Date.now()),
    state: "AVAILABLE",
    baseLocation: {
      longitude: 0,
      latitude: 0
    },
    currentLocation: {
      longitude: 0,
      latitude: 0
    }
  }
}
