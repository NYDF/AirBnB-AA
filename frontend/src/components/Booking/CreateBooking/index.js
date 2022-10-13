
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import './CreateBooking.css'


function CreateBooking() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [hasSubmitted, setHasSubmitted] = useState("");
  const [errors, setErrors] = useState([]);
  const [validationErrors, setValidationErrors] = useState([]);
  const history = useHistory();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [numGuests, setNumGuests] = useState();

  useEffect(() => {
    let errors = [];
    setValidationErrors(errors)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    if (validationErrors.length) { return }

    setErrors([]);
    setValidationErrors([]);
  }

  return (
    <>
      <form className="booking-create-form">
        <div className="reservation-inputs-container">

          <div className="reservation-container-checkin-outer">
          <div className="reservation-container-checkin">
            <label htmlFor="checkin-input" className="booking-words">CHECK-IN </label>
            <input type="date" className="reservation-input"
              id="reservation-checkin-input" placeholder="Check-in"
              value={startDate}
              onChange={() => setStartDate(startDate)}
              min={`${new Date().toLocaleDateString('en-ca')}`} />
          </div>
          </div>

          <div className="reservation-container-checkout-outer">
          <div className="reservation-container-checkout">
            <label htmlFor="reservation-checkout-input" className="booking-words">CHECKOUT</label>
            <input type="date" className="reservation-input"
              id="reservation-checkout-input" placeholder="Check-out"
              value={endDate} onChange={() => setStartDate(endDate)}
              min={`${new Date(new Date(startDate).getTime() + ((24 + 9) * 60 * 60 * 1000)).toLocaleDateString('en-ca')}`} />
          </div>
          </div>

        </div>

        <div className="reservation-guests-input-container" >
          <label htmlFor="reservation-guests-input" className="booking-words">GUESTS</label>
          <br></br>
          <span className="units-suffix">
            <input type="number" className="reservation-input" id="reservation-guests-input"
            placeholder="1"  value={numGuests} min="1" max="6" />
            <span className="booking-words">{'          guests'}</span>
          </span>

        </div>
      </form>
      <button
        className="booking-create-button"
        onClick={() => { alert('Sorry not availble') }}>Reserve</button>

      <div className="booking-create-notes">You won't be charged yet</div>
    </>
  );
}

export default CreateBooking;
