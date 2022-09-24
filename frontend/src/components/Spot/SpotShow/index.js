
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { thunkGetOneSpot } from '../../../store/spotReducer';
import { Link } from 'react-router-dom';
import { thunkAddReviewToSpot } from "../../../store/reviewReducer";
import { thunkLoadReviewsOfSpot } from "../../../store/reviewReducer";
import './SpotShow.css'

const SpotShow = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const sessionUser = useSelector(state => state.session.user);
    const [review, setReview] = useState("");
    const [stars, setStars] = useState("");
    const [hasSubmitted, setHasSubmitted] = useState("");
    const [errors, setErrors] = useState([]);
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
    console.log("review!!!!", reviewArr)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        setErrors([]);

        const reviewPayload = { id: spotId, review, stars }
        let createdReview = await dispatch(thunkAddReviewToSpot(reviewPayload)).catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
        });

        if (createdReview) {
            history.push(`/spots/${spotId}`)
        }
    }
    // console.log('!!!!!!errors!!!!!!',errors)
    let addReviewDiv
    if (!sessionUser) {
        addReviewDiv = (
            <div className='spot-show-review-container'>

                <h2 id='add-review-button1'>Great Experience? Leave a review!</h2>

                <form>
                    <label>Experience
                        <br></br>
                        <textarea
                            className="experience-input-box"
                            type="text" value={review}
                            onChange={(e) => setReview(e.target.value)}
                            required />
                    </label>
                    <br></br>
                    <label className="select-star-text"> Select a Star
                        <select
                            className="select-box"
                            value={stars}
                            onChange={(e) => setStars(e.target.value)}
                        >
                            <option>Please Select</option>
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

                    <h2 id='add-review-button1' className="spot-show-h2" >Great Experience? Leave a review!</h2>

                    <form onSubmit={handleSubmit}>
                        <label id='experience-text'>Experience
                            <br></br>
                            <textarea
                                className="experience-input-box"
                                type="text" value={review}
                                onChange={(e) => setReview(e.target.value)}
                                required />
                        </label>
                        <br></br>
                        <label className="select-star-text"> Select a Star
                            <select
                                className="select-box"
                                required
                                value={stars}
                                onChange={(e) => setStars(e.target.value)}
                            >
                                <option>Please Select</option>
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
            <h1>{spot.name}</h1>
            <div className='title-container'>
                <span> &#9733; </span>
                <span> {spot.avgStarRating} </span>
                <span> · </span>
                <span> {spot.numReviews} reviews </span>
                {spot.city}, {spot.state}
            </div>


            <div className='image-container'>
                <img className="main-image" src={spot.SpotImages[0].url} alt='picture loading' />

                <img className="small-image" src={spot.SpotImages[1]?.url} alt='picture loading' />

            </div>



            <div className='spot-show-second-container'>
                <div className='spot-show-description-container'>
                    <h2 className='spot-show-name'>{spot.name} hosted by {spot.Owner.firstName}</h2>
                    <hr></hr>
                    <div className='spot-show-description'>{spot.description}</div>
                </div>

                <div className='second-container-space'></div>

                <div className="spot-show-price-container">

                    <div className='price-line-container'>
                        <span>
                            <span className='spot-show-price'>${spot.price} </span>
                            <span>per night</span>
                        </span>

                        <span className='price-right-review' >
                            <span id='next-to-right'> &#9733; </span>
                            <span> {spot.avgStarRating} · {spot.numReviews} reviews</span>
                        </span>
                    </div>

                    <br></br>

                    <div>
                        <div className='price-line-container'>
                            <span>
                                <span>${spot.price}</span>
                                <span> x5 nights</span>
                            </span>
                            <span>${spot.price * 5}</span>
                        </div>

                        <div className='price-line-container'>
                            <span>Service fee</span>
                            <span>$200</span>
                        </div>

                        <hr></hr>

                        <div className='price-line-container'>
                            <span>Total before taxes</span>
                            <span>${spot.price * 5 + 200}</span>
                        </div>
                    </div>
                </div>


            </div>


            <hr></hr>
            <div className="review-big-container">

                <div>
                <h2>
                    <span> &#9733; </span>
                    <span> {spot.avgStarRating} </span>
                    <span> · </span>
                    <span> {spot.numReviews} reviews </span>
                </h2>
                {reviewArr.map((review) => (
                    <div className='single-review-container' key={review.id}>
                        <div className='review-name'>{review?.User?.firstName}</div>
                        <div className='review-date'>{review?.createdAt.slice(0, 7)}</div>
                        <div className='review-text'>{review.review}</div>
                        <div>{review.stars} star</div>
                        <hr id='space-line-fifth'></hr>
                    </div>
                ))}
            </div>
            <ul>
                <li key={errors}>{errors}</li>
            </ul>
            </div>
            <hr></hr>
            <div>
            {addReviewDiv}
            </div>
        </div>
    );
};

export default SpotShow;
