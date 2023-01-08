import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getKey } from '../../../store/maps';
import BigMap from './BigMap';


const BigMapContainer = () => {
  const key = useSelector((state) => state.mapsReducer?.key);
  // console.log('key================', key)
  const dispatch = useDispatch();

  useEffect(() => {
    if (!key) {
      dispatch(getKey());
    }
  }, [dispatch, key]);

  if (!key) {
    return null;
  }

  return (
    <BigMap apiKey={key} />
  );
};

export default BigMapContainer;
