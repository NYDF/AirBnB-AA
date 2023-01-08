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

// const markers = [
//   {
//     id: 1,
//     name: "$559",
//     position: {
//       lat: 40.775956845776456,
//       lng: -73.98960213025359
//     }
//   },
//   {
//     id: 2,
//     name: "$836",
//     position: {
//       lat: 40.74955966427739,
//       lng: -74.02510224374731
//     }
//   },
//   {
//     id: 3,
//     name: "$888",
//     position: {
//       lat: 40.77633024472602,
//       lng: -73.93335058792488
//     }
//   },
//   {
//     id: 4,
//     name: "$559",
//     position: {
//       lat: 40.70977216636848,
//       lng: -73.96819584374789
//     }
//   },
//   {
//     id: 5,
//     name: "$939",
//     position: {
//       lat: 40.711134787673394,
//       lng: -73.99128024253406
//     }
//   },
//   {
//     id: 6,
//     name: "$888",
//     position: {
//       lat: 40.761314160529196,
//       lng: -74.04849675724024
//     }
//   },
//   {
//     id: 7,
//     name: "$633",
//     position: {
//       lat: 40.824106047769696,
//       lng: -73.97473994374613
//     }
//   },
//   {
//     id: 8,
//     name: "$369",
//     position: {
//       lat: 40.73895722480879,
//       lng: -73.98635305908984
//     }
//   }
// ];

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

  console.log('markers^^^^^^^^^^^^^^^^^^^^', markers)

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
