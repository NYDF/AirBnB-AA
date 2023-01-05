import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkAddSpotImgAWS } from "../../../store/spotReducer";
import { useHistory } from 'react-router-dom';
import './AddSpotImage.css'
import RemoveSpotImage from '../RemoveSpotImage';

const validExtensions = [
  'jpeg',
  'jpg',
  'png',
  'svg'
]

function AddSpotImage() {

  const dispatch = useDispatch();
  // const [url, setUrl] = useState('');
  const { spotId } = useParams();
  const [spotFile, setSpotFile] = useState(null);
  // const [hasSubmitted, setHasSubmitted] = useState("");
  // const [errors, setErrors] = useState("");
  // console.log('spotFile====1', spotFile)
  const history = useHistory()

  const handleAddImg = async (e) => {
    e.preventDefault()
    let errors = false;
    if (spotFile.length > 0) {
      const urlArr = spotFile.name.split('.');
      const ext = urlArr[urlArr.length - 1];
      if (!validExtensions.includes(ext.toLocaleLowerCase())) {
        errors = true
        alert(`Image format is invalid. Please upload Png, jpg, jpeg, svg format. `)
        return
      }
    }

    if (errors) return;

    const formData = new FormData()
    formData.append("file", spotFile)
    formData.append("preview", false)

    for (var key of formData.entries()) { console.log(key[0] + ', ' + key[1]) }

    // console.log('----------------------',spotId)
    dispatch(thunkAddSpotImgAWS(formData, spotId)).then(() => history.push(`/spots/${spotId}`))
  }

  const updateFile = (e) => {
    const file = e.target.files[0]
    if (file) setSpotFile(file)
  }

  return (
    <>
    <div className='add-image-container'>

      <h1>Add Images to This Spot</h1>
      <button
        className="edit-spot-add-image-btn"
        onClick={handleAddImg}>Add Images</button>

      <span className='browse-files-span'>
        <input
          id='browse-files'
          className='choose-image-input'
          type='file'
          // accept="image/*"
          onChange={updateFile}
        />
      </span>
    </div>

    <RemoveSpotImage />
    </>
  )

}

export default AddSpotImage;
