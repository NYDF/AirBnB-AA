
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Calendar, DateRangePicker } from 'react-date-range';
import './CheckBooking.css'
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';


function CheckBooking() {
  const dispatch = useDispatch();
  const startDate = new Date();
  const endDate = new Date()
  const nextMonth = new Date(startDate.getTime() + (33 * (24) * 60 * 60 * 1000))

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection',
  }

  const previewOptions = {
    startDate: startDate,
    endDate: new Date(),
    key: 'selection',
  }

  return (
    <>
      <div className="reservation-calendar-container">
        <div className="reservation-calendar">
          <Calendar className="check-Calendar"
            // ranges={[selectionRange]}
            minDate={new Date()}
            startDate={startDate}
            selectsStart
            preview={previewOptions}
            // showPreview={true}
            selected={startDate}
          // disabledDates={}
          />
        </div>
        <div className="reservation-calendar">
          <Calendar className="check-Calendar"
            minDate={new Date()}
            // ranges={[selectionRange]}
            selectsEnd
            // preview={previewOptions}
            // showPreview={true}
            selected={endDate}
            shownDate={nextMonth}
          // disabledDates={}
          />
        </div>
      </div>
    </>
  );
}

export default CheckBooking;
