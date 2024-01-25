import { Coordinate } from "../../types/map";
import { UserLocation } from "../../types/user-data";
import { locationToRussian } from "../../utils";
import { useRef, useEffect } from 'react';
import leaflet from 'leaflet';
import '../../../node_modules/leaflet/dist/leaflet.css';
import useMap from '../../hooks/use-map';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../constant';

type PopupUserMapProps = {
  name: string;
  location: UserLocation;
  onClose: () => void;
  onSendLocation: (location: UserLocation) => void;
  city: Coordinate;
  points: Coordinate[];
  selectedPoint: Coordinate;
};

function PopupUserMap({name, location, onClose, onSendLocation, city, points, selectedPoint}: PopupUserMapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  const defaultCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const currentCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_CURRENT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  useEffect(() => {
    if (map) {
      points.forEach((point) => {
        leaflet
          .marker({
            lat: point.lat,
            lng: point.lng,
          }, {
            icon: (point.title === selectedPoint.title)
              ? currentCustomIcon
              : defaultCustomIcon,
          })
          .addTo(map);
      });
    }
  }, [map, points, selectedPoint]);
  return (
    <section className="popup popup-map-user" style={{alignItems: 'flex-start'}}>
      <div className="popup__wrapper popup__wrapper--map">
        <div className="popup-head popup-head--address">
          <h2 className="popup-head__header">{name}</h2>
          <p className="popup-head__address">
            <svg className="popup-head__icon-location" width="12" height="14" aria-hidden="true">
              <use xlinkHref="#icon-location"></use>
            </svg><span>м. {locationToRussian(location)}</span>
          </p>
          <button
            className="btn-icon btn-icon--outlined btn-icon--big"
            type="button"
            aria-label="close"
            onClick={onClose}
          >
            <svg width="20" height="20" aria-hidden="true">
              <use xlinkHref="#icon-cross"></use>
            </svg>
          </button>
        </div>
        <div className="popup__content-map">
          <div
            style={{height: '650px'}}
            ref={mapRef}
          >
          </div>
        </div>
      </div>
    </section>
  );
}
export default PopupUserMap;
  