import React from 'react';
import { createWorkout } from '../../../mocks/workouts';
import { OrderToCoach } from '../../../types/reaction';
import { Link } from 'react-router-dom';

type MyOrdersItemProps = {
  orderToCoach: OrderToCoach;
};

function MyOrdersItem({orderToCoach}: MyOrdersItemProps): JSX.Element {
  const workout = createWorkout(orderToCoach.workoutId);
  return (
    <li className="my-orders__item">
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
                <div className="hashtag thumbnail-training__hashtag"><span>#{workout.type}</span></div>
              </li>
              <li className="thumbnail-training__hashtags-item">
                <div className="hashtag thumbnail-training__hashtag"><span>#{workout.caloriesToSpend}ккал</span></div>
              </li>
            </ul>
            <div className="thumbnail-training__rate">
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-star"></use>
              </svg><span className="thumbnail-training__rate-value">{workout.rating}</span>
            </div>
          </div>
          <div className="thumbnail-training__text-wrapper">
            <p className="thumbnail-training__text">{workout.description}</p>
          </div>
          <Link to={`/training-card-coach/${workout.workoutId}`} className="btn-flat btn-flat--underlined thumbnail-training__button-orders">
            <svg width="18" height="18" aria-hidden="true">
              <use xlinkHref="#icon-info"></use>
            </svg><span>Подробнее</span>
          </Link>
        </div>
        <div className="thumbnail-training__total-info">
          <div className="thumbnail-training__total-info-card">
            <svg width="32" height="32" aria-hidden="true">
              <use xlinkHref="#icon-chart"></use>
            </svg>
            <p className="thumbnail-training__total-info-value">{orderToCoach.countWorkout}</p>
            <p className="thumbnail-training__total-info-text">Куплено тренировок</p>
          </div>
          <div className="thumbnail-training__total-info-card">
            <svg width="31" height="28" aria-hidden="true">
              <use xlinkHref="#icon-wallet"></use>
            </svg>
            <p className="thumbnail-training__total-info-value">{orderToCoach.orderPrice}<span>₽</span></p>
            <p className="thumbnail-training__total-info-text">Общая сумма</p>
          </div>
        </div>
      </div>
    </li>
  );
}
export default React.memo(MyOrdersItem);
