import React, { TouchEventHandler, useState } from 'react';
import './css/style.css';
import TraningsSlide from './items/trainig-slide/traning-slide';
import { redirectToRoute } from '../../store/action';
import { AppRoute, DEFAULT_LIMIT_POPULAR } from '../../constant';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchWorkoutsAction } from '../../store/api-actions';
import { getWorkouts } from '../../store/workout-process/selectors';
import { store } from '../../store';

function PopularTranings(): JSX.Element {
  const dispatch = useAppDispatch();
  const query = {
    limit: DEFAULT_LIMIT_POPULAR,
    page: 1,
    sortBy: 'createdDate',
    sortDirection: 'desc',
    rating: '5,5'
  };
  store.dispatch(fetchWorkoutsAction(query));
  const items = useAppSelector(getWorkouts);
  const [slide, setSlide] = useState(0);
  const [touchPosition, setTouchPosition] = useState(0);
  const changeSlide = (direction: number) => {
    let slideNumber = 0;
    if (direction < 0) { 
      if (slide + direction <= -1) {
        slideNumber = -1;
      } else {
        slideNumber = slide + direction;
      }
    }
    if (direction > 0) { 
      if (slide + direction > items.length) {
        slideNumber = items.length;
      } else {
        slideNumber = slide + direction;
      }
    }
    setSlide(slideNumber);
  };
  const handleTouchStart: TouchEventHandler = (evt) => {
    const touchDown = evt.touches[0].clientX;

    setTouchPosition(touchDown);
  }

  const handleTouchMove: TouchEventHandler = (evt) => {
    if (touchPosition === 0) {
      return;
    }

    const currentPosition = evt.touches[0].clientX;
    const direction = touchPosition - currentPosition;

    if (direction > 10) {
      changeSlide(1);
    }

    if (direction < -10) {
      changeSlide(-1);
    }

    setTouchPosition(0);
  };
  
  const handleClick = () => {
    dispatch(redirectToRoute(AppRoute.TrainingCatalog));
  }
  return (
    <section className="popular-trainings">
      <div
        className="container slider"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        style={{ width: "100%", height: "100%"}}
      >
        <div className="popular-trainings__wrapper">
          <div className="popular-trainings__title-wrapper">
            <h2 className="popular-trainings__title">Популярные тренировки</h2>
            <button
              className="btn-flat popular-trainings__button"
              type="button"
              onClick={handleClick}
            >
              <span>Смотреть все</span>
              <svg width="14" height="10" aria-hidden="true">
                <use xlinkHref="#arrow-right"></use>
              </svg>
            </button>
            <div className="popular-trainings__controls">
              <button
                className="btn-icon popular-trainings__control"
                type="button"
                aria-label="previous"
                onClick={() => changeSlide(-1)}
                disabled={slide <= 0}
              >
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
              </button>
              <button
                className="btn-icon popular-trainings__control"
                type="button"
                aria-label="next"
                onClick={() => changeSlide(1)}
                disabled={slide >= items.length}
              >
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-right"></use>
                </svg>
              </button>
            </div>
          </div>
          <ul
            className="popular-trainings__list slide-list"
            style={{ transform: `translateX(-${slide * 20}%)`}}
          >
            {items.map((slide, index) => (
              <TraningsSlide key={index}
                workout={slide}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
export default React.memo(PopularTranings);
