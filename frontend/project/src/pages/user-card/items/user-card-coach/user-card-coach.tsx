import { typeToRussian } from '../../../../utils';
import { WorkoutType } from '../../../../types/workout-data';
import { IRequest, RequestStatus } from '../../../../types/reaction';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { TouchEventHandler, useState } from 'react';
import TraningsSlide from '../../../../components/popular-trainings/items/trainig-slide/traning-slide';
import { Link } from 'react-router-dom';
import { getFriendsList } from '../../../../store/user-process/selectors';
import { fetchAddFriendAction, fetchFollowAction, fetchFriendsAction, fetchRemoveFriendAction, fetchRequestAddAction, fetchUnfollowAction, fetchWorkoutsCoachAction } from '../../../../store/api-actions';
import { getCoachWorkouts } from '../../../../store/workout-process/selectors';

type UserCardCoachProps = {
  id: string;
  name: string;
  onMapClick: () => void;
  onCertificateClick: () => void;
  trainingReady: boolean;
  description: string;
  typeOfTrain: string[];
};

function UserCardCoach({id, name, onMapClick, onCertificateClick, trainingReady, description, typeOfTrain}: UserCardCoachProps): JSX.Element {
  const dispatch = useAppDispatch();
  dispatch(fetchFriendsAction);
  dispatch(fetchWorkoutsCoachAction);
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
  const [isSubscribe, setIsSubscribe] = useState(false);
  const items = useAppSelector(getCoachWorkouts);
  const [slide, setSlide] = useState(0);
  const [touchPosition, setTouchPosition] = useState(0);
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
  const handleCreateRequest = () => {
    const request: IRequest = {
      requester: 'user@5656kjkj',
      userId: id,
      createdDate: new Date(dayjs().date()),
      updatedDate:new Date(dayjs().date()),
      status: RequestStatus.Consider
    }
    dispatch(fetchRequestAddAction(request));
  } 
  const handleSubscribe = () => {
    if(isSubscribe) {
      dispatch(fetchUnfollowAction({id}));
      setIsSubscribe(false);
    } else {
      dispatch(fetchFollowAction({id}));
      setIsSubscribe(true);
    }
  }
  return (
    <section className="user-card-coach">
        <h1 className="visually-hidden">Карточка пользователя роль тренер</h1>
        <div className="user-card-coach__wrapper">
        <div className="user-card-coach__card">
            <div className="user-card-coach__content">
            <div className="user-card-coach__head">
                <h2 className="user-card-coach__title">{name}</h2>
            </div>
            <div className="user-card-coach__label">
                <Link
                to='#'
                onClick={onMapClick}
                >
                  <svg className="user-card-coach__icon-location" width="12" height="14" aria-hidden="true">
                    <use xlinkHref="#icon-location"></use>
                  </svg>
                  <span>Адмиралтейская</span>
                </Link>
            </div>
            <div className="user-card-coach__status-container">
              <div className="user-card-coach__status user-card-coach__status--tag">
                <svg className="user-card-coach__icon-cup" width="12" height="13" aria-hidden="true">
                    <use xlinkHref="#icon-cup"></use>
                </svg>
                <span>Тренер</span>
              </div>
              <div className={trainingReady? "user-card-coach__status user-card-coach__status--check" : "user-card-coach__status"}>
                <span>{trainingReady? 'Готов тренировать' : 'Не готов тренировать'}</span>
              </div>
            </div>
            <div className="user-card-coach__text">
              <p>{description}</p>
            </div>
            <button
              className="btn-flat user-card-coach__sertificate"
              type="button"
              onClick={onCertificateClick}
            >
              <svg width="12" height="13" aria-hidden="true">
                <use xlinkHref="#icon-teacher"></use>
              </svg>
              <span>Посмотреть сертификаты</span>
            </button>
            <ul className="user-card-coach__hashtag-list">
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
            <div className="user-card-coach__gallary">
              <ul className="user-card-coach__gallary-list">
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
        <div className="user-card-coach__training">
          <div className="user-card-coach__training-head slider" 
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          style={{ width: "100%", height: "100%"}}>
            <h2 className="user-card-coach__training-title">Тренировки</h2>
            <div className="user-card-coach__training-bts">
                <button
                  className="btn-icon user-card-coach__training-btn"
                  type="button"
                  aria-label="back"
                  onClick={() => changeSlide(-1)}
                  disabled={slide <= 0}
                >
                  <svg width="14" height="10" aria-hidden="true">
                    <use xlinkHref="#arrow-left"></use>
                  </svg>
                </button>
                <button
                  className="btn-icon user-card-coach__training-btn"
                  type="button"
                  aria-label="next"
                  onClick={() => changeSlide(1)}
                  disabled={slide >= items.length}
                >
                  <svg width="14" height="10" aria-hidden="true">
                    <use xlinkHref="#arrow-right"></use>
                  </svg>
                </button>
              </div>
            </div>
            <ul className="user-card-coach__training-list slide-list"
            style={{ transform: `translateX(-${slide * 20}%)`}}>
              {items.map((slide, index) => (
                <TraningsSlide
                  key={index}
                  workout={slide}
                />
              ))}
            </ul>
            <form className="user-card-coach__training-form">
            {trainingReady && <button
              className="btn user-card-coach__btn-training"
              type="button"
              onClick={handleCreateRequest}
            >Хочу персональную тренировку
            </button>}
            <div className="user-card-coach__training-check">
              <div className="custom-toggle custom-toggle--checkbox">
                <label>
                  <input
                    type="checkbox"
                    value="user-agreement-1"
                    name="user-agreement"
                    checked={isSubscribe}
                    onChange={handleSubscribe}
                  />
                  <span className="custom-toggle__icon">
                    <svg width="9" height="6" aria-hidden="true">
                      <use xlinkHref="#arrow-check"></use>
                    </svg>
                  </span>
                  <span className="custom-toggle__label">Получать уведомление на почту о новой тренировке</span>
                </label>
                </div>
            </div>
            </form>
        </div>
        </div>
    </section>   
  );
}
export default UserCardCoach;
