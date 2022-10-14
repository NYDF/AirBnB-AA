
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { thunkAddBookingToSpot } from "../../../store/bookingReducer";
import './CreateBooking.css'



function CreateBooking() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [hasSubmitted, setHasSubmitted] = useState("");
  const [errors, setErrors] = useState([]);
  const [validationErrors, setValidationErrors] = useState([]);
  const history = useHistory();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [numGuests, setNumGuests] = useState();
  const { spotId } = useParams();

  // useEffect(() => {
  //   let errors = [];
  //   setValidationErrors(errors)
  // }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    // if (validationErrors.length) { return }
    // setErrors([]);

    const bookingPayload = { id: spotId, startDate, endDate }
    let createdBooking = await dispatch(thunkAddBookingToSpot(bookingPayload)).catch(async (res) => {
      const data = await res.json();

      if (data && data.errors) setErrors(data.errors);

    });

    if (createdBooking) {
      history.push(`/bookings/current`)
    }
  }

  return (
    <>
      <form className="booking-create-form-container" onSubmit={handleSubmit}>
        <div className="booking-create-form">
        <div className="reservation-inputs-container">

          <div className="reservation-container-checkin-outer">
            <div className="reservation-container-checkin">
              <label htmlFor="checkin-input" className="booking-words">CHECK-IN </label>
              <input type="date" className="reservation-input"
                id="reservation-checkin-input" placeholder="Check-in"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                min={`${new Date().toLocaleDateString('en-ca')}`} />
            </div>
          </div>

          <div className="reservation-container-checkout-outer">
            <div className="reservation-container-checkout">
              <label htmlFor="reservation-checkout-input" className="booking-words">CHECKOUT</label>
              <input type="date" className="reservation-input"
                id="reservation-checkout-input" placeholder="Check-out"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                // min={`${new Date(new Date(startDate).getTime() + ((24 + 9) * 60 * 60 * 1000)).toLocaleDateString('en-ca')}`}
                />
            </div>
          </div>

        </div>

        <div className="reservation-guests-input-container" >
          <label htmlFor="reservation-guests-input" className="booking-words">GUESTS</label>
          <br></br>
          <span className="units-suffix">
            <input type="number" className="reservation-input"
              placeholder="1" min="1" max="6" />
            <span className="booking-words">{'          guests'}</span>
          </span>

        </div>
        </div>

      <button
        className="booking-create-button"
        // onClick={() => { alert('Sorry not availble') }}>Reserve</button>
        type="submit">Reserve</button>

      </form>
      <div className="booking-create-notes">You won't be charged yet</div>
    </>
  );
}

export default CreateBooking;
