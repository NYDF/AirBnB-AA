import React from 'react';
import { Link } from 'react-router-dom';
import './SpotCard.css'

const SpotCard = (spot) => {
    const { id, city, state, name, price, avgRating, previewImage } = spot.spot;
    // console.log("++++",spot.spot)
    // console.log('!!!!!!!!!!!!!!spotcard',id)
    if (!spot) { return null }

    return (

        <div className="spot-card" >
            <Link key={spot.id} to={`/spots/${id}`}>
                <img className="spot-card-image" src={previewImage} />
            </Link>
            <div className="spot-card-title">
                <h4>{`in ${city}, ${state}`}</h4>
                <div className="spot-card-rating">
                    <span> {avgRating || 'New'} </span>
                </div>
            </div>
            <li className="spot-card-text">{name}</li>
            <li className="spot-card-price">
                {` $${Math.round(price)} per night`}
            </li>
        </div>
    );
};

export default SpotCard;
