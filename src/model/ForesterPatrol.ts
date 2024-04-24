const ForesterPatrolStates = ['AVAILABLE', 'TRAVELLING', 'PATROLLING', 'FORRESTING'] as const;

type ForesterPatrolState = (typeof ForesterPatrolStates)[number];

interface ForesterPatrol {
  foresterPatrolId: number;
  timestamp: Date;
  state: ForesterPatrolState;
  baseLocation: MapLocation;
  currentLocation: MapLocation;
}
