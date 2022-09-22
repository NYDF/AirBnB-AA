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
  let count = 0

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
    count = count + 1
    history.push(`/reviewss/current`)
  }
  console.log('reviewsArr!!!!', reviewsArr)
  return (
    <div className="current-user-spots">
      <h1>test</h1>

      <div>
        {reviewsArr.map((review) => (
          <div className="review-card" id={review.id} key={review.id}>

            <li className="review-card-name">{review.Spot.name}</li>
            <li className="review-card-spotId">SpotId: {review.spotId}</li>
            <li className="review-card-text">{review.review}</li>
            <li className="review-card-stars">{review.stars}</li>

            <button onClick={(e) => handleDelete(review.id)}>Delete This Review</button>
            <hr></hr>
          </div>

        ))}
      </div>
    </div>
  );
}

export default CurrentUserReviews;
