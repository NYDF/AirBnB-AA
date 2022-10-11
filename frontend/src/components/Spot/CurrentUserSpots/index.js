import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllCurrentUserSpots } from '../../../store/spotReducer';
import { NavLink } from 'react-router-dom';
import './CurrentUserSpots.css'

function CurrentUserSpots() {
  const dispatch = useDispatch();
  const spots = useSelector(state => state.spot)
  // const all=useSelector(state => state)
  // console.log('all!!!!', all)

  useEffect(() => {
    dispatch(thunkGetAllCurrentUserSpots());
  }, [dispatch]);

  if (!spots) { return null }

  // console.log('spots!!!!', spots)

  const spotsArr = Object.values(spots)

  return (
    <div className="current-user-spots-container">

      <nav className="current-user-spots">
        {spotsArr.map((spot) => (
          <div className="current-spot-card" id={spot.id} key={spot.id}>
            <div key={spot.id} to={`/spots/${spot.id}`}>
              <img className="current-spot-card-image" src={spot.previewImage} alt='Still loading'/>
            </div>
            <div className="current-spot-card-title">
              <h4>{`in ${spot.city}, ${spot.state}`}</h4>
              <div className="spot-card-rating">
              </div>
            </div>
            <li className="spot-card-text">{spot.name}</li>
            <li className="spot-card-price">
              {` $${Math.round(spot.price)} per night`}
            </li>
            <NavLink
              className='update-spot-button'
              exact to={`/spotss/${spot.id}/edit`}>Update This Spot's Information</NavLink>
          </div>
        ))}
      </nav>
    </div>
  );
}

export default CurrentUserSpots;
