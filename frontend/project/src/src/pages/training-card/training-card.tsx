import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import ReviewsSideBarItem from '../../components/reviews-side-bar-item/reviews-side-bar-item';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCoach, getFeedbackUsers, getUser } from '../../store/user-process/selectors';
import { getFeedbacks } from '../../store/reaction-process/selectors';
import NotFound from '../not-found/not-found';
import { UserRole } from '../../types/user-data';
import React, { ChangeEventHandler, useEffect, useRef, useState } from 'react';
import { DEFAULT_LIMIT, ErrorMessage, NameLength, WorkoutDescriptionLength } from '../../constant';
import Poster from './items/poster/poster';
import Video from './items/video/video';
import FormVideo from './items/form-video/form-video';
import { getWorkout } from '../../store/workout-process/selectors';
import PopupBuy from '../../components/popup-buy/popup-buy';
import { Workout } from '../../types/workout-data';
import PopupFeedback from '../../components/popup-feedback/popup-feedback';
import { Feedback } from '../../types/reaction';
import dayjs from 'dayjs';
import { fetchCoachAction, fetchFeedbackAddAction, fetchFeedbackUsersAction, fetchFeedbacksWorkoutAction, fetchWorkoutAction } from '../../store/api-actions';

const message = 'К сожалению тренировка не найдена';

