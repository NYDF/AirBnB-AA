
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { thunkGetOneSpot } from '../../../store/spotReducer';
import { Link } from 'react-router-dom';
import { thunkAddReviewToSpot } from "../../../store/reviewReducer";
import { thunkLoadReviewsOfSpot } from "../../../store/reviewReducer";

const SpotShow = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const sessionUser = useSelector(state => state.session.user);
    const [review, setReview] = useState("");
    const [stars, setStars] = useState("");
    const [hasSubmitted, setHasSubmitted] = useState("");
    const history = useHistory();
    // console.log('sessionUser!!!!!!', sessionUser)

    let spot = useSelector(state => state.spot[spotId])
    // console.log("spot!!!!!!!!!!!!!!!!", spot)
    let allReviews = useSelector(state => state.review)
    // console.log("allReviews!!!!!!", allReviews)

    useEffect(() => {
        dispatch(thunkGetOneSpot(spotId));
    }, [spotId]);

    useEffect(() => {
        dispatch(thunkLoadReviewsOfSpot(spotId));
    }, [spotId]);

    if (!spot) return null;

    if (!spot.SpotImages) return null
    // console.log("spot!!!!!!!", spot)
    if (!allReviews) return null
    // console.log("allReviews!!!!!!!!!!!!!!!!", allReviews)

    // console.log('allReviews.undefined++++',allReviews.undefined)
    let reviewArr = Object.values(allReviews)
    // console.log("reviewArr!!!!", reviewArr)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        const reviewPayload = { id: spotId, review, stars }
        let createdReview = await dispatch(thunkAddReviewToSpot(reviewPayload))

        if (createdReview) {
            history.push(`/spots/${spotId}`)
            
        }
    }

    let addReviewDiv
    if (!sessionUser) {
        addReviewDiv = (
            <div className='spot-show-review-container'>

                <h2 id='add-review-button1'>Great Experience? Leave a review!</h2>

                <form>
                    <label>Experience
                        <input
                            type="text" value={review}
                            onChange={(e) => setReview(e.target.value)}
                            required />
                    </label>

                    <label> Select a Star
                        <select
                            value={stars}
                            onChange={(e) => setStars(e.target.value)}
                        >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </label>
                    <button onClick={() => { alert('Please login or signup first') }}>Submit</button>
                </form>
            </div>
        )
    }
    if (sessionUser) {
        if (sessionUser.id !== spot.Owner.id) {
            addReviewDiv = (
                <div className='spot-show-review-container'>

                    <h2 id='add-review-button1'>Great Experience? Leave a review!</h2>

                    <form onSubmit={handleSubmit}>
                        <label>Experience
                            <input
                                type="text" value={review}
                                onChange={(e) => setReview(e.target.value)}
                                required />
                        </label>

                        <label> Select a Star
                            <select required
                                value={stars}
                                onChange={(e) => setStars(e.target.value)}
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
            addReviewDiv = (<></>)
        }
    }

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

            <div>
                <h2>Reviews</h2>
                {reviewArr.map((review) => (
                    <div className='single-review-container' key={review.id}>
                        <div>{review.User.firstName}</div>
                        <div>{review.review}</div>
                        <div>{review.stars} star</div>
                        <hr></hr>
                    </div>
                ))}
            </div>

            {addReviewDiv}
        </div>
    );
};

export default SpotShow;
