interface MapLocation {
  longitude: number;
  latitude: number;
}

type LocationRect = [MapLocation, MapLocation, MapLocation, MapLocation];

type Direction = 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW';