function TrainingCard(): JSX.Element {
  const dispatch = useAppDispatch();
  const params = useParams();
  const user = useAppSelector(getUser);
  let workout: Workout | null = null;
  if (params.id) {
    dispatch(fetchWorkoutAction({id: +params.id}));
    workout = useAppSelector(getWorkout);
  }
  if (workout === null) {
    return (
      <NotFound text={message}/>
    )
  } else {
    const query = {limit: DEFAULT_LIMIT, page: 1}
    dispatch(fetchFeedbacksWorkoutAction({query, id: workout.workoutId}));
    dispatch(fetchCoachAction({id: workout.coachId}));
    const iFeedbacks = useAppSelector(getFeedbacks);
    const coach = useAppSelector(getCoach);
    const ids: string[] = [];
    iFeedbacks.map((item, index) => {ids[index] = item.userId;});
    dispatch(fetchFeedbackUsersAction(ids));
    const feedbacksUsers = useAppSelector(getFeedbackUsers);
    const feedbacks: Feedback[] = [];
    iFeedbacks.map((item, index) => {
      const author = feedbacksUsers.find((x) => x.id === item.userId);
      if(author) {
        feedbacks[index] = {
          feedbackId: item.feedbackId,
          workoutId: item.workoutId,
          userId: item.userId,
          avatar: author.avatar,
          name: author.name,
          rating: item.rating,
          text: item.text,
          createdDate: item.createdDate
        }
      }
    })
    let navigate = useNavigate();
    const goBack = () => {
      navigate(-1);
    };
    const popupBuyRef = useRef<HTMLDivElement>(null);
    const popupFeedbackRef = useRef<HTMLDivElement>(null);
    const [formData, setFormData] = useState({
      name: workout.name,
      background: workout.background,
      level: workout.level,
      type: workout.type,
      timeOfTraining: workout.timeOfTraining,
      price: workout.price,
      caloriesToSpend: workout.caloriesToSpend,
      description: workout.description,
      gender: workout.gender,
      video: workout.video,
      special: workout.special,
      rating: workout.rating
    });
    const [isEdit, setIsEdit] = useState(true);
    const [isPaid, setIsPaid] = useState(false);
    const [isPlay, setIsPlay] = useState(false);
    const [isSpecial, setIsSpecial] = useState(workout.special);
    const [formError, setFormError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [priceError, setPriceError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [isBuyOpen, setIsBuyOpen] = useState(false);
    const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
    const handleNameChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      setFormData({...formData, name: event.target.value});
      if(event.target.value.length <= NameLength.Min || NameLength.Max <= event.target.value.length) {
        setNameError(true);
        setFormError(true);
      } else {
        setNameError(false);
        setFormError(false);
      }
    };
    const handleDescriptionChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
      setFormData({...formData, description: event.target.value});
      if(event.target.value.length < WorkoutDescriptionLength.Min || event.target.value.length > WorkoutDescriptionLength.Max) {
        setDescriptionError(true);
        setFormError(true);
      } else {
        setDescriptionError(false);
        setFormError(false);
      }
    };
    const handlePriceChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      const newPrice = event.target.value.substring(0, event.target.value.length - 2)
      setFormData({...formData, price: +newPrice});
      if(Number.isNaN(+newPrice)) {
        setPriceError(true);
        setFormError(true);
      } else if(+newPrice >= 0) {
        setPriceError(false);
        setFormError(false);
      } else if (+newPrice < 0){
        setPriceError(true);
        setFormError(true);
      }
    };
    function handleVideoChange (video: File): void {
      setFormData({...formData, video: URL.createObjectURL(video)});
    };
    const onSend = () => {
      if (!formError) {
        setFormError(false);
        setIsEdit(true);
      } else {
        setFormError(true);
      }
    };
    const handleSpecialClick = () => {
      if(isSpecial) {
        setFormData({...formData, special: false});
        setFormData({...formData, price: formData.price*10/9});
        setIsSpecial(false);
      } else {
        setFormData({...formData, special: true});
        setFormData({...formData, price: formData.price - formData.price/10});
        setIsSpecial(true)
      }
    };
    const onBuyClick = (count: number) => {
      console.log(`Вы купили ${count} тренировок ${workout ? workout.name : ''}`);
      setIsPaid(true);
      setIsBuyOpen(false);
    };
    const onSendFeddback = (rating: number, text: string) => {
      if(workout && user) {
        const feedback: Feedback = {
        feedbackId: feedbacks.length,
        workoutId: workout.workoutId,
        userId: user.id,
        avatar: user.avatar,
        name: user.name,
        rating,
        text,
        createdDate: new Date(dayjs().date())};
        dispatch(fetchFeedbackAddAction(feedback));
    }
      setIsFeedbackOpen(false);
    };
    
    useEffect(() => {
      const handleEscapePress = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          setIsBuyOpen(false);
          setIsFeedbackOpen(false);
        }
      };
      return () => {
        window.removeEventListener('keydown', handleEscapePress);
      }
    });
    return (
      <div className="wrapper">
        <Helmet>
          <title>FitFriends. Карточка тренировки</title>
        </Helmet>
        <Header />
        <main>
          <section className="inner-page">
            <div className="container">
              <div className="inner-page__wrapper">
                <h1 className="visually-hidden">Карточка тренировки</h1>
                <aside className="reviews-side-bar">
                  <button
                    className="btn-flat btn-flat--underlined reviews-side-bar__back"
                    type="button"
                    onClick={goBack}
                  >
                    <svg width="14" height="10" aria-hidden="true">
                      <use xlinkHref="#arrow-left"></use>
                    </svg><span>Назад</span>
                  </button>
                  <h2 className="reviews-side-bar__title">Отзывы</h2>
                  <ul className="reviews-side-bar__list">
                    {feedbacks.map((item, index) => (
                      <ReviewsSideBarItem 
                        key={index}
                        feedback={item}
                      />
                    ))}
                  </ul>
                  <button
                    className="btn btn--medium reviews-side-bar__button"
                    type="button"
                    disabled={user ? user.role !== UserRole.User : false}
                    onClick={() => setIsFeedbackOpen(true)}
                  >Оставить отзыв</button>
                </aside>
                <div className={(user ? user.id === workout.coachId : false) ? "training-card training-card--edit" : "training-card"}>
                  <div className="training-info">
                    <h2 className="visually-hidden">Информация о тренировке</h2>
                    <div className="training-info__header">
                      <div className="training-info__coach">
                        <div className="training-info__photo">
                          <picture>
                            <source
                              type="image/webp"
                              srcSet={`${coach && coach.avatar}.webp, ${coach && coach.avatar}@2x.webp 2x,`}
                            />
                            <img
                              src={`${coach && coach.avatar}.png`}
                              srcSet={`${coach && coach.avatar}@2x.jpg 2x`}
                              width="64"
                              height="64"
                              alt="Изображение тренера"
                            />
                          </picture>
                        </div>
                        <div className="training-info__coach-info">
                          <span className="training-info__label">Тренер</span>
                          <span className="training-info__name">{coach && coach.name}</span>
                        </div>
                      </div>
                      {(user ? user.id === workout.coachId : false) && <React.Fragment>
                        {isEdit ?                   
                          <button
                            className="btn-flat btn-flat--light training-info__edit training-info__edit--edit"
                            type="button"
                            onClick={() => {setIsEdit(false)}}
                            style={{display: 'flex'}}
                          >
                            <svg width="12" height="12" aria-hidden="true">
                              <use xlinkHref="#icon-edit"></use>
                            </svg>
                            <span>Редактировать</span>
                          </button> :
                          <button
                            className="btn-flat btn-flat--light btn-flat--underlined training-info__edit training-info__edit--save"
                            type="button"
                            style={{display: 'block'}}
                            onClick={() => {onSend()}}
                          >
                            <svg width="12" height="12" aria-hidden="true">
                              <use xlinkHref="#icon-edit"></use>
                            </svg>
                            <span>Сохранить</span>
                          </button>
                        }  
                      </React.Fragment>}                    
                    </div>
                    <div className="training-info__main-content">
                      <form action="#" method="get">
                        <div className="training-info__form-wrapper">
                          <div className="training-info__info-wrapper">
                            <div className={nameError ?  "training-info__input training-info__input--training is-invalid" : "training-info__input training-info__input--training"}>
                              <label>
                                <span className="training-info__label">{workout.name}</span>
                                <input
                                  type="text"
                                  name="training"
                                  value={formData.name}
                                  onChange={handleNameChange}
                                  disabled={user ? user.role === UserRole.User : false}
                                />
                              </label>
                              <div className="training-info__error">{nameError && ErrorMessage.Title}</div>
                            </div>
                            <div className={descriptionError ? "training-info__textarea training-info__input is-invalid" : "training-info__textarea"}>
                              <label>
                                <span className="training-info__label">Описание тренировки</span>
                                <textarea
                                  name="description"
                                  value={formData.description}
                                  onChange={handleDescriptionChange}
                                  disabled={user ? user.role === UserRole.User : false}
                                >{formData.description}</textarea>
                                {descriptionError && <span className="training-info__error">{ErrorMessage.Description}</span>}
                              </label>
                            </div>
                          </div>
                          <div className="training-info__rating-wrapper">
                            <div className="training-info__input training-info__input--rating">
                              <label>
                                <span className="training-info__label">Рейтинг</span>
                                <span className="training-info__rating-icon">
                                  <svg width="18" height="18" aria-hidden="true">
                                    <use xlinkHref="#icon-star"></use>
                                  </svg>
                                </span>
                                <input
                                  type="number"
                                  name="rating"
                                  value={formData.rating}
                                  disabled />
                              </label>
                            </div>
                            <ul className="training-info__list">
                              <li className="training-info__item">
                                <div className="hashtag hashtag--white"><span>#{workout.type}</span></div>
                              </li>
                              <li className="training-info__item">
                                <div className="hashtag hashtag--white"><span>#{workout.gender}</span></div>
                              </li>
                              <li className="training-info__item">
                                <div className="hashtag hashtag--white"><span>#{workout.caloriesToSpend}ккал</span></div>
                              </li>
                              <li className="training-info__item">
                                <div className="hashtag hashtag--white"><span>#{workout.timeOfTraining}минут</span></div>
                              </li>
                            </ul>
                          </div>
                          <div className="training-info__price-wrapper">
                            <div className={priceError ? "training-info__input training-info__input--price is-invalid" : "training-info__input training-info__input--price"}>
                              <label>
                                <span className="training-info__label">Стоимость</span>
                                <input
                                  onChange={handlePriceChange}
                                  type="text"
                                  name="price"
                                  value={`${formData.price} ₽`}
                                  disabled={user ? user.role === UserRole.User : false}
                                />
                              </label>
                              <div className="training-info__error">{priceError && ErrorMessage.Price}</div>
                            </div>
                            {(user ? user.role === UserRole.User : false) && 
                              <button
                                className="btn training-info__buy"
                                type="button"
                                style={{display: 'inline-flex'}}
                                onClick={() => setIsBuyOpen(true)}
                                disabled={isPaid}
                              >Купить</button>
                            }
                            <button
                              className="btn-flat btn-flat--light btn-flat--underlined training-info__discount"
                              type="button"
                              onClick={handleSpecialClick}
                              disabled={user ? user.id !== workout.coachId : false || isEdit}
                            >
                              {isSpecial && 
                                <svg width="14" height="14" aria-hidden="true">
                                  <use xlinkHref="#icon-discount"></use>
                                </svg>
                              }
                              {user ? user.id !== workout.coachId : false && !isEdit && <span>{isSpecial ? 'Отменить скидку' : 'Сделать скидку 10%'}</span>}                            </button>                            
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className={isPlay ? "training-video training-video--stop" : "training-video"}>
                    <h2 className="training-video__title">Видео</h2>
                    {(formData.video === '') ?
                      <FormVideo handleVideoChange={handleVideoChange}/> :
                      <div className="training-video__video">
                        {!isPlay || !isPaid ? 
                          <React.Fragment>
                            <Poster previewImage={workout.video} />
                            <button
                              className="training-video__play-button btn-reset"
                              onClick={() => setIsPlay(true)}
                              disabled={!isPaid}
                            >
                              <svg width="18" height="30" aria-hidden="true">
                                <use xlinkHref="#icon-arrow"></use>
                              </svg>
                            </button>
                          </React.Fragment> :
                          <Video
                            previewImage={workout.video}
                            previewVideoLink={workout.video}
                          />
                        }
                      </div>
                    }
                    {isEdit ?
                      <div className="training-video__buttons-wrapper">
                        <button
                          className="btn training-video__button training-video__button--start"
                          type="button"
                          disabled={!isPaid}
                          onClick={() => setIsPlay(true)}
                        >Приступить</button>
                        <button
                          className="btn training-video__button training-video__button--stop"
                          type="button"
                          onClick={() => setIsPlay(false)}
                        >Закончить</button>
                      </div> :
                      <div className="training-video__buttons-wrapper">
                        <div className="training-video__edit-buttons" style={{display:'grid'}}>
                          <button
                            className="btn"
                            type="button"
                          >Сохранить</button>
                          <button
                            className="btn btn--outlined"
                            type="button"
                            onClick={() => setFormData({...formData, video: ''})}
                          >Удалить</button>
                        </div>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>
            {isBuyOpen && 
              <div className="popup-form popup-form--buy" ref={popupBuyRef}>
                <PopupBuy
                  background={workout.background}
                  name={workout.name}
                  price={workout.price}
                  onBuyClick={onBuyClick}
                  onClose={() => setIsBuyOpen(false)}
                />
              </div>
            }
            {isFeedbackOpen && 
              <div className="popup-form popup-form--feedback" ref={popupFeedbackRef}>
                <PopupFeedback
                  onClose={() => setIsFeedbackOpen(false)}
                  onSendFeedback={onSendFeddback}
                />
              </div>
            }
          </section>
        </main>
      </div>
    );
  }
  
}
export default TrainingCard;
