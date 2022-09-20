import { csrfFetch } from "./csrf";

const LOAD_SPOTS = 'spots/loadSpots';
const LOAD_ONE_SPOT = 'spots/loadOneSpot'
const ADD_SPOT = 'spots/addSpot';
const EDIT_SPOT = 'spots/editSpot';
const LOAD_CURRENT_USER_SPOTS = 'spots/loadcurrentSpot'
// const DELETE_SPOT = 'spots/deleteSpot'
const ADD_IMAGE_TO_SPOT = 'spots/addImgToSpot'

export const loadAll = (spots) => {
    return {
        type: LOAD_SPOTS,
        spots
    };
};

export const loadOne = (spot) => {
    return {
        type: LOAD_ONE_SPOT,
        spot
    };
};

export const loadCurrentUserSpot = (spots) => {
    return {
        type: LOAD_CURRENT_USER_SPOTS,
        spots
    };
}

export const addOneSpot = (spot) => {
    return {
        type: ADD_SPOT,
        spot
    };
};

export const editOneSpot = (spot) => {
    return {
        type: EDIT_SPOT,
        spot
    };
};

// const deleteOneSpot = spot => ({
//     type: DELETE_SPOT,
//     spot
// })


export const addImgToSpot = (img) => {
    return {
        type: ADD_IMAGE_TO_SPOT,
        img
    };
};

export const thunkGetAllSpots = () => async (dispatch) => {
    const response = await fetch(`/api/spots`)
    if (response.ok) {
        const spots = await response.json();
        // console.log("!!!!!!!!spots",spots)
        dispatch(loadAll(spots))
        return spots
    }
}

export const thunkGetOneSpot = (id) => async (dispatch) => {
    const response = await fetch(`/api/spots/${id}`)

    if (response.ok) {
        const spot = await response.json();
        // console.log('-------------spot',spot)
        dispatch(loadOne(spot))
        return spot
    }
}

export const thunkGetAllCurrentUserSpots = () => async (dispatch) => {
    const response = await fetch(`/api/spots/current`)
    if (response.ok) {
        const spots = await response.json();
        // console.log("!!!!!!!!spots",spots)
        dispatch(loadCurrentUserSpot(spots))
        return spots
    }
}

export const thunkCreateSpot = (data) => async (dispatch) => {

    const response = await csrfFetch(`/api/spots`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (response.ok) {
        const spot = await response.json();
        dispatch(addOneSpot(spot));
        return spot;
    }
}

export const thunkEditSpot = (data) => async dispatch => {
    const { address, city, state, country, lat, lng, name, description, price } = data;

    const response = await csrfFetch(`/api/spots/${data.id}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
             address, city, state, country, lat, lng, name, description, price
        }),
    });
    if (response.ok) {
        const spot = await response.json();
        console.log('spot!!!!!!!!!!!!', spot)
        dispatch(editOneSpot(spot));
        return spot;
    }
}

// export const thunkDeleteSpot = (id) => async dispatch => {
//     const response = await csrfFetch(`/api/spots/${id}`, {
//         method: 'DALETE',
//         headers: { 'Content-Type': 'application/json' }
//     });
//     if (response.ok) {
//         const spot = await response.json();
//         dispatch(deleteOneSpot(id));
//         return spot
//     }
// }

export const thunkAddSpotImg = (data, id) => async dispatch => {
    const { url, preview } = data
    console.log('!!!!!!data', data)
    const response = await csrfFetch(`/api/spots/${id}/images`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, preview }),
    })
    if (response.ok) {
        const image = await response.json();
        dispatch(addImgToSpot(data.url, id))
        return image
    }
}

const spotReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_SPOTS:
            const newSpots = {};
            // console.log("action!!!!!!!!", action.spots.spots)
            action.spots.spots.forEach(spot => {
                newSpots[spot.id] = spot
            });
            return { ...newSpots };

        case LOAD_ONE_SPOT:
            // console.log("action!!!!!!!!", action.spot)
            let spotState = { ...state }
            // console.log("!!!!!!!!",action.spot)
            spotState[action.spot.id] = action.spot
            // console.log("!!!!!!!!", spotState)
            return spotState

        case LOAD_CURRENT_USER_SPOTS:
            // console.log("action!!!!!!!!", action.spot)
            let curretUserState = {}
            // console.log("!!!!!!!!action",action.spot)
            action.spots.spots.forEach(spot => {
                curretUserState[spot.id] = spot
            });
            // console.log("!!!!!!!!curretUserState", curretUserState)
            return curretUserState

        case ADD_SPOT:
            // console.log('!!!action', action)
            return { ...state, [action.spot.id]: { ...action.spot } };

        case EDIT_SPOT:
            console.log('action!!!!!!!!!!!!', action.spot)
            return {...state, [action.spot.id]: {...state[action.spot.id], ...action.spot}}

        // case DELETE_SPOT:
        //     let newState = {...state}
        //     delete newState[action.id]
        //     return newState

        case ADD_IMAGE_TO_SPOT:
            console.log('!!!action', action)
            return { ...state, [action.id]: { ...state[action.id], previewImage: action.img } }

        default:
            return state;
    }
}

export default spotReducer;
