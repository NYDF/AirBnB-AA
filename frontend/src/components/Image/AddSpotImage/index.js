import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkAddSpotImg } from "../../../store/spotReducer";
import './AddSpotImage.css'

function AddSpotImage() {

  const dispatch = useDispatch();
  const [url, setUrl] = useState('');
  const { spotId } = useParams();
  const [hasSubmitted, setHasSubmitted] = useState("");


  const handleAddImg = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    const imgPayload = { url, preview: false }
    let addedImage = await dispatch(thunkAddSpotImg(imgPayload, spotId)).catch(async (res) => {

      const data = await res.json();
    });
  }

  return (
    <div>
      <h1 className='All-review'>add images</h1>
      <button
        className="delete-spot-button"
        onClick={handleAddImg}>Add Images</button>

    </div>
  )

}

export default AddSpotImage;
