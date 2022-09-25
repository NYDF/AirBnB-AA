import React from 'react';
import { Link } from 'react-router-dom';
import './SpotCard.css'

const SpotCard = (spot) => {
    const { id, city, state, name, price, avgRating, previewImage } = spot.spot;
    // console.log("++++",spot.spot)
    // console.log('!!!!!!!!!!!!!!spotcard',id)
    if (!spot) { return null }

    return (

        <a className="spot-card" href={`/spots/${id}`}>
            <Link key={spot.id} to={`/spots/${id}`}>
                <img className="spot-card-image" src={previewImage} />
            </Link>
            <div id="spot-card-title">
                <span>{`${city}, ${state}`}</span>
                <span id="spot-card-rating">
                <i className="fa-solid fa-star"></i>
                <span>{avgRating}</span>
                </span>

            </div >
            <div className="spot-card-text">{name}</div>
            <div>
                <span className="spot-card-price">{` $${Math.round(price)} `}</span>
                <span>per night</span>
            </div>
        </a>

    );
};

export default SpotCard;
