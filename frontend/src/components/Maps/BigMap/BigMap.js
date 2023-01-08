// frontend/src/components/Maps/Maps.js
import React from "react";
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '1160px',
  height: '480px',
};


const BigMap = ({ apiKey }) => {
  // console.log({apiKey})
  const { spotId } = useParams();

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  });

  let spot = useSelector(state => state.spot[spotId])

  let currentLat=spot.lat
  let currentLng=spot.lng

  const center = {
    lat: currentLat,
    lng: currentLng
  };

  return (
    <div className='google-map-small-container'>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}

          // da3b2e5f9cdbd038

          center={center}
          zoom={13}
        >

            <Marker
              color='#FF385C'
              position={center}
            >
            </Marker>

        </GoogleMap>
      )}
    </div>
  );
};

export default React.memo(BigMap);
