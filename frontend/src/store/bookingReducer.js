import { csrfFetch } from "./csrf";

const ADD_BOOKING_TO_SPOT = 'spots/addBookingToSpot'
const LOAD_ALL_SPOT_BOOKINGS = 'spots/loadAllBookingsOfSpot'
const LOAD_CURRENT_USER_BOOKINGS = 'bookings/loadcurrentBookings'
// const DELETE_REVIEW = 'reviews/deleteReview'

export const addBookingToSpot = (booking) => {
    return {
        type: ADD_BOOKING_TO_SPOT,
        booking
    };
};

export const loadBookingsOfSpot = (bookings) => {
    return {
        type: LOAD_ALL_SPOT_BOOKINGS,
        bookings
    }
}

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
    // console.log("days!!!", `${(new Date(endDate).getTime() - new Date(startDate).getTime())/ (1000 * 3600 * 24)}` )
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

export const thunkLoadBookingsOfSpot = (id) => async (dispatch) => {

    const response = await fetch(`/api/spots/${id}/bookings`)
    if (response.ok) {
        const bookings = await response.json();
        // console.log("!!!!!!!!reviews", reviews)
        dispatch(loadBookingsOfSpot(bookings))
        return bookings
    }
}

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

        case LOAD_ALL_SPOT_BOOKINGS:
            const allBookings = {};
            // console.log("action!!!!!!!!", action)
            action.bookings.bookings.forEach(booking => {
                allBookings[booking.id] = booking
            });
            // console.log("allBookings!!!!!!!!", allBookings)
            return { ...allBookings };

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
