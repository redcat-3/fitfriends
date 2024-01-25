import React from 'react';
import { UserRole } from '../../types/user-data';

type FriendRequestProps = {
  role: UserRole;
  handleRequestAcceptClick: () => void;
  handleRequestRejectedClick: () => void;
};

function FriendRequest({role, handleRequestAcceptClick, handleRequestRejectedClick}: FriendRequestProps): JSX.Element {
  return (
    <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-user">
      <p className="thumbnail-friend__request-text">
        {role === UserRole.Coach ? 'Запрос на персональную тренировку' : 'Запрос на совместную тренировку'}
      </p>
      <div className="thumbnail-friend__button-wrapper">
        <button
          className="btn btn--medium btn--dark-bg thumbnail-friend__button"
          type="button"
          onClick={handleRequestAcceptClick}
        >
          Принять
        </button>
        <button className="btn btn--medium btn--outlined btn--dark-bg thumbnail-friend__button"
          type="button"
          onClick={handleRequestRejectedClick}
        >
          Отклонить
        </button>
      </div>
    </div>
  );
}
export default React.memo(FriendRequest);
