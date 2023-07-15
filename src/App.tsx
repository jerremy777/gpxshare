import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import { parseString } from 'xml2js';
import Map from './Map/Map';

/*
TODO:
- Add file upload dialog to upload GPX file
- Validate GPX file
- Parse GPX file to google maps polyline (helper function)
- Add polyline to map
- Figure out how to persist GPX file or polyline data
- Add option to toggle Bicycling layer on map
- Add share button to share map with others
 */

function App() {
  // const [gpx, setGpx] = React.useState<File | null>(null);
  const [trackName, setTrackName] = React.useState<string | null>(null);
  const [segments, setSegments] = React.useState<google.maps.LatLngLiteral[][] | null>(null);

  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (e) => {
      const raw = e?.target?.result;
      // parse string to xml
      if (typeof raw === 'string') {
        parseString(raw, (err, result) => {
          // console.log(result);
          if (result.gpx) {
            // setGpx(file);
            if (result.gpx.trk?.length) {
              const name = result.gpx.trk[0].name?.length
                ? result.gpx.trk[0].name[0]
                : file.name;
              setTrackName(name);
              const trackSegments: google.maps.LatLngLiteral[][] = [];
              result.gpx.trk.forEach((trk: any) => {
                if (trk.trkseg?.length >= 1) {
                  trk.trkseg.forEach((trkseg: any) => {
                    if (trkseg.trkpt?.length >= 1) {
                      const points: google.maps.LatLngLiteral[] = trkseg.trkpt.map((pt: any) => ({
                        lat: parseFloat(pt.$.lat),
                        lng: parseFloat(pt.$.lon),
                      }));
                      trackSegments.push(points);
                    }
                  });
                }
              });
              // console.log('trackSegments: ', trackSegments);
              setSegments(trackSegments);
            }
          }
        });
      }
    };
  };

  return (
    <div>
      <Container maxWidth="sm" sx={{ fontFamily: 'default' }}>
        <Box sx={{ m: 1 }}>
          <h1>GPX Share</h1>
          <Map
            id="my-map"
            options={{
              center: { lat: 37.422, lng: -122.084 },
              zoom: 8,
            }}
            segments={segments}
          />
        </Box>
        <Divider />
        <Box sx={{ m: 1 }}>
          <Button variant="contained" component="label">
            Upload GPX file
            <input
              type="file"
              hidden
              accept=".gpx"
              onChange={handleFileUpload}
            />
          </Button>
          <Chip label={trackName || 'Choose a file'} />
        </Box>
      </Container>
    </div>
  );
}

export default App;
