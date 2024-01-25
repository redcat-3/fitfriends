import { useState } from "react";
import { PAYMENT_METHOD, PaymentMethod } from "../../types/reaction";

type PopupProps = {
  background: string;
  name: string;
  price: number;
  onBuyClick: (count: number) => void;
  onClose: () => void;
};

function PopupBuy({background, name, price, onBuyClick, onClose}: PopupProps): JSX.Element {
  const [count, setCount] = useState(4);
  const [payment, setPayment] = useState(PaymentMethod.Mir);
    return (
      <section className="popup" style={{alignItems: 'flex-start'}}>
        <div className="popup__wrapper">
          <div className="popup-head">
            <h2 className="popup-head__header">Купить тренировку</h2>
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
          <div className="popup__content popup__content--purchases">
            <div className="popup__product">
              <div className="popup__product-image">
                <picture>
                  <source 
                    type="image/webp" 
                    srcSet={`${background}.webp, ${background}@2x.webp 2x,`}
                  />
                  <img 
                    src={`${background}.png`}
                    srcSet={`${background}@2x.png 2x`} 
                    width="98" 
                    height="80" 
                    alt=""
                  />
                </picture>
              </div>
              <div className="popup__product-info">
                <h3 className="popup__product-title">{name}</h3>
                <p className="popup__product-price">{price} ₽</p>
              </div>
              <div className="popup__product-quantity">
                <p className="popup__quantity">Количество</p>
                <div className="input-quantity">
                  <button 
                    className="btn-icon btn-icon--quantity"
                    type="button"
                    aria-label="minus"
                    onClick={() => setCount(count-1)}
                  >
                    <svg width="12" height="12" aria-hidden="true">
                      <use xlinkHref="#icon-minus"></use>
                    </svg>
                  </button>
                  <div className="input-quantity__input">
                    <label>
                      <input
                        type="text"
                        value={count}
                        size={2}
                        readOnly
                      />
                    </label>
                  </div>
                  <button
                    className="btn-icon btn-icon--quantity"
                    type="button"
                    aria-label="plus"
                    onClick={() => setCount(count+1)}
                  >
                    <svg width="12" height="12" aria-hidden="true">
                      <use xlinkHref="#icon-plus"></use>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <section className="payment-method">
              <h4 className="payment-method__title">Выберите способ оплаты</h4>
              <ul className="payment-method__list">
                {PAYMENT_METHOD.map((item, index) => (
                  <li className="payment-method__item" key={index}>
                    <div className="btn-radio-image">
                      <label>
                        <input
                          type="radio"
                          name="payment-purchases"
                          aria-label={item}
                          checked={item === payment}
                          onClick={() => setPayment(item as PaymentMethod)}
                        />
                          <span className="btn-radio-image__image">
                            <svg width="58" height="20" aria-hidden="true">
                              <use xlinkHref={`#${item}-logo`}></use>
                            </svg>
                          </span>
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
            <div className="popup__total">
              <p className="popup__total-text">Итого</p>
              <svg className="popup__total-dash" width="310" height="2" aria-hidden="true">
                <use xlinkHref="#dash-line"></use>
              </svg>
              <p className="popup__total-price">{price*count}&nbsp;₽</p>
            </div>
            <div className="popup__button">
              <button
                className="btn"
                type="button"
                onClick={() => onBuyClick(count)}
              >Купить</button>
            </div>
          </div>
        </div>
      </section>
    );
  }
  export default PopupBuy;
  