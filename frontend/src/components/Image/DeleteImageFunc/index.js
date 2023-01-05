import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkDeleteSpotImg, thunkGetOneSpot } from '../../../store/spotReducer';

import './DeleteImageFunc.css'

function DeleteImageFunc({imageId}) {
  const dispatch = useDispatch();
  const { spotId } = useParams();

  const handleDelete = async (e) => {
    e.preventDefault();
    dispatch(thunkDeleteSpotImg(imageId))
    dispatch(thunkGetOneSpot(spotId))
}

  return (
      <button
      className='delete-image-btn'
      onClick={handleDelete}>Remove This Image</button>
  )

}

export default DeleteImageFunc;
