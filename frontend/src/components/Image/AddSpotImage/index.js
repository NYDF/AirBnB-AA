import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { thunkGetAllCurrentUserReviews } from '../../../store/reviewReducer';
import { thunkDeleteReview } from '../../../store/reviewReducer';
import { Link } from 'react-router-dom';
import './AddSpotImage.css'

function AddSpotImage() {

  return (
    <div>
      <h1 className='All-review'>add images</h1>


    </div>
  )

}

export default AddSpotImage;
