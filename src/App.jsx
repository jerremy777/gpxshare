import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Polyline
} from 'react-leaflet';

import 'leaflet/dist/leaflet.css'

function App() {
  const [coordinates, setCoordinates] = useState([]);
  const [center, setCenter] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:9494/').then(res => {
      setCoordinates(res.data.coords);
      setCenter(res.data.center);
    })
  })

  return (
    <div>
      {center && center.length > 0 && (
        <Map center={center} coordinates={coordinates} />
      )}
    </div>
  );
}

function Map({ center, coordinates }) {
  return (
    <MapContainer
      center={center}
      zoom={16}
      style={{ height: '400px', width: '600px' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {center && center.length > 0 &&
        <Marker position={center}>
          <Popup>
            Center
          </Popup>
        </Marker>}
      {coordinates && coordinates.length > 0 &&
        <Polyline pathOptions={{ color: 'red' }} positions={coordinates} />
      }
    </MapContainer>
  );
}

export default App;
