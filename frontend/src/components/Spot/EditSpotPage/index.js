
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { thunkEditSpot, thunkDeleteSpot, thunkGetOneSpot } from "../../../store/spotReducer";
import AddSpotImage from "../../Image/AddSpotImage";
import SmallMapContainer from "../../Maps/SmallMap";
import './EditSpotPage.css'

function EditSpotPage() {
    const dispatch = useDispatch();
    // const sessionUser = useSelector((state) => state.session.user);
    const history = useHistory();
    const { spotId } = useParams();


    let spot = useSelector(state => state.spot[spotId])


    // console.log(spot)

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

    const handleDelete = async (e) => {
        e.preventDefault();
        let deleteSpot = await dispatch(thunkDeleteSpot(spotId))
        history.push(`/spotss/current`)
    }

    if (!spot) { return null }

    return (
        <div className='edit-spot-form-container'>

            <div className='spot-edit-container-left'>

                <AddSpotImage />

            </div>

            <div className='spot-show-container-right'>
                <h1>Update Spot Information</h1>
                <form onSubmit={handleSubmit}>
                    {hasSubmitted && !!validationErrors.length && (<div>
                        <ul>
                            {validationErrors.map((error, idx) => <li key={idx}>{error}</li>)}
                        </ul>
                    </div>)}

                    {/* <label>
                        Name
                        <br></br>
                        <input className="spot-edit-input-box" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </label>
                    <br></br> */}
                    {/* <label>
                        Price
                        <br></br>
                        <input type="text" className="spot-edit-input-box" value={price} onChange={(e) => setPrice(e.target.value)} required />
                    </label>
                    <br></br>
                    <label>
                        Address
                        <br></br>
                        <input type="text" className="spot-edit-input-box" value={address} onChange={(e) => setAddress(e.target.value)} required />
                    </label>
                    <br></br>
                    <label>
                        City
                        <br></br>
                        <input type="text" className="spot-edit-input-box" value={city} onChange={(e) => setCity(e.target.value)} required />
                    </label>
                    <br></br>
                    <label>
                        State
                        <br></br>
                        <input type="text" className="spot-edit-input-box" value={state} onChange={(e) => setState(e.target.value)} required />
                    </label>
                    <br></br>
                    <label>
                        Country
                        <br></br>
                        <input
                            type="text" className="spot-edit-input-box" value={country} onChange={(e) => setCountry(e.target.value)} required />
                    </label>
                    <br></br>
                    <label>
                        Description
                        <br></br>
                        <input type="text" className="spot-edit-input-box" value={description} onChange={(e) => setDescription(e.target.value)} required />
                    </label> */}

                    {/* <div className="create-spot-first-div">

                        <input
                            type="text"
                            className="create-spot-input-place"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required />

                        <div className="create-spot-first-div-2">

                            <input
                                type="text"
                                className="create-spot-input-place-2-2"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required />

                            <input
                                type="text"
                                className="create-spot-input-place-2-2"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                required />

                            <input
                                type="text"
                                className="create-spot-input-place-2-2"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                required />
                        </div>

                        <input
                            type="text"
                            className="create-spot-input-place"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required />

                    </div>

                    <div className='create-spot-first-div-3'>
                        <textarea
                            className="create-spot-input-place-3-1"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required />

                        <input
                            type="text"
                            className="create-spot-input-place-3-2"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required />
                    </div> */}

                    <div className='create-spot-first-div-4'>
                        {/* <div className='create-spot-first-div-4-1-big'>
                            <div className='create-spot-first-div-4-1-1'>
                                Please drag the Google map to choose your listing's location ➡
                            </div>

                            <div className='create-spot-first-div-4-1-2'>
                                Latitude
                            </div>

                            <input
                                className='lat-input'
                                min="-90"
                                max="90"
                                type="number"
                                value={lat}
                                onChange={(e) => setLat(parseFloat(e.target.value))}
                                placeholder="Latitude"
                                step='any'
                                disabled
                                required />

                            <div className='create-spot-first-div-4-1-2'>
                                longitude
                            </div>

                            <input
                                className='lng-input'
                                min="-180"
                                max="180"
                                type="number"
                                value={lng}
                                onChange={(e) => setLng(parseFloat(e.target.value))}
                                placeholder="Longitude"
                                step='any'
                                disabled
                                required />
                        </div> */}

                        <SmallMapContainer
                            lat={lat}
                            lng={lng}
                            setLat={setLat}
                            setLng={setLng}
                        />
                    </div>

                    <button
                        className="edit-spot-button"
                        type="submit">Update Information!</button>
                </form>
                <div className="delete-spot-btn-container">
                    <div className="delete-spot-btn-word">Are you sure you want to delete this spot?</div>
                    <div className="delete-spot-btn-word2">This spot will be deleted immediately. You can't undo this action.</div>
                    <button
                        className="delete-spot-button"
                        onClick={handleDelete}>DELETE THIS SPOT!</button>
                </div>
            </div>
        </div>
    );
}

export default EditSpotPage;
