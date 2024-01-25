import { Link } from "react-router-dom";

type LookForCompanySlideProps = {
  id: string;
  avatar: string;
  name:string;
  location: string;
  typeOfTrain: string[];
};

function LookForCompanySlide ({id, avatar, name, location, typeOfTrain}: LookForCompanySlideProps): JSX.Element {
  
  return (
    <li className="look-for-company__item slide">
      <div className="thumbnail-user thumbnail-user--role-user thumbnail-user--dark">
        <div className="thumbnail-user__image slide-image">
          <picture>
            <source
              type="image/webp"
              srcSet={`${avatar}.webp, ${avatar}.webp 2x`}
            />
            <img
              src={`${avatar}.jpg`}
              srcSet={`${avatar}@2x.jpg 2x`}
              width="82"
              height="82"
              alt={name}
            />
          </picture>
        </div>
        <div className="thumbnail-user__header">
          <h3 className="thumbnail-user__name">{name}</h3>
          <div className="thumbnail-user__location">
            <svg width="14" height="16" aria-hidden="true">
              <use xlinkHref="#icon-location"></use>
            </svg>
            <address className="thumbnail-user__location-address">{location}
            </address>
          </div>
        </div>
        <ul className="thumbnail-user__hashtags-list">
          {typeOfTrain.map((item, index)=> (
              <li className="thumbnail-user__hashtags-item" key={index}>
                <div className="hashtag thumbnail-user__hashtag">
                  <span>#{item}</span>
                </div>
              </li>))
            }
        </ul>
        <Link to={`/user-card/${id}/`} className="btn btn--outlined btn--dark-bg btn--medium thumbnail-user__button">Подробнее</Link>
      </div>
    </li>
  )
} 
export default LookForCompanySlide;
