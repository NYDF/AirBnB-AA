
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { thunkEditSpot, thunkDeleteSpot, thunkGetOneSpot } from "../../../store/spotReducer";
import './EditSpotPage.css'

function EditSpotPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    //   const [url, setUrl] = useState("");
    const [hasSubmitted, setHasSubmitted] = useState("");
    const [errors, setErrors] = useState([]);
    const [validationErrors, setValidationErrors] = useState([]);
    const history = useHistory();
    const { spotId } = useParams();
    let spot = useSelector(state => state.spot[spotId])

    useEffect(() => {
        dispatch(thunkGetOneSpot(spotId));
    }, [spotId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        if (validationErrors.length) { return }
        setErrors([]);
        const spotPayload = { id: spotId, name, address, city, state, country, description, lat, lng, price }
        // const imagePayload = {url, preview: true}

        let editedSpot = await dispatch(thunkEditSpot(spotPayload))
        //   console.log('editedSpot!!!!!!!!!!!!', editedSpot)
        if (editedSpot) {
            history.push(`/spots/${spotId}`)
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        let deleteSpot = await dispatch(thunkDeleteSpot(spotId))
        history.push(`/spotss/current`)
    }

    return (
        <div className='edit-spot-form-container'>

            <div className='spot-edit-container-left'><h1>Current Spot Information</h1>

                <div className='spot-edit-title-container'>
                    <div className='spot-edit-current-info'> Current rating: {spot?.avgStarRating} stars</div>
                    <div className='spot-edit-current-info'> Current number of reviews: {spot.numReviews}</div>
                    <div className='spot-edit-current-info'> Current City: {spot.city}</div>
                    <div className='spot-edit-current-info'> Current State: {spot.state}</div>
                </div>

                <div className='spot-edit-description-container'>
                    <div className='spot-edit-current-info'>Current Name: {spot.name}</div>
                    <div className='spot-edit-current-info'>Current price: ${spot.price}</div>
                    <div className='spot-edit-current-info'>Current Description:
                        <br></br>
                        {spot.description}</div>
                </div>
            </div>

            <div className='spot-show-container-right'>
                <h1>Update Spot Information</h1>
                <form onSubmit={handleSubmit}>
                    <ul>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>

                    <label className="spot-edit-input-box">
                        Name
                        <br></br>
                        <input
                            className="spot-edit-input-box"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required />
                    </label>
                    <br></br>
                    <label>
                        Price
                        <br></br>
                        <input
                            type="text"
                            className="spot-edit-input-box"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required />
                    </label>
                    <br></br>
                    <label>
                        Address
                        <br></br>
                        <input
                            type="text"
                            className="spot-edit-input-box"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required />
                    </label>
                    <br></br>
                    <label>
                        City
                        <br></br>
                        <input
                            type="text"
                            className="spot-edit-input-box"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required />
                    </label>
                    <br></br>
                    <label>
                        State
                        <br></br>
                        <input
                            type="text"
                            className="spot-edit-input-box"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            required />
                    </label>
                    <br></br>
                    <label>
                        Country
                        <br></br>
                        <input
                            type="text"
                            className="spot-edit-input-box"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            required />
                    </label>
                    <br></br>
                    <label>
                        Description
                        <br></br>
                        <input
                            type="text"
                            className="spot-edit-input-box"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required />
                    </label>
                    <br></br>
                    <label>
                        Latitude
                        <br></br>
                        <input
                            type="text"
                            className="spot-edit-input-box"
                            value={lat}
                            onChange={(e) => setLat(e.target.value)}
                            required />
                    </label>
                    <br></br>
                    <label>
                        Longitude
                        <br></br>
                        <input
                            type="text"
                            className="spot-edit-input-box"
                            value={lng}
                            onChange={(e) => setLng(e.target.value)}
                            required />
                    </label>
                    <br></br>
                    <button
                        className="edit-spot-button"
                        type="submit">Update Information!</button>
                </form>


                <button
                    className="edit-spot-button"
                    onClick={handleDelete}>DELETE THIS SPOT!</button>
            </div>
        </div>
    );
}

export default EditSpotPage;
