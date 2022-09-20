
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { thunkGetOneSpot } from '../../../store/spotReducer';


const SpotShow = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();

    let spot = useSelector(state => state.spot[spotId])

    useEffect(() => {
        dispatch(thunkGetOneSpot(spotId));
    }, [spotId]);

    if (!spot) return null;
    // const { id, name, price, city, state, country, avgStarRating, numReviews, SpotImages, description} = spot
    // console.log('!!!!!spot',spot.SpotImages[0].url)

    if(!spot.SpotImages) return null

    return (
        <div className='spot-show-container'>

            <div className='title-container'>
                <span> &#9733; </span>
                <span> {spot.avgStarRating} </span>
                <span> · </span>
                <span> {spot.numReviews} reviews </span>
                {spot.city}, {spot.state}
            </div>

            <div className='image-container'>
                <img className="main-image" src={spot.SpotImages[0].url} alt='picture loading'/>
            </div>

            <div className='spot-show-description-container'>
                <div className='spot-show-name'>{spot.name}</div>
                <div className='spot-show-price'>${spot.price}</div>
                <div className='spot-show-description'>{spot.description}</div>
            </div>
        </div>
    );
};

export default SpotShow;