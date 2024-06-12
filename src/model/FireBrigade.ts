import { MapLocation } from './geography';

export const FireBrigadeStates = ['AVAILABLE', 'TRAVELLING', 'EXTINGUISHING'] as const;

export type FireBrigadeState = (typeof FireBrigadeStates)[number];

export type FireBrigade = {
  fireBrigadeId: number;
  timestamp: Date;
  state: FireBrigadeState;
  baseLocation: MapLocation;
  currentLocation: MapLocation;
};

export const isFireBrigade = (obj: unknown): obj is FireBrigade => {
  return (obj as FireBrigade).fireBrigadeId !== undefined;
};

export const getDefaultFireBrigade = (): FireBrigade => {
  return {
    fireBrigadeId: 0,
    timestamp: new Date(),
    state: 'AVAILABLE',
    baseLocation: {
      longitude: 0,
      latitude: 0,
    },
    currentLocation: {
      longitude: 0,
      latitude: 0,
    },
  };
};
