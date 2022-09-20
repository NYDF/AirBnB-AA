
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { thunkEditSpot, thunkDeleteSpot } from "../../../store/spotReducer";


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
        <div className='create-spot-form-container'>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>

                <label>
                    Name
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required />
                </label>

                <label>
                    Price
                    <input
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required />
                </label>

                <label>
                    Address
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required />
                </label>

                <label>
                    City
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required />
                </label>

                <label>
                    State
                    <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required />
                </label>

                <label>
                    Country
                    <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required />
                </label>

                <label>
                    Description
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required />
                </label>

                <label>
                    Latitude
                    <input
                        type="text"
                        value={lat}
                        onChange={(e) => setLat(e.target.value)}
                        required />
                </label>

                <label>
                    Longitude
                    <input
                        type="text"
                        value={lng}
                        onChange={(e) => setLng(e.target.value)}
                        required />
                </label>

                {/* <label>
      ImageURL
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required/>
      </label> */}

                <button type="submit">Update Information!</button>
            </form>
            <button onClick={handleDelete}>DELETE THIS SPOT!</button>
        </div>
    );
}

export default EditSpotPage;
