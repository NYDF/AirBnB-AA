import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkAddSpotImgAWS } from "../../../store/spotReducer";
import { useHistory } from 'react-router-dom';
import './RemoveSpotImage.css'
import DeleteImageFunc from '../DeleteImageFunc';

function RemoveSpotImage() {
  const { spotId } = useParams();
  let spot = useSelector(state => state.spot[spotId])
  let spotImages = spot?.SpotImages
  console.log(spotImages)
  return (
    <div className='delete-image-container'>


      <h1>Delete Images from This Spot</h1>

      {spotImages?.map((image) => (
        <div className='delete-spot-images-div' key={image.id}>
          <span>
            <img className='delete-spot-image' src={image.url} alt='still Loading' />
          </span>
          <span>
            <DeleteImageFunc imageId={image.id}/>
          </span>
        </div>
      ))}
    </div>
  )

}

export default RemoveSpotImage;
