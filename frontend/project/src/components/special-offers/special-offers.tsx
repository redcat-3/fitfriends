import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { DEFAULT_LIMIT_SPECIAL, DEFAULT_NOT_FOUND_MESSAGE } from '../../constant';
import { fetchWorkoutsAction } from '../../store/api-actions';
import { getWorkouts } from '../../store/workout-process/selectors';
import { store } from '../../store';

function SpecialOffers(): JSX.Element {
  const query = {
    limit: DEFAULT_LIMIT_SPECIAL,
    page: 1,
    sortBy: 'createdDate',
    sortDirection: 'desc',
    special: true
  };
  store.dispatch(fetchWorkoutsAction(query));
  const items = useAppSelector(getWorkouts);
  const [activeSlide, setSlide] = useState(0);
  const [activeDot, setActiveDot] = useState(1);
  const numbers: number[] = [];
  for (let i = 1; i < items.length; i++) {
    numbers.push(i);
  }
  const handleDotsClick = (number: number): void => {
    setSlide(number);
    setActiveDot(number);
  }
  return (
    <section className="special-offers">
      <div className="container">
        <div className="special-offers__wrapper">
          <h2 className="visually-hidden">Специальные предложения</h2>
          <ul className="special-offers__list">
            {items.length <= 0  ? <h3 className="promo-slider__title">{DEFAULT_NOT_FOUND_MESSAGE}</h3> : items.map((slide, index) => (
              <div key={index} className={index === activeSlide ? "special-offers__item is-active" : "special-offers__item"}>
                <aside className="promo-slider">
                  <div className="promo-slider__overlay"></div>
                  <div className="promo-slider__image">
                    <img
                      src={`${slide.background}.png`}
                      srcSet={`${slide.background}@2x.png 2x`}
                      width="1040"
                      height="469"
                      alt="promo-photo"
                    />
                  </div>
                  <div className="promo-slider__header">
                    <h3 className="promo-slider__title">{slide.name}</h3>
                    <div className="promo-slider__logo">
                      <svg width="74" height="74" aria-hidden="true">
                        <use xlinkHref="#logotype"></use>
                      </svg>
                    </div>
                  </div>
                  <span className="promo-slider__text">{slide.description}</span>
                  <div className="promo-slider__bottom-container">
                    <div className="promo-slider__slider-dots">
                      {numbers.map((number, index) => (
                        <button key={index}
                          className={number === activeDot ? "promo-slider__slider-dot--active promo-slider__slider-dot" : "promo-slider__slider-dot"}
                          aria-label={`${number} слайд`}
                          onClick={() => {handleDotsClick(number)}}
                        ></button>
                      ))}
                    </div>
                    <div className="promo-slider__price-container">
                      <p className="promo-slider__price">{slide.price} ₽</p>
                      <p className="promo-slider__sup">за занятие</p>
                      <p className="promo-slider__old-price">{slide.price*1.5} ₽</p>
                    </div>
                  </div>
                </aside>
              </div>
            ))}
          </ul>
          <div className="thumbnail-spec-gym">
            <div className="thumbnail-spec-gym__image">
              <picture>
                <source
                  type="image/webp"
                  srcSet="img/content/thumbnails/nearest-gym-01.webp, img/content/thumbnails/nearest-gym-01@2x.webp 2x"
                />
                <img
                  src="img/content/thumbnails/nearest-gym-01.jpg"
                  srcSet="img/content/thumbnails/nearest-gym-01@2x.jpg 2x"
                  width="330"
                  height="190"
                  alt=""
                />
              </picture>
            </div>
            <div className="thumbnail-spec-gym__header">
              <h3 className="thumbnail-spec-gym__title">Скоро здесь появится что - то полезное</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default React.memo(SpecialOffers);
