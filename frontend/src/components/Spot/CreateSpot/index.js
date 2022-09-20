
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './CreateSpot.css';

function CreateSpotPage() {
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
  const [url, setUrl] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState("");
  const [errors, setErrors] = useState([]);
  const [validationErrors, setValidationErrors] = useState([]);

  if (!sessionUser) return <Redirect to="/" />;

  useEffect(()=>{
    let errors = [];
    if (!url.includes('.com') && !imageUrl.includes('.jpg') && !imageUrl.includes('.png')){
      errors.push('please provide a valide image URL!')
    }
    setValidationErrors(errors)
  }, [url])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    if (validationErrors.length) {return}

    setErrors([]);
    const payload = {name, address, city, state, country,description, lat, lng, price}
    const imagePayload = {url, previewImage: true}

    let newSpot = await dispatch(thunkCreateSpot(payload)).catch(async (res) => {
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

  return (
    <div className = 'create-spot-form-container'>
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
          required/>
      </label>

      <label>
        Price
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required/>
      </label>

      <label>
        Address
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required/>
      </label>

      <label>
      City
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required/>
      </label>

      <label>
        State
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required/>
      </label>

      <label>
        Country
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required/>
      </label>

      <label>
        Description
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required/>
      </label>

      <label>
      Latitude
        <input
          type="text"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          required/>
      </label>

      <label>
      Longitude
        <input
          type="text"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
          required/>
      </label>

      <label>
      ImageURL
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required/>
      </label>

      <button type="submit">Create the Spot!</button>
    </form>

    </div>
  );
}

export default CreateSpotPage;
