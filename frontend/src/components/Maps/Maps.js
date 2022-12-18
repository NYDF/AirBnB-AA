// frontend/src/components/Maps/Maps.js
import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '2560px',
  height: '1360px',
};

const center = {
  lat: -3.745,
  lng: -38.523
};


const Maps = ({ apiKey }) => {
  // console.log({apiKey})
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  });

  return (
    <>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        >
          <Marker position={center}/>
        </GoogleMap>
      )}
    </>
  );
};

export default React.memo(Maps);
