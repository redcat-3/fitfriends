import React, { useState } from 'react';
import FriendRequest from '../friend-request/friend-request';
import { Link } from 'react-router-dom';
import { UserRole } from '../../types/user-data';
import { RequestStatus } from '../../types/reaction';

type FriendsListItemProps = {
  id: string,
  name: string,
  location: string,
  avatar: string,
  trainingReady: boolean,
  typeOfTrain: string[],
  request: boolean,
  requestId?: number,
  userRole: UserRole,
  role: UserRole,
  handleRequestClick: (requestId: number, status: RequestStatus) => void
};

function FriendsListItem({
  id, 
  name, 
  location, 
  avatar, 
  trainingReady, 
  typeOfTrain, 
  request, 
  requestId, 
  userRole,
  role,
  handleRequestClick
}: FriendsListItemProps): JSX.Element {
  const [requestStatus, setRequestStatus] = useState(RequestStatus.Consider);
  const getReadyStatus = (ready: boolean): string => {
    if(ready) {
      return 'thumbnail-friend__ready-status thumbnail-friend__ready-status--is-ready';
    } else {
      return 'thumbnail-friend__ready-status thumbnail-friend__ready-status--is-not-ready';
    }
  };
  const handleRequestAcceptClick = () => {
    if(requestId) {
      handleRequestClick(requestId, RequestStatus.Accept);
      setRequestStatus(RequestStatus.Accept);
    }
  };
  const handleRequestRejectedClick = () => {
    if(requestId) {
      handleRequestClick(requestId, RequestStatus.Rejected);
      setRequestStatus(RequestStatus.Rejected);
    }
  };
  const handleInviteClick = () => {
    console.log('Create request');
  };
  return (
    <li className="friends-list__item">
      <div className="thumbnail-friend">
        <div className={(role === UserRole.User) && (userRole === UserRole.Coach) ? "thumbnail-friend__info thumbnail-friend__info--theme-dark" : "thumbnail-friend__info thumbnail-friend__info--theme-light"}>
          <Link to={`/user-card/${id}/`}>
            <div className="thumbnail-friend__image-status">
              <div className="thumbnail-friend__image">
                <picture>
                  <source
                    type="image/webp"
                    srcSet={`${avatar}.webp, ${avatar}@2x.webp 2x,`}
                  />
                  <img
                    src={`${avatar}.png`}
                    srcSet={`${avatar}@2x.jpg 2x`}
                    width="78"
                    height="78"
                    alt=""
                  />
                </picture>
              </div>
            </div>
          </Link>
          <div className="thumbnail-friend__header">
            <h2 className="thumbnail-friend__name">{name}</h2>
            <div className="thumbnail-friend__location">
              <svg width="14" height="16" aria-hidden="true">
                <use xlinkHref="#icon-location"></use>
              </svg>
              <address className="thumbnail-friend__location-address">{location}</address>
            </div>
          </div>
          <ul className="thumbnail-friend__training-types-list">
            {typeOfTrain.map((item, index)=> (
              <li key={index}>
                <div className="hashtag thumbnail-friend__hashtag">
                  <span>#{item}</span>
                </div>
              </li>))
            }              
          </ul>
          <div className="thumbnail-friend__activity-bar">
            <div className={getReadyStatus(trainingReady)}><span>{trainingReady ? "Готов к тренировке" : "Не готов к тренировке"}</span>
            </div>
            {(role === UserRole.User) && (userRole === UserRole.User) &&
              <button
                className={trainingReady ? "thumbnail-friend__invite-button" : "thumbnail-friend__invite-button is-disabled"}
                type="button"
                onClick={handleInviteClick}
              >
                <svg width="43" height="46" aria-hidden="true" focusable="false">
                  <use xlinkHref="#icon-invite"></use>
                </svg>
                <span className="visually-hidden">Пригласить друга на совместную тренировку</span>
            </button>
            }
          </div>
        </div>
        {request && (requestStatus === RequestStatus.Consider) &&
          <FriendRequest 
            handleRequestAcceptClick={handleRequestAcceptClick}
            handleRequestRejectedClick={handleRequestRejectedClick}
            role={role}
          />
        }
        {request && (requestStatus === RequestStatus.Rejected) &&
          <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-user">
            <p className="thumbnail-friend__request-text">{role === UserRole.Coach ? 'Запрос на персональную тренировку отклонён' : 'Запрос на совместную тренировку отклонён'}</p>
          </div>
        }
        {request && (requestStatus === RequestStatus.Accept) &&
          <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-user">
            <p className="thumbnail-friend__request-text">{role === UserRole.Coach ? 'Запрос на персональную тренировку принят' : 'Запрос на совместную тренировку принят'}</p>
          </div>
        }
      </div>
    </li>
  );
}
export default React.memo(FriendsListItem);
