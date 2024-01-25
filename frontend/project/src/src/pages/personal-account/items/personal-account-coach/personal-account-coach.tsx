import PersonalAccountCoachNav from '../personal-account-coach-nav/personal-account-coach-nav';
import PersonalAccountCoachItem from '../personal-account-coach-item/personal-account-coach-item';
import { TouchEventHandler, useRef, useState } from 'react';
import '../css/style.css';
import { useAppSelector } from '../../../../hooks';
import { getUser } from '../../../../store/user-process/selectors';
import { UserCoach } from '../../../../types/user-data';

function PersonalAccountCoach(): JSX.Element {
  const user = useAppSelector(getUser) as UserCoach;
  const items = user.certificates;
  const [slide, setSlide] = useState(0);
  const [touchPosition, setTouchPosition] = useState(0);
  const prevItemIndex = slide - 1 < -1 ? -1 : slide - 1;
  const nextItemIndex = slide + 1 > items.length ? items.length : slide + 1;
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
  }

  const inputFile = useRef<HTMLInputElement>(null);

  const handlerInput = () => {
    inputFile.current?.click();
  };

  const handlerFileChange = () => {
    if(inputFile.current?.files) {
      const input = inputFile.current.files[0];
      console.log(input);
    }
  };
  return (
    <div className="personal-account-coach">
      <PersonalAccountCoachNav id={user.id}/>
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          className="personal-account-coach__additional-info slider"
        >
          <div className="personal-account-coach__label-wrapper" >
            <h2 className="personal-account-coach__label">Дипломы и сертификаты</h2>
            <button
              className="btn-flat btn-flat--underlined personal-account-coach__button"
              type="button"
              onClick={ handlerInput }
            >
              <input
                type="file"
                ref={inputFile}
                className="visually-hidden"
                accept=".pdf"
                onChange={handlerFileChange}
              />
              <svg width="14" height="14" aria-hidden="true">
                <use xlinkHref="#icon-import"></use>
              </svg>
              <span>Загрузить</span>
            </button>
            <div className="personal-account-coach__controls">
              <button
                className="btn-icon personal-account-coach__control"
                type="button"
                aria-label="previous"
                onClick={() => changeSlide(-1)}
                disabled={prevItemIndex < 0}
              >
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
              </button>
              <button
                className="btn-icon personal-account-coach__control"
                type="button"
                aria-label="next"
                onClick={() => changeSlide(1)}
                disabled={nextItemIndex >= (items.length - 2)}
              >
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-right"></use>
                </svg>
              </button>
            </div>
          </div>
          <ul className="personal-account-coach__list slide-list"
           style={{ transform: `translateX(-${slide * 33.4}%)` }}>
            {items.map((slide, index) => (
              <PersonalAccountCoachItem
                id={index}
                certificate={slide}
                userId={user.id}
              />
            ))}
          </ul>
      </div>
    </div>
  );
}
export default PersonalAccountCoach;
