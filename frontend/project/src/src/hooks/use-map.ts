import {useEffect, useState, useRef, RefObject} from 'react';
import leaflet, { Map } from 'leaflet';
import { Coordinate } from '../types/map';

function useMap(mapRef: RefObject<HTMLDivElement>, city: Coordinate) {
    const [map, setMap] = useState<Map | null>(null);
    const isRenderedRef = useRef(false);
  
    useEffect(() => {
      if (mapRef.current !== null && !isRenderedRef.current) {
        const instance = leaflet.map(mapRef.current, {
          center: {
            lat: city.lat,
            lng: city.lng,
          },
          zoom: city.zoom,
        });
  
        leaflet
          .tileLayer(
            'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
            {
              attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            },
          )
          .addTo(instance);
  
        setMap(instance);
        isRenderedRef.current = true;
      }
    }, [mapRef, city]);
  
    return map;
  }
  
  export default useMap;