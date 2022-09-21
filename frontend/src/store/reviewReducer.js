import { csrfFetch } from "./csrf";

const ADD_REVIEW_TO_SPOT = 'spots/addReviewToSpot'
const LOAD_ALL_SPOT_REVIEWS = 'spots/loadAllReviewsOfSpot'


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

export const thunkAddReviewToSpot = (data) => async dispatch => {
    const { id, review, stars } = data
    console.log('!!!!!!data', data)
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

        default:
            return state;
    }
}

export default reviewReducer;
