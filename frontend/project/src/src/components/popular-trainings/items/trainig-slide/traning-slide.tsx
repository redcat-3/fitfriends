import { Link } from "react-router-dom";
import { Workout } from "../../../../types/workout-data";

type TraningsSlideProps = {
  workout: Workout;
};

function TraningsSlide ({workout}: TraningsSlideProps): JSX.Element {
  return (
    <li className="popular-trainings__item" key={workout.workoutId}>
      <div className="thumbnail-training">
        <div className="thumbnail-training__inner">
          <div className="thumbnail-training__image slide-image">
            <picture>
              <source
                type="image/webp"
                srcSet={`${workout.background}.webp, ${workout.background}.webp 2x`}
              />
              <img
                src={`${workout.background}.jpg`}
                srcSet={`${workout.background}@2x.jpg 2x`}
                width="330"
                height="190"
                alt={workout.name}
              />
            </picture>
          </div>
          <p className="thumbnail-training__price">
            <span className="thumbnail-training__price-value">{workout.price}</span>
            <span>₽</span>
          </p>
          <h3 className="thumbnail-training__title">{workout.name}</h3>
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
              </svg>
              <span className="thumbnail-training__rate-value">{workout.rating}</span>
            </div>
          </div>
          <div className="thumbnail-training__text-wrapper">
            <p className="thumbnail-training__text">{workout.description}</p>
          </div>
          <div className="thumbnail-training__button-wrapper">
            <Link to={`/training-card/${workout.workoutId}`} className="btn btn--small thumbnail-training__button-catalog">Подробнее</Link>
            <Link to={`/training-card/feedbacks/${workout.workoutId}`} className="btn btn--small btn--outlined thumbnail-training__button-catalog">Отзывы</Link>
          </div>
        </div>
      </div>
    </li>
  )
}
export default TraningsSlide;
  