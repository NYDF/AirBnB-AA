import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getKey } from '../../../store/maps';
import SmallMaps from './SmallMaps';


const SmallMapContainer = ({ lat, lng, setLat, setLng }) => {
  const key = useSelector((state) => state.mapsReducer?.key);
  // console.log('key================', key)
  const dispatch = useDispatch();

  useEffect(() => {
    if (!key) { dispatch(getKey()) }
  }, [dispatch, key]);

  if (!key) {
    return null;
  }

  return (
    <SmallMaps
      apiKey={key}
      lat={lat}
      lng={lng}
      setLat={setLat}
      setLng={setLng}
    />
  );
};

export default SmallMapContainer;
