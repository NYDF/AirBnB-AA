import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { thunkGetAllCurrentUserReviews } from '../../../store/reviewReducer';
import { thunkDeleteReview } from '../../../store/reviewReducer';
import { Link } from 'react-router-dom';
import './CurrentUserReviews.css'

function CurrentUserReviews() {
  const dispatch = useDispatch();
  const reviews = useSelector(state => state.review)
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(thunkGetAllCurrentUserReviews());
  }, [dispatch]);

  if (!reviews) { return null }
  if (!sessionUser) { history.push(`/`) }

  // console.log('reviews!!!!', reviews)
  let reviewsArr = Object.values(reviews)
  // console.log('reviewsArr!!!!', reviewsArr.spot)

  const handleDelete = async (reviewId) => {
    // reviewId.preventDefault();
    let deleteSpot = await dispatch(thunkDeleteReview(reviewId))
    history.push(`/reviewss/current`)
  }
  // console.log('reviewsArr!!!!', reviewsArr)

  if (!reviewsArr.length) {
    return (
      <div className='no-spot-text'>
        You have no reviews yet.
      </div>
    )
  } else {
  return (
    <div>
      <h1 className='All-review'>All Your Reviews</h1>

      <div className='all-reviews-container'>
        {reviewsArr.map((review) => (

          <div className="Areview-card-container" id={review.id} key={review.id}>

            <div className="review-card">
              <div className="review-card-left">
                <Link to={`/spots/${review.Spot?.id}`}>
                <img className="current-review-image" src={review.Spot?.previewImage} />
                </Link>
              </div>

              <div className="review-card-right">
                <li className="review-card-name">{review.Spot?.name}</li>
                <li className="review-card-text">What you wrote: {review.review}</li>
                <li className="review-card-text">Stars: {review.stars}</li>

                <button
                  className='delete-review-button'
                  onClick={(e) => handleDelete(review.id)}>DELETE THIS REVIEW</button>
              </div>

            </div>
          </div>

        ))}
      </div>
    </div>
  )
        }
}

export default CurrentUserReviews;
