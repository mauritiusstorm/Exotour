import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export interface MapboxMarker {
  id: string;
  longitude: number;
  latitude: number;
  label?: string;
}

interface MapboxMapProps {
  center: [longitude: number, latitude: number];
  zoom?: number;
  markers?: MapboxMarker[];
  className?: string;
}

/**
 * Ready-to-use Mapbox wrapper for the future partner space (map of trip
 * routes). Not rendered anywhere on the public vitrine yet — requires
 * VITE_MAPBOX_TOKEN to be set.
 */
export default function MapboxMap({ center, zoom = 10, markers = [], className = '' }: MapboxMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    const token = import.meta.env.VITE_MAPBOX_TOKEN;
    if (!token || !containerRef.current) return;

    mapboxgl.accessToken = token;
    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center,
      zoom
    });
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const markerInstances = markers.map((marker) => {
      const el = document.createElement('div');
      el.className = 'h-3 w-3 rounded-full bg-gold border-2 border-navy';
      return new mapboxgl.Marker(el)
        .setLngLat([marker.longitude, marker.latitude])
        .setPopup(marker.label ? new mapboxgl.Popup({ offset: 12 }).setText(marker.label) : undefined)
        .addTo(map);
    });

    return () => {
      markerInstances.forEach((marker) => marker.remove());
    };
  }, [markers]);

  if (!import.meta.env.VITE_MAPBOX_TOKEN) {
    return (
      <div className={`flex items-center justify-center rounded-xl bg-navy/5 p-6 text-sm text-ink/60 ${className}`}>
        Configurez VITE_MAPBOX_TOKEN pour afficher la carte.
      </div>
    );
  }

  return <div ref={containerRef} className={className} />;
}
