
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Calendar, DateRangePicker } from 'react-date-range';
import './CheckBooking.css'
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';


function CheckBooking() {
  const dispatch = useDispatch();


  useEffect(() => {
    let errors = [];

    // setValidationErrors(errors)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setHasSubmitted(true);
    // if (validationErrors.length) { return }

    // setErrors([]);
    // setValidationErrors([]);

  }

  return (
    <>
    <div className="reservation-calendar-container">
        <div className="reservation-calendar">
          <Calendar/>
        </div>
        <div className="reservation-calendar">
          <Calendar/>
        </div>
      </div>
      </>
  );
}

export default CheckBooking;

