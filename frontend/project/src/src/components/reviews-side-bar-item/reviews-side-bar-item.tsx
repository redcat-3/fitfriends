import { Feedback } from "../../types/reaction";

type ReviewsSideBarItemProps = {
  feedback: Feedback;
};

function ReviewsSideBarItem({feedback}: ReviewsSideBarItemProps): JSX.Element {
  return (
    <li className="reviews-side-bar__item">
      <div className="review">
        <div className="review__user-info">
          <div className="review__user-photo">
            <picture>
              <source
                type="image/webp"
                srcSet={`${feedback.avatar}.webp, ${feedback.avatar}@2x.webp 2x,`}
              />
              <img
                src={`${feedback.avatar}.png`}
                srcSet={`${feedback.avatar}@2x.jpg 2x`}
                width="64"
                height="64"
                alt="Изображение пользователя"
              />
            </picture>
          </div><span className="review__user-name">{feedback.name}</span>
          <div className="review__rating">
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-star"></use>
            </svg>
            <span>{feedback.rating}</span>
          </div>
        </div>
        <p className="review__comment">{feedback.text}</p>
      </div>
    </li>
  );
}
export default ReviewsSideBarItem;
