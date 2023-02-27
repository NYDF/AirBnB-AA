// frontend/src/components/Maps/Maps.js
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '1680px',
  height: '1860px',
};

const center = {
  lat: 40.70977216636848,
  lng: -73.96819584374789
};


const Maps = ({ apiKey, markers }) => {
  // console.log({apiKey})
  const history = useHistory();
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  });

  let spots = useSelector(state => state.spot)
  let spotsArr = Object.values(spots)


  // let markers=[]
  // spotsArr.forEach(ele=>markers.push({id:ele.id,name:('$ '+ele.price).toString(),position:{lat:ele.lat, lng:ele.lng}}))

  // console.log('markers^^^^^^^^^^^^^^^^^^^^', markers)

  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    history.push(`/spots/${marker}`)
  };

  if(!markers.length) {return null}
  return (
    <div className='google-map-small-container'>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}

          // da3b2e5f9cdbd038

          center={center}
          zoom={13}
        >
          {markers.map(({ id, name, position }) => (
            <Marker
              key={id}
              position={position}
              // label={name}
              title={name}
              onClick={() => handleActiveMarker(id)}
            >
              {/* {activeMarker === id ? (
                <InfoWindow>
                  <div>{name}</div>
                </InfoWindow>
              ) : null} */}
            </Marker>
          ))}
        </GoogleMap>
      )}
    </div>
  );
};

export default React.memo(Maps);
