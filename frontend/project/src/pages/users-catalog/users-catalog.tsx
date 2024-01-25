import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import UserCatalogForm from '../../components/user-catalog-form/user-catalog-form';
import UsersCatalogItem from '../../components/users-catalog-item/users-catalog-item';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getUser, getUsers, getUsersCount } from '../../store/user-process/selectors';
import { DEFAULT_LIMIT } from '../../constant';
import { useState } from 'react';
import { fetchUsersAction } from '../../store/api-actions';
import NotFound from '../not-found/not-found';
import { store } from '../../store';

const message = 'Пожалуйста, зарегистрируйтесь';

function UserCatalog(): JSX.Element {
  const dispatch = useAppDispatch();
  const query = {
    limit: DEFAULT_LIMIT,
    page: 1,
    trainingReady: true,
    sortDirection: 'desc',
  };
  store.dispatch(fetchUsersAction(query));
  const user = useAppSelector(getUser);
  const users = useAppSelector(getUsers);
  const usersCount = useAppSelector(getUsersCount);
  let renderedUsersCount = users.length;
  const [isMore, setIsMore] = useState(renderedUsersCount < usersCount);
  const handleMoreClick = () => {
    if(usersCount > renderedUsersCount) {
      renderedUsersCount = renderedUsersCount + DEFAULT_LIMIT;
      query.limit = renderedUsersCount;
      dispatch(fetchUsersAction(query));
      setIsMore(renderedUsersCount < usersCount);
    }
  };
  if(user) {
    return (
      <div className="wrapper">
        <Helmet>
          <title>FitFriends. Пользователи</title>
        </Helmet>
        <Header />
        <main>
          <section className="inner-page">
            <div className="container">
              <div className="inner-page__wrapper">
                <h1 className="visually-hidden">Каталог пользователей</h1>
                <UserCatalogForm
                  level={user.level}
                  location={user.location}
                  role={user.role}
                  typeOfTrain={user.typeOfTrain}
                />
                <div className="inner-page__content">
                  <div className="users-catalog">
                    <ul className="users-catalog__list">
                      {users.map((item, index) => (
                        <UsersCatalogItem key={index}
                          id={item.id}
                          name={item.name}
                          location={item.location}
                          avatar={item.avatar}
                          typeOfTrain={item.typeOfTrain}
                          role={item.role}
                        />
                      ))}
                    </ul>
                    <div className="show-more users-catalog__show-more">
                      {isMore && 
                        <button
                          className="btn show-more__button show-more__button--more"
                          type="button"
                          onClick={handleMoreClick}
                        >Показать еще</button>
                      }
                      <button className="btn show-more__button show-more__button--to-top" type="button">Вернуться в начало</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  } else {
    return (
      <NotFound text={message}/>
    )
  }
 
}
export default UserCatalog;
