import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { thunkGetAllSpots } from '../../../store/spotReducer';
import SpotCard from '../SpotCard';

function SpotsIndex() {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spot)


    useEffect(() => {
        dispatch(thunkGetAllSpots());
    }, [dispatch]);

    if (!spots) { return null; }

    const spotsArr = Object.values(spots)

    return (
        <div className="spots-index">
            {spotsArr.map((spot) => <SpotCard key={spot.id} spot={spot} />)}
            {/* <nav>
                {spotsArr.map((spot) => (
                    <Link
                        key={spot.id}
                        to={`/spots/${spot.id}`}
                        src={spot.previewImage}
                    >
                        {spot.name}
                    </Link>
                ))}
            </nav> */}
        </div>
    );
}

export default SpotsIndex;
