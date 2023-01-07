// frontend/src/components/Maps/Maps.js
import React from 'react';

import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '560px',
  height: '280px',
};

const defaultLocation = {
  lat: 40.74363402543966,
  lng: -73.98377122848856
};

const SmallMaps = ({ apiKey, lat, lng, setLat, setLng }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  });
  const [mapref, setMapRef] = React.useState(null);
  const handleOnLoad = map => {
    setMapRef(map);
  };
  const handleCenterChanged = () => {
    if (mapref) {
      const newCenter = mapref.getCenter();
      setLat(newCenter.lat());
      setLng(newCenter.lng());
      // console.log('lat----------',newCenter.lat(), 'lng+++++++++', newCenter.lng())
    }
  };
  // console.log(lat, lng)

  const center = { lat, lng };

  return (
    <div className='google-map-small-container'>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={defaultLocation}
          onLoad={handleOnLoad}
          onCenterChanged={handleCenterChanged}
          zoom={13}
        >

          <Marker
            color='#FF385C'
            position={center}
          ></Marker>

        </GoogleMap>
      )}
    </div>
  );
};

export default React.memo(SmallMaps);
