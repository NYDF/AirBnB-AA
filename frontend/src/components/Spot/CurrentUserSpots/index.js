import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllCurrentUserSpots } from '../../../store/spotReducer';
import { NavLink } from 'react-router-dom';
import './CurrentUserSpots.css'
import Footer from '../../Footer';

function CurrentUserSpots() {
  // const all=useSelector(state => state)
  // console.log('all!!!!', all)
  // const [isloaded, setIsloaded] = useState(false)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(thunkGetAllCurrentUserSpots());
    // setIsloaded(true)
  }, [dispatch]);

  const spots = useSelector(state => state.spot)
  // console.log('spots!!!!', spots)

  if (!spots) { return null }

  // if (!isloaded){return null}
  // console.log('spots!!!!', spots)

  const spotsArr = Object.values(spots)
  // console.log('spotsArr!!!!!', spotsArr)

  if (!spotsArr.length) {
    return (
      <div className='no-spot-text'>
        You have not hosted any spots yet.
      </div>
    )
  } else {
    return (
      <div className="current-user-spots-container">
        <nav className="current-user-spots">
          {spotsArr.map((spot) => (
            <div className="current-spot-card" id={spot.id} key={spot.id}>
              <div key={spot.id} to={`/spots/${spot.id}`}>
                <img className="current-spot-card-image" src={spot.previewImage} alt='Still loading' />
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
                exact to={`/spotss/${spot.id}/edit`}>Update This Spot's Info</NavLink>
            </div>
          ))}
          
        </nav>

      </div>
    )
  }
}


export default CurrentUserSpots;
