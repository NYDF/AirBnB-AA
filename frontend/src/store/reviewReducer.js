import { csrfFetch } from "./csrf";

const ADD_REVIEW_TO_SPOT = 'spots/addReviewToSpot'
const LOAD_ALL_SPOT_REVIEWS = 'spots/loadAllReviewsOfSpot'
const LOAD_CURRENT_USER_REVIEWS = 'reviews/loadcurrentReviews'
const DELETE_REVIEW = 'reviews/deleteReview'

export const addReviewToSpot = (review) => {
    return {
        type: ADD_REVIEW_TO_SPOT,
        review
    };
};

export const loadReviewsOfSpot = (review) => {
    return {
        type: LOAD_ALL_SPOT_REVIEWS,
        review
    }
}

export const loadCurrentUserReviews = (reviews) => {
    return {
        type: LOAD_CURRENT_USER_REVIEWS,
        reviews
    };
}

export const deleteOneReview = (id) => {
    return {
        type: DELETE_REVIEW,
        id
    };
};

export const thunkAddReviewToSpot = (data) => async dispatch => {
    const { id, review, stars } = data
    // console.log('!!!!!!data', data)
    const response = await csrfFetch(`/api/spots/${id}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ review, stars }),
    })
    if (response.ok) {
        const review = await response.json();
        dispatch(addReviewToSpot(review))
        return review
    }
}

export const thunkLoadReviewsOfSpot = (id) => async (dispatch) => {

    const response = await fetch(`/api/spots/${id}/reviews`)
    if (response.ok) {
        const reviews = await response.json();
        // console.log("!!!!!!!!reviews", reviews)
        dispatch(loadReviewsOfSpot(reviews))
        return reviews
    }
}

export const thunkGetAllCurrentUserReviews = () => async (dispatch) => {
    const response = await fetch(`/api/reviews/current`)
    if (response.ok) {
        const reviews = await response.json();
        // console.log("!!!!!!!!reviews",reviews)
        dispatch(loadCurrentUserReviews(reviews))
        return reviews
    }
}

export const thunkDeleteReview = (id) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
        const review = await response.json();
        dispatch(deleteOneReview(id));
    }
}

const reviewReducer = (state = {}, action) => {
    switch (action.type) {

        case LOAD_ALL_SPOT_REVIEWS:
            const allReviews = {};
            // console.log("action!!!!!!!!", action.review.reviews)
            action.review.reviews.forEach(review => {
                allReviews[review.id] = review
            });
            // console.log("allReviews!!!!!!!!", allReviews)
            return { ...allReviews };

        case ADD_REVIEW_TO_SPOT:
            // console.log('!!!action', action)
            // return { ...state, [action.id]: { ...state[action.id], review: action.experience, stars: action.star } }
            return { ...state, [action.review.id]: { ...action.review } };

        case LOAD_CURRENT_USER_REVIEWS:
            // console.log("action!!!!!!!!", action.spot)
            let curretUserState = {}
            // console.log("!!!!!!!!action", action.reviews.reviews)
            action.reviews.reviews.forEach(review => {
                curretUserState[review.id] = review
            });
            // console.log("!!!!!!!!curretUserState", curretUserState)
            return curretUserState

        case DELETE_REVIEW:
            let newState = { ...state }
            console.log('!!!action', action)
            delete newState[action.id]
            return newState

        default:
            return state;
    }
}

export default reviewReducer;
