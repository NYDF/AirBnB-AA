
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { thunkEditSpot, thunkDeleteSpot, thunkGetOneSpot } from "../../../store/spotReducer";
import { thunkAddSpotImg } from "../../../store/spotReducer";
import AddSpotImage from "../../Image/AddSpotImage";
import './EditSpotPage.css'

function EditSpotPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const history = useHistory();

    const { spotId } = useParams();
    let spot = useSelector(state => state.spot[spotId])

    const [address, setAddress] = useState(spot?.address);
    const [city, setCity] = useState(spot?.city);
    const [state, setState] = useState(spot?.state);
    const [country, setCountry] = useState(spot?.country);
    const [lat, setLat] = useState(spot?.lat);
    const [lng, setLng] = useState(spot?.lng);
    const [name, setName] = useState(spot?.name);
    const [description, setDescription] = useState(spot?.description);
    const [price, setPrice] = useState(spot?.price);
    const [hasSubmitted, setHasSubmitted] = useState("");
    const [errors, setErrors] = useState([]);
    const [validationErrors, setValidationErrors] = useState([]);
    const [url, setUrl] = useState('');



    useEffect(() => {
        dispatch(thunkGetOneSpot(spotId));
    }, [spotId, dispatch]);

    useEffect(() => {
        let errors = [];

        if (!(Number(price) > 0)) {
            errors.push('please provide a valide price!')
        }
        if (!(Number(lat) > -90) && !(Number(lat) < 90)) {
            errors.push('please provide a valide latitude!')
        }
        if (!(Number(lng) > -180) && !(Number(lng) < 180)) {
            errors.push('please provide a valide Longitude!')
        }
        // console.log(typeof price)
        setValidationErrors(errors)
    }, [price, lat, lng])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        const spotPayload = { id: spotId, name, address, city, state, country, description, lat, lng, price }

        let editedSpot = await dispatch(thunkEditSpot(spotPayload))
        if (validationErrors.length || errors.length) { return }
        setErrors([]);

        //   console.log('editedSpot!!!!!!!!!!!!', editedSpot)
        if (editedSpot) {
            history.push(`/spots/${spotId}`)
        }
    }

    const handleAddImg = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        const imgPayload = { url, preview: false }
        let addedImage = await dispatch(thunkAddSpotImg(imgPayload, spotId)).catch(async (res) => {
            if (validationErrors.length || errors.length) { return }
            const data = await res.json();
        });
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
                    <div className='spot-edit-current-info'> Current number of reviews: {spot?.numReviews}</div>
                    <br></br>
                    <div className='spot-edit-current-info'>Current Name: {spot?.name}</div>
                    <div className='spot-edit-current-info'> Current address: {spot?.address}</div>
                    <div className='spot-edit-current-info'> Current City: {spot?.city}</div>
                    <div className='spot-edit-current-info'> Current State: {spot?.state}</div>
                    <div className='spot-edit-current-info'> Current Country: {spot?.country}</div>
                </div>

                <div className='spot-edit-description-container'>

                    <div className='spot-edit-current-info'>Current price: ${spot?.price}</div>
                    <div className='spot-edit-current-info'>Current Description:
                        <br></br>
                        {spot?.description}</div>
                </div>

                <AddSpotImage />
                <button
                    className="delete-spot-button"
                    onClick={handleDelete}>DELETE THIS SPOT!</button>
            </div>

            <div className='spot-show-container-right'>
                <h1>Update Spot Information</h1>
                <form onSubmit={handleSubmit}>
                    {hasSubmitted && !!validationErrors.length && (<div>
                        <ul>
                            {validationErrors.map((error, idx) => <li key={idx}>{error}</li>)}
                        </ul>
                    </div>)}

                    <label>
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
            </div>
        </div>
    );
}

export default EditSpotPage;
