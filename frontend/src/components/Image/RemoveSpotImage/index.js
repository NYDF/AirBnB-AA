import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import DeleteImageFunc from '../DeleteImageFunc';

import './RemoveSpotImage.css'

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
          <div>
            <img className='delete-spot-image' src={image.url} alt='still Loading' />
          </div>
          <div>
            <DeleteImageFunc imageId={image.id}/>
          </div>
        </div>
      ))}
    </div>
  )

}

export default RemoveSpotImage;
