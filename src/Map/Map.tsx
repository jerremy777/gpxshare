/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable no-new */
import React, { useEffect, useRef } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';

const API_KEY = process.env.GOOGLE_MAPS_API_KEY || '';

interface MapProps {
  id: string;
  options: google.maps.MapOptions;
  segments: google.maps.LatLngLiteral[][] | null;
}

function MapRenderer({ id, options, segments }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapRef.current) {
      const map = new window.google.maps.Map(mapRef.current, options);
      if (segments) {
        segments.forEach((segment) => {
          const polyline = new window.google.maps.Polyline({
            path: segment,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2,
          });
          console.log('polyline: ', polyline);
          polyline.setMap(map);
        });
      }
    }
  }, [mapRef, options, segments]);

  return (
    <div style={{ width: 500, height: 500 }} id={id} ref={mapRef} />
  );
}

function Map(props: MapProps) {
  const { id, options, segments } = props;

  // Create a new map once the Google Maps API loads
  const renderMap = (status: Status) => {
    switch (status) {
      case Status.LOADING:
        return <div>Loading...</div>;
      case Status.FAILURE:
        return <div>Failed to load Google Maps</div>;
      case Status.SUCCESS:
        return <MapRenderer id={id} options={options} segments={segments} />;
      default:
        return <div>Something went wrong</div>;
    }
  };

  return <Wrapper apiKey={API_KEY} render={renderMap} />;
}

export default Map;
