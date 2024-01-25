import React, { TouchEventHandler, useState } from 'react';
import './css/certificate.css';
import CertificateSlide from './certificate-slide/certificate-slide';

type PopupCertificateProps = {
    onClose: () => void;
    certificate: string[];
  };

function PopupCertificate({certificate, onClose}: PopupCertificateProps): JSX.Element {
  const [items, setItems] = useState(certificate);
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
  };
  return (
    <section className="popup">
      <h2 className="visually-hidden">Слайдер с сертификатами.</h2>
      <div className="popup__wrapper slider" 
        style={{width: 690, height: 650, }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}>
        <div className="popup-head">
          <h2 className="popup-head__header">Сертификаты</h2>
          <button
            className="btn-icon btn-icon--outlined btn-icon--big"
            type="button"
            aria-label="close"
            onClick={onClose}
          >
            <svg width="20" height="20" aria-hidden="true">
              <use xlinkHref="#icon-cross"></use>
            </svg>
          </button>
        </div>
        <div className="popup__content popup__content--certificates slider-list">
          <div className="popup__slider-buttons" style={{zIndex:100}}>
            <button
              className="btn-icon popup__slider-btn popup__slider-btn--prev"
              type="button"
              aria-label="prev"
              onClick={() => changeSlide(-1)}
              disabled={prevItemIndex < 0}
            >
              <svg width="16" height="14" aria-hidden="true">
                <use xlinkHref="#arrow-left"></use>
              </svg>
            </button>
            <button
              className="btn-icon popup__slider-btn popup__slider-btn--next"
              type="button"
              aria-label="next"
              onClick={() => changeSlide(1)}
              disabled={nextItemIndex >= (items.length - 1)}
            >
              <svg width="16" height="14" aria-hidden="true">
                <use xlinkHref="#arrow-right"></use>
              </svg>
            </button>
          </div>        
            <ul 
                style={{ transform: `translateX(-${slide * 120}%)`, display: 'flex', flexDirection: 'row', width: 390}}>
                {items.map((slide, index) => (
                <CertificateSlide
                  key={index}
                  slide={slide}
                />
                ))}
            </ul>          
        </div>
      </div>
    </section>

  );
}
export default React.memo(PopupCertificate);


