import React, { TouchEventHandler, useState } from 'react';
import './css/style.css';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { redirectToRoute } from '../../store/action';
import { AppRoute, DEFAULT_LIMIT_LOOK_FOR } from '../../constant';
import LookForCompanySlide from './items/look-for-company-slide/look-for-company';
import { fetchUsersAction } from '../../store/api-actions';
import { getUsers } from '../../store/user-process/selectors';
import { store } from '../../store';

function LookForCompany(): JSX.Element {
  const dispatch = useAppDispatch();
  const query = {
    limit: DEFAULT_LIMIT_LOOK_FOR,
    page: 1,
    trainingReady: true,
    sortDirection: 'desc',
  };
  store.dispatch(fetchUsersAction(query));
  const items = useAppSelector(getUsers);
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
    dispatch(redirectToRoute(AppRoute.UsersCatalog));
  }
  return (
    <section className="look-for-company">
      <div
        className="container sider"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <div className="look-for-company__wrapper">
          <div className="look-for-company__title-wrapper">
            <h2 className="look-for-company__title">Ищут компанию для тренировки</h2>
            <button
              className="btn-flat btn-flat--light look-for-company__button"
              type="button"
              onClick={handleClick}
            >
              <span>Смотреть все</span>
              <svg width="14" height="10" aria-hidden="true">
                <use xlinkHref="#arrow-right"></use>
              </svg>
            </button>
            <div className="look-for-company__controls">
              <button
                className="btn-icon btn-icon--outlined look-for-company__control"
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
                className="btn-icon btn-icon--outlined look-for-company__control"
                type="button"
                aria-label="next"
                onClick={() => changeSlide(1)}
                disabled={slide >= items.length -2}
              >
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-right"></use>
                </svg>
              </button>
            </div>
          </div>
          <ul 
            className="look-for-company__list slide-list"
            style={{ transform: `translateX(-${slide * 20}%)`}}
          >
            {items.map((slide, index) => (
              <LookForCompanySlide key={index}
                id={slide.id}
                avatar={slide.avatar}
                name={slide.name}
                location={slide.location}
                typeOfTrain={slide.typeOfTrain}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
export default React.memo(LookForCompany);
