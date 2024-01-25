import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCoach, getUser } from '../../store/user-process/selectors';
import { useEffect, useRef, useState } from 'react';
import PopupUserMap from '../../components/popup-user-map/popup-user-map';
import { CITY, POINTS } from '../../constant';
import { locationToMap } from '../../utils';
import UserCardCoach from './items/user-card-coach/user-card-coach';
import PopupCertificate from './items/popup-certificate/popup-certificate';
import { User, UserCoach, UserLocation, UserRole } from '../../types/user-data';
import UserCardUser from './items/user-card-user/user-card-user';
import NotFound from '../not-found/not-found';
import { fetchCoachAction, fetchUserUpdateAction } from '../../store/api-actions';
import dayjs from 'dayjs';

const message = 'К сожалению пользователь не найден';

function UserCard(): JSX.Element {
  const dispatch = useAppDispatch();
  const params = useParams();
  const user = useAppSelector(getUser);
  let cardUser: User | null = null;
  if (params.id) {
    dispatch(fetchCoachAction({id: params.id}));
    cardUser = useAppSelector(getCoach);
  }
  let navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const popupMapRef = useRef<HTMLDivElement>(null);
  const onSendLocation = (location: UserLocation) => {
    if(cardUser && user && cardUser.id === user.id) {
      const updateUser = {...cardUser, location, dateBirth: dayjs(cardUser.dateBirth).toDate()};
      dispatch(fetchUserUpdateAction(updateUser));
    }
  };
  useEffect(() => {
    const handleEscapePress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMapOpen(false);
        setIsCertificateOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscapePress);
    return () => {
      window.removeEventListener('keydown', handleEscapePress);
    }
  });
  if(user && cardUser) {
    let certificates: string[] = [];
    if(cardUser.role === UserRole.Coach) {
      const temp = cardUser as UserCoach;
      certificates = temp.certificates;
    }
    return (
      <div className="wrapper">
        <Helmet>
          <title>FitFriends. Карточка пользователя</title>
        </Helmet>
        <Header />
        <main>
          <div className="inner-page inner-page--no-sidebar">
            <div className="container">
              <div className="inner-page__wrapper">
                <button
                  className="btn-flat inner-page__back"
                  type="button"
                  onClick={goBack}
                >
                  <svg width="14" height="10" aria-hidden="true">
                    <use xlinkHref="#arrow-left"></use>
                  </svg>
                  <span>Назад</span>
                </button>
                <div className="inner-page__content">
                  {cardUser.role === UserRole.Coach ?
                  <UserCardCoach
                    onMapClick={() => setIsMapOpen(!isMapOpen)}
                    onCertificateClick={() => setIsCertificateOpen(true)}
                    id={cardUser.id}
                    name={cardUser.name}
                    trainingReady={cardUser.trainingReady}
                    description={cardUser.description}
                    typeOfTrain={cardUser.typeOfTrain}
                  /> : 
                  <UserCardUser
                    onMapUserClick={() => setIsMapOpen(!isMapOpen)}
                    id={cardUser.id}
                    name={cardUser.name}
                    trainingReady={cardUser.trainingReady}
                    description={cardUser.description}
                    typeOfTrain={cardUser.typeOfTrain}
                  />
                  }
                </div>
              </div>
            </div>
          </div>
          {isMapOpen && 
            <div className="popup-form popup-form--map" ref={popupMapRef}>
              <PopupUserMap
                name={cardUser.name}
                location={cardUser.location}
                onClose={() => setIsMapOpen(false)}
                onSendLocation={onSendLocation}
                city={CITY}
                points={POINTS}
                selectedPoint={locationToMap(cardUser.location)}
              />
            </div>
          }
          {isCertificateOpen && 
            <div className="popup-form" ref={popupMapRef}>
              <PopupCertificate
                certificate={certificates}
                onClose={() => setIsCertificateOpen(false)}
              />
            </div>
          }
        </main>
      </div>
    );
  } else {
    return (
      <NotFound text={message}/>
    )
  }
}
export default UserCard;
