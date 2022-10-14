import { csrfFetch } from "./csrf";

const ADD_BOOKING_TO_SPOT = 'spots/addBookingToSpot'
// const LOAD_ALL_SPOT_REVIEWS = 'spots/loadAllReviewsOfSpot'
const LOAD_CURRENT_USER_BOOKINGS = 'bookings/loadcurrentBookings'
// const DELETE_REVIEW = 'reviews/deleteReview'

export const addBookingToSpot = (booking) => {
    return {
        type: ADD_BOOKING_TO_SPOT,
        booking
    };
};

// export const loadReviewsOfSpot = (review) => {
//     return {
//         type: LOAD_ALL_SPOT_REVIEWS,
//         review
//     }
// }

export const loadCurrentUserBookings = (bookings) => {
    return {
        type: LOAD_CURRENT_USER_BOOKINGS,
        bookings
    };
}

// export const deleteOneReview = (id) => {
//     return {
//         type: DELETE_REVIEW,
//         id
//     };
// };

export const thunkAddBookingToSpot = (data) => async dispatch => {
    const { id, startDate, endDate } = data
    // console.log('!!!!!!data', data)
    const response = await csrfFetch(`/api/spots/${id}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ startDate, endDate }),
    })
    // console.log('!!!!!!response', response)
    if (response.ok) {
        const booking = await response.json();
        dispatch(addBookingToSpot(booking))
        // console.log('booking!!!!!!', booking)
        return booking
    }
}

// export const thunkLoadReviewsOfSpot = (id) => async (dispatch) => {

//     const response = await fetch(`/api/spots/${id}/reviews`)
//     if (response.ok) {
//         const reviews = await response.json();
//         // console.log("!!!!!!!!reviews", reviews)
//         dispatch(loadReviewsOfSpot(reviews))
//         return reviews
//     }
// }

export const thunkGetAllCurrentUserBookings = () => async (dispatch) => {
    const response = await fetch(`/api/bookings/current`)
    if (response.ok) {
        const bookings = await response.json();
        // console.log("!!!!!!!!bookings",bookings)
        dispatch(loadCurrentUserBookings(bookings))
        return bookings
    }
}

// export const thunkDeleteReview = (id) => async dispatch => {
//     const response = await csrfFetch(`/api/reviews/${id}`, {
//         method: 'DELETE',
//         headers: { 'Content-Type': 'application/json' }
//     });
//     if (response.ok) {
//         const review = await response.json();
//         dispatch(deleteOneReview(id));
//     }
// }

const bookingReducer = (state = {}, action) => {
    switch (action.type) {

        // case LOAD_ALL_SPOT_REVIEWS:
        //     const allReviews = {};
        //     // console.log("action!!!!!!!!", action.review.reviews)
        //     action.review.reviews.forEach(review => {
        //         allReviews[review.id] = review
        //     });
        //     // console.log("allReviews!!!!!!!!", allReviews)
        //     return { ...allReviews };

        case ADD_BOOKING_TO_SPOT:
            // console.log('!!!action', action)
            return { ...state, [action.booking.id]: { ...action.booking } };

        case LOAD_CURRENT_USER_BOOKINGS:
            // console.log("action!!!!!!!!", action.spot)
            let curretUserState = {}
            // console.log("!!!!!!!!action", action.bookings.bookings)
            action.bookings.bookings.forEach(booking => {
                curretUserState[booking.id] = booking
            });
            // console.log("!!!!!!!!curretUserState", curretUserState)
            return curretUserState

        // case DELETE_REVIEW:
        //     let newState = { ...state }
        //     // console.log('!!!action', action)
        //     delete newState[action.id]
        //     return newState

        default:
            return state;
    }
}

export default bookingReducer;
