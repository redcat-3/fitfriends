import { Link } from 'react-router-dom';
import '../../css/style.css';

type SpecialForYouSlideProps = {
  workoutId: number,
  name: string,
  background: string,
};

const SpecialForYouSlide = ({background, name, workoutId}: SpecialForYouSlideProps): JSX.Element => (
  <li className={`special-for-you__item`}>
    <div className="thumbnail-preview">
      <div className="thumbnail-preview__image">
        <picture>
          <source
            type="image/webp"
            srcSet={`${background}.webp, ${background}.webp 2x`}
          />
          <img  className="slide-image"
            src={`${background}.jpg`}
            srcSet={`${background}@2x.jpg 2x`}
            width="330"
            height="192"
            alt=""
          />
        </picture>
      </div>
      <div className="thumbnail-preview__inner">
        <h3 className="thumbnail-preview__title">{name}</h3>
        <div className="thumbnail-preview__button-wrapper">
          <Link to={`/training-card/${workoutId}`} className="btn btn--small thumbnail-preview__button">Подробнее</Link>
        </div>
      </div>
    </div>
  </li>
);
export default SpecialForYouSlide;
