
import React from 'react';
import ListingMap from './../listing_map';
import ReviewIndexContainer from './../../review/review_index_container'
import { fetchReviews } from './../../../actions/review_actions';
import { withRouter } from 'react-router-dom';
import CreateReservationFormContainer from './../../reservation/create_reservation_form_container';
import ReservationCalendar from './../../reservation/reservation_calendar';
import * as miscUtil from './../../../util/misc_util'

const SpotShow = ({ spots }) => {
    const { id } = useParams();
    const singleSpot = spots[id];

    const { city, state, name, price, avgRating, previewImage } = spot.spot;

    return (
        <div className='spot-show-container'>

            <div className='title-container'>
                <span> &#9733; </span>
                <span> {avgRating || "New"} </span>
                <span> · </span>
                `${city}, ${state}`
            </div>

            <div className='image-container'>
                <img className="main-image" src={previewImage} />
            </div>

            <div className='spot-show-description-container'>
                <div className='spot-show-name'>${name}</div>
                <div className='spot-show-price'>${price}</div>
                <div className='spot-show-description'>${name}</div>
            </div>
        </div>
    );
};

export default SingleArticle;
