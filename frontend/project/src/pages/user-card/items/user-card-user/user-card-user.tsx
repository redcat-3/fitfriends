import { Link } from 'react-router-dom';
import { typeToRussian } from '../../../../utils';
import { WorkoutType } from '../../../../types/workout-data';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { getFriendsList } from '../../../../store/user-process/selectors';
import { useState } from 'react';
import { fetchAddFriendAction, fetchFriendsAction, fetchRemoveFriendAction } from '../../../../store/api-actions';

type UserCardUserProps = {
  id: string;
  name: string;
  onMapUserClick: () => void;
  trainingReady: boolean;
  description: string;
  typeOfTrain: string[];
};

function UserCardUser({id, name, onMapUserClick, trainingReady, description, typeOfTrain}: UserCardUserProps): JSX.Element {
  const dispatch = useAppDispatch();
  dispatch(fetchFriendsAction);
  const friendsList = useAppSelector(getFriendsList);
  const ids: string[] = [];
  friendsList.map((item, index) => {
    ids[index] = item.id;
  })
  const [isFriend, setIsFriend] = useState(ids.includes(id));
  const onRemoveFromFriend = () => {
    dispatch(fetchRemoveFriendAction({id}));
    setIsFriend(false);
  };
  const onAddToFriend = () => {
    dispatch(fetchAddFriendAction({id}));
    setIsFriend(true);
  };
  return (
    <section className="user-card">
      <h1 className="visually-hidden">Карточка пользователя</h1>
      <div className="user-card__wrapper">
      <div className="user-card__content">
        <div className="user-card__head">
          <h2 className="user-card__title">{name}</h2>
        </div>
        <div className="user-card__label">
          <Link
          to='#'
          onClick={onMapUserClick}
          >
            <svg className="user-card-coach__icon-location" width="12" height="14" aria-hidden="true">
              <use xlinkHref="#icon-location"></use>
            </svg>
            <span>Адмиралтейская</span>
          </Link>
        </div>
        <div className={trainingReady? "user-card-coach__status user-card-coach__status--check" : "user-card-coach__status"}>
          <span>{trainingReady? 'Готов к тренировке' : 'Не готов к тренировке'}</span>
        </div>
        <div className="user-card__text">
          <p>{description}</p>
        </div>
        <ul className="user-card__hashtag-list">
          {typeOfTrain.map((item, index) => (
            <li className="user-card-coach__hashtag-item" key={index}>
              <div className="hashtag">
                <span>#{typeToRussian(item as WorkoutType)}</span>
              </div>
            </li>
          ))}
        </ul>
        {!isFriend ? 
            <button
              className="btn user-card-coach__btn"
              type="button"
              onClick={onAddToFriend}
            >Добавить в друзья
            </button> : 
            <button
              className="btn btn--outlined user-card-coach-2__btn"
              type="button"
              onClick={onRemoveFromFriend}
            >Удалить из друзей</button>
            }
      </div>
      <div className="user-card__gallary">
        <ul className="user-card__gallary-list">
        <li className="user-card-coach__gallary-item">
          <img
            src="/img/content/user-coach-photo1.jpg"
            srcSet="/img/content/user-coach-photo1@2x.jpg 2x"
            width="334"
            height="573"
            alt="photo1"
        />
      </li>
        <li className="user-card-coach__gallary-item">
            <img     
            src="/img/content/user-coach-photo2.jpg"
            srcSet="/img/content/user-coach-photo2@2x.jpg 2x"
            width="334"
            height="573"
            alt="photo1"
            />
        </li>
        </ul>
      </div>
    </div>
  </section>
  );
}
export default UserCardUser;
