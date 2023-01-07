import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkAddSpotImg } from "../../../store/spotReducer";
import { thunkCreateSpot } from "../../../store/spotReducer";
import { useHistory } from "react-router-dom";
import SmallMapContainer from "../../Maps/SmallMap/index";

import './CreateSpot.css'


function CreateSpotPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState(40.70977216636848);
  const [lng, setLng] = useState(-73.96819584374789);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [url, setUrl] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState("");
  const [errors, setErrors] = useState([]);
  const [validationErrors, setValidationErrors] = useState([]);
  const history = useHistory();

  useEffect(() => {
    let errors = [];

    if (!url.includes('.com') && !url.includes('.jpg') && !url.includes('.png') && !url.includes('.jpeg')) {
      errors.push('please provide a valide image URL!')
    }
    if (!(Number(price) > 0)) {
      errors.push('please provide a valide price!')
    }
    if (!(Number(lat) > -90) && !(Number(lat) < 90)) {
      errors.push('please provide a valide latitude!')
    }
    if (!(Number(lng) > -180) && !(Number(lng) < 180)) {
      errors.push('please provide a valide Longitude!')
    }
    // console.log(typeof Number(price))
    setValidationErrors(errors)
  }, [url, price, lat, lng])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    if (validationErrors.length) { return }

    setErrors([]);
    setValidationErrors([]);
    const spotPayload = { name, address, city, state, country, description, lat, lng, price }
    const imagePayload = { url, preview: true }

    let newSpot = await dispatch(thunkCreateSpot(spotPayload)).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors)
    });

    if (newSpot) {
      let addImage = await dispatch(thunkAddSpotImg(imagePayload, newSpot.id)).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors)
      })
    }

    if (newSpot) {
      history.push(`/spots/${newSpot.id}`)
    }
  }

  // console.log(lat,lng)
  // console.log(validationErrors)
  return (
    <div className='create-spot-page-container'>
      <h1 className="create-spot-h1">Create a new listing</h1>

      <div className="create-spot-form-container">
        <form onSubmit={handleSubmit}>

          {hasSubmitted && !!validationErrors.length && (<div>
            <ul>
              {validationErrors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
          </div>)}

          <div className="create-spot-first-div">

            <input
              type="text"
              className="create-spot-input-place"
              placeholder="  Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required />


            <div className="create-spot-first-div-2">

              <input
                type="text"
                className="create-spot-input-place-2-2"
                value={city}
                placeholder="  City"
                onChange={(e) => setCity(e.target.value)}
                required />

              <input
                type="text"
                className="create-spot-input-place-2-2"
                value={state}
                placeholder="  State"
                onChange={(e) => setState(e.target.value)}
                required />


              <input
                type="text"
                className="create-spot-input-place-2-2"
                value={country}
                placeholder="  Country"
                onChange={(e) => setCountry(e.target.value)}
                required />
            </div>
            <input
              type="text"
              className="create-spot-input-place"
              value={address}
              placeholder="  Address"
              onChange={(e) => setAddress(e.target.value)}
              required />

          </div>


          <div className='create-spot-first-div-3'>
            <input
              type="textarea"
              className="create-spot-input-place-3-1"
              value={description}
              placeholder="  Description"
              onChange={(e) => setDescription(e.target.value)}
              required />


            <input
              type="text"
              className="create-spot-input-place-3-2"
              value={price}
              placeholder="  Price"
              onChange={(e) => setPrice(e.target.value)}
              required />
          </div>

          <div className='create-spot-first-div-4'>
            <div className='create-spot-first-div-4-1-big'>
              <div className='create-spot-first-div-4-1-1'>
                Please drag the Google map to choose your listing's location
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
                value={lng.toFixed(8)}
                onChange={(e) => setLng(parseFloat(e.target.value))}
                placeholder="Longitude"
                step='any'
                disabled
                required />
            </div>

            <SmallMapContainer
              lat={lat}
              lng={lng}
              setLat={setLat}
              setLng={setLng}
            />

          </div>

          <label>
            <input
              className="create-spot-input-place"
              type="text"
              value={url}
              placeholder="  Image URL"
              onChange={(e) => setUrl(e.target.value)}
              required />
          </label>

          <br></br>

          <button
            className="create-spot-button"
            type="submit">Create the Spot!</button>
        </form>

      </div>
    </div>
  );
}

export default CreateSpotPage;
