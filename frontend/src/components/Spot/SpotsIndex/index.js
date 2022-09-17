import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { thunkGetAllSpots } from '../../../store/spotReducer';

function SpotsIndex() {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spot)


    useEffect(() => {
        dispatch(thunkGetAllSpots());
      }, [dispatch]);

      console.log("!!!!!!!!newspots", spots)

    if (!spots) { return null; }

    const spotsArr = Object.values(spots)

    return (
        <div className="spots-index">
            <h2>Spot Index!!!!!!!!</h2>
            <nav>
                {spotsArr.map((spot) => (
                    <Link
                        key={spot.id}
                        to={`/spots/${spot.id}`}
                        src={spot.previewImage}
                    >
                        {spot.name}
                    </Link>
                ))}
            </nav>
        </div>
    );
}

export default SpotsIndex;
