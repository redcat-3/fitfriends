import React from 'react';
import { UserRole } from '../../types/user-data';
import { Link } from 'react-router-dom';

type UserCatalogItemProps = {
  id: string,
  name: string,
  location: string,
  avatar: string,
  typeOfTrain: string[],
  role: UserRole,
};

function UsersCatalogItem({
  id, 
  name, 
  location, 
  avatar, 
  typeOfTrain, 
  role}: UserCatalogItemProps): JSX.Element {
  return (
    <li className="users-catalog__item">
      <div className={role === UserRole.Coach ? "thumbnail-user thumbnail-user--role-coach" : "thumbnail-user thumbnail-user--role-user"}>
        <div className="thumbnail-user__image">
          <picture>
            <source
              type="image/webp"
              srcSet={`${avatar}.webp, ${avatar}@2x.webp 2x,`}
            />
            <img
              src={`${avatar}.png`}
              srcSet={`${avatar}@2x.jpg 2x`}
              width="82"
              height="82"
              alt=""
            />
          </picture>
        </div>
        <div className="thumbnail-user__header">
          <h3 className="thumbnail-user__name">{name}</h3>
          <div className="thumbnail-user__location">
            <svg width="14" height="16" aria-hidden="true">
              <use xlinkHref="#icon-location"></use>
            </svg>
            <address className="thumbnail-user__location-address">{location}</address>
          </div>
        </div>
        <ul className="thumbnail-user__hashtags-list">
          {typeOfTrain.map((item, index)=> (
            <li key={index} className="thumbnail-user__hashtags-item">
              <div className="hashtag thumbnail-user__hashtag">
                <span>#{item}</span>
              </div>
            </li>))
          }
        </ul>
        <Link to={`/user-card/${id}/`} className="btn btn--medium thumbnail-user__button">Подробнее</Link>
      </div>
    </li>
  );
}
export default React.memo(UsersCatalogItem);
