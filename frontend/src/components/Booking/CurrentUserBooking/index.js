import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { thunkGetOneSpot } from '../../../store/spotReducer';
import { thunkAddReviewToSpot } from "../../../store/reviewReducer";
import { thunkLoadReviewsOfSpot } from "../../../store/reviewReducer";
import './CurrentUserBooking.css'
import { FaStar } from "react-icons/fa"

function CurrentUserBookings() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  // const [address, setAddress] = useState("");
  // const [city, setCity] = useState("");
  // const [state, setState] = useState("");
  // const [country, setCountry] = useState("");
  // const [lat, setLat] = useState("");
  // const [lng, setLng] = useState("");
  // const [name, setName] = useState("");
  // const [description, setDescription] = useState("");
  // const [price, setPrice] = useState("");
  // const [url, setUrl] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState("");
  const [errors, setErrors] = useState([]);
  const [validationErrors, setValidationErrors] = useState([]);
  const history = useHistory();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

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
      <div>Booking</div>
      <div className="reservation-inputs-container"></div>
      <label htmlFor="checkin-input">CHECK-IN </label>
      <input type="date" className="reservation-input"
        id="reservation-checkin-input" placeholder="Check-in"
        value={startDate}
        onChange={() => setStartDate(startDate)}
        min={`${new Date().toLocaleDateString('en-ca')}`} />
      <label htmlFor="reservation-checkout-input">CHECKOUT</label>

      <input type="date" className="reservation-input"
        id="reservation-checkout-input" placeholder="Check-out"
        value={endDate} onChange={() => setStartDate(endDate)}
        min={`${new Date(new Date(startDate).getTime() + ((24 + 9) * 60 * 60 * 1000)).toLocaleDateString('en-ca')}`} />

    </>
  );
}

export default CurrentUserBookings;
