import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { thunkGetAllCurrentUserReviews } from '../../../store/reviewReducer';
import { thunkDeleteReview } from '../../../store/reviewReducer';
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
  return (
    <div className='review-card-container'>
      <h1 className='all-review'>All Your Reviews</h1>

      <div className='review-card-container'>
        {reviewsArr.map((review) => (
          <div className="review-card" id={review.id} key={review.id}>

            <li className="review-card-name">Spot's Name: {review.Spot?.name}</li>
            <li className="review-card-text">{review.review}</li>
            <li className="review-card-stars">Stars: {review.stars}</li>

            <button
            className='delete-review-button'
            onClick={(e) => handleDelete(review.id)}>Delete This Review</button>
            <hr></hr>
            <div className='space-review-form'></div>
          </div>

        ))}
      </div>
    </div>
  );
}

export default CurrentUserReviews;
