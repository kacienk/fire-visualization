import { getDefaultMapLocation } from './common';
import { MapLocation } from './geography';

export const FireBrigadeStates = ['AVAILABLE', 'TRAVELLING', 'EXTINGUISHING'] as const;

export type FireBrigadeState = (typeof FireBrigadeStates)[number];

export type FireBrigade = {
  fireBrigadeId: number;
  timestamp: number;
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
    timestamp: Date.now(),
    state: 'AVAILABLE',
    baseLocation: getDefaultMapLocation(),
    currentLocation: getDefaultMapLocation(),
  };
};
