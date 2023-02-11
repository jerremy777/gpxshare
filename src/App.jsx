import React, { useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer } from 'react-leaflet';

function App() {
  const [file, setFile] = useState(null);
  const [coordinates, setCoordinates] = useState([]);

  const onFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);

    try {
      const { data } = await axios.post('/upload', formData);
      setCoordinates(data.coordinates);
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
  const position = [coordinates[0][1], coordinates[0][0]];
  return (
    <MapContainer center={position} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  );
}

export default App;
