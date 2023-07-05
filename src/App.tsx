import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Map from './Map/Map';

function App() {
  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (e) => {
      const gpx = e?.target?.result;
      console.log(gpx);
    };
  };

  return (
    <div>
      <Container maxWidth="sm">
        <Box sx={{ fontFamily: 'default' }}>
          <h1>GPX Share</h1>
          <Map
            id="my-map"
            options={{
              center: { lat: 37.422, lng: -122.084 },
              zoom: 8,
            }}
          />
          <TextField
            type="file"
            id="gpx-file"
            onChange={handleFileUpload}
          />
          <Button variant="contained" component="span">
            Upload GPX file
          </Button>
        </Box>
      </Container>
    </div>
  );
}

export default App;
