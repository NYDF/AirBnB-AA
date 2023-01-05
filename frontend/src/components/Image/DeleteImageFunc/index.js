import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkAddSpotImgAWS } from "../../../store/spotReducer";
import { useHistory } from 'react-router-dom';
import './DeleteImageFunc.css'

function DeleteImageFunc() {
  const dispatch = useDispatch();
  const handleDelete = async (e) => {
    e.preventDefault();
    // let deleteSpot = await dispatch(thunkDeleteSpot(spotId))

}

  return (
    <div className='delete-image-btn-container'>


      <button>Remove This Image</button>


    </div>
  )

}

export default DeleteImageFunc;
