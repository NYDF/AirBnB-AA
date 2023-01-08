import { useState, useEffect } from 'react';
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
  const [errors, setErrors] = useState([]);
  const [validationErrors, setValidationErrors] = useState([]);
  const dispatch = useDispatch();
  // const [url, setUrl] = useState('');
  const { spotId } = useParams();
  const [spotFile, setSpotFile] = useState(null);
  // console.log('spotFile====1', spotFile)
  const history = useHistory()

  useEffect(() => {
    let errors = [];

    if (spotFile !== null) {
      const urlArr = spotFile.name.split('.');
      const ext = urlArr[urlArr.length - 1];
      // console.log('ext*************************', ext)
      if (!validExtensions.includes(ext.toLocaleLowerCase())) {
        errors.push(`Image format is invalid. Please upload Png, jpg, jpeg, svg format. `)
      }
      if (Number(spotFile.size) > 373900) {
        errors.push(`Image is too big, please resize it or choose a smaller one(up to 3MB). `)
      }
      // console.log('spotFile.size222222222222222222', spotFile.size)
    }

    // console.log(typeof Number(price))
    setValidationErrors(errors)
  }, [spotFile])

  const handleAddImg = async (e) => {
    e.preventDefault()

    if (validationErrors.length) { return }

    const formData = new FormData()
    formData.append("file", spotFile)
    formData.append("preview", false)

    // for (var key of formData.entries()) { console.log(key[0] + ', ' + key[1]) }

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

        {!!validationErrors.length && (<div>
          <ul>
            {validationErrors.map((error, idx) => <li
            className="errors-list"
            key={idx}>{error}</li>)}
          </ul>
        </div>)}

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
