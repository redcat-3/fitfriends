import React from 'react';
import { Link } from 'react-router-dom';
import { createWorkout } from '../../../mocks/workouts';

type MyPurchasesItemProps = {
  id: number | undefined,
  workoutId: number
};

function MyPurchasesItem({id, workoutId}: MyPurchasesItemProps): JSX.Element {
  const workout = createWorkout(workoutId);
  if(workout) { return (
    <li className="my-purchases__item">
      <div className="thumbnail-training">
        <div className="thumbnail-training__inner">
          <div className="thumbnail-training__image">
            <picture>
              <source
                type="image/webp"
                srcSet={`${workout.background}.webp ${workout.background}@2x.webp 2x`}
              />
              <img
                src={`${workout.background}.png`}
                srcSet={`${workout.background}@2x.png 2x`}
                width="330"
                height="190"
                alt=""
              />
            </picture>
          </div>
          <p className="thumbnail-training__price">
            <span className="thumbnail-training__price-value">{workout.price}</span><span>₽</span>
          </p>
          <h2 className="thumbnail-training__title">{workout.name}</h2>
          <div className="thumbnail-training__info">
            <ul className="thumbnail-training__hashtags-list">
              <li className="thumbnail-training__hashtags-item">
                <div className="hashtag thumbnail-training__hashtag">
                  <span>#{workout.type}</span>
                </div>
              </li>
              <li className="thumbnail-training__hashtags-item">
                <div className="hashtag thumbnail-training__hashtag">
                  <span>#{workout.caloriesToSpend}ккал</span>
                </div>
              </li>
            </ul>
            <div className="thumbnail-training__rate">
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-star"></use>
              </svg>
              <span className="thumbnail-training__rate-value">{workout.rating}</span>
            </div>
          </div>
          <div className="thumbnail-training__text-wrapper">
            <p className="thumbnail-training__text">{workout.description}</p>
          </div>
          <div className="thumbnail-training__button-wrapper">
            <Link to={`/training-card-user/${workout.workoutId}`} className="btn btn--small thumbnail-training__button-catalog">Подробнее</Link>
            <Link to={`/training-card-user/feedbacks/${workout.workoutId}`} className="btn btn--small btn--outlined thumbnail-training__button-catalog">Отзывы</Link>
          </div>
        </div>
      </div>
    </li>
    );
  } else {
    return (
      <li className="my-purchases__item">
      <div className="thumbnail-training">
        <div className="thumbnail-training__inner">
          <h2 className="thumbnail-training__title">Тренировка не найдена</h2>
        </div>
      </div>
    </li>
    )
  }
}
export default React.memo(MyPurchasesItem);
