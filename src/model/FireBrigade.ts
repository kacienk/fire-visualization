const FireBrigadeStates = ['AVAILABLE', 'TRAVELLING', 'EXTINGUISHING'] as const;

type FireBrigadeState = (typeof FireBrigadeStates)[number];

interface FireBrigade {
  fireBrigadeId: number;
  timestamp: Date;
  state: FireBrigadeState;
  baseLocation: MapLocation;
  currentLocation: MapLocation;
}
