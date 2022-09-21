
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkGetOneSpot } from '../../../store/spotReducer';
import { Link } from 'react-router-dom';

const SpotShow = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const sessionUser = useSelector(state => state.session.user);
    const [experience, setExperience] = useState("");
    const [star, setStar] = useState("");
    // console.log('sessionUser!!!!!!', sessionUser)

    let spot = useSelector(state => state.spot[spotId])

    useEffect(() => {
        dispatch(thunkGetOneSpot(spotId));
    }, [spotId]);

    if (!spot) return null;
    // const { id, name, price, city, state, country, avgStarRating, numReviews, SpotImages, description} = spot
    // console.log('!!!!!spot',spot.SpotImages[0].url)

    if (!spot.SpotImages) return null
    // console.log("spot!!!!!!!", spot)

    const handleSubmit = () => {
        console.log(1)
    }

    let reviewDiv
    if (!sessionUser) {
        reviewDiv = (
            <div className='spot-show-review-container'>

                <div id='add-review-button1'>Great Experience? Leave a review!</div>

                <form onSubmit={handleSubmit}>
                    <label>Experience
                        <input
                            type="text"
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                            required />
                    </label>

                    <label> Select a Star
                        <select
                            value={star}
                            onChange={(e) => setStar(e.target.value)}
                        >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </label>

                    <button onClick={()=>{alert('You need to login or signup first')}}>Submit</button>

                </form>

            </div>
        )
    }
    if (sessionUser) {
        if (sessionUser.id !== spot.Owner.id) {
            reviewDiv = (
                <div className='spot-show-review-container'>

                    <div id='add-review-button1'>Great Experience? Leave a review!</div>

                    <form onSubmit={handleSubmit}>
                        <label>Experience
                            <input
                                type="text"
                                value={experience}
                                onChange={(e) => setExperience(e.target.value)}
                                required />
                        </label>

                        <label> Select a Star
                            <select
                                value={star}
                                onChange={(e) => setStar(e.target.value)}
                            >
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </label>

                        <button type="submit">Submit</button>

                    </form>

                </div>
            )
        } else {
            reviewDiv = (<></>)
        }
    }

    // let reviewButton = sessionUser? document.getElementById('add-review-button2') : document.getElementById('add-review-button1')
    // console.log(reviewButton)
    // // reviewButton[0].addEventListener("click", ()=>{
    // //     console.log("1")
    // //    })



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
                <img className="main-image" src={spot.SpotImages[0].url} alt='picture loading' />
            </div>

            <div className='spot-show-description-container'>
                <div className='spot-show-name'>{spot.name}</div>
                <div className='spot-show-price'>${spot.price}</div>
                <div className='spot-show-description'>{spot.description}</div>
            </div>

            {reviewDiv}
        </div>
    );
};

export default SpotShow;
