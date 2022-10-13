import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { thunkGetAllCurrentUserBookings } from '../../../store/bookingReducer';
// import {  } from '../../../store/bookingReducer';
import './CurrentUserBooking.css'


function CurrentUserBookings() {
  const dispatch = useDispatch();
  const bookings = useSelector(state => state.booking)
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(thunkGetAllCurrentUserBookings());
  }, [dispatch]);

  if (!bookings) { return null }
  if (!sessionUser) { history.push(`/`) }

  // console.log('bookings!!!!', bookings)
  let bookingsArr = Object.values(bookings)
  console.log('bookingsArr!!!!', bookingsArr)

  // const handleDelete = async (bookingId) => {
  //   // bookingId.preventDefault();
  //   let deleteSpot = await dispatch(thunkDeleteBooking(bookingId))
  //   history.push(`/bookingss/current`)
  // }
  // console.log('bookingsArr!!!!', bookingsArr)
  return (
    <div className='booking-page-container'>
      <h1 className='all-booking'>All Your Trips</h1>

      <div className='booking-card-container'>
        {bookingsArr.map((booking) => (
          <div className="booking-card-container" id={booking.id} key={booking.id}>

            <div className="booking-card">

              <div className="booking-card-left">
                <div className="booking-card-title">{booking.Spot?.state} </div>
                <div className="booking-card-text">{booking.Spot?.name}</div>
                <hr></hr>

                <div className="booking-card-left-down">
                  <div className="booking-card-left-down-left">
                    <div className="booking-card-date">{booking.startDate.slice(5, 10)} --</div>
                    <div className="booking-card-date">{booking.endDate.slice(5, 10)}</div>
                    <div className="booking-card-date">{booking.endDate.slice(0, 4)}</div>
                  </div>

                  <div className="booking-card-left-down-right">
                  <div className="booking-card-address">{booking.Spot?.address}</div>
                    <div className="booking-card-address">{booking.Spot?.city},  {booking.Spot?.state} </div>
                    <div className="booking-card-address">{booking.Spot?.country}</div>
                  </div>

                </div>

              </div>

              <div className="booking-card-right">
                <img className="booking-card-image" src={booking.Spot?.previewImage} alt='picture loading' />
              </div>

            </div>

            {/* <button
              className='delete-booking-button'
              onClick={(e) => handleDelete(booking.id)}>Delete This Reservation</button>
              <hr></hr> */}
            <div className='space-booking-form'></div>
          </div>

        ))}
      </div>
    </div>
  );
}

export default CurrentUserBookings;
