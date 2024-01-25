import FriendsListItem from '../../components/friends-list-item/friends-list-item';
import Header from '../../components/header/header';
import { AppRoute, DEFAULT_LIMIT } from '../../constant';
import { redirectToRoute } from '../../store/action';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Helmet } from 'react-helmet-async';
import { RequestStatus } from '../../types/reaction';
import { getFriendsList, getUser, getUsersDataLoadingStatus } from '../../store/user-process/selectors';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchFriendsAction, fetchRequestUpdateAction, fetchRequestsAction } from '../../store/api-actions';
import { getRequests } from '../../store/reaction-process/selectors';
import { User, UserRole } from '../../types/user-data';
import { store } from '../../store';

function FriendsList(): JSX.Element {
  let navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);
  if(!user) {
    redirectToRoute(AppRoute.Intro);
  }
  store.dispatch(fetchFriendsAction);
  store.dispatch(fetchRequestsAction);
  const isUsersDataLoading = useAppSelector(getUsersDataLoadingStatus);
  const users = useAppSelector(getFriendsList);
  const requests = useAppSelector(getRequests);
  const usersCount = users.length;
  const friendsRequests: User[] = [];
  const friendsWithoutRequests: User[] = [];
  for(let i=0; i < usersCount; i++) {
    for(let j=0; j < requests.length; j++) {
      if(users[i].id === requests[j].requester) {
        friendsRequests.push(users[i]);
      } else {
        friendsWithoutRequests.push(users[i]);
      }
    }
  }
  const friends = [...friendsRequests, ...friendsWithoutRequests];
  let renderedUsersCount = DEFAULT_LIMIT;
  const renderedUsers = friends.slice(0, renderedUsersCount)
  const [isMore, setIsMore] = useState(renderedUsersCount < (usersCount));
  const checkRequest = (id: string) => {
    for(let j=0; j < requests.length; j++) {
      if(id === requests[j].requester) {
        return true;
      }
    };
    return false;
  }
  const getRequestId = (id: string) => {
    for(let j=0; j < requests.length; j++) {
      if(id === requests[j].requester) {
        return requests[j].requestId;
      }
    };
    return undefined;
  }
  const handleMoreClick = () => {
    if((usersCount) > renderedUsersCount) {
      renderedUsersCount = renderedUsersCount + DEFAULT_LIMIT;
      setIsMore(renderedUsersCount < usersCount);
    }
  };
  const handleTopClick = () => {
    dispatch(redirectToRoute(AppRoute.Main));
  }
  const handleRequestClick = (requestId: number, status: RequestStatus) => {
    dispatch(fetchRequestUpdateAction({id: requestId, status}));
  }
  const goBack = () => {
    navigate(-1);
  };
  if(isUsersDataLoading) {
    return <div className="wrapper">
    <Helmet>
      <title>FitFriends. Список друзей</title>
    </Helmet>
    <Header />
    <main>
      <section className="friends-list">
        <div className="container">
          <div className="friends-list__wrapper">
            <div className="friends-list__title-wrapper">
              <h1 className="friends-list__title">Список друзей загружается ...</h1>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>;
  }
  return (
    <div className="wrapper">
      <Helmet>
        <title>FitFriends. Список друзей</title>
      </Helmet>
      <Header />
      <main>
        <section className="friends-list">
          <div className="container">
            <div className="friends-list__wrapper">
              <button
                className="btn-flat friends-list__back"
                type="button"
                onClick={goBack}
              >
                <svg width="14" height="10" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
                <span>Назад</span>
              </button>
              <div className="friends-list__title-wrapper">
                <h1 className="friends-list__title">Мои друзья</h1>
              </div>
              <ul className="friends-list__list">
                {renderedUsers.map((item, index) => (
                  <FriendsListItem key={index}
                    id={item.id}
                    name={item.name}
                    location={item.location}
                    avatar={item.avatar}
                    trainingReady={item.trainingReady}
                    typeOfTrain={item.typeOfTrain}
                    request={checkRequest(item.id)}
                    requestId={getRequestId(item.id)}
                    userRole={item.role}
                    role={user ? user.role : UserRole.User}
                    handleRequestClick={handleRequestClick}
                  />
                ))}
              </ul>
              <div className="show-more friends-list__show-more">
                {isMore && 
                  <button
                    className="btn show-more__button show-more__button--more"
                    type="button"
                    onClick={handleMoreClick}
                  >Показать еще</button>
                }
                <button 
                  className="btn show-more__button show-more__button--to-top"
                  type="button"
                  onClick={handleTopClick}
                >Вернуться в начало</button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
export default FriendsList;
