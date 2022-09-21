import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllCurrentUserSpots } from '../../../store/spotReducer';
import { NavLink } from 'react-router-dom';

function CurrentUserReviews() {
  // const dispatch = useDispatch();
  // const spots = useSelector(state => state.spot)

  // useEffect(() => {
  //   dispatch(thunkGetAllCurrentUserSpots());
  // }, [dispatch]);

  // if (!spots) { return null }

  // // console.log('spots!!!!', spots)
  // const spotsArr = Object.values(spots)

  return (
    <div className="current-user-spots">
      <h1>test</h1>

      {/* <nav>
        {spotsArr.map((spot) => (
          <div className="spot-card" id = {spot.id} key = {spot.name}>
            <div key={spot.id} to={`/spots/${spot.id}`}>
              <img className="spot-card-image" src={spot.previewImage} />
            </div>
            <div className="spot-card-title">
              <h4>{`in ${spot.city}, ${spot.state}`}</h4>
              <div className="spot-card-rating">
                <span> {spot.avgRating || 'New'} </span>
              </div>
            </div>
            <li className="spot-card-text">{spot.name}</li>
            <li className="spot-card-price">
              {` $${Math.round(spot.price)} per night`}
            </li>
            <NavLink exact to={`/spotss/${spot.id}/edit`}>Update This Spot's Information</NavLink>
          </div>
        ))}
      </nav> */}
    </div>
  );
}

export default CurrentUserReviews;
