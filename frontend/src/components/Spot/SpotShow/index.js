
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { thunkGetOneSpot } from '../../../store/spotReducer';
import { thunkAddReviewToSpot } from "../../../store/reviewReducer";
import { thunkLoadReviewsOfSpot } from "../../../store/reviewReducer";
import { FaStar } from "react-icons/fa"
import {Link} from 'react-scroll'
import CreateBooking from "../../Booking/CreateBooking";
import SpotShowSub from "../SpotShowSub";
import CheckBooking from "../../Booking/CheckBooking";
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
    const [hover, setHover] = useState(null);
    // console.log('sessionUser!!!!!!', sessionUser)
    const [rating, setRating] = useState(0);

    let spot = useSelector(state => state.spot[spotId])
    // console.log("spot!!!!!!!!!!!!!!!!", spot)
    let allReviews = useSelector(state => state.review)
    // console.log("allReviews!!!!!!", allReviews)

    useEffect(() => {
        dispatch(thunkGetOneSpot(spotId));
    }, [spotId, dispatch, allReviews]);

    useEffect(() => {
        dispatch(thunkLoadReviewsOfSpot(spotId));
    }, [spotId, dispatch]);

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
        setErrors([]);

        const reviewPayload = { id: spotId, review, stars }
        let createdReview = await dispatch(thunkAddReviewToSpot(reviewPayload)).catch(async (res) => {
            const data = await res.json();

            if (data && data.errors) setErrors(data.errors);

        });
        history.push(`/spots/${spotId}`)
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
                            placeholder="Write a public review"
                            required />
                    </label>
                    <br></br>
                    <label className="select-star-text"> Overall rating
                        <div className="star-container">
                            {[...Array(5)].map((star, i) => {
                                const ratingValue = i + 1;

                                return (
                                    <label>
                                        <input
                                            type="radio" name="stars"
                                            value={ratingValue}
                                            onClick={() => setStars(ratingValue)}
                                        />
                                        <FaStar
                                            className="star"
                                            color={ratingValue <= (hover || stars) ? "#ffc107" : "#e4e5e9"}
                                            size={36}
                                            onMouseEnter={() => setHover(ratingValue)}
                                            onMouseLeave={() => setHover(ratingValue)}
                                        />
                                    </label>
                                )
                            })}
                        </div>
                    </label>
                    <br></br>
                    <button
                        className="review-submit-button"
                        onClick={() => { alert('Please login or signup first') }}>Submit</button>
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
                                placeholder="  Write a public review"
                                required />
                        </label>
                        <br></br>
                        <label className="select-star-text"> Overall rating
                            <div className="star-container">
                                {[...Array(5)].map((star, i) => {
                                    const ratingValue = i + 1;

                                    return (
                                        <label key={i}>
                                            <input
                                                type="radio" name="stars"
                                                value={ratingValue}
                                                onClick={() => setStars(rating)}
                                            />
                                            <FaStar
                                                className="star" key={star}
                                                color={ratingValue <= (hover || stars) ? "#ffc107" : "#e4e5e9"}
                                                size={36}
                                                onMouseEnter={() => { setHover(ratingValue); setRating(ratingValue) }}
                                                onMouseLeave={() => setHover(null)}
                                            />
                                        </label>
                                    )
                                })}
                            </div>
                        </label>
                        <br></br>
                        <button
                            className="review-submit-button"
                            type="submit">Submit</button>

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

                <span className="title-review-text">
                    <Link to='review-div-id' spy={true} offset={50} duration={500} >{spot.numReviews} reviews</Link>
                </span>

                <span> · </span>
                {spot.city}, {spot.state}
            </div>

            <div className='image-container'>
                <img className="main-image" src={spot.SpotImages[0]?.url} alt='picture loading' />

                <div className="small-image-container">
                    {spot.SpotImages[1] && (<img className="small-image" src={spot.SpotImages[1]?.url} alt='picture loading' />)}
                    {spot.SpotImages[2] && (<img className="small-image" src={spot.SpotImages[2]?.url} alt='picture loading' />)}
                    {spot.SpotImages[3] && (<img className="small-image" src={spot.SpotImages[3]?.url} alt='picture loading' />)}
                    {spot.SpotImages[4] && (<img className="small-image" src={spot.SpotImages[4]?.url} alt='picture loading' />)}
                </div>
            </div>

            <div className='spot-show-second-container'>
                <div className='spot-show-description-container'>
                    <h2 className='spot-show-name'>{spot.name} hosted by {spot.Owner.firstName}</h2>
                    <hr></hr>

                    <SpotShowSub />

                    <hr></hr>
                    <div className='spot-show-description'>{spot.description}</div>
                    <hr></hr>

                    <h2 className='spot-show-calendar'>Check Availability</h2>
                    <CheckBooking spotId={spotId} />

                </div>

                <div className="spot-show-price-third-container">
                    <div className="spot-show-price-container">

                        <div className="spot-show-price-container-inside">
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
                            <CreateBooking spot={spot} />
                            <br></br>

                        </div>
                    </div>
                </div>

            </div>

            <hr></hr>
            <div className="review-big-container" >

                <div id="review-index-container">
                    <h2>
                        <span> &#9733; </span>
                        <span> {spot.avgStarRating} </span>
                        <span> · </span>
                        <span> {spot.numReviews} reviews </span>
                    </h2>

                    <div className='review-container' id="review-div-id">
                        {reviewArr.map((review) => (
                            <div className='single-review-container' key={review.id}>
                                <div className='review-name'>{review?.User?.firstName || "You Just posted"}</div>
                                <div className='review-date'>{review?.createdAt.slice(0, 7)}</div>

                                <div className="review-star-container">
                                    {[...Array(review.stars)].map((star, i) => {
                                        return (
                                            <label key={i}>
                                                <FaStar key={i}
                                                    color={"#ffc107"}
                                                    size={22} />
                                            </label>)
                                    })}
                                </div>

                                <div className='review-text'>{review.review}</div>
                                <hr id='space-line-fifth'></hr>
                            </div>
                        ))}
                    </div>
                </div>
                <ul>
                    <li key={errors}>{errors}</li>
                </ul>
            </div>
            <hr></hr>
            <div>
                {addReviewDiv}
            </div>


            {/* <div>
                <div class="mapouter">
                    <div class="gmap_canvas">
                        <iframe width="600" height="500" id="gmap_canvas"
                            src="https://maps.google.com/maps?q=2880%20Broadway,%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed"
                            frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
                        </iframe><a href="https://2piratebay.org">pirate bay</a>
                        <br>
                        <style>.mapouter{position:relative;text-align:right;height:500px;width:600px;}</style>
                        <a href="https://www.embedgooglemap.net">custom google maps embed</a>
                        <style>.gmap_canvas {overflow:hidden;background:none!important;height:500px;width:600px;}</style>
                    </div>
                </div>

            </div> */}

        </div>
    );
};

export default SpotShow;
