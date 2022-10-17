import { csrfFetch } from "./csrf";


const LOAD_FILTERED_SPOTS = 'spots/loadfilteredSpots'

export const loadFilteredSpots = (filteredSpots) => {
    return {
        type: LOAD_FILTERED_SPOTS,
        filteredSpots
    }
}

export const thunkLoadFilteredSpot = ({minPrice, maxPrice}) => async (dispatch) => {
    // console.log(minPrice,maxPrice)
    const response = await fetch(`/api/spots/?minPrice=${minPrice}&maxPrice=${maxPrice}`)
    // console.log("!!!!!!!!response", response)
    if (response.ok) {
        const filteredSpots = await response.json();
        // console.log("!!!!!!!!filteredSpots", filteredSpots)
        dispatch(loadFilteredSpots(filteredSpots))
        return filteredSpots
    }
}


const filterReducer = (state = {}, action) => {
    switch (action.type) {

        case LOAD_FILTERED_SPOTS:
            const filtered = {};
            // console.log("action!!!!!!!!", action)
            action.filteredSpots.spots.forEach(spot => {
                filtered[spot.id] = spot
            });
            return { ...filtered };

        default:
            return state;
    }
}

export default filterReducer;
