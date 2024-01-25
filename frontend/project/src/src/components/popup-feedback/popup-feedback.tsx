import { ChangeEventHandler, useState } from "react";
import { ErrorMessage, FeedbackTextLength } from "../../constant";

type PopupFeedbackProps = {
  onClose: () => void;
  onSendFeedback: (rating: number, text: string) => void;
};

function PopupFeedback({onClose, onSendFeedback}: PopupFeedbackProps): JSX.Element {
  const ratings = [1, 2, 3, 4, 5];
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [textError, setTextError] = useState(true);
  const handleTextChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setText(event.target.value);
    if(event.target.value.length < FeedbackTextLength.Min || event.target.value.length > FeedbackTextLength.Max) {
      setTextError(true);
    } else {
      setTextError(false);
    }
  };
  return (
    <section className="popup popup-feedback" style={{alignItems: 'flex-end'}}>
      <div className="popup__wrapper">
        <div className="popup-head">
          <h2 className="popup-head__header">Оставить отзыв</h2>
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
        <div className="popup__content popup__content--feedback">
          <h3 className="popup__feedback-title">Оцените тренировку</h3>
          <ul className="popup__rate-list">
            {ratings.map((item) => (
              <li className="popup__rate-item" key={item}>
                <div className="popup__rate-item-wrap">
                  <label>
                    <input
                      type="radio"
                      name="оценка тренировки"
                      aria-label={`оценка ${item}`}
                      value={item}
                      checked={item === rating}
                      onClick={() => setRating(item)}
                    />
                    <span className="popup__rate-number">{item}</span>
                  </label>
                </div>
              </li>
            ))}
          </ul>
          <div className="popup__feedback">
            <h3 className="popup__feedback-title popup__feedback-title--text">Поделитесь своими впечатлениями о тренировке</h3>
            <div className="popup__feedback-textarea">
              <div className="custom-textarea">
                <label>
                  <textarea
                    name="description"
                    placeholder=" "
                    value={text}
                    onChange={handleTextChange}
                  ></textarea>
                  {textError && <span className="custom-textarea">{ErrorMessage.Feedback}</span>}
                </label>
              </div>
            </div>
          </div>
          <div className="popup__button">
            <button
              className="btn"
              type="button"
              onClick={() => onSendFeedback(rating, text)}
              disabled={textError}
            >Продолжить</button>
          </div>
        </div>
      </div>
    </section>
  )}
  export default PopupFeedback;
  