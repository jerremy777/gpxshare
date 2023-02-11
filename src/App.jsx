import React, { useState } from 'react';
import axios from 'axios';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

function App() {
  const [file, setFile] = useState(null);
  const [coordinates, setCoordinates] = useState([]);

  const onFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);

    try {
      const { data } = await axios.post('http://localhost:9494/', formData);
      setCoordinates(data);
    } catch (error) {
      console.error(error);
    }
  };

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <input type="file" onChange={onFileChange} />
        <button type="submit">Upload</button>
      </form>
      {coordinates.length > 0 && (
        <Map coordinates={coordinates} />
      )}
    </div>
  );
}

function Map({ coordinates }) {
  return (
    <MapContainer center={coordinates[0]} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {coordinates.map((coordinate, index) => (
        <Marker key={index} position={coordinate}>
          <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default App;
