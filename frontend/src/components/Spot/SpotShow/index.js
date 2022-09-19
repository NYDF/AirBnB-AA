
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { thunkGetOneSpot } from '../../../store/spotReducer';


const SpotShow = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();

    let spot = useSelector(state => state.spot)
    // console.log("!!!!!!!!!!!!!!!",spot)

    // const singleSpot = Object.values(spot)[spotId]
    // console.log("!!!!!!!!!!!!!!!",singleSpot)
    useEffect(() => {
        dispatch(thunkGetOneSpot(spotId));
    }, [spotId]);

    const { name, price } = spot;

    return (
        <div className='spot-show-container'>

            {/* <div className='title-container'>
                <span> &#9733; </span>
                <span> {avgRating || "New"} </span>
                <span> · </span>
                `${city}, ${state}`
            </div>

            <div className='image-container'>
                <img className="main-image" src={previewImage} />
            </div> */}

            <div className='spot-show-description-container'>
                <div className='spot-show-name'>${name}</div>
                <div className='spot-show-price'>${price}</div>
                <div className='spot-show-description'>${name}</div>
            </div>
        </div>
    );
};

export default SpotShow;
