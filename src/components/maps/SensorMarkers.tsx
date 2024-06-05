import { useState, useRef, useEffect, memo } from 'react';

// maps
import { useMap, AdvancedMarker } from '@vis.gl/react-google-maps';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import type { Marker } from '@googlemaps/markerclusterer';

import { SensorType } from '../../model/sensor';

export type SensorMarker = {
  location: google.maps.LatLngLiteral;
  key: string;
  type: SensorType;
};

type SensorMarkersProps = {
  sensors: SensorMarker[];
};

export const SensorMarkers = memo(({ sensors }: SensorMarkersProps) => {
  const map = useMap('main-map');
  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
  const clusterer = useRef<MarkerClusterer | null>(null);

  // Initialize MarkerClusterer
  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map });
    }
  }, [map]);

  // Update markers
  useEffect(() => {
    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markers));
  }, [markers]);

  const setMarkerRef = (marker: Marker | null, key: string) => {
    if (marker && markers[key]) return;
    if (!marker && !markers[key]) return;

    setMarkers((prev) => {
      if (marker) {
        return { ...prev, [key]: marker };
      } else {
        const newMarkers = { ...prev };
        delete newMarkers[key];
        return newMarkers;
      }
    });
  };

  return (
    <>
      {sensors.map(({ location, key, type }) => (
        <AdvancedMarker
          position={location}
          key={key}
          ref={(marker: Marker | null) => setMarkerRef(marker, key)}
        >
          <span className="sensor-marker">{sensorTypeToEmoji(type)}</span>
        </AdvancedMarker>
      ))}
    </>
  );
});
SensorMarkers.displayName = 'SensorMarkers';

const sensorTypeToEmoji = (sensorType: SensorType) => {
  switch (sensorType) {
    case 'TEMPERATURE_AND_AIR_HUMIDITY':
      return '🌡️';
    case 'WIND_SPEED':
      return '🌪';
    case 'WIND_DIRECTION':
      return '🧭';
    case 'LITTER_MOISTURE':
      return '🌿';
    case 'PM2_5':
      return '🫁';
    case 'CO2':
      return '💨';
    default:
      return '❌';
  }
};
