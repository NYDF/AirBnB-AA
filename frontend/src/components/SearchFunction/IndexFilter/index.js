import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkLoadFilteredSpot } from "../../../store/filterReducer";
import './IndexFilter.css'


function IndexFilter() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [hasSubmitted, setHasSubmitted] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    const filteredSpotsPayload = { minPrice, maxPrice }
    // console.log('filteredSpotsPayload!!!', filteredSpotsPayload)

    let filteredSpots = await dispatch(thunkLoadFilteredSpot(filteredSpotsPayload))
    const filterSpotsArr = Object.values(filteredSpots.spots)

    // console.log('filterSpotsArr!!!!!!!!!!!!', filterSpotsArr)
    // console.log('filteredSpots!!!!!!!!!!!!', filteredSpots)

    if (filteredSpots) {
      history.push(`/spots`)
    }
  }

  return (
    <div
      className="learn-more-container">
      <div className="learn-more-window">

        <div className="learn-more-title">Filter</div>
        <hr></hr>

        <form onSubmit={handleSubmit}
          className="learn-more-text-container">

          <div className="learn-more-text">
            <h3>Minimum Price</h3>
            <input type="number" className="reservation-input"
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="1" min="1" max="1000" />
          </div>

          <div className="learn-more-text">
            <h3>Maximum Price</h3>
            <input type="number" className="reservation-input"
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="1" min="1" max="1000" />
          </div>

          <button
            className="booking-create-button"
            type="submit">Filter</button>

        </form>

      </div>
    </div>
  );
}

export default IndexFilter;
