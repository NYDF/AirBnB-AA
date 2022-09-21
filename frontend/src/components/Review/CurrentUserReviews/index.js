import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { thunkGetAllCurrentUserReviews } from '../../../store/reviewReducer';
import { thunkDeleteReview } from '../../../store/reviewReducer';

function CurrentUserReviews() {
  const dispatch = useDispatch();
  const reviews = useSelector(state => state.review)
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(thunkGetAllCurrentUserReviews());
  }, [dispatch, reviews]);

  if (!reviews) { return null }
  if (!sessionUser) { history.push(`/`) }

  // console.log('reviews!!!!', reviews)
  const reviewsArr = Object.values(reviews)
  // console.log('reviewsArr!!!!', reviewsArr.spot)

  const handleDelete = async (reviewId) => {
    // reviewId.preventDefault();
    let deleteSpot = await dispatch(thunkDeleteReview(reviewId))
    history.push(`/reviewss/current`)
  }

  return (
    <div className="current-user-spots">
      <h1>test</h1>

      <div>
        {reviewsArr.map((review) => (
          <div className="review-card" id={review.id} >

            <li className="review-card-text">{review.review}</li>
            <li className="review-card-stars">{review.stars}</li>
            <li className="review-card-stars">{review.spot}</li>

            <button onClick={(e) => handleDelete(review.id)}>Delete This Review</button>
            <hr></hr>
          </div>

        ))}
      </div>
    </div>
  );
}

export default CurrentUserReviews;
