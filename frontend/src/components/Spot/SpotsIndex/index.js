import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllSpots } from '../../../store/spotReducer';
import SpotCard from '../SpotCard';
import './SpotsIndex.css'

function SpotsIndex() {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spot)

    useEffect(() => {
        dispatch(thunkGetAllSpots());
    }, [dispatch]);

    if (!spots) { return null }

    const spotsArr = Object.values(spots)

    return (
        <div id='spots-index-container'>
        <div className="spots-index">
            {spotsArr.map((spot) => <SpotCard key={spot.id} spot={spot} />)}
        </div>
        </div>
    );
}

export default SpotsIndex;
