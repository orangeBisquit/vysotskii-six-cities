import React, {FormEvent, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchCommentsAction, postCommentAction} from '../../store/api-actions';
import {ReviewPost} from '../../types/reviews';
import {maxFormLength} from '../../utils/const';

function ReviewForm() {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const dispatch = useAppDispatch();
  const {currentOffer} = useAppSelector((state) => state);

  const commentInfo: ReviewPost = {
    id: currentOffer?.id,
    comment,
    rating: +rating,
  };

  const clearForm = () => {
    setRating('');
    setComment('');
  };

  const submitDisabledFlag: boolean = comment.length < 50 || !rating;

  const handleCommentSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(postCommentAction(commentInfo));
    dispatch(fetchCommentsAction());
    clearForm();
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={(evt) => handleCommentSubmit(evt)}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars"
          type="radio" onChange={({target}) => setRating(target.value)}
          checked={rating === '5'}
        />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars"
          type="radio" onChange={({target}) => setRating(target.value)}
          checked={rating === '4'}
        />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars"
          type="radio" onChange={({target}) => setRating(target.value)}
          checked={rating === '3'}
        />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars"
          type="radio" onChange={({target}) => setRating(target.value)}
          checked={rating === '2'}
        />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star"
          type="radio" onChange={({target}) => setRating(target.value)}
          checked={rating === '1'}
        />
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label"
          title="terribly"
        >
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={({target}) => setComment(target.value)}
        value={comment}
        maxLength={maxFormLength}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit"
          disabled={submitDisabledFlag}
        >Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
